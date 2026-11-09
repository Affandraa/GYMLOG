import React from 'react'
import { 
  Trophy, 
  Sparkles, 
  Clock, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Dumbbell
} from 'lucide-react'
import type { WorkoutSession, PersonalRecord } from '../../types/workout'

interface WorkoutSummaryModalProps {
  isOpen: boolean
  session: WorkoutSession
  newPRs: PersonalRecord[]
  onConfirmSave: () => void
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  isOpen,
  session,
  newPRs,
  onConfirmSave
}) => {
  if (!isOpen) return null

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}m ${remainingSecs}s`
  }

  return (
    <div className="fixed inset-0 z-70 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-4 sm:p-6 md:p-8 shadow-2xl relative text-center space-y-6 my-2 sm:my-8">
        
        {/* Glow Header */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto text-zinc-950 font-bold shadow-xl shadow-emerald-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="mt-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Workout Complete!
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {session.routineName}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Great session! Your progressive overload and volume have been recorded.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 text-xs">
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
            <Clock className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-zinc-500 text-[10px] uppercase font-mono">Duration</span>
            <div className="text-sm font-bold text-white font-mono mt-0.5">
              {formatDuration(session.durationSeconds)}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
            <BarChart3 className="w-4 h-4 text-teal-400 mx-auto mb-1" />
            <span className="text-zinc-500 text-[10px] uppercase font-mono">Total Volume</span>
            <div className="text-sm font-bold text-white font-mono mt-0.5">
              {session.totalVolumeKg.toLocaleString()} kg
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
            <Dumbbell className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <span className="text-zinc-500 text-[10px] uppercase font-mono">Sets Done</span>
            <div className="text-sm font-bold text-white font-mono mt-0.5">
              {session.totalSetsCompleted} sets
            </div>
          </div>
        </div>

        {/* PRs Achieved Section */}
        {newPRs.length > 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{newPRs.length} New Personal Record{newPRs.length > 1 ? 's' : ''} Achieved!</span>
            </div>
            <div className="space-y-1.5">
              {newPRs.map((pr, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-zinc-900/60 p-2 rounded-xl border border-zinc-800">
                  <span className="font-semibold text-zinc-200">{pr.exerciseName}</span>
                  <span className="font-mono font-bold text-emerald-400">{pr.formattedValue}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Consistency locked in. Progressive overload tracked!</span>
          </div>
        )}

        {/* Exercise Breakdown Preview */}
        <div className="text-left space-y-2">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Exercises Logged ({session.exercises.length}):
          </span>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {session.exercises.map((ex, i) => {
              const doneSets = ex.sets.filter(s => s.isCompleted && !s.isWarmup)
              return (
                <div key={i} className="text-xs p-2 rounded-lg bg-zinc-950/50 border border-zinc-850 flex items-center justify-between">
                  <span className="font-medium text-zinc-300">{ex.name}</span>
                  <span className="font-mono text-zinc-400">
                    {doneSets.length} sets completed
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Confirm Save Button */}
        <button
          onClick={onConfirmSave}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-zinc-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <span>Save to Workout History</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  )
}
