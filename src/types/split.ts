import type { DayOfWeek } from './user'

export type MuscleGroup = 
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Quadriceps'
  | 'Hamstrings'
  | 'Glutes'
  | 'Calves'
  | 'Abs'

export interface PlannedExercise {
  id: string
  name: string
  muscleGroup: MuscleGroup
  targetSets: number
  targetReps: string // e.g., "8-10" or "10-12"
  restSeconds: number
  alternatives: string[]
  notes?: string
}

export interface DailyWorkoutPlan {
  id: string
  dayOfWeek: DayOfWeek
  name: string // e.g. "Push Day (Chest, Shoulders, Triceps)"
  isRestDay: boolean
  targetMuscles: MuscleGroup[]
  estimatedDurationMinutes: number
  exercises: PlannedExercise[]
  recoveryFocus?: string
}

export interface VolumeRecommendation {
  muscleGroup: MuscleGroup
  weeklySets: string // e.g. "10-14 sets"
  frequency: string // e.g. "2x / week"
  intensityRPE: string // e.g. "RPE 7-9"
}

export interface WorkoutSplit {
  id: string
  name: string
  shortName: string
  tagline: string
  description: string
  recommendedDays: number[]
  suitableLevels: ('beginner' | 'intermediate' | 'advanced')[]
  volumeGuidance: VolumeRecommendation[]
  progressiveOverloadProtocol: string
  schedule: DailyWorkoutPlan[]
}
