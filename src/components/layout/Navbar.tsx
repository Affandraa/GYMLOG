import React from 'react'
import { 
  Dumbbell, 
  CalendarDays, 
  Layers, 
  GraduationCap, 
  User, 
  Bell, 
  BellOff, 
  Sparkles,
  History,
  BookOpen,
  Play
} from 'lucide-react'
import type { UserProfile } from '../../types/user'
import type { WorkoutSplit } from '../../types/split'

export type NavTab = 
  | 'dashboard' 
  | 'workout' 
  | 'history' 
  | 'library' 
  | 'splits' 
  | 'calendar' 
  | 'guidance' 
  | 'profile'

interface NavbarProps {
  currentTab: NavTab
  onSelectTab: (tab: NavTab) => void
  profile: UserProfile
  activeSplit?: WorkoutSplit
  isWorkoutActive: boolean
  onOpenEditProfile: () => void
  onToggleNotifications: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  activeSplit,
  isWorkoutActive,
  onOpenEditProfile,
  onToggleNotifications
}) => {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 text-zinc-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                GYMLOG
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                Phase 2
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono hidden sm:block">
              {profile.fitnessLevel.toUpperCase()} • {activeSplit?.shortName || 'PPL'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800/80">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onSelectTab('workout')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer relative ${
              currentTab === 'workout'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : isWorkoutActive
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900/50'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isWorkoutActive ? 'animate-pulse text-emerald-400' : ''}`} />
            <span>{isWorkoutActive ? 'Live Workout' : 'Log Workout'}</span>
            {isWorkoutActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('history')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'history'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <button
            onClick={() => onSelectTab('library')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'library'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Exercises</span>
          </button>

          <button
            onClick={() => onSelectTab('splits')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'splits'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Splits</span>
          </button>

          <button
            onClick={() => onSelectTab('calendar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'calendar'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => onSelectTab('guidance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'guidance'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Guidance</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'profile'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </nav>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2.5">
          {/* Notification Alert Toggle */}
          <button
            onClick={onToggleNotifications}
            title={profile.notifications.enabled ? 'Daily reminders active' : 'Reminders muted'}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              profile.notifications.enabled
                ? 'bg-zinc-900 border-zinc-800 text-emerald-400 hover:bg-zinc-800'
                : 'bg-zinc-900/50 border-zinc-800/50 text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {profile.notifications.enabled ? (
              <Bell className="w-4 h-4" />
            ) : (
              <BellOff className="w-4 h-4" />
            )}
          </button>

          {/* Quick Profile Pill */}
          <button
            onClick={onOpenEditProfile}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline">{profile.name}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-1 px-3 py-2 border-t border-zinc-800/60 bg-zinc-950 overflow-x-auto text-[11px] no-scrollbar">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'dashboard' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Today</span>
        </button>
        <button
          onClick={() => onSelectTab('workout')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'workout' 
              ? 'bg-emerald-600 text-white font-bold' 
              : isWorkoutActive 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500' 
                : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isWorkoutActive ? 'Live' : 'Workout'}</span>
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'history' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>
        <button
          onClick={() => onSelectTab('library')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'library' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>
        <button
          onClick={() => onSelectTab('calendar')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'calendar' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Calendar</span>
        </button>
        <button
          onClick={() => onSelectTab('splits')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'splits' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Splits</span>
        </button>
        <button
          onClick={() => onSelectTab('guidance')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'guidance' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Guide</span>
        </button>
        <button
          onClick={() => onSelectTab('profile')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 ${
            currentTab === 'profile' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 bg-zinc-900/50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile</span>
        </button>
      </div>
    </header>
  )
}
