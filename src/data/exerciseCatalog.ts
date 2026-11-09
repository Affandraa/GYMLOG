import type { MuscleGroup } from '../types/split'

export interface CatalogExercise {
  id: string
  name: string
  muscleGroup: MuscleGroup
  category: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight'
  isCompound: boolean
  defaultSets: number
  defaultReps: string
  defaultRestSeconds: number
  alternatives: string[]
  description: string
  instructions: string[]
}

export const EXERCISE_CATALOG: CatalogExercise[] = [
  // CHEST
  {
    id: 'cat_chest_1',
    name: 'Barbell Flat Bench Press',
    muscleGroup: 'Chest',
    category: 'barbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '6-8',
    defaultRestSeconds: 150,
    alternatives: ['Dumbbell Bench Press', 'Seated Machine Chest Press', 'Chest Dips'],
    description: 'Primary compound movement for overall chest mass, anterior deltoids, and triceps power.',
    instructions: [
      'Lie flat on the bench with eyes directly under the racked bar, feet planted firmly into the floor.',
      'Grip the bar slightly wider than shoulder-width. Retract and depress your scapulae.',
      'Unrack the bar, take a deep breath into your belly, and lower the bar under control to the lower-mid sternum.',
      'Press explosively upwards while driving feet into the floor, lockout without unlocking your shoulder blades.'
    ]
  },
  {
    id: 'cat_chest_2',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    category: 'dumbbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 120,
    alternatives: ['Incline Barbell Bench', 'Low-to-High Cable Fly', 'Seated Machine Chest Press'],
    description: 'Overloads the clavicular head (upper chest) through a 30° to 45° angle.',
    instructions: [
      'Set bench to a 30-degree incline. Kick dumbbells up to shoulder level with your knees.',
      'Keep your wrists stacked directly over your elbows with chest proud and shoulder blades pinned.',
      'Lower the dumbbells until you feel a deep stretch in the upper pec fibers.',
      'Press upward in an arc towards the midline, squeezing your chest at the peak without clacking the weights.'
    ]
  },
  {
    id: 'cat_chest_3',
    name: 'Pec Deck Machine (Chest Fly)',
    muscleGroup: 'Chest',
    category: 'machine',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Cable Crossover / High-to-Low Fly', 'Dumbbell Flat Bench Press'],
    description: 'Isolates chest fibers through pure horizontal adduction with constant mechanical tension.',
    instructions: [
      'Adjust seat height so the handles align directly with your mid-chest.',
      'Maintain a slight bend in your elbows and keep your chest upright with shoulders retracted against the pad.',
      'Sweep your arms forward like hugging a tree, focusing purely on contracting your pecs together.',
      'Slowly control the weight back over 2-3 seconds until you feel a comfortable chest stretch.'
    ]
  },
  {
    id: 'cat_chest_4',
    name: 'Seated Machine Chest Press',
    muscleGroup: 'Chest',
    category: 'machine',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 90,
    alternatives: ['Barbell Flat Bench Press', 'Dumbbell Flat Bench Press', 'Pec Deck Machine (Chest Fly)'],
    description: 'Safe, guided resistance allowing high-intensity training close to failure without balance limitations.',
    instructions: [
      'Position seat so handles are at mid-chest level. Grip handles firmly and retract shoulders.',
      'Keep elbows at a 45-degree angle relative to torso (avoid flaring elbows 90 degrees).',
      'Press forward powerfully until arms are nearly straight.',
      'Return slowly to the starting depth with elbows tracking parallel to handle axis.'
    ]
  },
  {
    id: 'cat_chest_5',
    name: 'Dumbbell Flat Bench Press',
    muscleGroup: 'Chest',
    category: 'dumbbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 120,
    alternatives: ['Barbell Flat Bench Press', 'Seated Machine Chest Press'],
    description: 'Allows deep pectoral stretch, independent arm stabilization, and neutral wrist tracking.',
    instructions: [
      'Sit on bench with dumbbells resting on thighs. Kick dumbbells up and lie back into position.',
      'Tuck elbows at 45 degrees, lower dumbbells until your chest achieves a full comfortable stretch.',
      'Drive dumbbells up, converging slightly at the top while keeping tension on the pecs.'
    ]
  },
  {
    id: 'cat_chest_6',
    name: 'Cable Crossover / High-to-Low Fly',
    muscleGroup: 'Chest',
    category: 'cable',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Pec Deck Machine (Chest Fly)', 'Decline Dumbbell Bench Press'],
    description: 'Continuous cable resistance targeting the lower sternal fibers and inner chest.',
    instructions: [
      'Set pulleys high on the cable cross machine. Step forward into a staggered stance with a slight forward torso lean.',
      'With elbows slightly bent, bring handles down and together in front of your hips.',
      'Cross hands slightly at the bottom to maximize peak sternal contraction.',
      'Resist the cables as they pull your arms back up to shoulder height.'
    ]
  },
  {
    id: 'cat_chest_7',
    name: 'Chest Dips (Bodyweight / Weighted)',
    muscleGroup: 'Chest',
    category: 'bodyweight',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSeconds: 90,
    alternatives: ['Decline Dumbbell Bench Press', 'Barbell Flat Bench Press'],
    description: 'Lean torso forward 30 degrees to shift primary overload to lower chest and anterior delts.',
    instructions: [
      'Mount the dip bars and lean your chest forward roughly 30 degrees with knees bent.',
      'Lower your body by allowing elbows to flare slightly until your shoulders are just below your elbows.',
      'Push through your palms, straightening arms while maintaining the forward chest angle.'
    ]
  },
  {
    id: 'cat_chest_8',
    name: 'Decline Dumbbell Bench Press',
    muscleGroup: 'Chest',
    category: 'dumbbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 90,
    alternatives: ['Cable Crossover / High-to-Low Fly', 'Chest Dips (Bodyweight / Weighted)'],
    description: 'Heavy overload for the sternal head with significantly reduced shoulder joint shear.',
    instructions: [
      'Secure feet under the roller pads of a decline bench holding dumbbells.',
      'Lie back, lower the dumbbells to lower-chest level with elbows angled comfortably.',
      'Press vertically upward and squeeze the pecs hard at the top.'
    ]
  },

  // BACK
  {
    id: 'cat_back_1',
    name: 'Lat Pulldown (Neutral / Wide Grip)',
    muscleGroup: 'Back',
    category: 'cable',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 90,
    alternatives: ['Pull-ups (Bodyweight / Weighted)', 'Chest-Supported T-Bar Row', 'Single-Arm Dumbbell Row'],
    description: 'Vertical pulling powerhouse for latissimus dorsi width and mid-back development.',
    instructions: [
      'Lock thighs firmly under the thigh pads. Grip the bar outside shoulder width or with neutral grips.',
      'Arch upper chest slightly towards the ceiling and depress your scapulae.',
      'Pull elbows down towards your hips until the bar reaches collarbone height.',
      'Control the ascent for 2 full seconds until lats reach full stretch at the top.'
    ]
  },
  {
    id: 'cat_back_2',
    name: 'Barbell Bent-Over Row',
    muscleGroup: 'Back',
    category: 'barbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '6-8',
    defaultRestSeconds: 120,
    alternatives: ['Chest-Supported T-Bar Row', 'Seated Cable Row', 'Single-Arm Dumbbell Row'],
    description: 'Compound horizontal pull building total back thickness, rhomboids, and spinal erectors.',
    instructions: [
      'Hinge hips back to a 45-degree torso angle with a flat back and slight knee bend.',
      'Grip the bar slightly wider than shoulder width with an overhand or underhand grip.',
      'Pull the bar towards your belly button by driving elbows back behind the ribs.',
      'Lower the bar under control without letting your lower back round.'
    ]
  },
  {
    id: 'cat_back_3',
    name: 'Seated Cable Row',
    muscleGroup: 'Back',
    category: 'cable',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 90,
    alternatives: ['Chest-Supported T-Bar Row', 'Barbell Bent-Over Row'],
    description: 'Constant horizontal pulling tension with varied grip attachments (close V-bar or neutral).',
    instructions: [
      'Sit upright with knees slightly bent and feet placed securely on the footrests.',
      'Pull handle to lower abdomen, squeezing shoulder blades together and keeping chest tall.',
      'Avoid excessive rocking; let arms extend fully to stretch the lats forward on the eccentric.'
    ]
  },
  {
    id: 'cat_back_4',
    name: 'Chest-Supported T-Bar Row',
    muscleGroup: 'Back',
    category: 'machine',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 90,
    alternatives: ['Barbell Bent-Over Row', 'Seated Cable Row'],
    description: 'Eliminates lower-back fatigue so you can push lats and upper back to true mechanical failure.',
    instructions: [
      'Adjust foot platform so upper chest rests comfortably at the top of the pad.',
      'Take a neutral or overhand grip. Pull elbows back as far as possible.',
      'Hold the peak contraction for 1 second, then lower slowly.'
    ]
  },
  {
    id: 'cat_back_5',
    name: 'Single-Arm Dumbbell Row',
    muscleGroup: 'Back',
    category: 'dumbbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    alternatives: ['Seated Cable Row', 'Chest-Supported T-Bar Row'],
    description: 'Unilateral movement allowing deep lat stretch, greater range of motion, and symmetry.',
    instructions: [
      'Place one knee and same-side hand on a flat bench. Keep back flat and spine neutral.',
      'Pull dumbbell towards your hip crease with your elbow skimming your ribs.',
      'Lower dumbbell down with full control until lat is stretched.'
    ]
  },
  {
    id: 'cat_back_6',
    name: 'Barbell Deadlift',
    muscleGroup: 'Back',
    category: 'barbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '5-6',
    defaultRestSeconds: 180,
    alternatives: ['Barbell Bent-Over Row', 'Romanian Deadlift (Barbell RDL)'],
    description: 'The premier compound strength builder for posterior chain, erector spinae, and grip.',
    instructions: [
      'Stand with feet hip-width apart, barbell cutting across the middle of your shoelaces.',
      'Hinge hips back, grip bar just outside knees. Wedge shins to bar and pull chest tall.',
      'Push the floor away through your mid-foot, driving hips forward into full lockout.'
    ]
  },
  {
    id: 'cat_back_7',
    name: 'Straight-Arm Cable Lat Pulldown',
    muscleGroup: 'Back',
    category: 'cable',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Lat Pulldown (Neutral / Wide Grip)', 'Seated Cable Row'],
    description: 'Isolates the lats through pure shoulder extension without bicep involvement.',
    instructions: [
      'Attach a straight bar or rope to a high pulley. Stand back with slight hip hinge.',
      'With elbows slightly unlocked but stiff, pull bar down in an arc to your thighs.',
      'Squeeze lats intensely at the bottom, then let bar return to eye level.'
    ]
  },
  {
    id: 'cat_back_8',
    name: 'Pull-ups (Bodyweight / Weighted)',
    muscleGroup: 'Back',
    category: 'bodyweight',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '6-10',
    defaultRestSeconds: 120,
    alternatives: ['Lat Pulldown (Neutral / Wide Grip)', 'Chest-Supported T-Bar Row'],
    description: 'Golden standard test of relative upper-body strength and wide lat development.',
    instructions: [
      'Hang from bar with hands slightly wider than shoulders in an overhand grip.',
      'Pull chest towards the bar by driving elbows down and back.',
      'Clear bar with chin, pause briefly, then lower to a dead-hang stretch.'
    ]
  },

  // SHOULDERS
  {
    id: 'cat_shld_1',
    name: 'Standing Overhead Barbell Press (OHP)',
    muscleGroup: 'Shoulders',
    category: 'barbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '6-8',
    defaultRestSeconds: 150,
    alternatives: ['Seated Dumbbell Shoulder Press', 'Arnold Dumbbell Press'],
    description: 'Fundamental vertical pressing movement building thick front delts, triceps, and core stability.',
    instructions: [
      'Clean or unrack bar onto anterior shoulders with elbows slightly in front of bar.',
      'Squeeze glutes and brace abs tightly. Press bar straight up, pulling head back slightly to clear chin.',
      'Lock bar out directly overhead in line with your mid-foot.'
    ]
  },
  {
    id: 'cat_shld_2',
    name: 'Seated Dumbbell Shoulder Press',
    muscleGroup: 'Shoulders',
    category: 'dumbbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 120,
    alternatives: ['Standing Overhead Barbell Press (OHP)', 'Arnold Dumbbell Press'],
    description: 'Allows natural wrist rotation and joint-friendly arm path for pure deltoid hypertrophy.',
    instructions: [
      'Sit on upright bench. Hoist dumbbells up to ear height with knuckles facing up.',
      'Press weights up in an arc, stopping just short of touching overhead.',
      'Lower under control until dumbbells reach ear/jaw level.'
    ]
  },
  {
    id: 'cat_shld_3',
    name: 'Dumbbell Lateral Raise',
    muscleGroup: 'Shoulders',
    category: 'dumbbell',
    isCompound: false,
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Cable Lateral Raise', 'Arnold Dumbbell Press'],
    description: 'Essential isolation exercise for building shoulder width (lateral deltoid head).',
    instructions: [
      'Stand tall or lean slightly forward with dumbbells at your sides.',
      'Raise arms out to sides leading with elbows until parallel to the floor.',
      'Pour from a pitcher slightly at the top, lower smoothly over 2 seconds.'
    ]
  },
  {
    id: 'cat_shld_4',
    name: 'Cable Lateral Raise',
    muscleGroup: 'Shoulders',
    category: 'cable',
    isCompound: false,
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Dumbbell Lateral Raise', 'Arnold Dumbbell Press'],
    description: 'Provides constant mechanical tension through the bottom lengthened position.',
    instructions: [
      'Set cable pulley to lowest or wrist height. Grip with opposite hand behind your back or across body.',
      'Raise cable diagonally outward to shoulder height, keeping shoulder down.',
      'Lower slowly, resisting the cable stretch.'
    ]
  },
  {
    id: 'cat_shld_5',
    name: 'Face Pulls with Rope',
    muscleGroup: 'Shoulders',
    category: 'cable',
    isCompound: false,
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRestSeconds: 60,
    alternatives: ['Reverse Pec Deck (Rear Delt Fly)', 'Dumbbell Lateral Raise'],
    description: 'Crucial for rear deltoids, external rotators, and bulletproofing shoulder joint mechanics.',
    instructions: [
      'Set cable at eye level with rope attachment. Step back into an athletic stance.',
      'Pull rope towards your face while pulling hands apart, externally rotating thumbs backwards.',
      'Squeeze rear delts and upper back hard at the contraction.'
    ]
  },
  {
    id: 'cat_shld_6',
    name: 'Reverse Pec Deck (Rear Delt Fly)',
    muscleGroup: 'Shoulders',
    category: 'machine',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Face Pulls with Rope', 'Dumbbell Lateral Raise'],
    description: 'Chest against pad cleanly locks the scapula to isolate the posterior deltoid.',
    instructions: [
      'Sit facing the machine with chest flat against the pad, handles at shoulder height.',
      'With elbows slightly unlocked, drive arms back in a wide arc until hands align with torso.',
      'Slowly return to the start without letting the weight plates touch.'
    ]
  },
  {
    id: 'cat_shld_7',
    name: 'Arnold Dumbbell Press',
    muscleGroup: 'Shoulders',
    category: 'dumbbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 90,
    alternatives: ['Seated Dumbbell Shoulder Press', 'Standing Overhead Barbell Press (OHP)'],
    description: 'Classic rotating dumbbell press hitting anterior and lateral deltoids through full ROM.',
    instructions: [
      'Hold dumbbells at collarbone level with palms facing your chest (like top of a bicep curl).',
      'As you press overhead, rotate your wrists outwards so palms face forward at top lockout.',
      'Reverse the rotation as you lower back to your chest.'
    ]
  },

  // BICEPS
  {
    id: 'cat_bic_1',
    name: 'Incline Dumbbell Bicep Curl',
    muscleGroup: 'Biceps',
    category: 'dumbbell',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    alternatives: ['Barbell EZ-Curl', 'Dumbbell Hammer Curl', 'Preacher Curl Machine'],
    description: 'Lengthened-position curl delivering deep mechanical stretch to the bicep long head.',
    instructions: [
      'Set bench to 45-60 degree incline. Lie back and let arms hang perpendicular to floor.',
      'Curl dumbbells up while keeping elbows stationary behind torso.',
      'Supinate wrists at the top and squeeze, lowering under full control.'
    ]
  },
  {
    id: 'cat_bic_2',
    name: 'Barbell EZ-Curl',
    muscleGroup: 'Biceps',
    category: 'barbell',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 90,
    alternatives: ['Incline Dumbbell Bicep Curl', 'Dumbbell Hammer Curl'],
    description: 'Heavy overload curl with angled EZ-bar reducing wrist strain.',
    instructions: [
      'Grip the inner camber of the EZ-bar shoulder-width apart.',
      'Pin elbows to sides, curl weight up towards upper chest without leaning backward.',
      'Lower bar over 2-3 seconds until arms are fully straight.'
    ]
  },
  {
    id: 'cat_bic_3',
    name: 'Dumbbell Hammer Curl',
    muscleGroup: 'Biceps',
    category: 'dumbbell',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 60,
    alternatives: ['Barbell EZ-Curl', 'Preacher Curl Machine'],
    description: 'Neutral grip targeting the brachialis and brachioradialis for forearm and arm thickness.',
    instructions: [
      'Hold dumbbells with palms facing each other (neutral grip).',
      'Curl weights upward keeping palms facing inward throughout the movement.',
      'Squeeze the outer arm at the top and lower smoothly.'
    ]
  },
  {
    id: 'cat_bic_4',
    name: 'Preacher Curl Machine',
    muscleGroup: 'Biceps',
    category: 'machine',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 60,
    alternatives: ['Incline Dumbbell Bicep Curl', 'Barbell EZ-Curl'],
    description: 'Strict isolation locking upper arms to prevent momentum and shoulder recruitment.',
    instructions: [
      'Seat yourself so your armpits rest comfortably over the top of the angled pad.',
      'Grip handles and curl upwards, focusing purely on bicep contraction.',
      'Lower slowly until arms reach full extension at the bottom.'
    ]
  },

  // TRICEPS
  {
    id: 'cat_tri_1',
    name: 'Overhead Cable Triceps Extension',
    muscleGroup: 'Triceps',
    category: 'cable',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    alternatives: ['Triceps Rope Pushdown', 'Lying Triceps Skull Crushers (EZ Bar)', 'Close-Grip Bench Press'],
    description: 'Maximizes the stretch on the long head of the triceps overhead.',
    instructions: [
      'Attach rope to mid-high pulley. Turn away from the stack with rope behind head.',
      'Keep elbows pinned near ears and extend forearms forward into a straight line.',
      'Separate rope ends at full extension, then return to full deep stretch behind head.'
    ]
  },
  {
    id: 'cat_tri_2',
    name: 'Triceps Rope Pushdown',
    muscleGroup: 'Triceps',
    category: 'cable',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Overhead Cable Triceps Extension', 'Close-Grip Bench Press'],
    description: 'Spreading the rope at the bottom produces intense contraction on the lateral head.',
    instructions: [
      'Stand facing high pulley, gripping rope attachment with elbows tucked at ribs.',
      'Push hands down towards floor, spreading the rope apart at the bottom.',
      'Keep upper arms stationary; only forearms move.'
    ]
  },
  {
    id: 'cat_tri_3',
    name: 'Lying Triceps Skull Crushers (EZ Bar)',
    muscleGroup: 'Triceps',
    category: 'barbell',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 90,
    alternatives: ['Overhead Cable Triceps Extension', 'Close-Grip Bench Press'],
    description: 'Classic heavy mass builder targeting all three tricep heads.',
    instructions: [
      'Lie flat on bench holding EZ bar with arms angled back slightly (not straight up).',
      'Bend elbows to lower bar towards crown of head or bench behind you.',
      'Extend forearms back to starting angle without letting elbows flare out.'
    ]
  },
  {
    id: 'cat_tri_4',
    name: 'Close-Grip Bench Press',
    muscleGroup: 'Triceps',
    category: 'barbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 120,
    alternatives: ['Triceps Rope Pushdown', 'Lying Triceps Skull Crushers (EZ Bar)'],
    description: 'Heavy compound tricep overload with shoulder-width grip.',
    instructions: [
      'Grip barbell with hands shoulder-width apart (do not go narrower to protect wrists).',
      'Lower bar to lower sternum with elbows tucked close to your ribs.',
      'Press up powerfully focusing on triceps lockout.'
    ]
  },

  // QUADRICEPS
  {
    id: 'cat_quad_1',
    name: 'Barbell Back Squat',
    muscleGroup: 'Quadriceps',
    category: 'barbell',
    isCompound: true,
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSeconds: 180,
    alternatives: ['Hack Squat Machine', 'Leg Press 45°', 'Bulgarian Split Squat'],
    description: 'The supreme lower-body compound building quads, glutes, adductors, and core.',
    instructions: [
      'Rest bar securely across upper traps. Unrack and step back into shoulder-width stance.',
      'Brace core with deep breath. Sit hips back and down between knees until thighs are parallel.',
      'Drive through your mid-foot to stand back up, exhaling past the sticking point.'
    ]
  },
  {
    id: 'cat_quad_2',
    name: 'Leg Press 45°',
    muscleGroup: 'Quadriceps',
    category: 'machine',
    isCompound: true,
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRestSeconds: 120,
    alternatives: ['Barbell Back Squat', 'Hack Squat Machine'],
    description: 'High-volume quad driver without axial spinal compression.',
    instructions: [
      'Sit with lower back firmly flush against pad. Place feet shoulder-width on middle of platform.',
      'Release safety handles and lower carriage until knees reach a 90-degree bend.',
      'Press through whole foot to return to start, without locking out knees violently.'
    ]
  },
  {
    id: 'cat_quad_3',
    name: 'Hack Squat Machine',
    muscleGroup: 'Quadriceps',
    category: 'machine',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 150,
    alternatives: ['Barbell Back Squat', 'Leg Press 45°'],
    description: 'Fixed back support allows deep knee flexion and maximum quad isolation.',
    instructions: [
      'Position shoulders under pads and back flat on sled. Place feet lower on platform for quad emphasis.',
      'Descend into a deep squat until hamstrings touch calves if mobility allows.',
      'Push through balls and heels of feet to return to top.'
    ]
  },
  {
    id: 'cat_quad_4',
    name: 'Leg Extension Machine',
    muscleGroup: 'Quadriceps',
    category: 'machine',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Bulgarian Split Squat', 'Leg Press 45°'],
    description: 'Isolates the rectus femoris and quads in the shortened contracted position.',
    instructions: [
      'Align knee joints directly with machine pivot axis. Pad sits above ankles.',
      'Extend legs to kick pad up until knees are fully extended.',
      'Hold contraction at the top for 1 full second, then lower under control.'
    ]
  },
  {
    id: 'cat_quad_5',
    name: 'Bulgarian Split Squat',
    muscleGroup: 'Quadriceps',
    category: 'dumbbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10 each leg',
    defaultRestSeconds: 90,
    alternatives: ['Leg Extension Machine', 'Hack Squat Machine'],
    description: 'Unilateral leg builder that improves balance and quad-glute power.',
    instructions: [
      'Place rear foot laces-down on a bench behind you. Hold dumbbells at sides.',
      'Lower hips straight down until front thigh is parallel and rear knee taps near floor.',
      'Drive through front heel to return to top.'
    ]
  },

  // HAMSTRINGS
  {
    id: 'cat_ham_1',
    name: 'Romanian Deadlift (Barbell RDL)',
    muscleGroup: 'Hamstrings',
    category: 'barbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 150,
    alternatives: ['Seated Leg Curl Machine', 'Lying Leg Curl Machine'],
    description: 'Hip-hinge movement maximizing hamstring stretch under loaded tension.',
    instructions: [
      'Hold barbell at hip height with slight knee bend that stays fixed throughout.',
      'Push hips back as far as possible, letting bar trace down your shins.',
      'Stop when you feel full hamstring stretch (usually mid-shin), drive hips forward to return.'
    ]
  },
  {
    id: 'cat_ham_2',
    name: 'Seated Leg Curl Machine',
    muscleGroup: 'Hamstrings',
    category: 'machine',
    isCompound: false,
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    alternatives: ['Romanian Deadlift (Barbell RDL)', 'Lying Leg Curl Machine'],
    description: 'Lengthened-position hamstring knee flexion with superior hypertrophy stimulus.',
    instructions: [
      'Sit with thigh pad pressed tightly over quads. Ankle pad sits on lower Achilles.',
      'Curl heels under seat as far as possible, squeezing hamstrings.',
      'Resist the pad over 2-3 seconds on the return stretch.'
    ]
  },
  {
    id: 'cat_ham_3',
    name: 'Lying Leg Curl Machine',
    muscleGroup: 'Hamstrings',
    category: 'machine',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    alternatives: ['Seated Leg Curl Machine', 'Romanian Deadlift (Barbell RDL)'],
    description: 'Direct hamstring knee flexion with hips in neutral extension.',
    instructions: [
      'Lie face down with roller pad resting against back of lower calves.',
      'Keep hips pushed flat into the bench, curl heels towards your glutes.',
      'Hold peak squeeze for a count, lower slowly.'
    ]
  },

  // GLUTES
  {
    id: 'cat_glu_1',
    name: 'Barbell Hip Thrust',
    muscleGroup: 'Glutes',
    category: 'barbell',
    isCompound: true,
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 120,
    alternatives: ['Romanian Deadlift (Barbell RDL)', 'Barbell Back Squat'],
    description: 'Maximum mechanical tension on gluteus maximus at full hip extension.',
    instructions: [
      'Rest upper back against a bench with padded barbell resting across hip crease.',
      'Plant feet flat on floor shoulder-width apart, shins vertical at top.',
      'Drive hips up until torso and thighs form a straight horizontal line. Squeeze glutes hard.'
    ]
  },

  // CALVES
  {
    id: 'cat_calf_1',
    name: 'Standing Calf Raise',
    muscleGroup: 'Calves',
    category: 'machine',
    isCompound: false,
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Seated Calf Raise'],
    description: 'Targets the gastrocnemius with straight-leg plantar flexion and deep bottom pause.',
    instructions: [
      'Place balls of feet on step with heels hanging off. Shoulder pads in place.',
      'Lower heels down into a deep 2-second calf stretch.',
      'Drive up onto balls of feet as high as possible, pausing for 1 second.'
    ]
  },
  {
    id: 'cat_calf_2',
    name: 'Seated Calf Raise',
    muscleGroup: 'Calves',
    category: 'machine',
    isCompound: false,
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRestSeconds: 60,
    alternatives: ['Standing Calf Raise'],
    description: 'Bent-knee raise targeting the soleus muscle underneath the calf.',
    instructions: [
      'Secure knee pad firmly over lower quads. Balls of feet on the platform.',
      'Drop heels down for a full soleus stretch, then push up through big toes.'
    ]
  },

  // ABS
  {
    id: 'cat_abs_1',
    name: 'Hanging Leg Raise',
    muscleGroup: 'Abs',
    category: 'bodyweight',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Cable Kneeling Crunch'],
    description: 'Overloads lower abdominal fibers through posterior pelvic tilt.',
    instructions: [
      'Hang from pull-up bar with overhand grip.',
      'Without swinging, raise legs or knees up towards chest by curling pelvis upward.',
      'Control the descent to avoid momentum.'
    ]
  },
  {
    id: 'cat_abs_2',
    name: 'Cable Kneeling Crunch',
    muscleGroup: 'Abs',
    category: 'cable',
    isCompound: false,
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    alternatives: ['Hanging Leg Raise'],
    description: 'Progressively overloadable abdominal spinal flexion.',
    instructions: [
      'Kneel in front of a high pulley holding rope attachment beside ears.',
      'Flex your spine, bringing elbows down towards knees using abdominal contraction.',
      'Do not sit hips back; keep hips high and isolate spinal flexion.'
    ]
  }
]
