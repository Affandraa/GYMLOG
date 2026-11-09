import type { WorkoutSplit } from '../types/split'

export const WORKOUT_SPLITS: WorkoutSplit[] = [
  // 1. Push Pull Legs (PPL - 6 Day or 3 Day repeatable)
  {
    id: 'ppl',
    name: 'Push Pull Legs (PPL)',
    shortName: 'PPL (6-Day)',
    tagline: 'The gold standard for balanced hypertrophy and strength',
    description: 'Separates movements by muscle mechanics: pushing muscles (Chest, Shoulders, Triceps), pulling muscles (Back, Biceps), and lower body (Quads, Hamstrings, Glutes, Calves). Allows each muscle group to be stimulated twice per week with 72h recovery.',
    recommendedDays: [3, 6],
    suitableLevels: ['intermediate', 'advanced'],
    progressiveOverloadProtocol: 'Add 1 rep per set each week until top of rep range is reached, then add 2.5kg to upper body lifts (5kg to lower body) and reset to bottom of range.',
    volumeGuidance: [
      { muscleGroup: 'Chest', weeklySets: '12-16 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Back', weeklySets: '14-18 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Shoulders', weeklySets: '12-16 sets', frequency: '2x / week', intensityRPE: 'RPE 8-9' },
      { muscleGroup: 'Biceps', weeklySets: '10-12 sets', frequency: '2x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Triceps', weeklySets: '10-12 sets', frequency: '2x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Quadriceps', weeklySets: '12-16 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Hamstrings', weeklySets: '10-14 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Calves', weeklySets: '8-10 sets', frequency: '2x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Abs', weeklySets: '6-8 sets', frequency: '2x / week', intensityRPE: 'RPE 8-9' },
    ],
    schedule: [
      {
        id: 'ppl_mon',
        dayOfWeek: 'Monday',
        name: 'Push A (Chest, Anterior Delts, Triceps)',
        isRestDay: false,
        targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
        estimatedDurationMinutes: 60,
        exercises: [
          {
            id: 'ex_1',
            name: 'Barbell Flat Bench Press',
            muscleGroup: 'Chest',
            targetSets: 3,
            targetReps: '6-8',
            restSeconds: 150,
            alternatives: ['Dumbbell Bench Press', 'Smith Machine Bench Press', 'Converging Chest Press Machine']
          },
          {
            id: 'ex_2',
            name: 'Incline Dumbbell Press',
            muscleGroup: 'Chest',
            targetSets: 3,
            targetReps: '8-10',
            restSeconds: 120,
            alternatives: ['Incline Barbell Press', 'Low-to-High Cable Fly', 'Hammer Strength Incline']
          },
          {
            id: 'ex_3',
            name: 'Dumbbell Lateral Raise',
            muscleGroup: 'Shoulders',
            targetSets: 4,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Cable Lateral Raise', 'Machine Lateral Raise']
          },
          {
            id: 'ex_4',
            name: 'Overhead Cable Triceps Extension',
            muscleGroup: 'Triceps',
            targetSets: 3,
            targetReps: '10-12',
            restSeconds: 90,
            alternatives: ['Skull Crushers', 'Dumbbell Overhead Extension']
          },
          {
            id: 'ex_5',
            name: 'Triceps Rope Pushdown',
            muscleGroup: 'Triceps',
            targetSets: 3,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Straight Bar Pushdown', 'Dips']
          }
        ]
      },
      {
        id: 'ppl_tue',
        dayOfWeek: 'Tuesday',
        name: 'Pull A (Lats, Upper Back, Rear Delts, Biceps)',
        isRestDay: false,
        targetMuscles: ['Back', 'Shoulders', 'Biceps'],
        estimatedDurationMinutes: 65,
        exercises: [
          {
            id: 'ex_6',
            name: 'Barbell Bent Over Row',
            muscleGroup: 'Back',
            targetSets: 3,
            targetReps: '6-8',
            restSeconds: 150,
            alternatives: ['Chest-Supported T-Bar Row', 'Seated Cable Row', 'One-Arm Dumbbell Row']
          },
          {
            id: 'ex_7',
            name: 'Lat Pulldown (Neutral Grip)',
            muscleGroup: 'Back',
            targetSets: 3,
            targetReps: '8-10',
            restSeconds: 120,
            alternatives: ['Weighted Pull-ups', 'Single-Arm Lat Pulldown', 'Assisted Chin-up Machine']
          },
          {
            id: 'ex_8',
            name: 'Face Pulls with Rope',
            muscleGroup: 'Shoulders',
            targetSets: 3,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Rear Delt Reverse Fly Machine', 'Bent-Over Dumbbell Rear Delt Raise']
          },
          {
            id: 'ex_9',
            name: 'Incline Dumbbell Bicep Curl',
            muscleGroup: 'Biceps',
            targetSets: 3,
            targetReps: '10-12',
            restSeconds: 90,
            alternatives: ['Barbell EZ Curl', 'Preacher Curl Machine']
          },
          {
            id: 'ex_10',
            name: 'Hammer Curl (Rope or Dumbbell)',
            muscleGroup: 'Biceps',
            targetSets: 3,
            targetReps: '10-12',
            restSeconds: 60,
            alternatives: ['Cable Hammer Curl', 'Reverse EZ Bar Curl']
          }
        ]
      },
      {
        id: 'ppl_wed',
        dayOfWeek: 'Wednesday',
        name: 'Legs A (Quads, Hamstrings, Calves, Abs)',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Abs'],
        estimatedDurationMinutes: 70,
        exercises: [
          {
            id: 'ex_11',
            name: 'Barbell Back Squat',
            muscleGroup: 'Quadriceps',
            targetSets: 3,
            targetReps: '6-8',
            restSeconds: 180,
            alternatives: ['Hack Squat Machine', 'Leg Press 45°', 'Smith Machine Squat']
          },
          {
            id: 'ex_12',
            name: 'Romanian Deadlift (RDL)',
            muscleGroup: 'Hamstrings',
            targetSets: 3,
            targetReps: '8-10',
            restSeconds: 150,
            alternatives: ['Dumbbell Romanian Deadlift', 'Seated Leg Curl', 'Lying Hamstring Curl']
          },
          {
            id: 'ex_13',
            name: 'Leg Extension Machine',
            muscleGroup: 'Quadriceps',
            targetSets: 3,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Walking Lunges', 'Bulgarian Split Squats']
          },
          {
            id: 'ex_14',
            name: 'Standing Calf Raise',
            muscleGroup: 'Calves',
            targetSets: 4,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Seated Calf Raise', 'Leg Press Calf Press']
          },
          {
            id: 'ex_15',
            name: 'Hanging Leg Raise',
            muscleGroup: 'Abs',
            targetSets: 3,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Cable Woodchoppers', 'Ab Wheel Rollout', 'Decline Bench Sit-up']
          }
        ]
      },
      {
        id: 'ppl_thu',
        dayOfWeek: 'Thursday',
        name: 'Push B (Overhead Strength, Chest Hypertrophy)',
        isRestDay: false,
        targetMuscles: ['Shoulders', 'Chest', 'Triceps'],
        estimatedDurationMinutes: 60,
        exercises: [
          {
            id: 'ex_16',
            name: 'Standing Overhead Barbell Press (OHP)',
            muscleGroup: 'Shoulders',
            targetSets: 3,
            targetReps: '6-8',
            restSeconds: 150,
            alternatives: ['Seated Dumbbell Shoulder Press', 'Machine Shoulder Press']
          },
          {
            id: 'ex_17',
            name: 'Flat Dumbbell Press',
            muscleGroup: 'Chest',
            targetSets: 3,
            targetReps: '8-10',
            restSeconds: 120,
            alternatives: ['Barbell Bench Press', 'Chest Dips (Bodyweight or Weighted)']
          },
          {
            id: 'ex_18',
            name: 'Cable Pec Fly',
            muscleGroup: 'Chest',
            targetSets: 3,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Pec Deck Machine Fly', 'Dumbbell Fly']
          },
          {
            id: 'ex_19',
            name: 'Cable Lateral Raise',
            muscleGroup: 'Shoulders',
            targetSets: 3,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Dumbbell Lateral Raise', 'Leaning Cable Lateral Raise']
          },
          {
            id: 'ex_20',
            name: 'Bar Dip (Triceps Focus)',
            muscleGroup: 'Triceps',
            targetSets: 3,
            targetReps: '8-12',
            restSeconds: 90,
            alternatives: ['Close Grip Bench Press', 'Cable Pushdowns']
          }
        ]
      },
      {
        id: 'ppl_fri',
        dayOfWeek: 'Friday',
        name: 'Pull B (Vertical & Horizontal Pulls, Forearms)',
        isRestDay: false,
        targetMuscles: ['Back', 'Biceps', 'Shoulders'],
        estimatedDurationMinutes: 60,
        exercises: [
          {
            id: 'ex_21',
            name: 'Chest Supported T-Bar Row',
            muscleGroup: 'Back',
            targetSets: 3,
            targetReps: '8-10',
            restSeconds: 120,
            alternatives: ['Barbell Row', 'Meadows Row', 'Seated Cable Row']
          },
          {
            id: 'ex_22',
            name: 'Close-Grip Lat Pulldown',
            muscleGroup: 'Back',
            targetSets: 3,
            targetReps: '10-12',
            restSeconds: 90,
            alternatives: ['Neutral Grip Chin-up', 'Single-Arm Cable Pulldown']
          },
          {
            id: 'ex_23',
            name: 'Reverse Pec Deck (Rear Delts)',
            muscleGroup: 'Shoulders',
            targetSets: 3,
            targetReps: '12-15',
            restSeconds: 60,
            alternatives: ['Face Pulls', 'Dumbbell Rear Delt Fly']
          },
          {
            id: 'ex_24',
            name: 'EZ-Bar Preacher Curl',
            muscleGroup: 'Biceps',
            targetSets: 3,
            targetReps: '10-12',
            restSeconds: 60,
            alternatives: ['Dumbbell Concentration Curl', 'Spider Curl']
          }
        ]
      },
      {
        id: 'ppl_sat',
        dayOfWeek: 'Saturday',
        name: 'Legs B (Hamstring & Posterior Chain Focus)',
        isRestDay: false,
        targetMuscles: ['Hamstrings', 'Quadriceps', 'Glutes', 'Calves'],
        estimatedDurationMinutes: 65,
        exercises: [
          {
            id: 'ex_25',
            name: 'Leg Press 45° (Feet High for Glutes/Hams)',
            muscleGroup: 'Quadriceps',
            targetSets: 3,
            targetReps: '10-12',
            restSeconds: 120,
            alternatives: ['Front Squat', 'Goblet Squat']
          },
          {
            id: 'ex_26',
            name: 'Lying Leg Curl Machine',
            muscleGroup: 'Hamstrings',
            targetSets: 3,
            targetReps: '10-12',
            restSeconds: 90,
            alternatives: ['Seated Leg Curl', 'Nordic Hamstring Curl']
          },
          {
            id: 'ex_27',
            name: 'Bulgarian Split Squat',
            muscleGroup: 'Quadriceps',
            targetSets: 3,
            targetReps: '8-10 each leg',
            restSeconds: 90,
            alternatives: ['Walking Dumbbell Lunges', 'Step-ups']
          },
          {
            id: 'ex_28',
            name: 'Seated Calf Raise',
            muscleGroup: 'Calves',
            targetSets: 4,
            targetReps: '15-20',
            restSeconds: 60,
            alternatives: ['Standing Calf Raise', 'Donkey Calf Machine']
          }
        ]
      },
      {
        id: 'ppl_sun',
        dayOfWeek: 'Sunday',
        name: 'Active Rest & Recovery Day',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: '20-30 min brisk walk, foam rolling, 8 hours sleep, and high protein hydration intake.'
      }
    ]
  },

  // 2. Push Pull Legs + Upper Lower (PPL + UL - 5 Day)
  {
    id: 'ppl_ul',
    name: 'Push Pull Legs + Upper Lower (PPL + UL)',
    shortName: 'PPL + UL (5-Day)',
    tagline: 'High-frequency sweet spot balancing intense volume and 2 full rest days',
    description: 'Combines 3 specific PPL days early in the week with 2 full Upper and Lower sessions later in the week. Excellent for intermediate to advanced lifters wanting maximum hypertrophy while keeping weekends free.',
    recommendedDays: [5],
    suitableLevels: ['intermediate', 'advanced'],
    progressiveOverloadProtocol: 'Prioritize heavy overload on the PPL days (6-8 reps), then focus on pump and metabolic fatigue (10-15 reps) on Upper/Lower days.',
    volumeGuidance: [
      { muscleGroup: 'Chest', weeklySets: '14-16 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Back', weeklySets: '14-18 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Shoulders', weeklySets: '12-14 sets', frequency: '2x / week', intensityRPE: 'RPE 8-9' },
      { muscleGroup: 'Quadriceps', weeklySets: '12-14 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Hamstrings', weeklySets: '10-12 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
    ],
    schedule: [
      {
        id: 'pplul_mon',
        dayOfWeek: 'Monday',
        name: 'Push (Chest, Delts, Triceps Focus)',
        isRestDay: false,
        targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_29', name: 'Barbell Bench Press', muscleGroup: 'Chest', targetSets: 4, targetReps: '6-8', restSeconds: 150, alternatives: ['Dumbbell Bench Press'] },
          { id: 'ex_30', name: 'Standing Barbell Overhead Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Dumbbell Shoulder Press'] },
          { id: 'ex_31', name: 'Incline Dumbbell Fly', muscleGroup: 'Chest', targetSets: 3, targetReps: '10-12', restSeconds: 90, alternatives: ['Cable Crossover'] },
          { id: 'ex_32', name: 'Lateral Cable Raise', muscleGroup: 'Shoulders', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Dumbbell Lateral Raise'] },
          { id: 'ex_33', name: 'Overhead Tricep Extension', muscleGroup: 'Triceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Skullcrushers'] }
        ]
      },
      {
        id: 'pplul_tue',
        dayOfWeek: 'Tuesday',
        name: 'Pull (Back Width, Thickness, Biceps)',
        isRestDay: false,
        targetMuscles: ['Back', 'Shoulders', 'Biceps'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_34', name: 'Barbell Deadlift or Rack Pull', muscleGroup: 'Back', targetSets: 3, targetReps: '5-6', restSeconds: 180, alternatives: ['Romanian Deadlift'] },
          { id: 'ex_35', name: 'Neutral Grip Lat Pulldown', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Pull-ups'] },
          { id: 'ex_36', name: 'Seated Cable Row', muscleGroup: 'Back', targetSets: 3, targetReps: '10-12', restSeconds: 90, alternatives: ['Chest Supported Row'] },
          { id: 'ex_37', name: 'Incline Dumbbell Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['EZ Bar Curl'] }
        ]
      },
      {
        id: 'pplul_wed',
        dayOfWeek: 'Wednesday',
        name: 'Legs (Compound Quad & Posterior Chain)',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves'],
        estimatedDurationMinutes: 65,
        exercises: [
          { id: 'ex_38', name: 'Barbell Back Squat', muscleGroup: 'Quadriceps', targetSets: 4, targetReps: '6-8', restSeconds: 180, alternatives: ['Hack Squat', 'Leg Press'] },
          { id: 'ex_39', name: 'Dumbbell Romanian Deadlift', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Lying Leg Curl'] },
          { id: 'ex_40', name: 'Walking Dumbbell Lunge', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '10 each', restSeconds: 90, alternatives: ['Bulgarian Split Squat'] },
          { id: 'ex_41', name: 'Standing Calf Raise', muscleGroup: 'Calves', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Seated Calf Raise'] }
        ]
      },
      {
        id: 'pplul_thu',
        dayOfWeek: 'Thursday',
        name: 'Mid-Week Rest & Nutrition Check',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Full recovery, stretching, dynamic mobility for hips and shoulders.'
      },
      {
        id: 'pplul_fri',
        dayOfWeek: 'Friday',
        name: 'Upper Body Power & Pump',
        isRestDay: false,
        targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'],
        estimatedDurationMinutes: 65,
        exercises: [
          { id: 'ex_42', name: 'Incline Barbell Bench Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Incline Dumbbell Press'] },
          { id: 'ex_43', name: 'Chest-Supported Row', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['One-Arm Dumbbell Row'] },
          { id: 'ex_44', name: 'Dumbbell Arnold Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '10-12', restSeconds: 90, alternatives: ['Overhead Dumbbell Press'] },
          { id: 'ex_45', name: 'Cable Tricep Pushdown + Hammer Curl Superset', muscleGroup: 'Arms' as any, targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Dips & EZ Bar Curls'] }
        ]
      },
      {
        id: 'pplul_sat',
        dayOfWeek: 'Saturday',
        name: 'Lower Body & Core Hypertrophy',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Abs'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_46', name: 'Hack Squat or Leg Press', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '8-10', restSeconds: 150, alternatives: ['Front Squat'] },
          { id: 'ex_47', name: 'Seated Leg Curl Machine', muscleGroup: 'Hamstrings', targetSets: 4, targetReps: '10-12', restSeconds: 90, alternatives: ['Lying Leg Curl'] },
          { id: 'ex_48', name: 'Barbell Hip Thrust', muscleGroup: 'Glutes', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Cable Pull Through'] },
          { id: 'ex_49', name: 'Hanging Knee/Leg Raise', muscleGroup: 'Abs', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Cable Crunch'] }
        ]
      },
      {
        id: 'pplul_sun',
        dayOfWeek: 'Sunday',
        name: 'Full Rest & Meal Prep Day',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Prepare weekly meals, hydrate, sleep 8+ hours.'
      }
    ]
  },

  // 3. Full Body Every Other Day (FBEOD - 3 Day)
  {
    id: 'fbeod',
    name: 'Full Body Every Other Day (FBEOD)',
    shortName: 'Full Body (3-Day)',
    tagline: 'Maximum muscle protein synthesis for beginners and busy lifters',
    description: 'Trains the entire body in every session with 48 hours of complete recovery in between. Highly recommended by exercise science for novices and people who can only commit to 3 days per week.',
    recommendedDays: [3],
    suitableLevels: ['beginner', 'intermediate'],
    progressiveOverloadProtocol: 'Simple linear progression: Add 1 rep or 1.25kg - 2.5kg to your main compound lift every workout session as long as form is strict.',
    volumeGuidance: [
      { muscleGroup: 'Chest', weeklySets: '9-12 sets', frequency: '3x / week (3-4 sets/session)', intensityRPE: 'RPE 6-8' },
      { muscleGroup: 'Back', weeklySets: '9-12 sets', frequency: '3x / week (3-4 sets/session)', intensityRPE: 'RPE 6-8' },
      { muscleGroup: 'Quadriceps', weeklySets: '9-12 sets', frequency: '3x / week', intensityRPE: 'RPE 6-8' },
      { muscleGroup: 'Hamstrings', weeklySets: '6-9 sets', frequency: '3x / week', intensityRPE: 'RPE 6-8' },
      { muscleGroup: 'Shoulders', weeklySets: '6-9 sets', frequency: '3x / week', intensityRPE: 'RPE 7-8' }
    ],
    schedule: [
      {
        id: 'fbeod_mon',
        dayOfWeek: 'Monday',
        name: 'Full Body A (Squat & Horizontal Focus)',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Chest', 'Back', 'Hamstrings', 'Abs'],
        estimatedDurationMinutes: 55,
        exercises: [
          { id: 'ex_50', name: 'Barbell Back Squat', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Goblet Squat', 'Leg Press'] },
          { id: 'ex_51', name: 'Flat Barbell Bench Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Dumbbell Bench Press'] },
          { id: 'ex_52', name: 'Barbell Bent Over Row', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Seated Cable Row'] },
          { id: 'ex_53', name: 'Lying Hamstring Leg Curl', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Romanian Deadlift'] },
          { id: 'ex_54', name: 'Plank Hold', muscleGroup: 'Abs', targetSets: 3, targetReps: '45-60s', restSeconds: 60, alternatives: ['Ab Crunch Machine'] }
        ]
      },
      {
        id: 'fbeod_tue',
        dayOfWeek: 'Tuesday',
        name: 'Rest & Neurological Recovery',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Light walking, 2.5L water, high protein meals.'
      },
      {
        id: 'fbeod_wed',
        dayOfWeek: 'Wednesday',
        name: 'Full Body B (Hinge & Vertical Focus)',
        isRestDay: false,
        targetMuscles: ['Hamstrings', 'Back', 'Shoulders', 'Quadriceps', 'Biceps'],
        estimatedDurationMinutes: 55,
        exercises: [
          { id: 'ex_55', name: 'Romanian Deadlift', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '8-10', restSeconds: 150, alternatives: ['Dumbbell RDL'] },
          { id: 'ex_56', name: 'Lat Pulldown or Assisted Pull-up', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Pull-ups'] },
          { id: 'ex_57', name: 'Overhead Dumbbell Shoulder Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Machine Shoulder Press'] },
          { id: 'ex_58', name: 'Leg Extension Machine', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Goblet Squat'] },
          { id: 'ex_59', name: 'Standing Dumbbell Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Cable Curl'] }
        ]
      },
      {
        id: 'fbeod_thu',
        dayOfWeek: 'Thursday',
        name: 'Rest & Recovery Day',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Joint mobility, foam rolling, restful sleep.'
      },
      {
        id: 'fbeod_fri',
        dayOfWeek: 'Friday',
        name: 'Full Body C (Accessory & Volume Focus)',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Chest', 'Back', 'Triceps', 'Calves'],
        estimatedDurationMinutes: 55,
        exercises: [
          { id: 'ex_60', name: 'Leg Press 45°', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '10-12', restSeconds: 120, alternatives: ['Smith Squat'] },
          { id: 'ex_61', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Push-ups (Weighted)'] },
          { id: 'ex_62', name: 'Seated Cable Row', muscleGroup: 'Back', targetSets: 3, targetReps: '10-12', restSeconds: 90, alternatives: ['Chest Supported T-Bar'] },
          { id: 'ex_63', name: 'Tricep Rope Pushdown', muscleGroup: 'Triceps', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Overhead Cable Extension'] },
          { id: 'ex_64', name: 'Standing Calf Raise', muscleGroup: 'Calves', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Seated Calf Raise'] }
        ]
      },
      {
        id: 'fbeod_sat',
        dayOfWeek: 'Saturday',
        name: 'Weekend Active Rest',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Outdoor activity, sports, recovery walk.'
      },
      {
        id: 'fbeod_sun',
        dayOfWeek: 'Sunday',
        name: 'Full Rest & Reset',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Sleep 8 hours, plan next week.'
      }
    ]
  },

  // 4. Arnold Split (Chest/Back, Shoulders/Arms, Legs - 6 Day)
  {
    id: 'arnold',
    name: 'Arnold Split',
    shortName: 'Arnold Split (6-Day)',
    tagline: 'The iconic golden-era antagonist superset split',
    description: 'Famously popularized by Arnold Schwarzenegger. Pairs opposing muscle groups: Chest & Back on Day 1 (giving massive upper-body pumps), Shoulders & Arms on Day 2, and Legs on Day 3, repeated twice per week.',
    recommendedDays: [6],
    suitableLevels: ['intermediate', 'advanced'],
    progressiveOverloadProtocol: 'Utilize antagonist pairings. Aim for increased rep density (doing the same sets with shorter rest between antagonist exercises) as well as load progression.',
    volumeGuidance: [
      { muscleGroup: 'Chest', weeklySets: '14-18 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Back', weeklySets: '14-18 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Biceps', weeklySets: '12-16 sets', frequency: '2x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Triceps', weeklySets: '12-16 sets', frequency: '2x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Shoulders', weeklySets: '12-16 sets', frequency: '2x / week', intensityRPE: 'RPE 8-9' }
    ],
    schedule: [
      {
        id: 'arnold_mon',
        dayOfWeek: 'Monday',
        name: 'Chest & Back (Antagonist Upper Pump)',
        isRestDay: false,
        targetMuscles: ['Chest', 'Back'],
        estimatedDurationMinutes: 70,
        exercises: [
          { id: 'ex_65', name: 'Barbell Flat Bench Press', muscleGroup: 'Chest', targetSets: 4, targetReps: '6-8', restSeconds: 120, alternatives: ['Dumbbell Press'] },
          { id: 'ex_66', name: 'Wide Grip Lat Pulldown / Pull-ups', muscleGroup: 'Back', targetSets: 4, targetReps: '8-10', restSeconds: 120, alternatives: ['Weighted Pull-up'] },
          { id: 'ex_67', name: 'Incline Dumbbell Bench Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Smith Incline Press'] },
          { id: 'ex_68', name: 'Barbell Bent Over Row', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['T-Bar Row'] },
          { id: 'ex_69', name: 'Dumbbell Pullover', muscleGroup: 'Chest', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Cable Straight-Arm Pulldown'] }
        ]
      },
      {
        id: 'arnold_tue',
        dayOfWeek: 'Tuesday',
        name: 'Shoulders & Arms (The Gun Show)',
        isRestDay: false,
        targetMuscles: ['Shoulders', 'Biceps', 'Triceps'],
        estimatedDurationMinutes: 65,
        exercises: [
          { id: 'ex_70', name: 'Seated Dumbbell Overhead Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Barbell Military Press'] },
          { id: 'ex_71', name: 'Lateral Raise (Dumbbell or Cable)', muscleGroup: 'Shoulders', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Machine Lateral Raise'] },
          { id: 'ex_72', name: 'Barbell EZ-Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: '8-10', restSeconds: 75, alternatives: ['Dumbbell Incline Curl'] },
          { id: 'ex_73', name: 'Lying Tricep Skull Crushers', muscleGroup: 'Triceps', targetSets: 3, targetReps: '8-10', restSeconds: 75, alternatives: ['Cable Overhead Extension'] },
          { id: 'ex_74', name: 'Incline Hammer Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Rope Cable Hammer'] },
          { id: 'ex_75', name: 'Tricep Rope Pushdown', muscleGroup: 'Triceps', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Straight Bar Pushdown'] }
        ]
      },
      {
        id: 'arnold_wed',
        dayOfWeek: 'Wednesday',
        name: 'Legs & Calves (Heavy Lower)',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Abs'],
        estimatedDurationMinutes: 70,
        exercises: [
          { id: 'ex_76', name: 'Barbell Back Squat', muscleGroup: 'Quadriceps', targetSets: 4, targetReps: '6-8', restSeconds: 180, alternatives: ['Front Squat', 'Hack Squat'] },
          { id: 'ex_77', name: 'Stiff-Legged Barbell Deadlift', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '8-10', restSeconds: 150, alternatives: ['Lying Leg Curl'] },
          { id: 'ex_78', name: 'Leg Extension Machine', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Sissy Squat'] },
          { id: 'ex_79', name: 'Donkey or Standing Calf Raise', muscleGroup: 'Calves', targetSets: 4, targetReps: '15-20', restSeconds: 60, alternatives: ['Seated Calf Raise'] }
        ]
      },
      {
        id: 'arnold_thu',
        dayOfWeek: 'Thursday',
        name: 'Chest & Back B (Volume & Squeeze)',
        isRestDay: false,
        targetMuscles: ['Chest', 'Back'],
        estimatedDurationMinutes: 65,
        exercises: [
          { id: 'ex_80', name: 'Incline Barbell Bench Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Incline DB Press'] },
          { id: 'ex_81', name: 'Seated Cable Row (Close Grip)', muscleGroup: 'Back', targetSets: 3, targetReps: '10-12', restSeconds: 90, alternatives: ['One-Arm Row'] },
          { id: 'ex_82', name: 'Cable Crossover / Fly', muscleGroup: 'Chest', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Pec Deck'] },
          { id: 'ex_83', name: 'Straight-Arm Cable Lat Pulldown', muscleGroup: 'Back', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Dumbbell Pullover'] }
        ]
      },
      {
        id: 'arnold_fri',
        dayOfWeek: 'Friday',
        name: 'Shoulders & Arms B (Metabolic Burn)',
        isRestDay: false,
        targetMuscles: ['Shoulders', 'Biceps', 'Triceps'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_84', name: 'Arnold Dumbbell Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '10-12', restSeconds: 90, alternatives: ['Machine Press'] },
          { id: 'ex_85', name: 'Face Pulls with External Rotation', muscleGroup: 'Shoulders', targetSets: 4, targetReps: '15-20', restSeconds: 60, alternatives: ['Rear Delt Machine'] },
          { id: 'ex_86', name: 'Preacher Curl Machine', muscleGroup: 'Biceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Spider Curl'] },
          { id: 'ex_87', name: 'Weighted Tricep Dips', muscleGroup: 'Triceps', targetSets: 3, targetReps: '8-12', restSeconds: 90, alternatives: ['Close-Grip Bench'] }
        ]
      },
      {
        id: 'arnold_sat',
        dayOfWeek: 'Saturday',
        name: 'Legs B (Glute & Hamstring Focus)',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
        estimatedDurationMinutes: 65,
        exercises: [
          { id: 'ex_88', name: 'Leg Press 45°', muscleGroup: 'Quadriceps', targetSets: 4, targetReps: '10-12', restSeconds: 120, alternatives: ['Squat'] },
          { id: 'ex_89', name: 'Seated Hamstring Leg Curl', muscleGroup: 'Hamstrings', targetSets: 4, targetReps: '10-12', restSeconds: 60, alternatives: ['Nordic Curls'] },
          { id: 'ex_90', name: 'Walking Dumbbell Lunges', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '12 steps/leg', restSeconds: 90, alternatives: ['Split Squat'] }
        ]
      },
      {
        id: 'arnold_sun',
        dayOfWeek: 'Sunday',
        name: 'Rest & Complete Recovery',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Total rest, nutritious refeed, restorative sleep.'
      }
    ]
  },

  // 5. Upper Lower Split (4 Day)
  {
    id: 'upper_lower',
    name: 'Upper Lower Split',
    shortName: 'Upper Lower (4-Day)',
    tagline: 'The most scientifically proven program for building drug-free muscle',
    description: 'Alternates between Upper Body days (Chest, Back, Shoulders, Arms) and Lower Body days (Quads, Hamstrings, Glutes, Calves). Perfect for 4 days per week: 2 days on, 1 day off, 2 days on, 2 days off.',
    recommendedDays: [4],
    suitableLevels: ['beginner', 'intermediate', 'advanced'],
    progressiveOverloadProtocol: 'Alternate between heavy power days (Monday/Tuesday: 5-8 reps) and hypertrophy volume days (Thursday/Friday: 10-15 reps).',
    volumeGuidance: [
      { muscleGroup: 'Chest', weeklySets: '10-14 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Back', weeklySets: '12-16 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Quadriceps', weeklySets: '10-14 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Hamstrings', weeklySets: '8-12 sets', frequency: '2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Shoulders', weeklySets: '8-12 sets', frequency: '2x / week', intensityRPE: 'RPE 8-9' }
    ],
    schedule: [
      {
        id: 'ul_mon',
        dayOfWeek: 'Monday',
        name: 'Upper A (Heavy Power)',
        isRestDay: false,
        targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_91', name: 'Barbell Flat Bench Press', muscleGroup: 'Chest', targetSets: 4, targetReps: '5-7', restSeconds: 150, alternatives: ['Dumbbell Bench Press'] },
          { id: 'ex_92', name: 'Barbell Bent Over Row', muscleGroup: 'Back', targetSets: 4, targetReps: '6-8', restSeconds: 150, alternatives: ['T-Bar Row'] },
          { id: 'ex_93', name: 'Standing Overhead Military Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '6-8', restSeconds: 120, alternatives: ['Seated DB Press'] },
          { id: 'ex_94', name: 'Incline Dumbbell Bicep Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: '8-10', restSeconds: 60, alternatives: ['Barbell Curl'] },
          { id: 'ex_95', name: 'Overhead Cable Triceps Extension', muscleGroup: 'Triceps', targetSets: 3, targetReps: '8-10', restSeconds: 60, alternatives: ['Dips'] }
        ]
      },
      {
        id: 'ul_tue',
        dayOfWeek: 'Tuesday',
        name: 'Lower A (Squat Dominant)',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Abs'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_96', name: 'Barbell Back Squat', muscleGroup: 'Quadriceps', targetSets: 4, targetReps: '6-8', restSeconds: 180, alternatives: ['Leg Press', 'Hack Squat'] },
          { id: 'ex_97', name: 'Romanian Deadlift', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '8-10', restSeconds: 150, alternatives: ['Lying Leg Curl'] },
          { id: 'ex_98', name: 'Leg Extension Machine', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Walking Lunges'] },
          { id: 'ex_99', name: 'Standing Calf Raise', muscleGroup: 'Calves', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Seated Calf Raise'] },
          { id: 'ex_100', name: 'Hanging Leg Raise', muscleGroup: 'Abs', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Cable Crunch'] }
        ]
      },
      {
        id: 'ul_wed',
        dayOfWeek: 'Wednesday',
        name: 'Mid-Week Rest & Recovery',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Brisk walk, hydration, stretching.'
      },
      {
        id: 'ul_thu',
        dayOfWeek: 'Thursday',
        name: 'Upper B (Hypertrophy & Pump)',
        isRestDay: false,
        targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_101', name: 'Incline Dumbbell Bench Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Incline Barbell'] },
          { id: 'ex_102', name: 'Lat Pulldown (Neutral Grip)', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Pull-ups'] },
          { id: 'ex_103', name: 'Seated Cable Row', muscleGroup: 'Back', targetSets: 3, targetReps: '10-12', restSeconds: 90, alternatives: ['One-Arm DB Row'] },
          { id: 'ex_104', name: 'Cable Lateral Raise', muscleGroup: 'Shoulders', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Dumbbell Lateral Raise'] },
          { id: 'ex_105', name: 'Cable Rope Tricep Pushdown', muscleGroup: 'Triceps', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Skull Crushers'] }
        ]
      },
      {
        id: 'ul_fri',
        dayOfWeek: 'Friday',
        name: 'Lower B (Hinge & Posterior Chain)',
        isRestDay: false,
        targetMuscles: ['Hamstrings', 'Quadriceps', 'Glutes', 'Calves'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_106', name: 'Barbell Deadlift or Trap Bar Deadlift', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '5-6', restSeconds: 180, alternatives: ['Rack Pull'] },
          { id: 'ex_107', name: 'Leg Press 45°', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '10-12', restSeconds: 120, alternatives: ['Goblet Squat'] },
          { id: 'ex_108', name: 'Seated Leg Curl Machine', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Lying Leg Curl'] },
          { id: 'ex_109', name: 'Seated Calf Raise', muscleGroup: 'Calves', targetSets: 4, targetReps: '15-20', restSeconds: 60, alternatives: ['Standing Calf Raise'] }
        ]
      },
      {
        id: 'ul_sat',
        dayOfWeek: 'Saturday',
        name: 'Weekend Active Rest',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Outdoor walk, recovery bath, protein intake.'
      },
      {
        id: 'ul_sun',
        dayOfWeek: 'Sunday',
        name: 'Full Rest & Week Review',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Sleep 8 hours, log weekly weigh-in.'
      }
    ]
  },

  // 6. Bro Split (5 Day Single-Muscle Group)
  {
    id: 'bro_split',
    name: 'Classic Bro Split',
    shortName: 'Bro Split (5-Day)',
    tagline: 'High volume annihilation of one muscle group per session',
    description: 'Devotes an entire workout to a single body part: Chest on Monday, Back on Tuesday, Shoulders on Wednesday, Legs on Thursday, and Arms on Friday. Popular among classic bodybuilders for intense localized pumps.',
    recommendedDays: [5],
    suitableLevels: ['intermediate', 'advanced'],
    progressiveOverloadProtocol: 'Focus on high volume and mind-muscle connection. Progress by increasing volume per session or adding intensity techniques (drop sets, rest-pause) on the final set.',
    volumeGuidance: [
      { muscleGroup: 'Chest', weeklySets: '16-20 sets', frequency: '1x / week (high density)', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Back', weeklySets: '16-20 sets', frequency: '1x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Shoulders', weeklySets: '14-18 sets', frequency: '1x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Quadriceps', weeklySets: '14-16 sets', frequency: '1x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Biceps', weeklySets: '12-14 sets', frequency: '1x / week', intensityRPE: 'RPE 8-10' },
      { muscleGroup: 'Triceps', weeklySets: '12-14 sets', frequency: '1x / week', intensityRPE: 'RPE 8-10' }
    ],
    schedule: [
      {
        id: 'bro_mon',
        dayOfWeek: 'Monday',
        name: 'International Chest Day',
        isRestDay: false,
        targetMuscles: ['Chest'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_110', name: 'Barbell Flat Bench Press', muscleGroup: 'Chest', targetSets: 4, targetReps: '6-8', restSeconds: 120, alternatives: ['Dumbbell Bench Press'] },
          { id: 'ex_111', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', targetSets: 4, targetReps: '8-10', restSeconds: 90, alternatives: ['Incline Barbell'] },
          { id: 'ex_112', name: 'Cable Chest Fly (High-to-Low)', muscleGroup: 'Chest', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Pec Deck'] },
          { id: 'ex_113', name: 'Chest Dips', muscleGroup: 'Chest', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Push-ups'] }
        ]
      },
      {
        id: 'bro_tue',
        dayOfWeek: 'Tuesday',
        name: 'Back & Lats Obliteration',
        isRestDay: false,
        targetMuscles: ['Back'],
        estimatedDurationMinutes: 65,
        exercises: [
          { id: 'ex_114', name: 'Deadlift or Heavy Rack Pull', muscleGroup: 'Back', targetSets: 3, targetReps: '5-6', restSeconds: 180, alternatives: ['Barbell Row'] },
          { id: 'ex_115', name: 'Barbell Bent Over Row', muscleGroup: 'Back', targetSets: 4, targetReps: '8-10', restSeconds: 120, alternatives: ['T-Bar Row'] },
          { id: 'ex_116', name: 'Lat Pulldown (Wide Grip)', muscleGroup: 'Back', targetSets: 4, targetReps: '10-12', restSeconds: 90, alternatives: ['Pull-ups'] },
          { id: 'ex_117', name: 'Single-Arm Dumbbell Row', muscleGroup: 'Back', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Cable Row'] }
        ]
      },
      {
        id: 'bro_wed',
        dayOfWeek: 'Wednesday',
        name: 'Shoulders & Traps Boulder Day',
        isRestDay: false,
        targetMuscles: ['Shoulders'],
        estimatedDurationMinutes: 60,
        exercises: [
          { id: 'ex_118', name: 'Seated Dumbbell Shoulder Press', muscleGroup: 'Shoulders', targetSets: 4, targetReps: '8-10', restSeconds: 120, alternatives: ['Barbell OHP'] },
          { id: 'ex_119', name: 'Dumbbell Lateral Raise', muscleGroup: 'Shoulders', targetSets: 5, targetReps: '12-15', restSeconds: 60, alternatives: ['Cable Lateral Raise'] },
          { id: 'ex_120', name: 'Rear Delt Fly Machine', muscleGroup: 'Shoulders', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Face Pulls'] },
          { id: 'ex_121', name: 'Barbell or Dumbbell Shrugs', muscleGroup: 'Shoulders', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Smith Shrugs'] }
        ]
      },
      {
        id: 'bro_thu',
        dayOfWeek: 'Thursday',
        name: 'Brutal Leg Day',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves'],
        estimatedDurationMinutes: 70,
        exercises: [
          { id: 'ex_122', name: 'Barbell Back Squat', muscleGroup: 'Quadriceps', targetSets: 4, targetReps: '6-8', restSeconds: 180, alternatives: ['Hack Squat', 'Leg Press'] },
          { id: 'ex_123', name: 'Leg Press 45°', muscleGroup: 'Quadriceps', targetSets: 4, targetReps: '10-12', restSeconds: 120, alternatives: ['Front Squat'] },
          { id: 'ex_124', name: 'Lying Hamstring Leg Curl', muscleGroup: 'Hamstrings', targetSets: 4, targetReps: '10-12', restSeconds: 60, alternatives: ['RDL'] },
          { id: 'ex_125', name: 'Standing Calf Raise', muscleGroup: 'Calves', targetSets: 4, targetReps: '15-20', restSeconds: 60, alternatives: ['Seated Calf Raise'] }
        ]
      },
      {
        id: 'bro_fri',
        dayOfWeek: 'Friday',
        name: 'Arm Day Super-Sets (Biceps & Triceps)',
        isRestDay: false,
        targetMuscles: ['Biceps', 'Triceps'],
        estimatedDurationMinutes: 55,
        exercises: [
          { id: 'ex_126', name: 'EZ Bar Bicep Curl', muscleGroup: 'Biceps', targetSets: 4, targetReps: '8-10', restSeconds: 60, alternatives: ['Dumbbell Curl'] },
          { id: 'ex_127', name: 'Close-Grip Bench Press', muscleGroup: 'Triceps', targetSets: 4, targetReps: '8-10', restSeconds: 90, alternatives: ['Dips'] },
          { id: 'ex_128', name: 'Incline Dumbbell Hammer Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Cable Hammer'] },
          { id: 'ex_129', name: 'Overhead Cable Tricep Extension', muscleGroup: 'Triceps', targetSets: 4, targetReps: '12-15', restSeconds: 60, alternatives: ['Skull Crushers'] }
        ]
      },
      {
        id: 'bro_sat',
        dayOfWeek: 'Saturday',
        name: 'Rest & Active Recovery',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Hydrate, enjoy time outside, light mobility.'
      },
      {
        id: 'bro_sun',
        dayOfWeek: 'Sunday',
        name: 'Rest & Mental Reset',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Sleep 8 hours, prep nutrition for Monday Chest Day.'
      }
    ]
  },

  // 7. Custom Split
  {
    id: 'custom',
    name: 'Custom Flexible Split',
    shortName: 'Custom (User Defined)',
    tagline: 'Tailor each training day to your personal lifestyle and equipment',
    description: 'Fully customizable split where you decide which days to train, what muscle groups to target, and how to allocate rest days. Great for athletes with rotating work shifts or home gym constraints.',
    recommendedDays: [2, 3, 4, 5, 6],
    suitableLevels: ['beginner', 'intermediate', 'advanced'],
    progressiveOverloadProtocol: 'Personalize your progressive overload target based on your current training cycle.',
    volumeGuidance: [
      { muscleGroup: 'Chest', weeklySets: '8-16 sets', frequency: '1-2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Back', weeklySets: '10-18 sets', frequency: '1-2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Quadriceps', weeklySets: '8-16 sets', frequency: '1-2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Hamstrings', weeklySets: '6-14 sets', frequency: '1-2x / week', intensityRPE: 'RPE 7-9' },
      { muscleGroup: 'Shoulders', weeklySets: '8-14 sets', frequency: '1-2x / week', intensityRPE: 'RPE 7-9' }
    ],
    schedule: [
      {
        id: 'cust_mon',
        dayOfWeek: 'Monday',
        name: 'Upper Body Focus',
        isRestDay: false,
        targetMuscles: ['Chest', 'Back', 'Shoulders'],
        estimatedDurationMinutes: 55,
        exercises: [
          { id: 'ex_130', name: 'Barbell Flat Bench Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Dumbbell Press'] },
          { id: 'ex_131', name: 'Seated Cable Row', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Dumbbell Row'] },
          { id: 'ex_132', name: 'Dumbbell Lateral Raise', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '12-15', restSeconds: 60, alternatives: ['Cable Lateral Raise'] }
        ]
      },
      {
        id: 'cust_tue',
        dayOfWeek: 'Tuesday',
        name: 'Lower Body Focus',
        isRestDay: false,
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves'],
        estimatedDurationMinutes: 55,
        exercises: [
          { id: 'ex_133', name: 'Barbell Squat or Leg Press', muscleGroup: 'Quadriceps', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Goblet Squat'] },
          { id: 'ex_134', name: 'Romanian Deadlift', muscleGroup: 'Hamstrings', targetSets: 3, targetReps: '8-10', restSeconds: 120, alternatives: ['Leg Curl'] },
          { id: 'ex_135', name: 'Calf Raise', muscleGroup: 'Calves', targetSets: 3, targetReps: '15-20', restSeconds: 60, alternatives: ['Seated Calf'] }
        ]
      },
      {
        id: 'cust_wed',
        dayOfWeek: 'Wednesday',
        name: 'Rest Day',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Stretching and hydration.'
      },
      {
        id: 'cust_thu',
        dayOfWeek: 'Thursday',
        name: 'Push & Core',
        isRestDay: false,
        targetMuscles: ['Chest', 'Shoulders', 'Abs'],
        estimatedDurationMinutes: 50,
        exercises: [
          { id: 'ex_136', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Barbell Press'] },
          { id: 'ex_137', name: 'Overhead Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Arnold Press'] },
          { id: 'ex_138', name: 'Plank Hold', muscleGroup: 'Abs', targetSets: 3, targetReps: '60s', restSeconds: 60, alternatives: ['Hanging Leg Raise'] }
        ]
      },
      {
        id: 'cust_fri',
        dayOfWeek: 'Friday',
        name: 'Pull & Arms',
        isRestDay: false,
        targetMuscles: ['Back', 'Biceps', 'Triceps'],
        estimatedDurationMinutes: 50,
        exercises: [
          { id: 'ex_139', name: 'Lat Pulldown', muscleGroup: 'Back', targetSets: 3, targetReps: '8-10', restSeconds: 90, alternatives: ['Pull-ups'] },
          { id: 'ex_140', name: 'Dumbbell Bicep Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Hammer Curl'] },
          { id: 'ex_141', name: 'Tricep Rope Pushdown', muscleGroup: 'Triceps', targetSets: 3, targetReps: '10-12', restSeconds: 60, alternatives: ['Dips'] }
        ]
      },
      {
        id: 'cust_sat',
        dayOfWeek: 'Saturday',
        name: 'Rest Day',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Recovery walk and rest.'
      },
      {
        id: 'cust_sun',
        dayOfWeek: 'Sunday',
        name: 'Rest Day',
        isRestDay: true,
        targetMuscles: [],
        estimatedDurationMinutes: 0,
        exercises: [],
        recoveryFocus: 'Prepare for the week ahead.'
      }
    ]
  }
]
