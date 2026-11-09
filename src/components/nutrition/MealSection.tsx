import React, { useState } from 'react'
import { Plus, Trash2, Edit3, ChevronDown, ChevronUp } from 'lucide-react'
import type { MealEntry, MealType } from '../../types/nutrition'

interface MealSectionProps {
  mealType: MealType
  entries: MealEntry[]
  onAddFood: (mealType: MealType) => void
  onDeleteEntry: (entryId: string) => void
  onEditPortion: (entry: MealEntry, newGrams: number) => void
}

const MEAL_META: Record<MealType, { label: string; emoji: string; time: string }> = {
  breakfast: { label: 'Breakfast', emoji: '🌅', time: 'Morning' },
  lunch:     { label: 'Lunch',     emoji: '☀️', time: 'Midday' },
  dinner:    { label: 'Dinner',    emoji: '🌙', time: 'Evening' },
  snack:     { label: 'Snack',     emoji: '🍎', time: 'Anytime' }
}

export const MealSection: React.FC<MealSectionProps> = ({
  mealType,
  entries,
  onAddFood,
  onDeleteEntry,
  onEditPortion
}) => {
  const meta = MEAL_META[mealType]
  const [expanded, setExpanded] = useState(true)
  const [editingEntry, setEditingEntry] = useState<string | null>(null)
  const [editGrams, setEditGrams] = useState<number>(100)

  const totalCal = entries.reduce((s, e) => s + e.calories, 0)
  const totalProtein = entries.reduce((s, e) => s + e.protein, 0)
  const totalCarbs = entries.reduce((s, e) => s + e.carbs, 0)
  const totalFat = entries.reduce((s, e) => s + e.fat, 0)

  const startEdit = (entry: MealEntry) => {
    setEditingEntry(entry.id)
    setEditGrams(entry.portionGrams)
  }

  const confirmEdit = (entry: MealEntry) => {
    if (editGrams >= 1 && editGrams <= 999) {
      onEditPortion(entry, editGrams)
    }
    setEditingEntry(null)
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{meta.emoji}</span>
          <div className="text-left">
            <div className="text-sm font-bold text-white">{meta.label}</div>
            <div className="text-[11px] text-zinc-500">{meta.time} • {entries.length} item{entries.length !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-orange-400">{Math.round(totalCal)} kcal</div>
            <div className="text-[10px] text-zinc-500">P:{Math.round(totalProtein)}g C:{Math.round(totalCarbs)}g F:{Math.round(totalFat)}g</div>
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-zinc-800/60">
          {/* Entry list */}
          {entries.length > 0 ? (
            <div className="divide-y divide-zinc-800/50">
              {entries.map(entry => (
                <div key={entry.id} className="px-4 py-3">
                  {editingEntry === entry.id ? (
                    // Edit mode row
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-200 truncate">{entry.foodName}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editGrams}
                          min={1}
                          max={999}
                          onChange={e => setEditGrams(Number(e.target.value))}
                          className="w-16 text-center bg-zinc-800 border border-emerald-500 rounded-lg py-1 text-sm text-emerald-400 font-bold focus:outline-none"
                          autoFocus
                          onKeyDown={e => { if (e.key === 'Enter') confirmEdit(entry) }}
                        />
                        <span className="text-xs text-zinc-500">g</span>
                        <button
                          onClick={() => confirmEdit(entry)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingEntry(null)}
                          className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Normal row
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-200 truncate">{entry.foodName}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          {entry.portionGrams}g · <span className="text-orange-400">{Math.round(entry.calories)} kcal</span>
                          {' · '}P:{Math.round(entry.protein)}g C:{Math.round(entry.carbs)}g F:{Math.round(entry.fat)}g
                        </div>
                      </div>
                      <button
                        onClick={() => startEdit(entry)}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                        title="Edit portion"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="p-1.5 rounded-lg hover:bg-red-900/40 text-zinc-500 hover:text-red-400 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-center text-xs text-zinc-600 italic">
              No foods logged yet for {meta.label.toLowerCase()}.
            </div>
          )}

          {/* Add food button */}
          <div className="px-4 py-3 border-t border-zinc-800/40">
            <button
              onClick={() => onAddFood(mealType)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-zinc-700 hover:border-emerald-500/50 text-zinc-500 hover:text-emerald-400 text-xs font-semibold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add food to {meta.label}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
