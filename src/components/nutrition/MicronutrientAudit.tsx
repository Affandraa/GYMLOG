import React, { useState } from 'react'
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Zap } from 'lucide-react'
import type { NutritionGap, MicroTargets } from '../../types/nutrition'

interface MicronutrientAuditProps {
  gaps: NutritionGap[]
  targets: MicroTargets
}

export const MicronutrientAudit: React.FC<MicronutrientAuditProps> = ({ gaps, targets: _targets }) => {
  const [expanded, setExpanded] = useState(false)

  const critical = gaps.filter(g => g.severity === 'critical').length
  const low = gaps.filter(g => g.severity === 'low').length
  const ok = gaps.filter(g => g.severity === 'ok').length

  const getSeverityColor = (severity: NutritionGap['severity']) => {
    if (severity === 'ok') return 'text-emerald-400'
    if (severity === 'low') return 'text-amber-400'
    return 'text-red-400'
  }

  const getBarColor = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-500'
    if (pct >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getSeverityIcon = (severity: NutritionGap['severity']) => {
    if (severity === 'ok') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
    if (severity === 'low') return <Zap className="w-3.5 h-3.5 text-amber-400" />
    return <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Summary header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-4 hover:bg-zinc-800/30 cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white">Micronutrient Audit</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              {ok} OK · <span className="text-amber-400">{low} Low</span> · <span className="text-red-400">{critical} Critical</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {critical > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/40 text-red-400 border border-red-500/20 font-bold">
              {critical} critical
            </span>
          )}
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-zinc-800/60 px-4 pb-4">
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {gaps.map(gap => (
              <div key={gap.nutrient}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {getSeverityIcon(gap.severity)}
                    <span className="text-xs text-zinc-300">{gap.nutrient}</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${getSeverityColor(gap.severity)}`}>
                    {gap.consumed > 0
                      ? `${gap.consumed % 1 === 0 ? gap.consumed : gap.consumed.toFixed(1)} / ${gap.target}`
                      : `0 / ${gap.target}`
                    } {gap.unit}
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(gap.pct)}`}
                    style={{ width: `${Math.min(100, gap.pct)}%` }}
                  />
                </div>
                {gap.severity !== 'ok' && gap.suggestedFoods.length > 0 && (
                  <div className="text-[10px] text-zinc-600 mt-0.5 truncate">
                    Try: {gap.suggestedFoods.slice(0, 2).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
            <p className="text-[11px] text-zinc-500">
              ⚠️ Micronutrient data is sourced from TKPI &amp; USDA. Values shown only for verified food entries. Missing data means the nutrient was not available in the reference — it is never fabricated.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
