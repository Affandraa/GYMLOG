import React, { useState, useCallback } from 'react'
import {
  Utensils,
  Droplets,
  Target,
  TrendingUp,
  Flame,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react'
import type { UserProfile } from '../../types/user'
import type {
  DailyNutritionLog,
  MealEntry,
  MealType,
  MacroTargets,
  MicroTargets
} from '../../types/nutrition'
import { MealSection } from './MealSection'
import { FoodSearchModal } from './FoodSearchModal'
import { MicronutrientAudit } from './MicronutrientAudit'
import { NutrientGapAdvisor } from './NutrientGapAdvisor'
import {
  getDailyTargets,
  sumMealEntryMacros,
  sumMealEntryMicros,
  computeNutritionGaps,
  getSmartRecommendations,
  calcMacrosForPortion,
  calcMicrosForPortion
} from '../../services/nutritionCalc'
import { getFoodById } from '../../data/indonesianFoodDb'
import {
  loadDailyNutritionLog,
  saveDailyNutritionLog
} from '../../services/storage'

interface DailyNutritionDashboardProps {
  profile: UserProfile
}

function getDateString(offset = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

function buildEmptyLog(
  date: string,
  targetCalories: number,
  targetMacros: MacroTargets,
  targetMicros: MicroTargets
): DailyNutritionLog {
  return {
    date,
    meals: [],
    targetCalories,
    targetMacros,
    targetMicros,
    waterMl: 0
  }
}

interface MacroBarProps {
  label: string
  consumed: number
  target: number
  unit: string
  color: string
  bgColor: string
}

const MacroBar: React.FC<MacroBarProps> = ({ label, consumed, target, unit, color, bgColor }) => {
  const pct = target > 0 ? Math.min(100, (consumed / target) * 100) : 0
  const isOver = consumed > target
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-zinc-400">{label}</span>
        <span className={`text-xs font-bold ${isOver ? 'text-red-400' : color}`}>
          {Math.round(consumed)}<span className="text-zinc-500">/{Math.round(target)}{unit}</span>
        </span>
      </div>
      <div className={`h-2 ${bgColor} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${isOver ? 'bg-red-500' : color.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export const DailyNutritionDashboard: React.FC<DailyNutritionDashboardProps> = ({ profile }) => {
  const { calories: targetCal, macros: targetMacros, micros: targetMicros } = getDailyTargets(profile)

  const [dateOffset, setDateOffset] = useState(0)
  const currentDate = getDateString(dateOffset)

  const [log, setLog] = useState<DailyNutritionLog>(() => {
    const saved = loadDailyNutritionLog(currentDate)
    return saved ?? buildEmptyLog(currentDate, targetCal, targetMacros, targetMicros)
  })

  const [showFoodSearch, setShowFoodSearch] = useState(false)
  const [activeMealType, setActiveMealType] = useState<MealType>('lunch')

  // Switch dates
  const changeDate = (offset: number) => {
    const newOffset = dateOffset + offset
    const newDate = getDateString(newOffset)
    const saved = loadDailyNutritionLog(newDate)
    setLog(saved ?? buildEmptyLog(newDate, targetCal, targetMacros, targetMicros))
    setDateOffset(newOffset)
  }

  const persistLog = useCallback((updated: DailyNutritionLog) => {
    setLog(updated)
    saveDailyNutritionLog(updated)
  }, [])

  // Add food entry
  const handleAddEntry = (entry: MealEntry) => {
    const updated: DailyNutritionLog = {
      ...log,
      meals: [...log.meals, entry]
    }
    persistLog(updated)
    setShowFoodSearch(false)
  }

  // Delete entry
  const handleDeleteEntry = (entryId: string) => {
    const updated = { ...log, meals: log.meals.filter(m => m.id !== entryId) }
    persistLog(updated)
  }

  // Edit portion (recalculate nutrients)
  const handleEditPortion = (entry: MealEntry, newGrams: number) => {
    const food = getFoodById(entry.foodId)
    if (!food) return
    const newMacros = calcMacrosForPortion(food, newGrams)
    const newMicros = calcMicrosForPortion(food, newGrams)
    const updatedEntry: MealEntry = {
      ...entry,
      portionGrams: newGrams,
      ...newMacros,
      micros: newMicros
    }
    const updated = {
      ...log,
      meals: log.meals.map(m => m.id === entry.id ? updatedEntry : m)
    }
    persistLog(updated)
  }

  // Update water
  const handleWaterChange = (deltaMl: number) => {
    const updated = { ...log, waterMl: Math.max(0, log.waterMl + deltaMl) }
    persistLog(updated)
  }

  // Computed totals
  const totals = sumMealEntryMacros(log.meals)
  const totalMicros = sumMealEntryMicros(log.meals)
  const remainingCal = Math.max(0, targetCal - totals.calories)
  const calPct = Math.min(100, (totals.calories / targetCal) * 100)
  const isToday = dateOffset === 0

  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']

  const gaps = computeNutritionGaps(log, totalMicros)
  const recommendations = getSmartRecommendations(
    gaps,
    totals.calories,
    targetCal,
    totals.protein,
    targetMacros.protein
  )

  return (
    <div className="space-y-6">
      {/* Date navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-400" />
            Nutrition Tracker
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">Log your meals and track your macros &amp; micros</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeDate(-1)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center min-w-[120px]">
            <div className="text-xs font-bold text-white">
              {isToday ? 'Today' : dateOffset === -1 ? 'Yesterday' : formatDate(currentDate)}
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">{currentDate}</div>
          </div>
          <button
            onClick={() => changeDate(1)}
            disabled={dateOffset >= 0}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calorie Ring + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Calorie donut */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#27272a" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke={calPct > 100 ? '#ef4444' : '#10b981'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - calPct / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-extrabold text-white leading-none">{Math.round(totals.calories)}</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">of {targetCal} kcal</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-xs text-zinc-400">
              <span className="text-orange-400 font-bold">{Math.round(remainingCal)} kcal</span> remaining
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Goal: {profile.goal.replace('_', ' ')}</div>
          </div>
        </div>

        {/* Macro bars */}
        <div className="md:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-1">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">Daily Macros</span>
          </div>
          <MacroBar label="Protein" consumed={totals.protein} target={targetMacros.protein} unit="g" color="text-blue-400" bgColor="bg-blue-950/40" />
          <MacroBar label="Carbohydrates" consumed={totals.carbs} target={targetMacros.carbs} unit="g" color="text-yellow-400" bgColor="bg-yellow-950/40" />
          <MacroBar label="Fat" consumed={totals.fat} target={targetMacros.fat} unit="g" color="text-pink-400" bgColor="bg-pink-950/40" />
          <MacroBar label="Fiber" consumed={totals.fiber} target={targetMacros.fiber} unit="g" color="text-emerald-400" bgColor="bg-emerald-950/40" />
        </div>
      </div>

      {/* Quick macro chips */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[
          { label: 'Calories', val: Math.round(totals.calories), unit: 'kcal', color: 'text-orange-400' },
          { label: 'Protein', val: Math.round(totals.protein), unit: 'g', color: 'text-blue-400' },
          { label: 'Carbs', val: Math.round(totals.carbs), unit: 'g', color: 'text-yellow-400' },
          { label: 'Fat', val: Math.round(totals.fat), unit: 'g', color: 'text-pink-400' },
          { label: 'Fiber', val: Math.round(totals.fiber), unit: 'g', color: 'text-emerald-400' },
          { label: 'Sugar', val: Math.round(totals.sugar), unit: 'g', color: 'text-purple-400' },
        ].map(item => (
          <div key={item.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 text-center">
            <div className={`text-lg font-extrabold ${item.color}`}>{item.val}<span className="text-xs text-zinc-500 ml-0.5">{item.unit}</span></div>
            <div className="text-[10px] text-zinc-500 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Calorie target info banner */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
        <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-zinc-500">
          Targets calculated from your profile (Mifflin-St Jeor BMR + activity factor).
          Goal: <span className="text-zinc-300 capitalize">{profile.goal.replace('_', ' ')}</span> ·
          TDEE-adjusted target: <span className="text-emerald-400 font-semibold">{targetCal} kcal</span> ·
          Protein: <span className="text-blue-400 font-semibold">{targetMacros.protein}g</span>
        </p>
      </div>

      {/* Water tracker */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">Water Intake</span>
          </div>
          <span className="text-sm font-bold text-cyan-400">{(log.waterMl / 1000).toFixed(2)}L</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (log.waterMl / 2500) * 100)}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-500">Target: 2.5L</span>
          <div className="flex gap-2 ml-auto">
            {[150, 250, 350].map(ml => (
              <button
                key={ml}
                onClick={() => handleWaterChange(ml)}
                className="px-3 py-1 rounded-lg bg-cyan-900/30 hover:bg-cyan-800/50 border border-cyan-500/20 text-cyan-400 text-xs font-semibold cursor-pointer transition-colors"
              >
                +{ml}ml
              </button>
            ))}
            <button
              onClick={() => handleWaterChange(-250)}
              className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs cursor-pointer"
            >
              −
            </button>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <NutrientGapAdvisor
        recommendations={recommendations}
        gaps={gaps}
        onAddFood={() => { setActiveMealType('snack'); setShowFoodSearch(true) }}
      />

      {/* Food Diary sections */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Food Diary — {isToday ? 'Today' : formatDate(currentDate)}</h3>
        </div>
        <div className="space-y-3">
          {mealTypes.map(mt => (
            <MealSection
              key={mt}
              mealType={mt}
              entries={log.meals.filter(m => m.mealType === mt)}
              onAddFood={(meal) => {
                setActiveMealType(meal)
                setShowFoodSearch(true)
              }}
              onDeleteEntry={handleDeleteEntry}
              onEditPortion={handleEditPortion}
            />
          ))}
        </div>
      </div>

      {/* Micronutrient Audit */}
      <MicronutrientAudit gaps={gaps} targets={targetMicros} />

      {/* Daily totals footer */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-zinc-300">Total Logged: <span className="text-orange-400 font-bold">{Math.round(totals.calories)} kcal</span></span>
        </div>
        <div className="flex gap-3 text-xs text-zinc-400">
          <span>P: <span className="text-blue-400 font-bold">{Math.round(totals.protein)}g</span></span>
          <span>C: <span className="text-yellow-400 font-bold">{Math.round(totals.carbs)}g</span></span>
          <span>F: <span className="text-pink-400 font-bold">{Math.round(totals.fat)}g</span></span>
          <span>Fiber: <span className="text-emerald-400 font-bold">{Math.round(totals.fiber)}g</span></span>
        </div>
      </div>

      {/* Food Search Modal */}
      {showFoodSearch && (
        <FoodSearchModal
          defaultMealType={activeMealType}
          onAddEntry={handleAddEntry}
          onClose={() => setShowFoodSearch(false)}
        />
      )}
    </div>
  )
}
