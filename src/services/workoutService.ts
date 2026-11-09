import type { WorkoutSession, WorkoutExercise, WorkoutSet, PersonalRecord } from '../types/workout'
import type { DailyWorkoutPlan } from '../types/split'
import { EXERCISE_CATALOG } from '../data/exerciseCatalog'

/**
 * Calculates total volume in kilograms lifted across all completed sets
 */
export function calculateSessionVolume(exercises: WorkoutExercise[]): number {
  return exercises.reduce((sessionTotal, exercise) => {
    const exerciseTotal = exercise.sets.reduce((setTotal, set) => {
      if (set.isCompleted && !set.isWarmup && set.weightKg > 0 && set.reps > 0) {
        return setTotal + set.weightKg * set.reps
      }
      return setTotal
    }, 0)
    return sessionTotal + exerciseTotal
  }, 0)
}

/**
 * Counts total completed non-warmup sets
 */
export function countCompletedSets(exercises: WorkoutExercise[]): number {
  return exercises.reduce((acc, exercise) => {
    return acc + exercise.sets.filter(s => s.isCompleted && !s.isWarmup).length
  }, 0)
}

/**
 * Converts a DailyWorkoutPlan into a live WorkoutSession object
 */
export function createSessionFromPlan(
  plan?: DailyWorkoutPlan,
  customName?: string,
  workoutHistory: WorkoutSession[] = []
): WorkoutSession {
  const sessionId = `session_${Date.now()}`
  const now = new Date().toISOString()

  let initialExercises: WorkoutExercise[] = []

  if (plan && plan.exercises && plan.exercises.length > 0) {
    initialExercises = plan.exercises.map((pEx, idx) => {
      // Find previous performance for this exercise from history
      const previousPerformance = getPreviousPerformanceForExercise(pEx.name, workoutHistory)

      // Catalog reference for default instructions/alternatives
      const catMatch = EXERCISE_CATALOG.find(c => c.name.toLowerCase() === pEx.name.toLowerCase())

      // Initial sets
      const targetCount = pEx.targetSets || 3
      const sets: WorkoutSet[] = []

      for (let i = 1; i <= targetCount; i++) {
        const prevSet = previousPerformance?.sets[i - 1]
        // Estimate default weight from previous or sensible default
        const defaultWeight = prevSet ? prevSet.weightKg : (catMatch?.category === 'barbell' ? 60 : catMatch?.category === 'dumbbell' ? 20 : 40)
        const defaultReps = prevSet ? prevSet.reps : 10

        sets.push({
          id: `set_${sessionId}_${idx + 1}_${i}`,
          setNumber: i,
          weightKg: defaultWeight,
          reps: defaultReps,
          isCompleted: false,
          isWarmup: false,
          previousWeightKg: prevSet ? prevSet.weightKg : undefined,
          previousReps: prevSet ? prevSet.reps : undefined
        })
      }

      return {
        id: `ex_${sessionId}_${idx + 1}`,
        catalogId: catMatch?.id,
        name: pEx.name,
        muscleGroup: pEx.muscleGroup,
        category: catMatch?.category || 'barbell',
        isCompound: catMatch?.isCompound ?? true,
        restSeconds: pEx.restSeconds || 90,
        alternatives: pEx.alternatives || catMatch?.alternatives || [],
        sets,
        previousPerformance
      }
    })
  }

  return {
    id: sessionId,
    routineId: plan?.id,
    routineName: customName || plan?.name || 'Quick Custom Workout',
    startedAt: now,
    durationSeconds: 0,
    exercises: initialExercises,
    totalVolumeKg: 0,
    totalSetsCompleted: 0,
    isCompleted: false,
    prsAchieved: []
  }
}

/**
 * Searches workout history to find the most recent session containing this exercise
 */
export function getPreviousPerformanceForExercise(
  exerciseName: string,
  history: WorkoutSession[]
): { date: string; sets: { weightKg: number; reps: number }[] } | undefined {
  // Search history backwards (most recent first)
  for (const session of history) {
    const foundEx = session.exercises.find(
      e => e.name.toLowerCase().trim() === exerciseName.toLowerCase().trim()
    )
    if (foundEx) {
      const completedSets = foundEx.sets
        .filter(s => s.isCompleted && !s.isWarmup && s.weightKg > 0)
        .map(s => ({ weightKg: s.weightKg, reps: s.reps }))

      if (completedSets.length > 0) {
        return {
          date: new Date(session.startedAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
          }),
          sets: completedSets
        }
      }
    }
  }
  return undefined
}

/**
 * Progressive Overload Advisor
 * Suggests whether to add weight (+2.5kg) or add reps based on past performance
 */
export function getProgressiveOverloadTip(
  exercise: WorkoutExercise
): { suggestion: string; targetWeight: number; targetReps: number } | null {
  if (!exercise.previousPerformance || exercise.previousPerformance.sets.length === 0) {
    return null
  }

  const prevBestSet = [...exercise.previousPerformance.sets].sort((a, b) => b.weightKg - a.weightKg)[0]
  if (!prevBestSet) return null

  // If last performance reps were 10 or more, suggest +2.5kg
  if (prevBestSet.reps >= 10) {
    const nextWeight = prevBestSet.weightKg + 2.5
    return {
      suggestion: `Target Progressive Overload: Increase weight to ${nextWeight} kg for 8 reps.`,
      targetWeight: nextWeight,
      targetReps: 8
    }
  }

  // Otherwise suggest aiming for +1 or +2 more reps with the same weight
  return {
    suggestion: `Target Progressive Overload: Aim for ${prevBestSet.reps + 1} reps at ${prevBestSet.weightKg} kg.`,
    targetWeight: prevBestSet.weightKg,
    targetReps: prevBestSet.reps + 1
  }
}

/**
 * Checks for new Personal Records (PRs) in the finished workout session
 */
export function evaluatePersonalRecords(
  session: WorkoutSession,
  existingPRs: Record<string, PersonalRecord> = {}
): { newPRs: PersonalRecord[]; updatedMap: Record<string, PersonalRecord> } {
  const newPRs: PersonalRecord[] = []
  const updatedMap: Record<string, PersonalRecord> = { ...existingPRs }

  for (const exercise of session.exercises) {
    const completedSets = exercise.sets.filter(s => s.isCompleted && !s.isWarmup && s.weightKg > 0)

    for (const set of completedSets) {
      const prKeyWeight = `${exercise.name.toLowerCase()}_weight`
      const currentPRWeight = updatedMap[prKeyWeight]

      // Check max weight PR
      if (!currentPRWeight || set.weightKg > currentPRWeight.value) {
        const pr: PersonalRecord = {
          id: `pr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          exerciseName: exercise.name,
          metric: 'max_weight',
          value: set.weightKg,
          formattedValue: `${set.weightKg} kg × ${set.reps} reps`,
          achievedAt: new Date().toISOString(),
          workoutId: session.id
        }
        updatedMap[prKeyWeight] = pr
        newPRs.push(pr)
      }
    }
  }

  return { newPRs, updatedMap }
}

/**
 * Creates realistic initial workout history data so user has immediate context
 */
export function generateSampleHistory(): WorkoutSession[] {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()

  return [
    {
      id: 'sample_sess_1',
      routineId: 'ppl_mon',
      routineName: 'Push A (Chest, Shoulders, Triceps)',
      startedAt: threeDaysAgo,
      endedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 58 * 60 * 1000).toISOString(),
      durationSeconds: 3480, // 58 minutes
      isCompleted: true,
      totalVolumeKg: 6420,
      totalSetsCompleted: 12,
      prsAchieved: ['Barbell Flat Bench Press: 80 kg × 8 reps'],
      exercises: [
        {
          id: 'ex_sample_1',
          name: 'Barbell Flat Bench Press',
          muscleGroup: 'Chest',
          category: 'barbell',
          restSeconds: 120,
          alternatives: ['Dumbbell Bench Press'],
          sets: [
            { id: 's1', setNumber: 1, weightKg: 75, reps: 10, isCompleted: true },
            { id: 's2', setNumber: 2, weightKg: 80, reps: 8, isCompleted: true },
            { id: 's3', setNumber: 3, weightKg: 80, reps: 8, isCompleted: true }
          ]
        },
        {
          id: 'ex_sample_2',
          name: 'Incline Dumbbell Press',
          muscleGroup: 'Chest',
          category: 'dumbbell',
          restSeconds: 90,
          alternatives: ['Incline Barbell Bench'],
          sets: [
            { id: 's4', setNumber: 1, weightKg: 24, reps: 10, isCompleted: true },
            { id: 's5', setNumber: 2, weightKg: 26, reps: 9, isCompleted: true },
            { id: 's6', setNumber: 3, weightKg: 26, reps: 8, isCompleted: true }
          ]
        },
        {
          id: 'ex_sample_3',
          name: 'Pec Deck Machine (Chest Fly)',
          muscleGroup: 'Chest',
          category: 'machine',
          restSeconds: 60,
          alternatives: ['Cable Fly'],
          sets: [
            { id: 's7', setNumber: 1, weightKg: 50, reps: 12, isCompleted: true },
            { id: 's8', setNumber: 2, weightKg: 55, reps: 12, isCompleted: true },
            { id: 's9', setNumber: 3, weightKg: 55, reps: 10, isCompleted: true }
          ]
        },
        {
          id: 'ex_sample_4',
          name: 'Triceps Rope Pushdown',
          muscleGroup: 'Triceps',
          category: 'cable',
          restSeconds: 60,
          alternatives: ['Overhead Cable Extension'],
          sets: [
            { id: 's10', setNumber: 1, weightKg: 25, reps: 15, isCompleted: true },
            { id: 's11', setNumber: 2, weightKg: 30, reps: 12, isCompleted: true },
            { id: 's12', setNumber: 3, weightKg: 30, reps: 12, isCompleted: true }
          ]
        }
      ]
    },
    {
      id: 'sample_sess_2',
      routineId: 'ppl_tue',
      routineName: 'Pull A (Lats, Upper Back, Biceps)',
      startedAt: oneDayAgo,
      endedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 62 * 60 * 1000).toISOString(),
      durationSeconds: 3720, // 62 minutes
      isCompleted: true,
      totalVolumeKg: 7850,
      totalSetsCompleted: 12,
      prsAchieved: ['Lat Pulldown (Neutral / Wide Grip): 70 kg × 8 reps'],
      exercises: [
        {
          id: 'ex_sample_5',
          name: 'Barbell Bent-Over Row',
          muscleGroup: 'Back',
          category: 'barbell',
          restSeconds: 120,
          alternatives: ['Seated Cable Row'],
          sets: [
            { id: 's13', setNumber: 1, weightKg: 70, reps: 8, isCompleted: true },
            { id: 's14', setNumber: 2, weightKg: 75, reps: 8, isCompleted: true },
            { id: 's15', setNumber: 3, weightKg: 75, reps: 7, isCompleted: true }
          ]
        },
        {
          id: 'ex_sample_6',
          name: 'Lat Pulldown (Neutral / Wide Grip)',
          muscleGroup: 'Back',
          category: 'cable',
          restSeconds: 90,
          alternatives: ['Pull-ups'],
          sets: [
            { id: 's16', setNumber: 1, weightKg: 65, reps: 10, isCompleted: true },
            { id: 's17', setNumber: 2, weightKg: 70, reps: 8, isCompleted: true },
            { id: 's18', setNumber: 3, weightKg: 70, reps: 8, isCompleted: true }
          ]
        },
        {
          id: 'ex_sample_7',
          name: 'Face Pulls with Rope',
          muscleGroup: 'Shoulders',
          category: 'cable',
          restSeconds: 60,
          alternatives: ['Reverse Pec Deck'],
          sets: [
            { id: 's19', setNumber: 1, weightKg: 20, reps: 15, isCompleted: true },
            { id: 's20', setNumber: 2, weightKg: 22.5, reps: 15, isCompleted: true },
            { id: 's21', setNumber: 3, weightKg: 22.5, reps: 14, isCompleted: true }
          ]
        },
        {
          id: 'ex_sample_8',
          name: 'Incline Dumbbell Bicep Curl',
          muscleGroup: 'Biceps',
          category: 'dumbbell',
          restSeconds: 60,
          alternatives: ['Barbell EZ-Curl'],
          sets: [
            { id: 's22', setNumber: 1, weightKg: 14, reps: 10, isCompleted: true },
            { id: 's23', setNumber: 2, weightKg: 14, reps: 10, isCompleted: true },
            { id: 's24', setNumber: 3, weightKg: 14, reps: 9, isCompleted: true }
          ]
        }
      ]
    }
  ]
}
