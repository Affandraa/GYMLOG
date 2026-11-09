import React, { useState, useEffect } from 'react'
import { Search, X, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { FOOD_DATABASE, searchFoods } from '../../data/indonesianFoodDb'
import { calcMacrosForPortion, calcMicrosForPortion } from '../../services/nutritionCalc'
import type { FoodItem, MealType, MealEntry } from '../../types/nutrition'

interface FoodSearchModalProps {
  defaultMealType?: MealType
  onAddEntry: (entry: MealEntry) => void
  onClose: () => void
}

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '🌅 Breakfast',
  lunch: '☀️ Lunch',
  dinner: '🌙 Dinner',
  snack: '🍎 Snack'
}

const CATEGORIES = ['All', 'Staple', 'Protein', 'Vegetable', 'Fruit', 'Dairy', 'Legume', 'Fat & Oil', 'Supplement'] as const
type Category = typeof CATEGORIES[number]

export const FoodSearchModal: React.FC<FoodSearchModalProps> = ({
  defaultMealType = 'lunch',
  onAddEntry,
  onClose
}) => {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [results, setResults] = useState<FoodItem[]>(FOOD_DATABASE)
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [portion, setPortion] = useState<number>(100)
  const [mealType, setMealType] = useState<MealType>(defaultMealType)

  useEffect(() => {
    let filtered = searchFoods(query)
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(f => f.category === selectedCategory)
    }
    setResults(filtered)
  }, [query, selectedCategory])

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food)
    setPortion(food.servingSizeGrams)
  }

  const preview = selectedFood ? calcMacrosForPortion(selectedFood, portion) : null

  const handleAdd = () => {
    if (!selectedFood || !preview) return
    const micros = calcMicrosForPortion(selectedFood, portion)
    const entry: MealEntry = {
      id: `meal_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      mealType,
      portionGrams: portion,
      calories: preview.calories,
      protein: preview.protein,
      carbs: preview.carbs,
      fat: preview.fat,
      fiber: preview.fiber,
      sugar: preview.sugar,
      micros,
      loggedAt: new Date().toISOString()
    }
    onAddEntry(entry)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl max-h-[90dvh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-zinc-800 shrink-0">
          <div>
            <h2 className="text-base font-bold text-white">Add Food</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Search from Indonesian &amp; international foods</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meal type selector */}
        <div className="px-5 pt-3 shrink-0">
          <div className="flex gap-1 flex-wrap">
            {(Object.keys(MEAL_LABELS) as MealType[]).map(mt => (
              <button
                key={mt}
                onClick={() => setMealType(mt)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mealType === mt
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {MEAL_LABELS[mt]}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-5 pt-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search food (e.g. nasi, ayam, telur…)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-5 pt-2 pb-1 flex gap-1 overflow-x-auto no-scrollbar shrink-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results list */}
        {!selectedFood && (
          <div className="overflow-y-auto flex-1 px-5 pb-3">
            {results.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-8">No foods found. Try a different search.</p>
            ) : (
              <div className="space-y-1 mt-1">
                {results.map(food => (
                  <button
                    key={food.id}
                    onClick={() => handleSelectFood(food)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-emerald-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                          {food.name}
                        </div>
                        {food.indonesianName && (
                          <div className="text-[11px] text-zinc-500">{food.indonesianName}</div>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{food.category}</span>
                          {food.isVerified && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/50 text-emerald-400 border border-emerald-500/20">{food.source}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-emerald-400">{food.macrosPer100g.calories}</div>
                        <div className="text-[10px] text-zinc-500">kcal/100g</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">P:{food.macrosPer100g.protein}g</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Portion & Preview Panel */}
        {selectedFood && preview && (
          <div className="overflow-y-auto flex-1 px-5 pb-5">
            {/* Back button */}
            <button
              onClick={() => setSelectedFood(null)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer mt-2 mb-3"
            >
              <ChevronUp className="w-4 h-4" /> Back to search
            </button>

            {/* Selected food summary */}
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{selectedFood.name}</div>
                  {selectedFood.indonesianName && (
                    <div className="text-xs text-zinc-400">{selectedFood.indonesianName}</div>
                  )}
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${selectedFood.isVerified ? 'bg-emerald-900/50 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  {selectedFood.source}
                </span>
              </div>
              {selectedFood.notes && (
                <p className="text-[11px] text-zinc-500 mt-1">{selectedFood.notes}</p>
              )}
            </div>

            {/* Portion slider */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Portion (grams)</label>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setPortion(Math.max(10, portion - 25))}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer shrink-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={5}
                    value={portion}
                    onChange={e => setPortion(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 mt-0.5">
                    <span>10g</span>
                    <span>500g</span>
                  </div>
                </div>
                <button
                  onClick={() => setPortion(Math.min(500, portion + 25))}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer shrink-0"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mt-1">
                <input
                  type="number"
                  value={portion}
                  min={10}
                  max={999}
                  onChange={e => {
                    const v = Number(e.target.value)
                    if (v >= 10 && v <= 999) setPortion(v)
                  }}
                  className="w-20 text-center bg-zinc-900 border border-zinc-700 rounded-lg py-1 text-sm font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-zinc-500 ml-1">g</span>
              </div>
            </div>

            {/* Macro preview */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Calories', value: preview.calories, unit: 'kcal', color: 'text-orange-400' },
                { label: 'Protein', value: preview.protein, unit: 'g', color: 'text-blue-400' },
                { label: 'Carbs', value: preview.carbs, unit: 'g', color: 'text-yellow-400' },
                { label: 'Fat', value: preview.fat, unit: 'g', color: 'text-pink-400' },
                { label: 'Fiber', value: preview.fiber, unit: 'g', color: 'text-emerald-400' },
                { label: 'Sugar', value: preview.sugar, unit: 'g', color: 'text-purple-400' },
              ].map(stat => (
                <div key={stat.label} className="bg-zinc-900 rounded-lg p-2.5 text-center border border-zinc-800">
                  <div className={`text-sm font-bold ${stat.color}`}>{stat.value}<span className="text-xs text-zinc-500 ml-0.5">{stat.unit}</span></div>
                  <div className="text-[10px] text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Add button */}
            <button
              onClick={handleAdd}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add {portion}g to {MEAL_LABELS[mealType]}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
