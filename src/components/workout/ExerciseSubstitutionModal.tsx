import React from 'react'
import { X, ArrowRightLeft, Check } from 'lucide-react'
import type { WorkoutExercise } from '../../types/workout'
import { EXERCISE_CATALOG, type CatalogExercise } from '../../data/exerciseCatalog'

interface ExerciseSubstitutionModalProps {
  isOpen: boolean
  onClose: () => void
  currentExercise: WorkoutExercise
  onSubstitute: (newExercise: CatalogExercise) => void
}

export const ExerciseSubstitutionModal: React.FC<ExerciseSubstitutionModalProps> = ({
  isOpen,
  onClose,
  currentExercise,
  onSubstitute
}) => {
  if (!isOpen) return null

  // Find candidate substitutions: matching same muscle group, excluding the current exercise name
  const candidateSubstitutions = EXERCISE_CATALOG.filter(
    c => c.muscleGroup === currentExercise.muscleGroup && c.name.toLowerCase() !== currentExercise.name.toLowerCase()
  )

  return (
    <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <ArrowRightLeft className="w-4 h-4" />
              <span>Exercise Substitution</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Substitute for {currentExercise.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Targeting {currentExercise.muscleGroup} • Retains your set counts and reps
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Recommended Substitutes */}
        <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {candidateSubstitutions.length === 0 ? (
            <p className="text-xs text-zinc-500 text-center py-6">No alternative exercises found for this muscle group.</p>
          ) : (
            candidateSubstitutions.map((alt) => (
              <div
                key={alt.id}
                onClick={() => {
                  onSubstitute(alt)
                  onClose()
                }}
                className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500 hover:bg-zinc-850/60 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                    {alt.name}
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {alt.category}
                    </span>
                    {alt.isCompound && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                        Compound
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1">{alt.description}</p>
                </div>

                <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 flex items-center justify-center transition-all shrink-0 ml-3">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
