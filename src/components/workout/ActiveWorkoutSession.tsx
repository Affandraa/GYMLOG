import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Trash2, 
  Clock, 
  BarChart3, 
  ArrowRightLeft, 
  Dumbbell, 
  Target, 
  X, 
  Search, 
  HelpCircle,
  Check
} from 'lucide-react'
import type { WorkoutSession, WorkoutExercise, WorkoutSet, PersonalRecord } from '../../types/workout'
import { EXERCISE_CATALOG, type CatalogExercise } from '../../data/exerciseCatalog'
import { 
  calculateSessionVolume, 
  countCompletedSets, 
  getProgressiveOverloadTip,
  evaluatePersonalRecords,
  getPreviousPerformanceForExercise
} from '../../services/workoutService'
import { RestTimerBar } from './RestTimerBar'
import { ExerciseSubstitutionModal } from './ExerciseSubstitutionModal'
import { WorkoutSummaryModal } from './WorkoutSummaryModal'

interface ActiveWorkoutSessionProps {
  initialSession: WorkoutSession
  workoutHistory: WorkoutSession[]
  existingPRs: Record<string, PersonalRecord>
  onFinishWorkout: (completedSession: WorkoutSession, newPRs: PersonalRecord[]) => void
  onDiscardWorkout: () => void
  onSaveDraft: (session: WorkoutSession) => void
}

export const ActiveWorkoutSession: React.FC<ActiveWorkoutSessionProps> = ({
  initialSession,
  workoutHistory,
  existingPRs,
  onFinishWorkout,
  onDiscardWorkout,
  onSaveDraft
}) => {
  const [session, setSession] = useState<WorkoutSession>(initialSession)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(initialSession.durationSeconds || 0)
  
  // Timer bar states
  const [showRestTimer, setShowRestTimer] = useState<boolean>(false)
  const [restDuration, setRestDuration] = useState<number>(90)

  // Modals state
  const [substitutingExercise, setSubstitutingExercise] = useState<WorkoutExercise | null>(null)
  const [viewingInstructionsEx, setViewingInstructionsEx] = useState<CatalogExercise | null>(null)
  const [showAddExerciseModal, setShowAddExerciseModal] = useState<boolean>(false)
  const [summaryModalOpen, setSummaryModalOpen] = useState<boolean>(false)
  const [detectedPRs, setDetectedPRs] = useState<PersonalRecord[]>([])

  // Search in add exercise modal
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All')

  // Live session duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => {
        const next = prev + 1
        // Auto-save draft every 10 seconds
        if (next % 10 === 0) {
          onSaveDraft({
            ...session,
            durationSeconds: next,
            totalVolumeKg: calculateSessionVolume(session.exercises),
            totalSetsCompleted: countCompletedSets(session.exercises)
          })
        }
        return next
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [session, onSaveDraft])

  // Recalculate stats when sets change
  const currentVolume = calculateSessionVolume(session.exercises)
  const completedSetsCount = countCompletedSets(session.exercises)

  const formatElapsed = (secs: number) => {
    const hrs = Math.floor(secs / 3600)
    const mins = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${s < 10 ? '0' : ''}${s}`
    }
    return `${mins < 10 ? '0' : ''}${mins}:${s < 10 ? '0' : ''}${s}`
  }

  // Update set values
  const handleUpdateSetValue = (
    exerciseIndex: number,
    setIndex: number,
    field: 'weightKg' | 'reps',
    val: number
  ) => {
    const updatedExercises = [...session.exercises]
    const updatedSets = [...updatedExercises[exerciseIndex].sets]
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      [field]: val
    }
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      sets: updatedSets
    }

    const updatedSession = { ...session, exercises: updatedExercises }
    setSession(updatedSession)
    onSaveDraft(updatedSession)
  }

  // Toggle set completed
  const handleToggleSetComplete = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...session.exercises]
    const targetEx = updatedExercises[exerciseIndex]
    const updatedSets = [...targetEx.sets]
    const currentStatus = updatedSets[setIndex].isCompleted
    const newStatus = !currentStatus

    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      isCompleted: newStatus,
      completedAt: newStatus ? new Date().toISOString() : undefined
    }

    updatedExercises[exerciseIndex] = {
      ...targetEx,
      sets: updatedSets
    }

    const updatedSession = { ...session, exercises: updatedExercises }
    setSession(updatedSession)
    onSaveDraft(updatedSession)

    // Trigger rest timer on completing set
    if (newStatus) {
      setRestDuration(targetEx.restSeconds || 90)
      setShowRestTimer(true)
    }
  }

  // Add set to exercise
  const handleAddSet = (exerciseIndex: number) => {
    const updatedExercises = [...session.exercises]
    const targetEx = updatedExercises[exerciseIndex]
    const lastSet = targetEx.sets[targetEx.sets.length - 1]

    const newSet: WorkoutSet = {
      id: `set_${Date.now()}_${targetEx.sets.length + 1}`,
      setNumber: targetEx.sets.length + 1,
      weightKg: lastSet ? lastSet.weightKg : 60,
      reps: lastSet ? lastSet.reps : 10,
      isCompleted: false,
      previousWeightKg: lastSet?.previousWeightKg,
      previousReps: lastSet?.previousReps
    }

    updatedExercises[exerciseIndex] = {
      ...targetEx,
      sets: [...targetEx.sets, newSet]
    }

    const updatedSession = { ...session, exercises: updatedExercises }
    setSession(updatedSession)
    onSaveDraft(updatedSession)
  }

  // Remove set from exercise
  const handleRemoveSet = (exerciseIndex: number) => {
    const updatedExercises = [...session.exercises]
    const targetEx = updatedExercises[exerciseIndex]
    if (targetEx.sets.length <= 1) return

    updatedExercises[exerciseIndex] = {
      ...targetEx,
      sets: targetEx.sets.slice(0, -1)
    }

    const updatedSession = { ...session, exercises: updatedExercises }
    setSession(updatedSession)
    onSaveDraft(updatedSession)
  }

  // Remove entire exercise
  const handleRemoveExercise = (exerciseIndex: number) => {
    const updatedExercises = session.exercises.filter((_, i) => i !== exerciseIndex)
    const updatedSession = { ...session, exercises: updatedExercises }
    setSession(updatedSession)
    onSaveDraft(updatedSession)
  }

  // Substitute exercise
  const handleSubstitute = (newCatalogEx: CatalogExercise) => {
    if (!substitutingExercise) return
    const prevPerf = getPreviousPerformanceForExercise(newCatalogEx.name, workoutHistory)

    const updatedExercises = session.exercises.map(ex => {
      if (ex.id === substitutingExercise.id) {
        return {
          ...ex,
          catalogId: newCatalogEx.id,
          name: newCatalogEx.name,
          category: newCatalogEx.category,
          isCompound: newCatalogEx.isCompound,
          alternatives: newCatalogEx.alternatives,
          restSeconds: newCatalogEx.defaultRestSeconds,
          previousPerformance: prevPerf
        }
      }
      return ex
    })

    const updatedSession = { ...session, exercises: updatedExercises }
    setSession(updatedSession)
    onSaveDraft(updatedSession)
    setSubstitutingExercise(null)
  }

  // Add exercise from catalog modal
  const handleAddExerciseFromCatalog = (catEx: CatalogExercise) => {
    const prevPerf = getPreviousPerformanceForExercise(catEx.name, workoutHistory)
    const newEx: WorkoutExercise = {
      id: `ex_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      catalogId: catEx.id,
      name: catEx.name,
      muscleGroup: catEx.muscleGroup,
      category: catEx.category,
      isCompound: catEx.isCompound,
      restSeconds: catEx.defaultRestSeconds,
      alternatives: catEx.alternatives,
      previousPerformance: prevPerf,
      sets: [
        {
          id: `set_${Date.now()}_1`,
          setNumber: 1,
          weightKg: prevPerf ? prevPerf.sets[0]?.weightKg || 50 : 50,
          reps: prevPerf ? prevPerf.sets[0]?.reps || 10 : 10,
          isCompleted: false,
          previousWeightKg: prevPerf?.sets[0]?.weightKg,
          previousReps: prevPerf?.sets[0]?.reps
        },
        {
          id: `set_${Date.now()}_2`,
          setNumber: 2,
          weightKg: prevPerf ? prevPerf.sets[1]?.weightKg || 50 : 50,
          reps: prevPerf ? prevPerf.sets[1]?.reps || 10 : 10,
          isCompleted: false,
          previousWeightKg: prevPerf?.sets[1]?.weightKg,
          previousReps: prevPerf?.sets[1]?.reps
        },
        {
          id: `set_${Date.now()}_3`,
          setNumber: 3,
          weightKg: prevPerf ? prevPerf.sets[2]?.weightKg || 50 : 50,
          reps: prevPerf ? prevPerf.sets[2]?.reps || 10 : 10,
          isCompleted: false,
          previousWeightKg: prevPerf?.sets[2]?.weightKg,
          previousReps: prevPerf?.sets[2]?.reps
        }
      ]
    }

    const updatedSession = {
      ...session,
      exercises: [...session.exercises, newEx]
    }
    setSession(updatedSession)
    onSaveDraft(updatedSession)
    setShowAddExerciseModal(false)
  }

  // Finish Workout Trigger
  const handleInitiateFinish = () => {
    if (completedSetsCount === 0) {
      if (!confirm('You have not marked any sets as completed yet. Do you still want to finish?')) {
        return
      }
    }

    // Evaluate PRs
    const { newPRs } = evaluatePersonalRecords(session, existingPRs)
    setDetectedPRs(newPRs)
    setSummaryModalOpen(true)
  }

  // Confirm final finish in summary
  const handleFinalConfirmFinish = () => {
    const finalSession: WorkoutSession = {
      ...session,
      durationSeconds: elapsedSeconds,
      endedAt: new Date().toISOString(),
      totalVolumeKg: currentVolume,
      totalSetsCompleted: completedSetsCount,
      prsAchieved: detectedPRs.map(pr => `${pr.exerciseName}: ${pr.formattedValue}`),
      isCompleted: true
    }

    onFinishWorkout(finalSession, detectedPRs)
    setSummaryModalOpen(false)
  }

  const muscleFilters = [
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

  const filteredCatalog = EXERCISE_CATALOG.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMuscle = selectedMuscle === 'All' || ex.muscleGroup === selectedMuscle
    return matchesSearch && matchesMuscle
  })

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Sticky Active Session Header */}
      <div className="sticky top-16 z-30 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Live Workout Session
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-0.5">
            {session.routineName}
          </h2>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="font-mono font-bold text-sm text-white">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hidden sm:flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <span className="font-mono font-bold text-sm text-zinc-200">
              {currentVolume.toLocaleString()} kg
            </span>
          </div>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to discard this workout session? Current progress will be lost.')) {
                onDiscardWorkout()
              }
            }}
            className="px-3 py-1.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-900/50 text-xs font-semibold transition-all cursor-pointer"
          >
            Discard
          </button>

          <button
            onClick={handleInitiateFinish}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 active:scale-95 text-zinc-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Finish Workout
          </button>
        </div>
      </div>

      {/* Exercises Logging List */}
      <div className="space-y-6">
        {session.exercises.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-zinc-800 rounded-3xl space-y-3">
            <Dumbbell className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Your workout is currently empty</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Add movements to your workout session to start logging sets, weights, and repetitions.
            </p>
            <button
              onClick={() => setShowAddExerciseModal(true)}
              className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              + Add Exercise
            </button>
          </div>
        ) : (
          session.exercises.map((exercise, exIndex) => {
            const overloadTip = getProgressiveOverloadTip(exercise)
            const catMatch = EXERCISE_CATALOG.find(c => c.name.toLowerCase() === exercise.name.toLowerCase())

            return (
              <div 
                key={exercise.id}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4"
              >
                {/* Exercise Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-white">
                        {exercise.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700/60">
                        {exercise.muscleGroup}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-400 border border-zinc-850">
                        {exercise.category}
                      </span>
                    </div>

                    {/* Previous performance inline indicator */}
                    {exercise.previousPerformance && (
                      <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1.5">
                        <span className="text-zinc-500">Last session ({exercise.previousPerformance.date}):</span>
                        <span className="font-mono text-zinc-300">
                          {exercise.previousPerformance.sets.map(s => `${s.weightKg}kg×${s.reps}`).join(' • ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Exercise Controls */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {catMatch && (
                      <button
                        onClick={() => setViewingInstructionsEx(catMatch)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs flex items-center gap-1"
                        title="View Exercise Instructions & Cues"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span className="hidden md:inline text-[11px]">Cues</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSubstitutingExercise(exercise)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 text-xs flex items-center gap-1"
                      title="Substitute with another exercise"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span className="hidden md:inline text-[11px]">Substitute</span>
                    </button>

                    <button
                      onClick={() => handleRemoveExercise(exIndex)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                      title="Remove exercise from workout"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progressive Overload Tip Box */}
                {overloadTip && (
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs flex items-center gap-2.5 text-emerald-300">
                    <Target className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="leading-relaxed">{overloadTip.suggestion}</span>
                  </div>
                )}

                {/* Sets Table */}
                <div className="space-y-2">
                  <div className="grid grid-cols-12 text-[11px] font-mono font-semibold text-zinc-500 px-3">
                    <span className="col-span-2">SET</span>
                    <span className="col-span-3">PREVIOUS</span>
                    <span className="col-span-3 text-center">KG</span>
                    <span className="col-span-2 text-center">REPS</span>
                    <span className="col-span-2 text-center">DONE</span>
                  </div>

                  {exercise.sets.map((set, sIdx) => {
                    return (
                      <div 
                        key={set.id || sIdx}
                        className={`grid grid-cols-12 items-center px-3 py-2.5 rounded-xl border transition-all ${
                          set.isCompleted
                            ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                            : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        {/* Set Number */}
                        <div className="col-span-2 font-mono font-bold text-xs text-zinc-400 flex items-center gap-1">
                          <span>{set.setNumber}</span>
                          {set.isWarmup && (
                            <span className="text-[9px] uppercase px-1 rounded bg-zinc-800 text-zinc-400">W</span>
                          )}
                        </div>

                        {/* Previous Session Value */}
                        <div className="col-span-3 text-[11px] font-mono text-zinc-500 truncate">
                          {set.previousWeightKg !== undefined ? `${set.previousWeightKg}kg × ${set.previousReps}` : '—'}
                        </div>

                        {/* Weight (kg) Input */}
                        <div className="col-span-3 px-1 flex justify-center">
                          <input
                            type="number"
                            inputMode="decimal"
                            step="0.5"
                            value={set.weightKg === 0 ? '' : set.weightKg}
                            onChange={(e) => handleUpdateSetValue(exIndex, sIdx, 'weightKg', Number(e.target.value) || 0)}
                            className="w-full max-w-[4.5rem] h-10 sm:h-auto bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 text-center font-mono font-bold text-xs text-white focus:outline-none focus:border-emerald-500"
                            placeholder="kg"
                          />
                        </div>

                        {/* Reps Input */}
                        <div className="col-span-2 px-1 flex justify-center">
                          <input
                            type="number"
                            inputMode="numeric"
                            value={set.reps === 0 ? '' : set.reps}
                            onChange={(e) => handleUpdateSetValue(exIndex, sIdx, 'reps', Number(e.target.value) || 0)}
                            className="w-full max-w-[4rem] h-10 sm:h-auto bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 text-center font-mono font-bold text-xs text-white focus:outline-none focus:border-emerald-500"
                            placeholder="reps"
                          />
                        </div>

                        {/* Complete Checkbox */}
                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            onClick={() => handleToggleSetComplete(exIndex, sIdx)}
                            className={`w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                              set.isCompleted
                                ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/30'
                                : 'bg-zinc-800/80 text-zinc-500 hover:text-white hover:bg-zinc-700'
                            }`}
                          >
                            <Check className="w-4 h-4 font-black" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Set Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => handleAddSet(exIndex)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Add Set</span>
                  </button>

                  {exercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSet(exIndex)}
                      className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    >
                      Remove Last Set
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}

        {/* Add Exercise Floating / Bottom Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowAddExerciseModal(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-zinc-800 hover:border-emerald-500/60 bg-zinc-950/60 hover:bg-zinc-900/60 text-zinc-300 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Exercise to Session (+ Gerakan)</span>
          </button>
        </div>
      </div>

      {/* Floating Rest Timer Bar */}
      <RestTimerBar
        initialSeconds={restDuration}
        isOpen={showRestTimer}
        onClose={() => setShowRestTimer(false)}
      />

      {/* Exercise Substitution Modal */}
      {substitutingExercise && (
        <ExerciseSubstitutionModal
          isOpen={true}
          currentExercise={substitutingExercise}
          onClose={() => setSubstitutingExercise(null)}
          onSubstitute={handleSubstitute}
        />
      )}

      {/* Exercise Instructions & Cues Drawer */}
      {viewingInstructionsEx && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">
                  Form & Execution Standards
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{viewingInstructionsEx.name}</h3>
                <span className="text-xs text-zinc-400 font-mono">
                  {viewingInstructionsEx.muscleGroup} • {viewingInstructionsEx.category}
                </span>
              </div>
              <button
                onClick={() => setViewingInstructionsEx(null)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {viewingInstructionsEx.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Key Technique Cues:
              </span>
              {viewingInstructionsEx.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-850">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setViewingInstructionsEx(null)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Cues
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Exercise Modal (With Search & Muscle Filters) */}
      {showAddExerciseModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85dvh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Add Exercise to Workout</h4>
              </div>
              <button
                onClick={() => setShowAddExerciseModal(false)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-2.5 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exercise, e.g. Pec Deck, Bench Press, Squat..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {muscleFilters.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMuscle(m)}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer text-[11px] ${
                      selectedMuscle === m
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddExerciseFromCatalog(item)}
                  className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500 hover:bg-zinc-850/60 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                      {item.name}
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {item.muscleGroup}
                      </span>
                      {item.isCompound && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                          Compound
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</p>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 group-hover:bg-emerald-500 group-hover:text-zinc-950 flex items-center justify-center font-bold text-xs transition-all">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Workout Summary Modal */}
      <WorkoutSummaryModal
        isOpen={summaryModalOpen}
        session={{
          ...session,
          durationSeconds: elapsedSeconds,
          totalVolumeKg: currentVolume,
          totalSetsCompleted: completedSetsCount
        }}
        newPRs={detectedPRs}
        onConfirmSave={handleFinalConfirmFinish}
      />
    </div>
  )
}
