import type { UserProfile, DayOfWeek } from '../types/user'
import type { DailyWorkoutPlan } from '../types/split'
import type { WorkoutSession, PersonalRecord } from '../types/workout'
import type { DailyNutritionLog } from '../types/nutrition'
import { generateSampleHistory } from './workoutService'

const STORAGE_KEYS = {
  USER_PROFILE: 'gymlog_user_profile_v1',
  DISMISSED_REMINDERS: 'gymlog_dismissed_reminders_v1',
  CUSTOM_SCHEDULE: 'gymlog_custom_schedule_v1',
  CUSTOM_WORKOUT_PLANS: 'gymlog_custom_workout_plans_v1',
  WORKOUT_HISTORY: 'gymlog_workout_history_v1',
  ACTIVE_WORKOUT_DRAFT: 'gymlog_active_workout_draft_v1',
  PERSONAL_RECORDS: 'gymlog_personal_records_v1',
  NUTRITION_LOGS: 'gymlog_nutrition_logs_v1'
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user_default',
  name: 'Athlete',
  age: 26,
  sex: 'male',
  heightCm: 175,
  weightKg: 72,
  fitnessLevel: 'intermediate',
  trainingExperienceMonths: 18,
  goal: 'muscle_gain',
  availableDaysPerWeek: 5,
  equipment: 'full_gym',
  activeSplitId: 'ppl_ul',
  notifications: {
    enabled: true,
    dailyReminderTime: '08:00',
    restDayReminders: true
  },
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...DEFAULT_USER_PROFILE,
        ...parsed,
        notifications: {
          ...DEFAULT_USER_PROFILE.notifications,
          ...(parsed.notifications || {})
        }
      }
    }
  } catch (error) {
    console.error('Failed to load user profile from localStorage:', error)
  }
  return DEFAULT_USER_PROFILE
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    const toSave: UserProfile = {
      ...profile,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(toSave))
  } catch (error) {
    console.error('Failed to save user profile to localStorage:', error)
  }
}

export function isReminderDismissedToday(todayDateString: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISMISSED_REMINDERS)
    if (raw) {
      const dismissed: string[] = JSON.parse(raw)
      return dismissed.includes(todayDateString)
    }
  } catch (e) {
    console.error('Error reading dismissed reminders:', e)
  }
  return false
}

export function dismissReminderForToday(todayDateString: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISMISSED_REMINDERS)
    let dismissed: string[] = raw ? JSON.parse(raw) : []
    if (!dismissed.includes(todayDateString)) {
      dismissed.push(todayDateString)
      dismissed = dismissed.slice(-14)
      localStorage.setItem(STORAGE_KEYS.DISMISSED_REMINDERS, JSON.stringify(dismissed))
    }
  } catch (e) {
    console.error('Error writing dismissed reminder:', e)
  }
}

export function saveCustomSchedule(schedule: Partial<Record<DayOfWeek, string>>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SCHEDULE, JSON.stringify(schedule))
  } catch (e) {
    console.error('Error saving custom schedule:', e)
  }
}

export function loadCustomSchedule(): Partial<Record<DayOfWeek, string>> | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_SCHEDULE)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Error reading custom schedule:', e)
  }
  return undefined
}

export function saveCustomWorkoutPlans(plans: Record<string, DailyWorkoutPlan>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORKOUT_PLANS, JSON.stringify(plans))
  } catch (e) {
    console.error('Error saving custom workout plans:', e)
  }
}

export function loadCustomWorkoutPlans(): Record<string, DailyWorkoutPlan> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORKOUT_PLANS)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Error reading custom workout plans:', e)
  }
  return {}
}

// ================= WORKOUT HISTORY PERSISTENCE =================

export function loadWorkoutHistory(): WorkoutSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Error reading workout history:', e)
  }
  // Initialize with realistic sample history if empty
  const samples = generateSampleHistory()
  saveWorkoutHistory(samples)
  return samples
}

export function saveWorkoutHistory(history: WorkoutSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history))
  } catch (e) {
    console.error('Error saving workout history:', e)
  }
}

export function addWorkoutToHistory(session: WorkoutSession): WorkoutSession[] {
  const current = loadWorkoutHistory()
  // Add new session to beginning of list
  const updated = [session, ...current.filter(s => s.id !== session.id)]
  saveWorkoutHistory(updated)
  return updated
}

export function deleteWorkoutFromHistory(sessionId: string): WorkoutSession[] {
  const current = loadWorkoutHistory()
  const updated = current.filter(s => s.id !== sessionId)
  saveWorkoutHistory(updated)
  return updated
}

// ================= ACTIVE WORKOUT DRAFT PERSISTENCE =================

export function loadActiveWorkout(): WorkoutSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT_DRAFT)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Error reading active workout draft:', e)
  }
  return null
}

export function saveActiveWorkout(session: WorkoutSession | null): void {
  try {
    if (!session) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT_DRAFT)
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT_DRAFT, JSON.stringify(session))
    }
  } catch (e) {
    console.error('Error saving active workout draft:', e)
  }
}

// ================= PERSONAL RECORDS PERSISTENCE =================

export function loadPersonalRecords(): Record<string, PersonalRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PERSONAL_RECORDS)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Error reading personal records:', e)
  }

  // Seed sample PRs based on sample sessions
  const samplePRs: Record<string, PersonalRecord> = {
    'barbell flat bench press_weight': {
      id: 'pr_sample_1',
      exerciseName: 'Barbell Flat Bench Press',
      metric: 'max_weight',
      value: 80,
      formattedValue: '80 kg × 8 reps',
      achievedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      workoutId: 'sample_sess_1'
    },
    'lat pulldown (neutral / wide grip)_weight': {
      id: 'pr_sample_2',
      exerciseName: 'Lat Pulldown (Neutral / Wide Grip)',
      metric: 'max_weight',
      value: 70,
      formattedValue: '70 kg × 8 reps',
      achievedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      workoutId: 'sample_sess_2'
    }
  }
  savePersonalRecords(samplePRs)
  return samplePRs
}

export function savePersonalRecords(prs: Record<string, PersonalRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(prs))
  } catch (e) {
    console.error('Error saving personal records:', e)
  }
}

// ================= NUTRITION LOGS PERSISTENCE =================

/** Load all nutrition logs as a map of date -> log */
export function loadAllNutritionLogs(): Record<string, DailyNutritionLog> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NUTRITION_LOGS)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Error reading nutrition logs:', e)
  }
  return {}
}

/** Load nutrition log for a specific date (YYYY-MM-DD) */
export function loadDailyNutritionLog(date: string): DailyNutritionLog | null {
  const all = loadAllNutritionLogs()
  return all[date] ?? null
}

/** Save or update a single day's nutrition log */
export function saveDailyNutritionLog(log: DailyNutritionLog): void {
  try {
    const all = loadAllNutritionLogs()
    all[log.date] = log
    // Keep only last 90 days to avoid bloat
    const dates = Object.keys(all).sort().reverse()
    const trimmed: Record<string, DailyNutritionLog> = {}
    dates.slice(0, 90).forEach(d => { trimmed[d] = all[d] })
    localStorage.setItem(STORAGE_KEYS.NUTRITION_LOGS, JSON.stringify(trimmed))
  } catch (e) {
    console.error('Error saving nutrition log:', e)
  }
}
