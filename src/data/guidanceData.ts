import type { FitnessLevel } from '../types/user'

export interface FitnessLevelGuidance {
  level: FitnessLevel
  title: string
  subtitle: string
  recommendedDays: string
  summary: string
  corePrinciples: {
    heading: string
    description: string
  }[]
  exerciseTechniqueTips: string[]
  recommendedSplits: string[]
  commonPitfalls: string[]
  weeklyVolumeGuidance: string
  intensityGuidance: string
}

export const FITNESS_GUIDANCE: Record<FitnessLevel, FitnessLevelGuidance> = {
  beginner: {
    level: 'beginner',
    title: 'Beginner Athlete',
    subtitle: 'Foundation, Motor Patterns & Habit Building',
    recommendedDays: '2 - 3 days per week',
    summary: 'Welcome to strength training! As a beginner, your nervous system is adapting rapidly. Your primary objective is learning motor patterns with safe technique, building lifting habits, and recovering properly between workouts.',
    corePrinciples: [
      {
        heading: 'Master the Compound Movements First',
        description: 'Focus on multi-joint basics: Squats, Romanian Deadlifts, Lat Pulldowns, Bench Press, and Overhead Press. These build foundational strength faster than isolated machine curls.'
      },
      {
        heading: 'Form Over Ego (Leave 2-3 Reps in Reserve)',
        description: 'Never lift so heavy that your form degrades. Train at RPE 6-8 (Rate of Perceived Exertion) where you always have 2 to 3 good reps remaining before muscle failure.'
      },
      {
        heading: 'Consistency Beats Intensity',
        description: 'Showing up 3 days every single week beats going 6 days hard for two weeks and burning out. Rest 48 hours between training the same muscle group.'
      },
      {
        heading: 'Linear Progression',
        description: 'Aim to add 1 repetition or 1-2.5 kg to the bar each week as long as execution remains clean.'
      }
    ],
    exerciseTechniqueTips: [
      'Warm up with 5 minutes of light cardio and dynamic hip/shoulder mobility drills.',
      'Control the lowering (eccentric) phase for 2-3 seconds on every rep; do not let gravity drop the weight.',
      'Breathe in and brace your core before descending, exhale as you push or pull through the sticking point.',
      'Film your main lifts occasionally from a 45-degree angle to self-critique spinal alignment and joint angles.'
    ],
    recommendedSplits: ['Full Body Every Other Day (FBEOD)', 'Upper Lower Split (3-4 Days)'],
    commonPitfalls: [
      'Copying advanced bodybuilder routines with 25 sets per workout.',
      'Skipping warm-up sets or rushing between heavy compounds.',
      'Changing exercises every week instead of sticking to a routine for 8-12 weeks.'
    ],
    weeklyVolumeGuidance: '8 - 12 total working sets per muscle group per week.',
    intensityGuidance: 'RPE 6 - 8 (Stay 2-3 reps shy of technical failure).'
  },
  intermediate: {
    level: 'intermediate',
    title: 'Intermediate Athlete',
    subtitle: 'Progressive Overload & Volume Management',
    recommendedDays: '3 - 5 days per week',
    summary: 'You have established neural efficiency and basic strength. Linear progression is slowing down, so your progress now requires planned volume management, tracking progressive overload, and prioritizing muscular balance.',
    corePrinciples: [
      {
        heading: 'Systematic Progressive Overload',
        description: 'Progress is no longer accidental. Track your total volume load (Sets × Reps × Weight) and systematically increase weight, reps, or technical quality week over week.'
      },
      {
        heading: 'Targeted Volume Distribution',
        description: 'Most muscles respond optimally to 12-18 sets per week distributed across 2 sessions rather than blasted in one single day.'
      },
      {
        heading: 'RPE & Proximity to Failure (RIR 1-2)',
        description: 'Train compound lifts at RPE 7-8 and isolation exercises at RPE 8-9 to achieve maximum mechanical tension while mitigating joint fatigue.'
      },
      {
        heading: 'Structured Rest & Recovery Intervals',
        description: 'Rest 2-3 minutes on heavy compound lifts (Squat, Deadlift, Bench, Pull-up) and 60-90 seconds on isolation accessories.'
      }
    ],
    exerciseTechniqueTips: [
      'Standardize your range of motion: every rep must reach the same depth or stretch to count towards progressive overload.',
      'Use pause reps on compounds to eliminate bounce momentum and build explosive strength out of the hole.',
      'Incorporate exercise variations (e.g., Incline Dumbbell Press vs Flat Barbell) to target varied muscle fibers.'
    ],
    recommendedSplits: ['Push Pull Legs (PPL)', 'Upper Lower Split (4 Days)', 'Arnold Split'],
    commonPitfalls: [
      'Adding junk volume (doing 6 different chest exercises in one session until exhaustion).',
      'Ignoring sleep and nutrition (muscle builds during recovery, not in the gym).',
      'Neglecting antagonist muscles (causing shoulder and postural imbalances).'
    ],
    weeklyVolumeGuidance: '12 - 18 total working sets per muscle group per week.',
    intensityGuidance: 'RPE 7 - 9 (1-2 Reps in Reserve on most sets).'
  },
  advanced: {
    level: 'advanced',
    title: 'Advanced Athlete',
    subtitle: 'Periodization, High Intensity & Deload Strategy',
    recommendedDays: '4 - 6 days per week',
    summary: 'You are close to your genetic muscular ceiling. Gaining additional muscle and strength demands precise periodization (mesocycles), autoregulation, fatigue management, and planned deload phases.',
    corePrinciples: [
      {
        heading: 'Mesocycle Periodization',
        description: 'Structure training in 4-6 week blocks: start at baseline volume (MEV - Minimum Effective Volume) and progress towards MRV (Maximum Recoverable Volume).'
      },
      {
        heading: 'Planned Deload Weeks',
        description: 'Every 5th to 7th week, reduce training volume by 50% and intensity to RPE 5-6 to dissipate systemic and connective tissue fatigue.'
      },
      {
        heading: 'Fatigue & Autoregulation Management',
        description: 'Adjust daily load according to sleep, stress, and nervous system readiness. Drop sets, rest-pause, and myo-reps can be applied strategically on isolation work.'
      },
      {
        heading: 'Specialization Phases',
        description: 'Place lagging muscle groups on high volume while maintaining other groups on minimum maintenance volume (6-8 sets/week).'
      }
    ],
    exerciseTechniqueTips: [
      'Focus on deep lengthened-position training (biomechanical stretch under tension) where hypertrophy stimulus is highest.',
      'Utilize microplates (0.5kg - 1.25kg) to continue micro-progressing when large jumps cause technique breakdown.',
      'Track movement speed (velocity loss) to determine when high-fatigue sets cease providing productive stimulus.'
    ],
    recommendedSplits: ['Push Pull Legs + Upper Lower (PPL + UL 5-Day)', 'PPL 6-Day', 'Arnold Split + Legs Specialization'],
    commonPitfalls: [
      'Refusing to deload when joint aches and stagnation occur.',
      'Overtraining beyond systemic recovery capacity.',
      'Sacrificing recovery habits (sleep quality, hydration, protein timing).'
    ],
    weeklyVolumeGuidance: '16 - 22+ working sets per muscle group (autoregulated per mesocycle).',
    intensityGuidance: 'RPE 8 - 10 with planned RIR 0-1 on isolation, RPE 8 on compounds + deloads.'
  }
}
