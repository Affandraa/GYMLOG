import React, { useState } from 'react'
import { 
  Search, 
  Dumbbell, 
  HelpCircle, 
  Plus, 
  X
} from 'lucide-react'
import { EXERCISE_CATALOG, type CatalogExercise } from '../../data/exerciseCatalog'

interface ExerciseLibraryViewProps {
  onStartWithExercise: (exercise: CatalogExercise) => void
}

export const ExerciseLibraryView: React.FC<ExerciseLibraryViewProps> = ({
  onStartWithExercise
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All')
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<'all' | 'compound' | 'isolation'>('all')
  const [inspectingExercise, setInspectingExercise] = useState<CatalogExercise | null>(null)

  const muscleCategories: string[] = [
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

  const equipmentOptions = [
    { id: 'all', label: 'All Equipment' },
    { id: 'barbell', label: 'Barbell' },
    { id: 'dumbbell', label: 'Dumbbell' },
    { id: 'cable', label: 'Cable' },
    { id: 'machine', label: 'Machine' },
    { id: 'bodyweight', label: 'Bodyweight' }
  ]

  const filtered = EXERCISE_CATALOG.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMuscle = selectedMuscle === 'All' || ex.muscleGroup === selectedMuscle
    const matchesEquipment = selectedEquipment === 'all' || ex.category === selectedEquipment
    const matchesType = selectedType === 'all' || 
                        (selectedType === 'compound' && ex.isCompound) || 
                        (selectedType === 'isolation' && !ex.isCompound)

    return matchesSearch && matchesMuscle && matchesEquipment && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Dumbbell className="w-4 h-4" />
            <span>Biomechanics & Movement Library</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Exercise Database ({EXERCISE_CATALOG.length}+ Movements)
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Detailed form cues, muscle targets, equipment categories, and compound vs isolation breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-emerald-400 font-bold">
            {filtered.length} Displayed
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises by name, muscle group, or keyword (e.g. Pec Deck, Bench Press, Squat)..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="space-y-2.5">
          {/* Muscle Group Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
            {muscleCategories.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-[11px] ${
                  selectedMuscle === m
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Sub Filters Row: Equipment & Compound/Isolation */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
            {/* Equipment Filter */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-[11px] overflow-x-auto">
              {equipmentOptions.map((eq) => (
                <button
                  key={eq.id}
                  onClick={() => setSelectedEquipment(eq.id)}
                  className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer whitespace-nowrap ${
                    selectedEquipment === eq.id ? 'bg-zinc-800 text-emerald-300 font-bold' : 'text-zinc-400'
                  }`}
                >
                  {eq.label}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-[11px]">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer ${
                  selectedType === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setSelectedType('compound')}
                className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer ${
                  selectedType === 'compound' ? 'bg-zinc-800 text-blue-300 font-bold' : 'text-zinc-400'
                }`}
              >
                Compound
              </button>
              <button
                onClick={() => setSelectedType('isolation')}
                className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer ${
                  selectedType === 'isolation' ? 'bg-zinc-800 text-emerald-300 font-bold' : 'text-zinc-400'
                }`}
              >
                Isolation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-700 transition-all hover:bg-zinc-900/80 group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold">
                      {item.muscleGroup}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-800/80 text-zinc-300">
                      {item.category}
                    </span>
                    {item.isCompound ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                        Compound
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        Isolation
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
              <button
                onClick={() => setInspectingExercise(item)}
                className="text-zinc-400 hover:text-white font-medium text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                <span>Form Cues</span>
              </button>

              <button
                onClick={() => onStartWithExercise(item)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                title="Start a workout session with this movement"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Detail / Form Cues Modal */}
      {inspectingExercise && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">
                  {inspectingExercise.isCompound ? 'Compound Movement' : 'Isolation Movement'}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{inspectingExercise.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-400 font-mono font-bold">
                    Target: {inspectingExercise.muscleGroup}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-xs text-zinc-400 capitalize font-mono">
                    Equipment: {inspectingExercise.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectingExercise(null)}
                className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {inspectingExercise.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Step-by-Step Instructions:
              </span>
              {inspectingExercise.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-950/70 p-3 rounded-xl border border-zinc-850">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            {inspectingExercise.alternatives && inspectingExercise.alternatives.length > 0 && (
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
                <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block mb-1">
                  Recommended Equipment Substitutes:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {inspectingExercise.alternatives.map((alt, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => setInspectingExercise(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const ex = inspectingExercise
                  setInspectingExercise(null)
                  onStartWithExercise(ex)
                }}
                className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Start Workout With This</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
