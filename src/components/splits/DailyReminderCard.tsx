import React, { useState } from 'react'
import { 
  Flame, 
  Calendar, 
  Clock, 
  Dumbbell, 
  ChevronRight, 
  X, 
  Coffee, 
  ArrowRightLeft,
  SlidersHorizontal 
} from 'lucide-react'
import type { DailyWorkoutPlan } from '../../types/split'
import type { UserProfile, DayOfWeek } from '../../types/user'

interface DailyReminderCardProps {
  todayWorkout?: DailyWorkoutPlan
  todayDayOfWeek: DayOfWeek
  profile: UserProfile
  isDismissed: boolean
  onDismiss: () => void
  onStartWorkout: () => void
  onOpenCalendar: () => void
  onEditTodayRoutine?: (plan: DailyWorkoutPlan) => void
}

export const DailyReminderCard: React.FC<DailyReminderCardProps> = ({
  todayWorkout,
  todayDayOfWeek,
  profile,
  isDismissed,
  onDismiss,
  onStartWorkout,
  onOpenCalendar,
  onEditTodayRoutine
}) => {
  const [showFullExerciseList, setShowFullExerciseList] = useState(false)

  // If notifications disabled or user explicitly dismissed today's card
  if (!profile.notifications.enabled || isDismissed) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-4 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>
            {todayDayOfWeek}: <strong className="text-zinc-200">{todayWorkout?.name || 'Workout Day'}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onEditTodayRoutine && todayWorkout && !todayWorkout.isRestDay && (
            <button
              onClick={() => onEditTodayRoutine(todayWorkout)}
              className="text-zinc-400 hover:text-emerald-400 font-medium cursor-pointer flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Ubah Gerakan</span>
            </button>
          )}
          <button
            onClick={onStartWorkout}
            className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
          >
            Start Workout →
          </button>
          <button
            onClick={onOpenCalendar}
            className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            View Calendar
          </button>
        </div>
      </div>
    )
  }

  // REST DAY NOTIFICATION
  if (todayWorkout?.isRestDay || !todayWorkout) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-10" />

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-bold text-teal-400 tracking-wider">
                  Today is {todayDayOfWeek}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-teal-950/60 text-teal-300 border border-teal-800/40 rounded-full">
                  Recovery Day
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Rest & Muscle Regeneration
              </h3>
            </div>
          </div>

          <button
            onClick={onDismiss}
            title="Dismiss reminder for today"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300 space-y-2">
          <div className="font-semibold text-zinc-200">
            {todayWorkout?.recoveryFocus || 'Focus on sleep, protein synthesis, and light mobility walking.'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/50">
            <div>💧 Hydration Target: 2.5 - 3.5 Liters</div>
            <div>🥩 Protein Target: ~{(profile.weightKg * 1.8).toFixed(0)}g</div>
            <div>💤 Sleep Target: 7.5 - 9 Hours</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between pt-2">
          <button
            onClick={onOpenCalendar}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Modify weekly schedule</span>
          </button>

          <button
            onClick={onStartWorkout}
            className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all cursor-pointer"
          >
            Train anyway today
          </button>
        </div>
      </div>
    )
  }

  // TRAINING DAY NOTIFICATION
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-zinc-950 shadow-lg shadow-emerald-500/20 font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold text-emerald-400 tracking-wider">
                Today is {todayDayOfWeek}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 rounded-full">
                Scheduled Session
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-0.5">
              {todayWorkout.name}
            </h3>
          </div>
        </div>

        <button
          onClick={onDismiss}
          title="Dismiss reminder for today"
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Stats Pill */}
      <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Est. {todayWorkout.estimatedDurationMinutes} mins</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-300">
          <Dumbbell className="w-3.5 h-3.5 text-blue-400" />
          <span>{todayWorkout.exercises.length} Exercises ({todayWorkout.exercises.reduce((acc, e) => acc + e.targetSets, 0)} total sets)</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-zinc-400">
          <span>Target Muscles:</span>
          <span className="text-zinc-200 font-semibold">{todayWorkout.targetMuscles.join(', ')}</span>
        </div>
      </div>

      {/* Exercises Preview List */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
          <span>Planned Exercises</span>
          <div className="flex items-center gap-3">
            {onEditTodayRoutine && (
              <button
                onClick={() => onEditTodayRoutine(todayWorkout)}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Ubah Gerakan (Edit / Tambah)</span>
              </button>
            )}
            <button
              onClick={() => setShowFullExerciseList(!showFullExerciseList)}
              className="text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              {showFullExerciseList ? 'Show Less' : `View All (${todayWorkout.exercises.length})`}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {(showFullExerciseList ? todayWorkout.exercises : todayWorkout.exercises.slice(0, 4)).map((ex, idx) => (
            <div 
              key={ex.id || idx}
              className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-zinc-200 block">{ex.name}</span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {ex.muscleGroup} • Alt: {ex.alternatives[0] || 'Machine'}
                </span>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-mono font-bold text-[11px]">
                  {ex.targetSets} × {ex.targetReps}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
        <button
          onClick={onOpenCalendar}
          className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Reschedule or swap day</span>
        </button>

        <div className="flex items-center gap-2">
          {onEditTodayRoutine && (
            <button
              onClick={() => onEditTodayRoutine(todayWorkout)}
              className="px-4 py-2.5 text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ubah Gerakan</span>
            </button>
          )}

          <button
            onClick={onStartWorkout}
            className="px-6 py-2.5 text-xs font-bold text-zinc-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 active:scale-95 transition-all rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
          >
            <span>Start Workout Session</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
