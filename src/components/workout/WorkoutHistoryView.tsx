import React, { useState } from 'react'
import { 
  History, 
  Clock, 
  BarChart3, 
  Flame, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Dumbbell, 
  Play
} from 'lucide-react'
import type { WorkoutSession } from '../../types/workout'

interface WorkoutHistoryViewProps {
  history: WorkoutSession[]
  onDeleteSession: (sessionId: string) => void
  onRepeatWorkout: (session: WorkoutSession) => void
}

export const WorkoutHistoryView: React.FC<WorkoutHistoryViewProps> = ({
  history,
  onDeleteSession,
  onRepeatWorkout
}) => {
  const [expandedSessionId, setExpandedSessionId] = useState<string>(history[0]?.id || '')

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60)
    return `${mins} mins`
  }

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr)
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Workout Logs & Archives</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Completed Workout History
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Track past sessions, inspect historical weights and repetitions, and monitor progressive overload trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
            <span className="text-zinc-500">Total Logged: </span>
            <strong className="text-emerald-400 font-bold">{history.length} Workouts</strong>
          </div>
        </div>
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-zinc-800 rounded-3xl space-y-3">
          <History className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No completed workouts yet</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Once you complete and finish a workout session, it will be automatically archived here with all sets and volume.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((session) => {
            const isExpanded = session.id === expandedSessionId

            return (
              <div 
                key={session.id}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden transition-all hover:border-zinc-700"
              >
                {/* Session Card Header */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(session.startedAt)}
                      </span>
                      {session.prsAchieved && session.prsAchieved.length > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" />
                          {session.prsAchieved.length} PR{session.prsAchieved.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {session.routineName}
                    </h3>
                    
                    {/* Quick Stats Line */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1 font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{formatDuration(session.durationSeconds)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
                        <span className="text-zinc-200 font-bold">{session.totalVolumeKg.toLocaleString()} kg volume</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell className="w-3.5 h-3.5 text-blue-400" />
                        <span>{session.exercises.length} Exercises ({session.totalSetsCompleted} sets)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
                    <button
                      onClick={() => onRepeatWorkout(session)}
                      className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Launch new workout copying these exercises"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Repeat</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete workout record "${session.routineName}"?`)) {
                          onDeleteSession(session.id)
                        }
                      }}
                      className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Delete log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setExpandedSessionId(isExpanded ? '' : session.id)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Breakdown */}
                {isExpanded && (
                  <div className="p-5 md:p-6 border-t border-zinc-800 bg-zinc-950/40 space-y-4">
                    {session.prsAchieved && session.prsAchieved.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-1 text-xs">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5">
                          <Flame className="w-4 h-4" />
                          Personal Records in this workout:
                        </span>
                        <ul className="list-disc list-inside text-zinc-300 space-y-0.5">
                          {session.prsAchieved.map((pr, i) => (
                            <li key={i}>{pr}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {session.exercises.map((ex, i) => {
                        const completedSets = ex.sets.filter(s => s.isCompleted && !s.isWarmup)
                        return (
                          <div key={i} className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white">{ex.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400">
                                {ex.muscleGroup}
                              </span>
                            </div>

                            <div className="space-y-1">
                              {completedSets.map((s, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-zinc-950/50 text-zinc-300 font-mono">
                                  <span className="text-zinc-500 font-bold">Set {s.setNumber}</span>
                                  <span className="text-white font-semibold">{s.weightKg} kg × {s.reps} reps</span>
                                  <span className="text-emerald-400 text-[11px] font-bold">
                                    {(s.weightKg * s.reps).toLocaleString()} kg
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
