import type { UserProfile, DayOfWeek } from '../types/user'
import { WORKOUT_SPLITS } from '../data/splitsData'
import type { WorkoutSplit, DailyWorkoutPlan } from '../types/split'

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

/**
 * Get current day of week in English
 */
export function getCurrentDayOfWeek(): DayOfWeek {
  const days: DayOfWeek[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const todayIndex = new Date().getDay()
  return days[todayIndex]
}

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation
 */
export function calculateBMR(weightKg: number, heightCm: number, age: number, sex: string): number {
  if (sex === 'female') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161)
  }
  // Default to male / standard
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5)
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) based on training days
 */
export function calculateTDEE(bmr: number, daysPerWeek: number): number {
  let multiplier = 1.2 // Sedentary
  if (daysPerWeek >= 1 && daysPerWeek <= 2) multiplier = 1.375 // Lightly active
  else if (daysPerWeek >= 3 && daysPerWeek <= 4) multiplier = 1.55 // Moderately active
  else if (daysPerWeek >= 5 && daysPerWeek <= 6) multiplier = 1.725 // Very active
  else if (daysPerWeek >= 7) multiplier = 1.9 // Extremely active

  return Math.round(bmr * multiplier)
}

/**
 * Match the optimal workout split based on user level, available days, and goal
 */
export function recommendSplit(profile: Partial<UserProfile>): WorkoutSplit {
  const days = profile.availableDaysPerWeek ?? 4
  const level = profile.fitnessLevel ?? 'beginner'

  if (level === 'beginner') {
    if (days <= 3) {
      return WORKOUT_SPLITS.find(s => s.id === 'fbeod') || WORKOUT_SPLITS[2]
    }
    return WORKOUT_SPLITS.find(s => s.id === 'upper_lower') || WORKOUT_SPLITS[4]
  }

  if (level === 'intermediate') {
    if (days >= 5) {
      return WORKOUT_SPLITS.find(s => s.id === 'ppl_ul') || WORKOUT_SPLITS[1]
    }
    if (days === 4) {
      return WORKOUT_SPLITS.find(s => s.id === 'upper_lower') || WORKOUT_SPLITS[4]
    }
    return WORKOUT_SPLITS.find(s => s.id === 'ppl') || WORKOUT_SPLITS[0]
  }

  // Advanced
  if (days >= 6) {
    return WORKOUT_SPLITS.find(s => s.id === 'ppl') || WORKOUT_SPLITS[0]
  }
  if (days === 5) {
    return WORKOUT_SPLITS.find(s => s.id === 'ppl_ul') || WORKOUT_SPLITS[1]
  }
  return WORKOUT_SPLITS.find(s => s.id === 'arnold') || WORKOUT_SPLITS[3]
}

/**
 * Get the workout plan for a specific day given the active split and any custom schedule/workout overrides
 */
export function getWorkoutForDay(
  split: WorkoutSplit,
  dayOfWeek: DayOfWeek,
  customSchedule?: Partial<Record<DayOfWeek, string>>,
  customDayWorkouts?: Record<string, DailyWorkoutPlan>
): DailyWorkoutPlan | undefined {
  let targetPlanId: string | undefined = undefined

  // Check if user re-mapped this day of week to another plan
  if (customSchedule && customSchedule[dayOfWeek]) {
    targetPlanId = customSchedule[dayOfWeek]
  }

  // Base plan from split
  let basePlan: DailyWorkoutPlan | undefined
  if (targetPlanId) {
    basePlan = split.schedule.find(p => p.id === targetPlanId)
  } else {
    basePlan = split.schedule.find(p => p.dayOfWeek === dayOfWeek)
  }

  if (!basePlan) return undefined

  // Check if user customized the exercises for this day (by plan id or splitId_dayOfWeek)
  const customKey = `${split.id}_${dayOfWeek}`
  if (customDayWorkouts) {
    if (customDayWorkouts[customKey]) {
      return {
        ...customDayWorkouts[customKey],
        dayOfWeek
      }
    }
    if (customDayWorkouts[basePlan.id]) {
      return {
        ...customDayWorkouts[basePlan.id],
        dayOfWeek
      }
    }
  }

  return {
    ...basePlan,
    dayOfWeek
  }
}
