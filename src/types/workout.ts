import type { MuscleGroup } from './split'

export interface WorkoutSet {
  id: string
  setNumber: number
  weightKg: number
  reps: number
  isCompleted: boolean
  isWarmup?: boolean
  rpe?: number
  previousWeightKg?: number
  previousReps?: number
  completedAt?: string
}

export interface WorkoutExercise {
  id: string
  catalogId?: string
  name: string
  muscleGroup: MuscleGroup
  category: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight'
  isCompound?: boolean
  notes?: string
  restSeconds: number
  alternatives: string[]
  sets: WorkoutSet[]
  previousPerformance?: {
    date: string
    sets: { weightKg: number; reps: number }[]
  }
}

export interface PersonalRecord {
  id: string
  exerciseName: string
  metric: 'max_weight' | 'max_volume_set' | 'max_reps'
  value: number
  achievedAt: string
  workoutId: string
  formattedValue: string
}

export interface WorkoutSession {
  id: string
  routineId?: string
  routineName: string
  startedAt: string
  endedAt?: string
  durationSeconds: number
  exercises: WorkoutExercise[]
  totalVolumeKg: number
  totalSetsCompleted: number
  notes?: string
  prsAchieved?: string[] // Exercise names or PR descriptions
  isCompleted: boolean
}
