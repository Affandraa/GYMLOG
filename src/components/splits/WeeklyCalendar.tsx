import React, { useState } from 'react'
import { 
  Calendar as CalendarIcon, 
  Dumbbell, 
  Coffee, 
  ChevronRight, 
  ArrowRightLeft, 
  X, 
  Check, 
  Info,
  SlidersHorizontal
} from 'lucide-react'
import type { WorkoutSplit, DailyWorkoutPlan } from '../../types/split'
import type { DayOfWeek } from '../../types/user'
import { DAYS_OF_WEEK, getCurrentDayOfWeek, getWorkoutForDay } from '../../services/fitnessCalc'
import { EditDayRoutineModal } from './EditDayRoutineModal'

interface WeeklyCalendarProps {
  split: WorkoutSplit
  customSchedule?: Partial<Record<DayOfWeek, string>>
  customDayWorkouts?: Record<string, DailyWorkoutPlan>
  onUpdateCustomSchedule: (newSchedule: Partial<Record<DayOfWeek, string>>) => void
  onSaveDayWorkout: (updatedPlan: DailyWorkoutPlan) => void
  onResetDayWorkout: (dayKey: string) => void
  onStartDayWorkout: (plan: DailyWorkoutPlan) => void
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  split,
  customSchedule = {},
  customDayWorkouts = {},
  onUpdateCustomSchedule,
  onSaveDayWorkout,
  onResetDayWorkout,
  onStartDayWorkout
}) => {
  const today = getCurrentDayOfWeek()
  const [selectedDayPlan, setSelectedDayPlan] = useState<DailyWorkoutPlan | null>(null)
  const [editingScheduleDay, setEditingScheduleDay] = useState<DayOfWeek | null>(null)
  const [editingRoutinePlan, setEditingRoutinePlan] = useState<DailyWorkoutPlan | null>(null)

  // Handler to swap a day's workout to another workout in the split, or to rest
  const handleAssignDay = (dayOfWeek: DayOfWeek, workoutId: string) => {
    const updated: Partial<Record<DayOfWeek, string>> = {
      ...customSchedule,
      [dayOfWeek]: workoutId
    }
    onUpdateCustomSchedule(updated)
    setEditingScheduleDay(null)
  }

  // Reset to original split defaults
  const handleResetSchedule = () => {
    onUpdateCustomSchedule({})
    setEditingScheduleDay(null)
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <CalendarIcon className="w-4 h-4" />
            <span>Interactive Weekly Calendar</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {split.name} Schedule
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Click on any day to inspect details, swap workout days, or click "Ubah Gerakan" to customize exercises (Pec Deck, Chest Press, etc.).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {Object.keys(customSchedule).length > 0 && (
            <button
              onClick={handleResetSchedule}
              className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Reset Schedule
            </button>
          )}
          <span className="px-3 py-1.5 text-xs font-mono font-bold bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg">
            Today: <strong className="text-emerald-400">{today}</strong>
          </span>
        </div>
      </div>

      {/* 7-Day Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {DAYS_OF_WEEK.map((dayName) => {
          const workout = getWorkoutForDay(split, dayName, customSchedule, customDayWorkouts)
          const isToday = dayName === today
          const isRest = workout?.isRestDay
          const customKey = `${split.id}_${dayName}`
          const isCustomized = customDayWorkouts[customKey] !== undefined

          return (
            <div
              key={dayName}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all relative ${
                isToday 
                  ? 'bg-zinc-900/90 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50' 
                  : isRest
                    ? 'bg-zinc-950/40 border-zinc-800/60 opacity-80 hover:opacity-100'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Day Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold font-mono uppercase ${isToday ? 'text-emerald-400' : 'text-zinc-400'}`}>
                      {dayName.slice(0, 3)}
                    </span>
                    {isCustomized && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Custom exercises active" />
                    )}
                  </div>

                  {isToday ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      TODAY
                    </span>
                  ) : isRest ? (
                    <span className="text-[10px] text-zinc-500 font-medium">Rest</span>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-400">{workout?.estimatedDurationMinutes}m</span>
                  )}
                </div>

                {/* Day Content */}
                <div className="mt-3">
                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    {workout?.name || 'Workout Session'}
                  </h4>

                  {!isRest && workout?.targetMuscles && workout.targetMuscles.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {workout.targetMuscles.slice(0, 3).map((m) => (
                        <span 
                          key={m}
                          className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {isRest ? (
                    <div className="mt-3 text-[11px] text-zinc-400 flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="line-clamp-2">Recovery & active regeneration.</span>
                    </div>
                  ) : (
                    <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-between font-mono">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {workout?.exercises.length || 0} exercises
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Day Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <button
                  onClick={() => workout && setSelectedDayPlan(workout)}
                  className="text-zinc-400 hover:text-white font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-1">
                  {!isRest && workout && (
                    <button
                      onClick={() => setEditingRoutinePlan(workout)}
                      title="Ubah / Tambah Gerakan untuk hari ini"
                      className="p-1 rounded text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setEditingScheduleDay(dayName)}
                    title="Swap workout for this day"
                    className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* SWAP / REASSIGN SCHEDULE MODAL */}
      {editingScheduleDay && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold text-white">Reassign {editingScheduleDay}</h3>
                <p className="text-xs text-zinc-400">Choose which workout session to schedule on this day:</p>
              </div>
              <button
                onClick={() => setEditingScheduleDay(null)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2 max-h-80 overflow-y-auto pr-1">
              {split.schedule.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handleAssignDay(editingScheduleDay, plan.id)}
                  className="w-full text-left p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-xs text-white block">{plan.name}</span>
                    <span className="text-[11px] text-zinc-400">
                      {plan.isRestDay ? 'Rest & recovery' : `${plan.exercises.length} exercises • ~${plan.estimatedDurationMinutes} mins`}
                    </span>
                  </div>
                  {customSchedule[editingScheduleDay] === plan.id && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DAY DETAILS DRAWER / MODAL */}
      {selectedDayPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative my-2 sm:my-8">
            <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs uppercase font-mono font-bold text-emerald-400">
                  {selectedDayPlan.dayOfWeek} Routine
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedDayPlan.name}</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Estimated duration: {selectedDayPlan.estimatedDurationMinutes} mins • Target: {selectedDayPlan.targetMuscles.join(', ') || 'Rest & Recovery'}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayPlan(null)}
                className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedDayPlan.isRestDay ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
                  <Coffee className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Full Rest & Regeneration Day</h4>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  {selectedDayPlan.recoveryFocus || 'Rest allows muscle fibers to repair and grow stronger. Keep protein high and stay hydrated.'}
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3 max-h-[55vh] overflow-y-auto pr-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  <span>Exercise Details & Alternatives ({selectedDayPlan.exercises.length})</span>
                  <button
                    onClick={() => {
                      const toEdit = selectedDayPlan
                      setSelectedDayPlan(null)
                      setEditingRoutinePlan(toEdit)
                    }}
                    className="text-emerald-400 hover:text-emerald-300 capitalize font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Ubah / Tambah Gerakan</span>
                  </button>
                </div>

                {selectedDayPlan.exercises.map((ex, i) => (
                  <div 
                    key={ex.id || i}
                    className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs font-mono font-bold">
                          {i + 1}
                        </span>
                        <div>
                          <span className="font-bold text-sm text-white">{ex.name}</span>
                          <span className="ml-2 text-[10px] text-zinc-400 font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                            {ex.muscleGroup}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-xs text-emerald-400">
                          {ex.targetSets} sets × {ex.targetReps}
                        </span>
                        <div className="text-[10px] text-zinc-500 font-mono">Rest: {ex.restSeconds}s</div>
                      </div>
                    </div>

                    {ex.alternatives && ex.alternatives.length > 0 && (
                      <div className="text-xs text-zinc-400 bg-zinc-900/60 p-2 rounded-lg border border-zinc-850 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-zinc-300 font-medium">Equipment Alternatives: </span>
                          <span>{ex.alternatives.join(' • ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedDayPlan(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
              >
                Close
              </button>

              {!selectedDayPlan.isRestDay && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const toEdit = selectedDayPlan
                      setSelectedDayPlan(null)
                      setEditingRoutinePlan(toEdit)
                    }}
                    className="px-4 py-2.5 text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ubah Gerakan</span>
                  </button>

                  <button
                    onClick={() => {
                      const plan = selectedDayPlan
                      setSelectedDayPlan(null)
                      onStartDayWorkout(plan)
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Dumbbell className="w-4 h-4" />
                    <span>Start Routine</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT EXERCISES MODAL */}
      {editingRoutinePlan && (
        <EditDayRoutineModal
          isOpen={true}
          plan={editingRoutinePlan}
          onClose={() => setEditingRoutinePlan(null)}
          onSave={(updated) => {
            onSaveDayWorkout(updated)
            setEditingRoutinePlan(null)
          }}
          onResetToDefault={() => {
            const customKey = `${split.id}_${editingRoutinePlan.dayOfWeek}`
            onResetDayWorkout(customKey)
            setEditingRoutinePlan(null)
          }}
        />
      )}
    </div>
  )
}
