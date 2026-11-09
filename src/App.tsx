import { useState } from 'react'
import { 
  Flame, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Play,
  Dumbbell,
  BookOpen,
  ArrowRight
} from 'lucide-react'

// Types & Services
import type { UserProfile, FitnessLevel, DayOfWeek } from './types/user'
import type { DailyWorkoutPlan } from './types/split'
import type { WorkoutSession, PersonalRecord } from './types/workout'
import { WORKOUT_SPLITS } from './data/splitsData'
import type { CatalogExercise } from './data/exerciseCatalog'
import { 
  getCurrentDayOfWeek, 
  getWorkoutForDay, 
  calculateBMR, 
  calculateTDEE 
} from './services/fitnessCalc'
import { 
  loadUserProfile, 
  saveUserProfile, 
  isReminderDismissedToday, 
  dismissReminderForToday,
  loadCustomSchedule,
  saveCustomSchedule,
  loadCustomWorkoutPlans,
  saveCustomWorkoutPlans,
  loadWorkoutHistory,
  addWorkoutToHistory,
  deleteWorkoutFromHistory,
  loadActiveWorkout,
  saveActiveWorkout,
  loadPersonalRecords,
  savePersonalRecords
} from './services/storage'
import { createSessionFromPlan } from './services/workoutService'
import { soundService } from './services/soundEffects'

// Components
import { Navbar, type NavTab } from './components/layout/Navbar'
import { OnboardingModal } from './components/onboarding/OnboardingModal'
import { EditProfileModal } from './components/onboarding/EditProfileModal'
import { DailyReminderCard } from './components/splits/DailyReminderCard'
import { WeeklyCalendar } from './components/splits/WeeklyCalendar'
import { SplitPlanner } from './components/splits/SplitPlanner'
import { GuidanceView } from './components/guidance/GuidanceView'
import { EditDayRoutineModal } from './components/splits/EditDayRoutineModal'

// Phase 2 Components
import { ActiveWorkoutSession } from './components/workout/ActiveWorkoutSession'
import { WorkoutHistoryView } from './components/workout/WorkoutHistoryView'
import { ExerciseLibraryView } from './components/workout/ExerciseLibraryView'
import { StartWorkoutLauncherModal } from './components/workout/StartWorkoutLauncherModal'

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard')
  
  // Profile & Split State
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile())
  const [customSchedule, setCustomSchedule] = useState<Partial<Record<DayOfWeek, string>>>(() => loadCustomSchedule() || {})
  const [customDayWorkouts, setCustomDayWorkouts] = useState<Record<string, DailyWorkoutPlan>>(() => loadCustomWorkoutPlans() || {})
  
  // Phase 2 Workout State
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() => loadWorkoutHistory())
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(() => loadActiveWorkout())
  const [personalRecords, setPersonalRecords] = useState<Record<string, PersonalRecord>>(() => loadPersonalRecords())

  // Modals State
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!profile.onboardingCompleted)
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false)
  const [editingRoutinePlan, setEditingRoutinePlan] = useState<DailyWorkoutPlan | null>(null)
  const [showWorkoutLauncher, setShowWorkoutLauncher] = useState<boolean>(false)

  // Interactive Workout Demo State (Preserved Phase 1 foundation feature)
  const [completedSets, setCompletedSets] = useState<number[]>([1])

  // Reminder dismissal state for today
  const todayDayOfWeek = getCurrentDayOfWeek()
  const todayDateString = new Date().toISOString().slice(0, 10)
  const [isDismissed, setIsDismissed] = useState<boolean>(() => isReminderDismissedToday(todayDateString))

  // Active Split lookup
  const activeSplit = WORKOUT_SPLITS.find(s => s.id === profile.activeSplitId) || WORKOUT_SPLITS[0]
  const todayWorkout = getWorkoutForDay(activeSplit, todayDayOfWeek, customSchedule, customDayWorkouts)

  // Sync profile changes to localStorage
  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile)
    saveUserProfile(newProfile)
  }

  const toggleSet = (setNumber: number) => {
    if (completedSets.includes(setNumber)) {
      setCompletedSets(completedSets.filter(s => s !== setNumber))
    } else {
      setCompletedSets([...completedSets, setNumber])
    }
  }

  const handleDismissReminder = () => {
    dismissReminderForToday(todayDateString)
    setIsDismissed(true)
  }

  const handleToggleNotifications = () => {
    const updated = {
      ...profile,
      notifications: {
        ...profile.notifications,
        enabled: !profile.notifications.enabled
      }
    }
    handleUpdateProfile(updated)
  }

  const handleSelectSplit = (splitId: string) => {
    const updated = {
      ...profile,
      activeSplitId: splitId
    }
    handleUpdateProfile(updated)
  }

  const handleUpdateCustomSchedule = (newSchedule: Partial<Record<DayOfWeek, string>>) => {
    setCustomSchedule(newSchedule)
    saveCustomSchedule(newSchedule)
    const updated = {
      ...profile,
      customSchedule: newSchedule
    }
    handleUpdateProfile(updated)
  }

  const handleSaveDayWorkout = (updatedPlan: DailyWorkoutPlan) => {
    const customKey = `${activeSplit.id}_${updatedPlan.dayOfWeek}`
    const updatedCustomPlans: Record<string, DailyWorkoutPlan> = {
      ...customDayWorkouts,
      [customKey]: updatedPlan,
      [updatedPlan.id]: updatedPlan
    }
    setCustomDayWorkouts(updatedCustomPlans)
    saveCustomWorkoutPlans(updatedCustomPlans)
  }

  const handleResetDayWorkout = (dayKey: string) => {
    const updated = { ...customDayWorkouts }
    delete updated[dayKey]
    setCustomDayWorkouts(updated)
    saveCustomWorkoutPlans(updated)
  }

  const handleChangeFitnessLevel = (level: FitnessLevel) => {
    const updated = {
      ...profile,
      fitnessLevel: level
    }
    handleUpdateProfile(updated)
  }

  // ================= PHASE 2: WORKOUT LIFECYCLE =================

  // Start new workout
  const handleStartWorkout = (plan?: DailyWorkoutPlan, customName?: string) => {
    const newSession = createSessionFromPlan(plan, customName, workoutHistory)
    setActiveSession(newSession)
    saveActiveWorkout(newSession)
    setCurrentTab('workout')
  }

  // Start workout from exercise library
  const handleStartWithSingleExercise = (catalogEx: CatalogExercise) => {
    const singlePlan: DailyWorkoutPlan = {
      id: `plan_single_${Date.now()}`,
      dayOfWeek: todayDayOfWeek,
      name: `${catalogEx.name} Session`,
      isRestDay: false,
      targetMuscles: [catalogEx.muscleGroup],
      estimatedDurationMinutes: 45,
      exercises: [
        {
          id: `ex_${Date.now()}`,
          name: catalogEx.name,
          muscleGroup: catalogEx.muscleGroup,
          targetSets: catalogEx.defaultSets,
          targetReps: catalogEx.defaultReps,
          restSeconds: catalogEx.defaultRestSeconds,
          alternatives: catalogEx.alternatives
        }
      ]
    }
    handleStartWorkout(singlePlan)
  }

  // Save workout in progress (draft)
  const handleSaveWorkoutDraft = (draft: WorkoutSession) => {
    setActiveSession(draft)
    saveActiveWorkout(draft)
  }

  // Finish & persist workout session
  const handleFinishWorkout = (completedSession: WorkoutSession, newPRs: PersonalRecord[]) => {
    const updatedHistory = addWorkoutToHistory(completedSession)
    setWorkoutHistory(updatedHistory)
    setActiveSession(null)
    saveActiveWorkout(null)

    if (newPRs.length > 0) {
      soundService.playPRCelebration()
      const updatedPRs = { ...personalRecords }
      newPRs.forEach(pr => {
        updatedPRs[`${pr.exerciseName.toLowerCase()}_weight`] = pr
      })
      setPersonalRecords(updatedPRs)
      savePersonalRecords(updatedPRs)
    }

    setCurrentTab('history')
  }

  // Discard workout in progress
  const handleDiscardWorkout = () => {
    setActiveSession(null)
    saveActiveWorkout(null)
    setCurrentTab('dashboard')
  }

  // Delete workout from history
  const handleDeleteHistorySession = (sessionId: string) => {
    const updated = deleteWorkoutFromHistory(sessionId)
    setWorkoutHistory(updated)
  }

  // Repeat workout from history
  const handleRepeatWorkout = (pastSession: WorkoutSession) => {
    const plan: DailyWorkoutPlan = {
      id: `repeat_${Date.now()}`,
      dayOfWeek: todayDayOfWeek,
      name: `${pastSession.routineName} (Repeat)`,
      isRestDay: false,
      targetMuscles: Array.from(new Set(pastSession.exercises.map(e => e.muscleGroup))),
      estimatedDurationMinutes: Math.round(pastSession.durationSeconds / 60) || 60,
      exercises: pastSession.exercises.map(e => ({
        id: `ex_rep_${Date.now()}_${e.id}`,
        name: e.name,
        muscleGroup: e.muscleGroup,
        targetSets: e.sets.length,
        targetReps: e.sets[0]?.reps ? `${e.sets[0].reps}` : '10',
        restSeconds: e.restSeconds || 90,
        alternatives: e.alternatives || []
      }))
    }
    handleStartWorkout(plan)
  }

  // Calculated stats for profile
  const bmr = calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.sex)
  const tdee = calculateTDEE(bmr, profile.availableDaysPerWeek)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        profile={profile}
        activeSplit={activeSplit}
        isWorkoutActive={activeSession !== null}
        onOpenEditProfile={() => setShowEditProfile(true)}
        onToggleNotifications={handleToggleNotifications}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        
        {/* ================= TAB 1: DASHBOARD ================= */}
        {currentTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Active Workout In Progress Alert Banner (If user has an ongoing session) */}
            {activeSession && (
              <div className="bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-zinc-900 border border-emerald-500 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Workout in Progress
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      {activeSession.routineName} ({activeSession.exercises.length} Exercises)
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('workout')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Resume Workout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Daily Workout Reminder & Notification Banner */}
            <DailyReminderCard
              todayWorkout={todayWorkout}
              todayDayOfWeek={todayDayOfWeek}
              profile={profile}
              isDismissed={isDismissed}
              onDismiss={handleDismissReminder}
              onStartWorkout={() => {
                if (todayWorkout && !todayWorkout.isRestDay) {
                  handleStartWorkout(todayWorkout)
                } else {
                  setShowWorkoutLauncher(true)
                }
              }}
              onOpenCalendar={() => setCurrentTab('calendar')}
              onEditTodayRoutine={(plan) => setEditingRoutinePlan(plan)}
            />

            {/* Hero Quick Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Phase 2: Smart Workout Tracker Active</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{profile.name}</span>
                </h1>
                <p className="text-sm text-zinc-400 max-w-xl">
                  Ready to train? Track your weights, reps, rest timers, and progressive overload with zero friction.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowWorkoutLauncher(true)}
                  className="px-6 py-3 text-xs font-extrabold text-zinc-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-zinc-950" />
                  <span>Start Workout Session</span>
                </button>
                <button
                  onClick={() => setCurrentTab('library')}
                  className="px-4 py-3 text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Browse Exercises</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Active Split</div>
                <div className="text-lg font-bold text-white mt-1 truncate">{activeSplit.shortName}</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">{profile.availableDaysPerWeek} training days/week</div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Completed Workouts</div>
                <div className="text-lg font-bold text-white mt-1">{workoutHistory.length} Sessions</div>
                <div className="text-[11px] text-teal-400 font-mono mt-0.5">
                  {workoutHistory.reduce((acc, w) => acc + w.totalVolumeKg, 0).toLocaleString()} kg total lifted
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Personal Records</div>
                <div className="text-lg font-bold text-white mt-1">{Object.keys(personalRecords).length} PRs Logged</div>
                <div className="text-[11px] text-amber-400 font-mono mt-0.5">Overload auto-detected</div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Primary Goal</div>
                <div className="text-lg font-bold text-white mt-1 capitalize">{profile.goal.replace('_', ' ')}</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">TDEE: ~{tdee} kcal</div>
              </div>
            </div>

            {/* Interactive Workout Prototype (Preserved Working Feature) */}
            <section className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-emerald-400" />
                    Quick Interactive Logger (Bench Press Demo)
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Live Set Completion Checklist
                  </h3>
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Target: 3 sets × 8-10 reps • Rest: 120s
                </div>
              </div>

              {/* Set Table */}
              <div className="mt-5 space-y-2 text-xs max-w-xl mx-auto">
                <div className="grid grid-cols-12 text-zinc-500 font-medium px-3">
                  <span className="col-span-2">SET</span>
                  <span className="col-span-4">WEIGHT</span>
                  <span className="col-span-4">REPS</span>
                  <span className="col-span-2 text-center">DONE</span>
                </div>

                {[
                  { set: 1, kg: 80, reps: 10 },
                  { set: 2, kg: 85, reps: 8 },
                  { set: 3, kg: 90, reps: 6 },
                ].map((row) => {
                  const isDone = completedSets.includes(row.set)
                  return (
                    <div 
                      key={row.set} 
                      onClick={() => toggleSet(row.set)}
                      className={`grid grid-cols-12 items-center px-4 py-3 rounded-xl cursor-pointer transition-all ${
                        isDone 
                          ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-200' 
                          : 'bg-zinc-950/70 border border-zinc-800 text-zinc-200 hover:bg-zinc-800/60'
                      }`}
                    >
                      <span className="col-span-2 font-mono font-bold text-zinc-400">{row.set}</span>
                      <span className="col-span-4 font-mono font-bold">{row.kg} kg</span>
                      <span className="col-span-4 font-mono font-bold">{row.reps} reps</span>
                      <div className="col-span-2 flex justify-center">
                        <CheckCircle2 className={`w-5 h-5 transition-colors ${
                          isDone ? 'text-emerald-400 fill-emerald-400/20' : 'text-zinc-600'
                        }`} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Ready for full logging with weights, timers, and PRs?
                </span>
                <button
                  onClick={() => setShowWorkoutLauncher(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-zinc-950" />
                  <span>Start Live Workout Tracker</span>
                </button>
              </div>
            </section>

            {/* Quick 7-Day Calendar Strip */}
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Current Split Weekly Overview
                  </h3>
                  <p className="text-xs text-zinc-400">Weekly schedule for {activeSplit.name}</p>
                </div>
                <button
                  onClick={() => setCurrentTab('calendar')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                >
                  Open Full Interactive Calendar →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                {activeSplit.schedule.map((day) => {
                  const isToday = day.dayOfWeek === todayDayOfWeek
                  const dayWorkout = getWorkoutForDay(activeSplit, day.dayOfWeek, customSchedule, customDayWorkouts) || day

                  return (
                    <div
                      key={day.dayOfWeek}
                      onClick={() => setCurrentTab('calendar')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isToday
                          ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-950/30'
                          : dayWorkout.isRestDay
                            ? 'bg-zinc-950/30 border-zinc-800/60 text-zinc-500'
                            : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-zinc-400">{day.dayOfWeek.slice(0, 3)}</div>
                      <div className="font-bold mt-1 text-white truncate text-xs">
                        {dayWorkout.isRestDay ? 'Rest' : dayWorkout.name.split(' ')[0]}
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1">
                        {dayWorkout.isRestDay ? 'Recovery' : `${dayWorkout.exercises.length} Ex`}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        )}

        {/* ================= TAB 2: ACTIVE WORKOUT / LIVE TRACKER ================= */}
        {currentTab === 'workout' && (
          <div>
            {activeSession ? (
              <ActiveWorkoutSession
                initialSession={activeSession}
                workoutHistory={workoutHistory}
                existingPRs={personalRecords}
                onFinishWorkout={handleFinishWorkout}
                onDiscardWorkout={handleDiscardWorkout}
                onSaveDraft={handleSaveWorkoutDraft}
              />
            ) : (
              <div className="max-w-xl mx-auto py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">No Workout in Progress</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Select today's scheduled split routine or create a custom workout to start recording sets, reps, and PRs.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setShowWorkoutLauncher(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-zinc-950" />
                    <span>Launch New Workout</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('library')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Browse 60+ Exercises</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: WORKOUT HISTORY ================= */}
        {currentTab === 'history' && (
          <WorkoutHistoryView
            history={workoutHistory}
            onDeleteSession={handleDeleteHistorySession}
            onRepeatWorkout={handleRepeatWorkout}
          />
        )}

        {/* ================= TAB 4: EXERCISE LIBRARY ================= */}
        {currentTab === 'library' && (
          <ExerciseLibraryView
            onStartWithExercise={handleStartWithSingleExercise}
          />
        )}

        {/* ================= TAB 5: WORKOUT SPLITS ================= */}
        {currentTab === 'splits' && (
          <SplitPlanner
            activeSplitId={profile.activeSplitId}
            profile={profile}
            onSelectSplit={handleSelectSplit}
            onOpenCalendar={() => setCurrentTab('calendar')}
          />
        )}

        {/* ================= TAB 6: WEEKLY CALENDAR ================= */}
        {currentTab === 'calendar' && (
          <WeeklyCalendar
            split={activeSplit}
            customSchedule={customSchedule}
            customDayWorkouts={customDayWorkouts}
            onUpdateCustomSchedule={handleUpdateCustomSchedule}
            onSaveDayWorkout={handleSaveDayWorkout}
            onResetDayWorkout={handleResetDayWorkout}
            onStartDayWorkout={(plan) => handleStartWorkout(plan)}
          />
        )}

        {/* ================= TAB 7: GUIDANCE ================= */}
        {currentTab === 'guidance' && (
          <GuidanceView
            currentLevel={profile.fitnessLevel}
            onChangeLevel={handleChangeFitnessLevel}
            onExploreSplits={() => setCurrentTab('splits')}
          />
        )}

        {/* ================= TAB 8: PROFILE & SETTINGS ================= */}
        {currentTab === 'profile' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-zinc-950 font-black text-xl shadow-lg shadow-emerald-500/20">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">{profile.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {profile.fitnessLevel}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {profile.trainingExperienceMonths} months experience
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowEditProfile(true)}
                  className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer self-start sm:self-auto"
                >
                  Edit Profile & Settings
                </button>
              </div>

              {/* Biometrics Summary */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Biometrics & Metabolism
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-500">Age & Sex</span>
                    <div className="text-base font-bold text-white mt-1 capitalize">{profile.age} yrs • {profile.sex}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-500">Height & Weight</span>
                    <div className="text-base font-bold text-white mt-1">{profile.heightCm} cm • {profile.weightKg} kg</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-500">BMR (Basal)</span>
                    <div className="text-base font-mono font-bold text-emerald-400 mt-1">{bmr} kcal</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-500">TDEE (Daily Burn)</span>
                    <div className="text-base font-mono font-bold text-teal-300 mt-1">{tdee} kcal</div>
                  </div>
                </div>
              </div>

              {/* Training Plan Summary */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Training Configuration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-500">Current Split</span>
                    <div className="text-sm font-bold text-white mt-1">{activeSplit.name}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{profile.availableDaysPerWeek} days/week</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-500">Primary Goal</span>
                    <div className="text-sm font-bold text-emerald-400 mt-1 capitalize">{profile.goal.replace('_', ' ')}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Hypertrophy target</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-500">Equipment Access</span>
                    <div className="text-sm font-bold text-white mt-1 capitalize">{profile.equipment.replace('_', ' ')}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Full commercial setup</div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white">Daily Workout Reminder Banner</span>
                  <p className="text-zinc-400">Shows today's exercises and rest day guidance on dashboard</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                  profile.notifications.enabled 
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' 
                    : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {profile.notifications.enabled ? 'ACTIVE' : 'MUTED'}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
        <p>GYMLOG • Phase 2 Complete: Smart Workout Tracker & Exercise Database Active</p>
      </footer>

      {/* Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        initialProfile={profile}
        onComplete={(newProfile) => {
          handleUpdateProfile(newProfile)
          setShowOnboarding(false)
        }}
      />

      {/* Edit Profile & Settings Modal */}
      <EditProfileModal
        isOpen={showEditProfile}
        profile={profile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleUpdateProfile}
      />

      {/* Routine Exercise Editor Modal (Ubah / Tambah Gerakan) */}
      {editingRoutinePlan && (
        <EditDayRoutineModal
          isOpen={true}
          plan={editingRoutinePlan}
          onClose={() => setEditingRoutinePlan(null)}
          onSave={(updated) => {
            handleSaveDayWorkout(updated)
            setEditingRoutinePlan(null)
          }}
          onResetToDefault={() => {
            const customKey = `${activeSplit.id}_${editingRoutinePlan.dayOfWeek}`
            handleResetDayWorkout(customKey)
            setEditingRoutinePlan(null)
          }}
        />
      )}

      {/* Start Workout Launcher Modal */}
      <StartWorkoutLauncherModal
        isOpen={showWorkoutLauncher}
        todayWorkout={todayWorkout}
        todayDayOfWeek={todayDayOfWeek}
        activeSplit={activeSplit}
        onClose={() => setShowWorkoutLauncher(false)}
        onLaunchPlan={handleStartWorkout}
      />
    </div>
  )
}
