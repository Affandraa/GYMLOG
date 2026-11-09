import React, { useState } from 'react'
import { 
  GraduationCap, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight 
} from 'lucide-react'
import { FITNESS_GUIDANCE } from '../../data/guidanceData'
import type { FitnessLevel } from '../../types/user'

interface GuidanceViewProps {
  currentLevel: FitnessLevel
  onChangeLevel: (level: FitnessLevel) => void
  onExploreSplits: () => void
}

export const GuidanceView: React.FC<GuidanceViewProps> = ({
  currentLevel,
  onChangeLevel,
  onExploreSplits
}) => {
  const [selectedLevel, setSelectedLevel] = useState<FitnessLevel>(currentLevel)
  const guidance = FITNESS_GUIDANCE[selectedLevel]

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Fitness Level & Principles Guide</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Training Science & Technique Principles
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Gym training is an evolving journey. Learn the biomechanical rules, progressive overload models, and recovery strategies tailored to your experience.
          </p>
        </div>

        {/* Level Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 text-xs self-start md:self-auto">
          {(['beginner', 'intermediate', 'advanced'] as FitnessLevel[]).map((lvl) => {
            const isUserLevel = lvl === currentLevel
            const isSelected = lvl === selectedLevel

            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-2 rounded-lg capitalize font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>{lvl}</span>
                {isUserLevel && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Guidance Card */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-6 md:p-8 space-y-8">
        {/* Level Overview Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-extrabold text-white">{guidance.title}</h3>
              {selectedLevel === currentLevel ? (
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Your Current Level
                </span>
              ) : (
                <button
                  onClick={() => onChangeLevel(selectedLevel)}
                  className="px-3 py-1 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all cursor-pointer"
                >
                  Set as My Level
                </button>
              )}
            </div>
            <p className="text-xs text-emerald-400 font-medium mt-1">{guidance.subtitle}</p>
            <p className="text-xs text-zinc-300 leading-relaxed mt-2 max-w-2xl">
              {guidance.summary}
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs space-y-1.5 self-start shrink-0 w-full md:w-auto md:min-w-[200px]">
            <div className="text-zinc-400">Recommended Frequency:</div>
            <div className="font-bold text-white text-sm">{guidance.recommendedDays}</div>
            <div className="text-zinc-400 pt-1">Target Intensity:</div>
            <div className="font-mono font-semibold text-emerald-400">{guidance.intensityGuidance}</div>
          </div>
        </div>

        {/* Core Principles */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            Core Training Principles
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guidance.corePrinciples.map((p, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h5 className="font-bold text-sm text-zinc-100">{p.heading}</h5>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-8">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Technique & Execution Rules */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Exercise Technique & Safety Standards
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {guidance.exerciseTechniqueTips.map((tip, i) => (
              <div 
                key={i}
                className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-start gap-2.5 text-zinc-300"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls to Avoid */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Common Pitfalls & Mistakes to Avoid
          </h4>
          <div className="space-y-2">
            {guidance.commonPitfalls.map((pitfall, i) => (
              <div 
                key={i}
                className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200/90 flex items-center gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{pitfall}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Splits for this Level */}
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Optimal Split Pairings:
            </span>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">
              {guidance.recommendedSplits.join(' • ')}
            </div>
          </div>

          <button
            onClick={onExploreSplits}
            className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore Matching Splits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
