import React from 'react'
import { 
  X, 
  Play, 
  Plus, 
  ChevronRight, 
  Dumbbell, 
  Calendar 
} from 'lucide-react'
import type { DailyWorkoutPlan, WorkoutSplit } from '../../types/split'
import type { DayOfWeek } from '../../types/user'

interface StartWorkoutLauncherModalProps {
  isOpen: boolean
  onClose: () => void
  todayWorkout?: DailyWorkoutPlan
  todayDayOfWeek: DayOfWeek
  activeSplit: WorkoutSplit
  onLaunchPlan: (plan?: DailyWorkoutPlan, customName?: string) => void
}

export const StartWorkoutLauncherModal: React.FC<StartWorkoutLauncherModalProps> = ({
  isOpen,
  onClose,
  todayWorkout,
  todayDayOfWeek,
  activeSplit,
  onLaunchPlan
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-1">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Workout Launcher</span>
            </div>
            <h3 className="text-xl font-black text-white">Start a Workout Session</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select today's scheduled split routine, an existing split day, or start an empty custom workout.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Option 1: Today's Scheduled Workout */}
        {todayWorkout && !todayWorkout.isRestDay && (
          <div
            onClick={() => {
              onLaunchPlan(todayWorkout)
              onClose()
            }}
            className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/60 hover:border-emerald-400 transition-all cursor-pointer group shadow-lg shadow-emerald-950/30"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Today's Scheduled Workout ({todayDayOfWeek})
                </span>
                <h4 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {todayWorkout.name}
                </h4>
                <p className="text-xs text-zinc-400">
                  {todayWorkout.exercises.length} exercises • ~{todayWorkout.estimatedDurationMinutes} mins • Target: {todayWorkout.targetMuscles.join(', ')}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform shrink-0 ml-3">
                <Play className="w-5 h-5 fill-zinc-950" />
              </div>
            </div>
          </div>
        )}

        {/* Option 2: Choose Another Day From Active Split */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
            Or Choose from {activeSplit.name} Routines:
          </span>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {activeSplit.schedule.filter(d => !d.isRestDay).map((dayPlan) => (
              <div
                key={dayPlan.id}
                onClick={() => {
                  onLaunchPlan(dayPlan)
                  onClose()
                }}
                className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <div className="font-bold text-xs text-zinc-200 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <span>{dayPlan.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500 font-normal">
                      ({dayPlan.dayOfWeek})
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    {dayPlan.exercises.length} exercises • ~{dayPlan.estimatedDurationMinutes} mins
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Option 3: Start Empty / Custom Workout */}
        <div className="pt-2 border-t border-zinc-800">
          <button
            onClick={() => {
              onLaunchPlan(undefined, 'Custom Freestyle Workout')
              onClose()
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/40 text-zinc-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Start Empty Custom Workout (Add exercises as you lift)</span>
          </button>
        </div>

      </div>
    </div>
  )
}
