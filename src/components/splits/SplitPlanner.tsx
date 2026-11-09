import React, { useState } from 'react'
import { 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Target, 
  BarChart2 
} from 'lucide-react'
import { WORKOUT_SPLITS } from '../../data/splitsData'
import type { UserProfile } from '../../types/user'

interface SplitPlannerProps {
  activeSplitId: string
  profile: UserProfile
  onSelectSplit: (splitId: string) => void
  onOpenCalendar: () => void
}

export const SplitPlanner: React.FC<SplitPlannerProps> = ({
  activeSplitId,
  onSelectSplit,
  onOpenCalendar
}) => {
  const [expandedSplitId, setExpandedSplitId] = useState<string>(activeSplitId)
  const [filterLevel, setFilterLevel] = useState<string>('all')

  const filteredSplits = WORKOUT_SPLITS.filter(split => {
    if (filterLevel === 'all') return true
    return split.suitableLevels.includes(filterLevel as any)
  })

  return (
    <div className="space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Workout Split Architecture</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Explore & Select Training Splits
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Choose a proven training split that matches your weekly schedule, recovery capacity, and bodybuilding/strength ambitions.
          </p>
        </div>

        {/* Level Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 text-xs self-start md:self-auto">
          {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                filterLevel === lvl
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Splits List */}
      <div className="space-y-4">
        {filteredSplits.map((split) => {
          const isActive = split.id === activeSplitId
          const isExpanded = split.id === expandedSplitId

          return (
            <div
              key={split.id}
              className={`rounded-2xl border transition-all ${
                isActive
                  ? 'bg-zinc-900/90 border-emerald-500/70 ring-1 ring-emerald-500/40 shadow-xl shadow-emerald-950/30'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Split Main Banner */}
              <div className="p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-extrabold text-white">
                        {split.name}
                      </h3>
                      {isActive && (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Active Split
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-zinc-800 text-zinc-300 rounded">
                        {split.recommendedDays.join(' or ')} Days / Week
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400/90 font-medium">{split.tagline}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                      {split.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
                    {!isActive ? (
                      <button
                        onClick={() => onSelectSplit(split.id)}
                        className="px-4 py-2 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        Activate Split
                      </button>
                    ) : (
                      <button
                        onClick={onOpenCalendar}
                        className="px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-xl hover:bg-emerald-900/50 transition-all cursor-pointer"
                      >
                        View in Calendar
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedSplitId(isExpanded ? '' : split.id)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse breakdown' : 'Expand full details'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick 7-Day Schedule Tagline */}
                <div className="grid grid-cols-7 gap-1.5 mt-4 pt-4 border-t border-zinc-800/60 text-center">
                  {split.schedule.map((day) => (
                    <div 
                      key={day.dayOfWeek}
                      className={`p-1.5 rounded-lg border text-[11px] ${
                        day.isRestDay 
                          ? 'bg-zinc-950/40 border-zinc-800/50 text-zinc-500' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 font-medium'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-zinc-500">{day.dayOfWeek.slice(0, 3)}</div>
                      <div className="text-[10px] truncate mt-0.5">
                        {day.isRestDay ? 'Rest' : day.name.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Detailed Breakdown */}
              {isExpanded && (
                <div className="px-5 pb-6 md:px-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-zinc-950/40 rounded-b-2xl">
                  {/* Progressive Overload Protocol */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <Target className="w-4 h-4" />
                      <span>Progressive Overload & Progression Protocol:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed pl-6">
                      {split.progressiveOverloadProtocol}
                    </p>
                  </div>

                  {/* Volume Guidance Table */}
                  <div>
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                      Recommended Weekly Training Volume & Intensity:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                      {split.volumeGuidance.map((vol) => (
                        <div 
                          key={vol.muscleGroup}
                          className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between"
                        >
                          <span className="font-semibold text-zinc-200">{vol.muscleGroup}</span>
                          <div className="text-right">
                            <span className="font-mono font-bold text-emerald-400">{vol.weeklySets}</span>
                            <div className="text-[10px] text-zinc-400 font-mono">{vol.frequency} • {vol.intensityRPE}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Routine Deep-Dive with Alternatives */}
                  <div>
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      Daily Exercises & Exercise Alternatives:
                    </h4>
                    <div className="space-y-3">
                      {split.schedule.filter(d => !d.isRestDay).map((day) => (
                        <div key={day.id} className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white flex items-center gap-2">
                              <span className="text-xs font-mono text-emerald-400 uppercase">{day.dayOfWeek}:</span>
                              {day.name}
                            </span>
                            <span className="text-xs text-zinc-400 font-mono">
                              ~{day.estimatedDurationMinutes} mins
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {day.exercises.map((ex) => (
                              <div 
                                key={ex.id}
                                className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between"
                              >
                                <div className="flex items-start justify-between">
                                  <span className="font-semibold text-zinc-200">{ex.name}</span>
                                  <span className="text-emerald-400 font-mono font-bold text-[11px] shrink-0 ml-2">
                                    {ex.targetSets} × {ex.targetReps}
                                  </span>
                                </div>
                                {ex.alternatives && ex.alternatives.length > 0 && (
                                  <div className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                                    Alt: {ex.alternatives.join(', ')}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
