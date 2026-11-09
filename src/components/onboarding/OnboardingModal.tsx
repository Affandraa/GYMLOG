import React, { useState } from 'react'
import { 
  Dumbbell,
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Sparkles, 
  Building2, 
  Home
} from 'lucide-react'
import type { UserProfile, FitnessLevel, Sex, FitnessGoal, EquipmentAvailability } from '../../types/user'
import { recommendSplit, calculateBMR, calculateTDEE } from '../../services/fitnessCalc'

interface OnboardingModalProps {
  isOpen: boolean
  onComplete: (profile: UserProfile) => void
  initialProfile: UserProfile
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  initialProfile
}) => {
  const [step, setStep] = useState<number>(1)
  
  // Form State
  const [name, setName] = useState(initialProfile.name || 'Athlete')
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>(initialProfile.fitnessLevel || 'beginner')
  const [age, setAge] = useState<number>(initialProfile.age || 25)
  const [sex, setSex] = useState<Sex>(initialProfile.sex || 'male')
  const [heightCm, setHeightCm] = useState<number>(initialProfile.heightCm || 175)
  const [weightKg, setWeightKg] = useState<number>(initialProfile.weightKg || 70)
  const [experienceMonths, setExperienceMonths] = useState<number>(initialProfile.trainingExperienceMonths || 6)
  const [goal, setGoal] = useState<FitnessGoal>(initialProfile.goal || 'muscle_gain')
  const [availableDays, setAvailableDays] = useState<number>(initialProfile.availableDaysPerWeek || 4)
  const [equipment, setEquipment] = useState<EquipmentAvailability>(initialProfile.equipment || 'full_gym')

  if (!isOpen) return null

  // Computed recommendation
  const recommended = recommendSplit({
    fitnessLevel,
    availableDaysPerWeek: availableDays,
    goal,
    equipment
  })

  const bmr = calculateBMR(weightKg, heightCm, age, sex)
  const tdee = calculateTDEE(bmr, availableDays)

  const handleFinish = () => {
    const updatedProfile: UserProfile = {
      ...initialProfile,
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
      activeSplitId: recommended.id,
      onboardingCompleted: true,
      updatedAt: new Date().toISOString()
    }
    onComplete(updatedProfile)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative my-8">
        
        {/* Progress Bar & Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-4 h-4" />
              GYMLOG Onboarding
            </span>
            <span>Step {step} of 4</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: FITNESS LEVEL SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                What is your fitness level?
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                We personalize exercise techniques, volume, and recovery days around your training experience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {/* Beginner Card */}
              <div
                onClick={() => {
                  setFitnessLevel('beginner')
                  if (availableDays > 4) setAvailableDays(3)
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  fitnessLevel === 'beginner'
                    ? 'bg-emerald-950/30 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/50'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        Beginner
                        <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                          2 - 3 Days / Week
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        New to the gym or under 6 months of structured lifting.
                      </p>
                    </div>
                  </div>
                  {fitnessLevel === 'beginner' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-300 space-y-1">
                  <p className="text-emerald-400/90 font-medium">Focus: Foundation, motor patterns, exercise form & habit building.</p>
                  <p className="text-zinc-400">Recommended: Full Body Every Other Day or 3-Day split with 48h recovery.</p>
                </div>
              </div>

              {/* Intermediate Card */}
              <div
                onClick={() => setFitnessLevel('intermediate')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  fitnessLevel === 'intermediate'
                    ? 'bg-emerald-950/30 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/50'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        Intermediate
                        <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                          3 - 5 Days / Week
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        6 months to 2+ years of consistent gym training experience.
                      </p>
                    </div>
                  </div>
                  {fitnessLevel === 'intermediate' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-300 space-y-1">
                  <p className="text-emerald-400/90 font-medium">Focus: Systematic progressive overload & weekly volume management.</p>
                  <p className="text-zinc-400">Recommended: Push Pull Legs (PPL), Upper Lower, or Arnold Split.</p>
                </div>
              </div>

              {/* Advanced Card */}
              <div
                onClick={() => setFitnessLevel('advanced')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  fitnessLevel === 'advanced'
                    ? 'bg-emerald-950/30 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/50'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        Advanced
                        <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                          4 - 6 Days / Week
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        2+ years of dedicated lifting with solid strength benchmarks.
                      </p>
                    </div>
                  </div>
                  {fitnessLevel === 'advanced' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-300 space-y-1">
                  <p className="text-emerald-400/90 font-medium">Focus: Mesocycle periodization, high intensity (RPE 8-10) & planned deloads.</p>
                  <p className="text-zinc-400">Recommended: PPL + Upper Lower, Arnold Split, or Custom Periodized Plan.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BIOMETRICS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Tell us about your body
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Used to calculate metabolic burn (BMR/TDEE) and optimize volume recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Your Name / Nickname
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="e.g. Alex"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Sex (for metabolic baseline)
                </label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value as Sex)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Age (years)
                </label>
                <input
                  type="number"
                  min="13"
                  max="99"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Training Experience (months)
                </label>
                <input
                  type="number"
                  min="0"
                  max="240"
                  value={experienceMonths}
                  onChange={(e) => setExperienceMonths(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="30"
                  max="300"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Calculated preview */}
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Estimated Basal Metabolic Rate (BMR):</span>
              <span className="font-mono font-bold text-emerald-400">{bmr} kcal/day</span>
            </div>
          </div>
        )}

        {/* STEP 3: GOALS & EQUIPMENT */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Your Goals & Schedule
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Tell us what you want to achieve and how often you can train.
              </p>
            </div>

            {/* Fitness Goal Selection */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Primary Fitness Goal
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'muscle_gain', label: 'Hypertrophy / Muscle Gain', desc: 'Maximize lean muscle mass & size' },
                  { id: 'fat_loss', label: 'Fat Loss & Definition', desc: 'Burn fat while preserving hard-earned muscle' },
                  { id: 'recomposition', label: 'Body Recomposition', desc: 'Gain muscle & lose fat simultaneously' },
                  { id: 'strength', label: 'Pure Strength & Power', desc: 'Increase 1RM on compound barbell lifts' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id as FitnessGoal)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      goal === g.id
                        ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-sm'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{g.label}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Available Days Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Available Training Days Per Week
                </label>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  {availableDays} Days / Week
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                step="1"
                value={availableDays}
                onChange={(e) => setAvailableDays(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 px-1 mt-1">
                <span>2 days</span>
                <span>3 days (Full Body)</span>
                <span>4 days (Upper/Lower)</span>
                <span>5 days (PPL+UL)</span>
                <span>6 days (PPL)</span>
              </div>
            </div>

            {/* Equipment Selection */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Gym Equipment Access
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'full_gym', label: 'Commercial Gym', icon: Building2, desc: 'Barbells, cables & machines' },
                  { id: 'dumbbells_only', label: 'Dumbbells Only', icon: Dumbbell, desc: 'Home or hotel dumbbell setup' },
                  { id: 'home_bodyweight', label: 'Calisthenics', icon: Home, desc: 'Pull-up bar & bodyweight' }
                ].map((eq) => {
                  const Icon = eq.icon
                  return (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => setEquipment(eq.id as EquipmentAvailability)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        equipment === eq.id
                          ? 'bg-emerald-950/30 border-emerald-500 text-white'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${equipment === eq.id ? 'text-emerald-400' : 'text-zinc-500'}`} />
                      <div className="font-bold text-xs text-white">{eq.label}</div>
                      <div className="text-[10px] text-zinc-400 line-clamp-1">{eq.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: RECOMMENDATION & CONFIRMATION */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Personalized Recommendation
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Recommended Split: {recommended.name}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Based on your {fitnessLevel} level, {availableDays} available days, and {goal.replace('_', ' ')} goal:
              </p>
            </div>

            {/* Split Details Highlight Card */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="font-bold text-white text-base">{recommended.shortName}</h3>
                  <p className="text-xs text-emerald-400 font-medium">{recommended.tagline}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">TDEE Target</span>
                  <div className="text-sm font-mono font-bold text-zinc-200">~{tdee} kcal</div>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {recommended.description}
              </p>

              {/* Weekly Schedule Preview */}
              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Weekly Schedule Outline:
                </h4>
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                  {recommended.schedule.map((day) => (
                    <div 
                      key={day.dayOfWeek}
                      className={`p-2 rounded-lg border ${
                        day.isRestDay 
                          ? 'bg-zinc-900/40 border-zinc-800/50 text-zinc-500' 
                          : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200 font-semibold'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-zinc-400">{day.dayOfWeek.slice(0, 3)}</div>
                      <div className="text-[10px] mt-1 line-clamp-1 font-bold">
                        {day.isRestDay ? 'Rest' : day.name.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progressive Overload Tip */}
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5">
                <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-300">Overload Strategy: </span>
                  <span className="text-zinc-400">{recommended.progressiveOverloadProtocol}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500 text-center">
              💡 You can freely change splits, modify workout days, or customize exercises anytime from your dashboard.
            </p>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer ml-auto"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 text-xs font-bold text-zinc-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 active:scale-95 transition-all rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer ml-auto"
            >
              <span>Launch GYMLOG</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
