import React, { useState } from 'react'
import { 
  X, 
  Save, 
  User
} from 'lucide-react'
import type { UserProfile, FitnessLevel, Sex, FitnessGoal, EquipmentAvailability } from '../../types/user'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: UserProfile
  onSave: (updated: UserProfile) => void
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [name, setName] = useState(profile.name)
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>(profile.fitnessLevel)
  const [age, setAge] = useState(profile.age)
  const [sex, setSex] = useState<Sex>(profile.sex)
  const [heightCm, setHeightCm] = useState(profile.heightCm)
  const [weightKg, setWeightKg] = useState(profile.weightKg)
  const [experienceMonths, setExperienceMonths] = useState(profile.trainingExperienceMonths)
  const [goal, setGoal] = useState<FitnessGoal>(profile.goal)
  const [availableDays, setAvailableDays] = useState(profile.availableDaysPerWeek)
  const [equipment, setEquipment] = useState<EquipmentAvailability>(profile.equipment)
  const [notificationsEnabled, setNotificationsEnabled] = useState(profile.notifications.enabled)
  const [restDayReminders, setRestDayReminders] = useState(profile.notifications.restDayReminders)
  const [dailyReminderTime, setDailyReminderTime] = useState(profile.notifications.dailyReminderTime || '08:00')

  if (!isOpen) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const updated: UserProfile = {
      ...profile,
      name,
      fitnessLevel,
      age: Number(age),
      sex,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      trainingExperienceMonths: Number(experienceMonths),
      goal,
      availableDaysPerWeek: Number(availableDays),
      equipment,
      notifications: {
        ...profile.notifications,
        enabled: notificationsEnabled,
        restDayReminders,
        dailyReminderTime
      },
      updatedAt: new Date().toISOString()
    }
    onSave(updated)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative my-2 sm:my-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Profile & Fitness Settings</h3>
              <p className="text-xs text-zinc-400">Update biometrics, fitness level, goals & notifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-5">
          {/* Fitness Level Picker */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Fitness Level (Switches guidance & recommendations)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['beginner', 'intermediate', 'advanced'] as FitnessLevel[]).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setFitnessLevel(lvl)}
                  className={`p-2.5 rounded-xl border text-center capitalize text-xs font-bold transition-all cursor-pointer ${
                    fitnessLevel === lvl
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500/50'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Biometrics Grid */}
          <div className="grid grid-cols-2 gap-3.5 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Athlete Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as Sex)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Training Exp. (months)</label>
              <input
                type="number"
                value={experienceMonths}
                onChange={(e) => setExperienceMonths(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Goal & Equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Primary Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="muscle_gain">Muscle Gain</option>
                <option value="fat_loss">Fat Loss</option>
                <option value="recomposition">Recomposition</option>
                <option value="strength">Strength</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Days / Week</label>
              <select
                value={availableDays}
                onChange={(e) => setAvailableDays(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={2}>2 Days</option>
                <option value={3}>3 Days (Full Body)</option>
                <option value={4}>4 Days (Upper/Lower)</option>
                <option value={5}>5 Days (PPL + UL / Bro)</option>
                <option value={6}>6 Days (PPL / Arnold)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Equipment</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value as EquipmentAvailability)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="full_gym">Commercial Gym</option>
                <option value="dumbbells_only">Dumbbells Only</option>
                <option value="home_bodyweight">Bodyweight/Home</option>
              </select>
            </div>
          </div>

          {/* Notifications Preferences */}
          <div className="pt-3 border-t border-zinc-800/80 space-y-2.5">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Notifications & Daily Reminders
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 cursor-pointer">
                <span className="text-xs text-zinc-200">Daily Workout Banner</span>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 cursor-pointer">
                <span className="text-xs text-zinc-200">Rest Day Advice</span>
                <input
                  type="checkbox"
                  checked={restDayReminders}
                  onChange={(e) => setRestDayReminders(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                Reminder Time
              </label>
              <input
                type="time"
                value={dailyReminderTime}
                onChange={(e) => setDailyReminderTime(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
