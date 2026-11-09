export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced'

export type Sex = 'male' | 'female' | 'other' | 'prefer-not-to-say'

export type FitnessGoal = 'muscle_gain' | 'fat_loss' | 'recomposition' | 'strength'

export type EquipmentAvailability = 'full_gym' | 'dumbbells_only' | 'home_bodyweight'

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export interface NotificationPreferences {
  enabled: boolean
  dailyReminderTime: string // e.g. "07:30"
  restDayReminders: boolean
  lastDismissedDate?: string // YYYY-MM-DD
}

export interface UserProfile {
  id: string
  name: string
  age: number
  sex: Sex
  heightCm: number
  weightKg: number
  fitnessLevel: FitnessLevel
  trainingExperienceMonths: number
  goal: FitnessGoal
  availableDaysPerWeek: number
  equipment: EquipmentAvailability
  activeSplitId: string
  customSchedule?: Partial<Record<DayOfWeek, string>> // dayOfWeek -> workout day identifier
  notifications: NotificationPreferences
  onboardingCompleted: boolean
  createdAt: string
  updatedAt: string
}
