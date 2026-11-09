import React from 'react'
import { Lightbulb, ArrowRight } from 'lucide-react'
import type { NutritionGap } from '../../types/nutrition'

interface NutrientGapAdvisorProps {
  recommendations: string[]
  gaps: NutritionGap[]
  onAddFood: () => void
}

export const NutrientGapAdvisor: React.FC<NutrientGapAdvisorProps> = ({
  recommendations,
  gaps,
  onAddFood
}) => {
  if (recommendations.length === 0 && gaps.filter(g => g.severity !== 'ok').length === 0) {
    return (
      <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <Lightbulb className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-emerald-300">Great nutrition today! 🎉</div>
          <div className="text-xs text-emerald-500 mt-0.5">Your intake is on track. Keep it up!</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-white">Smart Recommendations</span>
        </div>
        <button
          onClick={onAddFood}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer transition-colors"
        >
          <span>Add Food</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="px-4 py-3 space-y-2">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/40"
          >
            <span className="text-sm leading-relaxed text-zinc-300">{rec}</span>
          </div>
        ))}
        {recommendations.length === 0 && (
          <p className="text-xs text-zinc-500 text-center py-2">Keep logging meals to get personalized suggestions.</p>
        )}
      </div>
    </div>
  )
}
