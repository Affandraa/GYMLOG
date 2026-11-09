import React, { useState } from 'react'
import { 
  X, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  RotateCcw, 
  Search, 
  Dumbbell
} from 'lucide-react'
import type { DailyWorkoutPlan, PlannedExercise, MuscleGroup } from '../../types/split'
import { EXERCISE_CATALOG, type CatalogExercise } from '../../data/exerciseCatalog'

interface EditDayRoutineModalProps {
  isOpen: boolean
  onClose: () => void
  plan: DailyWorkoutPlan
  onSave: (updatedPlan: DailyWorkoutPlan) => void
  onResetToDefault: () => void
}

export const EditDayRoutineModal: React.FC<EditDayRoutineModalProps> = ({
  isOpen,
  onClose,
  plan,
  onSave,
  onResetToDefault
}) => {
  const [exercises, setExercises] = useState<PlannedExercise[]>(plan.exercises || [])
  const [showAddPicker, setShowAddPicker] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('All')
  
  // Custom exercise manual input
  const [customName, setCustomName] = useState<string>('')
  const [customMuscle, setCustomMuscle] = useState<MuscleGroup>('Chest')
  const [customSets, setCustomSets] = useState<number>(3)
  const [customReps, setCustomReps] = useState<string>('8-10')

  if (!isOpen) return null

  // Remove exercise
  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  // Move exercise up
  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updated = [...exercises]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp
    setExercises(updated)
  }

  // Move exercise down
  const handleMoveDown = (index: number) => {
    if (index === exercises.length - 1) return
    const updated = [...exercises]
    const temp = updated[index + 1]
    updated[index + 1] = updated[index]
    updated[index] = temp
    setExercises(updated)
  }

  // Update sets/reps
  const handleUpdateSets = (index: number, newSets: number) => {
    if (newSets < 1 || newSets > 10) return
    const updated = [...exercises]
    updated[index] = { ...updated[index], targetSets: newSets }
    setExercises(updated)
  }

  const handleUpdateReps = (index: number, newReps: string) => {
    const updated = [...exercises]
    updated[index] = { ...updated[index], targetReps: newReps }
    setExercises(updated)
  }

  // Add exercise from catalog
  const handleAddCatalogExercise = (catEx: CatalogExercise) => {
    const newEx: PlannedExercise = {
      id: `ex_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: catEx.name,
      muscleGroup: catEx.muscleGroup,
      targetSets: catEx.defaultSets,
      targetReps: catEx.defaultReps,
      restSeconds: catEx.defaultRestSeconds,
      alternatives: catEx.alternatives
    }
    setExercises([...exercises, newEx])
    setShowAddPicker(false)
  }

  // Add custom typed exercise
  const handleAddCustomExercise = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customName.trim()) return

    const newEx: PlannedExercise = {
      id: `ex_custom_${Date.now()}`,
      name: customName.trim(),
      muscleGroup: customMuscle,
      targetSets: Number(customSets) || 3,
      targetReps: customReps || '8-10',
      restSeconds: 90,
      alternatives: []
    }
    setExercises([...exercises, newEx])
    setCustomName('')
    setShowAddPicker(false)
  }

  // Save handler
  const handleSaveAll = () => {
    // Recompute target muscles based on active exercises
    const uniqueMuscles = Array.from(new Set(exercises.map(e => e.muscleGroup))) as MuscleGroup[]
    const updatedPlan: DailyWorkoutPlan = {
      ...plan,
      exercises,
      targetMuscles: uniqueMuscles,
      estimatedDurationMinutes: Math.max(30, exercises.length * 12)
    }
    onSave(updatedPlan)
    onClose()
  }

  // Filter catalog
  const filteredCatalog = EXERCISE_CATALOG.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMuscle = selectedMuscleFilter === 'All' || ex.muscleGroup === selectedMuscleFilter
    return matchesSearch && matchesMuscle
  })

  const muscleList: string[] = [
    'All',
    'Chest',
    'Back',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Quadriceps',
    'Hamstrings',
    'Glutes',
    'Calves',
    'Abs'
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative my-2 sm:my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold text-emerald-400">
                {plan.dayOfWeek} Routine
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-zinc-800 text-zinc-300 rounded">
                Custom Routine Editor
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Customize Exercises for {plan.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Add, remove, or edit your preferred exercises (e.g. Pec Deck, Chest Press, Dumbbell Press).
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Exercise List */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Current Exercises ({exercises.length})
            </span>
            <button
              onClick={() => setShowAddPicker(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Exercise (+ Gerakan)</span>
            </button>
          </div>

          {exercises.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500 space-y-2">
              <Dumbbell className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="text-xs">No exercises in this session. Click "Add Exercise" to select movements.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[46vh] overflow-y-auto pr-1">
              {exercises.map((ex, index) => (
                <div 
                  key={ex.id || index}
                  className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        {ex.name}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                          {ex.muscleGroup}
                        </span>
                      </div>
                      {ex.alternatives && ex.alternatives.length > 0 && (
                        <div className="text-[10px] text-zinc-500 mt-0.5">
                          Alts: {ex.alternatives.slice(0, 2).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sets, Reps & Controls */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {/* Sets Editor */}
                    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs">
                      <span className="text-[10px] text-zinc-500 font-mono">SETS</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateSets(index, ex.targetSets - 1)}
                        className="px-1.5 text-zinc-400 hover:text-white font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-white px-1">{ex.targetSets}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateSets(index, ex.targetSets + 1)}
                        className="px-1.5 text-zinc-400 hover:text-white font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Reps Selector */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs">
                      <span className="text-[10px] text-zinc-500 font-mono mr-1">REPS</span>
                      <select
                        value={ex.targetReps}
                        onChange={(e) => handleUpdateReps(index, e.target.value)}
                        className="bg-transparent text-emerald-400 font-mono font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="5-6" className="bg-zinc-900">5-6</option>
                        <option value="6-8" className="bg-zinc-900">6-8</option>
                        <option value="8-10" className="bg-zinc-900">8-10</option>
                        <option value="10-12" className="bg-zinc-900">10-12</option>
                        <option value="12-15" className="bg-zinc-900">12-15</option>
                        <option value="15-20" className="bg-zinc-900">15-20</option>
                      </select>
                    </div>

                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveUp(index)}
                        className={`p-1.5 rounded-lg border ${
                          index === 0 
                            ? 'border-transparent text-zinc-700' 
                            : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer'
                        }`}
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index === exercises.length - 1}
                        onClick={() => handleMoveDown(index)}
                        className={`p-1.5 rounded-lg border ${
                          index === exercises.length - 1 
                            ? 'border-transparent text-zinc-700' 
                            : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer'
                        }`}
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(index)}
                      className="p-1.5 rounded-lg border border-red-950/40 text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer"
                      title="Remove exercise"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetToDefault}
            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original Split Default</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-6 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Routine ({exercises.length} Exercises)</span>
            </button>
          </div>
        </div>

        {/* ================= ADD EXERCISE PICKER OVERLAY ================= */}
        {showAddPicker && (
          <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85dvh] flex flex-col">
              
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Select Exercise to Add</h4>
                    <p className="text-xs text-zinc-400">Pec Deck, Chest Press, Dumbbell Press & 60+ catalog movements</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddPicker(false)}
                  className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & Muscle Filters */}
              <div className="space-y-2.5 shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movement, e.g. Pec Deck, Chest Press, Squat..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Muscle Pill Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {muscleList.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMuscleFilter(m)}
                      className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer text-[11px] ${
                        selectedMuscleFilter === m
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exercise Catalog Results */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredCatalog.length === 0 ? (
                  <div className="p-6 text-center text-xs text-zinc-500">
                    No matching exercises found. You can add it as a custom exercise below!
                  </div>
                ) : (
                  filteredCatalog.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleAddCatalogExercise(item)}
                      className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/80 hover:bg-zinc-850/60 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                          {item.name}
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                            {item.muscleGroup}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-zinc-500">
                          {item.defaultSets} × {item.defaultReps}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Custom Exercise Adder Form */}
              <div className="pt-3 border-t border-zinc-800/80 shrink-0">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Can't find your exercise? Add Custom Movement:
                </span>
                <form onSubmit={handleAddCustomExercise} className="flex flex-wrap items-center gap-2 text-xs">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Custom exercise name..."
                    className="flex-1 min-w-[160px] bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                  <select
                    value={customMuscle}
                    onChange={(e) => setCustomMuscle(e.target.value as MuscleGroup)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {muscleList.filter(m => m !== 'All').map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={customSets}
                    onChange={(e) => setCustomSets(Number(e.target.value))}
                    className="w-14 bg-zinc-950 border border-zinc-800 rounded-xl px-2 py-1.5 text-white text-center"
                    title="Sets"
                  />
                  <input
                    type="text"
                    value={customReps}
                    onChange={(e) => setCustomReps(e.target.value)}
                    className="w-16 bg-zinc-950 border border-zinc-800 rounded-xl px-2 py-1.5 text-white text-center font-mono"
                    title="Reps"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer"
                  >
                    Add
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}
