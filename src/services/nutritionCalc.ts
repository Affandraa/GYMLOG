// ============================================================
// GYMLOG — Nutrition Calculations & Smart Gap Advisor (Phase 3)
// ============================================================

import type { UserProfile, FitnessGoal } from '../types/user'
import type {
  FoodItem,
  MealEntry,
  MacroTargets,
  MicroTargets,
  Micronutrients,
  NutritionGap,
  DailyNutritionLog
} from '../types/nutrition'
import { FOOD_DATABASE } from '../data/indonesianFoodDb'
import { calculateBMR, calculateTDEE } from './fitnessCalc'

// ============================================================
//  RDA / AI for standard adults (conservative general values)
//  Used as daily targets when user data is not more specific.
//  Sources: WHO, Indonesian RDA (AKG 2019), NIH ODS
// ============================================================
export const STANDARD_MICRO_RDA: MicroTargets = {
  vitaminA: 800,     // mcg RAE
  vitaminB1: 1.2,    // mg
  vitaminB2: 1.3,    // mg
  vitaminB3: 16,     // mg NE
  vitaminB6: 1.3,    // mg
  vitaminB9: 400,    // mcg DFE
  vitaminB12: 2.4,   // mcg
  vitaminC: 90,      // mg
  vitaminD: 20,      // mcg (800 IU)
  vitaminE: 15,      // mg
  vitaminK: 120,     // mcg
  calcium: 1000,     // mg
  iron: 18,          // mg (higher for women, using upper common value)
  magnesium: 400,    // mg
  zinc: 11,          // mg
  potassium: 3500,   // mg
  sodium: 2300,      // mg (target = ≤ upper limit)
}

// ============================================================
//  Calorie & Macro Targets
// ============================================================

/** Returns goal-adjusted calorie target */
export function getCalorieTarget(tdee: number, goal: FitnessGoal): number {
  switch (goal) {
    case 'muscle_gain': return Math.round(tdee + 300)
    case 'fat_loss': return Math.round(tdee - 500)
    case 'recomposition': return Math.round(tdee)
    case 'strength': return Math.round(tdee + 200)
    default: return tdee
  }
}

/** Returns macro targets for the given calorie target and body weight */
export function getMacroTargets(
  targetCalories: number,
  weightKg: number,
  goal: FitnessGoal
): MacroTargets {
  // Protein g/kg based on goal
  let proteinPerKg = 2.0
  if (goal === 'fat_loss') proteinPerKg = 2.2
  if (goal === 'strength') proteinPerKg = 2.0
  if (goal === 'muscle_gain') proteinPerKg = 2.0

  const protein = Math.round(weightKg * proteinPerKg)
  const proteinCal = protein * 4

  // Fat = ~25% of calories
  const fat = Math.round((targetCalories * 0.25) / 9)
  const fatCal = fat * 9

  // Remaining to carbs
  const carbCal = Math.max(0, targetCalories - proteinCal - fatCal)
  const carbs = Math.round(carbCal / 4)

  // Fiber goal (AI = 14g / 1000 kcal)
  const fiber = Math.round((targetCalories / 1000) * 14)

  return { calories: targetCalories, protein, carbs, fat, fiber }
}

/** Returns full daily targets from user profile */
export function getDailyTargets(profile: UserProfile): {
  calories: number
  macros: MacroTargets
  micros: MicroTargets
} {
  const bmr = calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.sex)
  const tdee = calculateTDEE(bmr, profile.availableDaysPerWeek)
  const calories = getCalorieTarget(tdee, profile.goal)
  const macros = getMacroTargets(calories, profile.weightKg, profile.goal)

  // Adjust some micros for sex / age
  const micros = { ...STANDARD_MICRO_RDA }
  if (profile.sex === 'female') {
    micros.iron = 18   // pre-menopausal
    micros.calcium = 1000
  } else {
    micros.iron = 8   // adult male
  }
  if (profile.age >= 51) micros.calcium = 1200
  if (profile.age >= 70) micros.vitaminD = 20

  return { calories, macros, micros }
}

// ============================================================
//  Per-portion nutrient calculation
// ============================================================

/** Scale macros from per-100g to actual portionGrams */
export function calcMacrosForPortion(food: FoodItem, portionGrams: number) {
  const ratio = portionGrams / 100
  const m = food.macrosPer100g
  return {
    calories: Math.round(m.calories * ratio * 10) / 10,
    protein: Math.round(m.protein * ratio * 10) / 10,
    carbs: Math.round(m.carbs * ratio * 10) / 10,
    fat: Math.round(m.fat * ratio * 10) / 10,
    fiber: Math.round(m.fiber * ratio * 10) / 10,
    sugar: Math.round(m.sugar * ratio * 10) / 10,
  }
}

/** Scale micronutrients from per-100g to portionGrams */
export function calcMicrosForPortion(food: FoodItem, portionGrams: number): Micronutrients {
  const ratio = portionGrams / 100
  const src = food.microsPer100g
  const scale = (v?: number) => v !== undefined ? Math.round(v * ratio * 100) / 100 : undefined

  return {
    vitaminA: scale(src.vitaminA),
    vitaminB1: scale(src.vitaminB1),
    vitaminB2: scale(src.vitaminB2),
    vitaminB3: scale(src.vitaminB3),
    vitaminB6: scale(src.vitaminB6),
    vitaminB9: scale(src.vitaminB9),
    vitaminB12: scale(src.vitaminB12),
    vitaminC: scale(src.vitaminC),
    vitaminD: scale(src.vitaminD),
    vitaminE: scale(src.vitaminE),
    vitaminK: scale(src.vitaminK),
    calcium: scale(src.calcium),
    iron: scale(src.iron),
    magnesium: scale(src.magnesium),
    zinc: scale(src.zinc),
    potassium: scale(src.potassium),
    sodium: scale(src.sodium),
  }
}

// ============================================================
//  Daily totals from meal log
// ============================================================

export function sumMealEntryMacros(entries: MealEntry[]) {
  return entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
      fiber: acc.fiber + e.fiber,
      sugar: acc.sugar + e.sugar,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
  )
}

export function sumMealEntryMicros(entries: MealEntry[]): Micronutrients {
  const sum: Micronutrients = {}
  const add = (k: keyof Micronutrients) => {
    const vals = entries.map(e => e.micros[k]).filter(v => v !== undefined) as number[]
    if (vals.length > 0) sum[k] = Math.round(vals.reduce((a, b) => a + b, 0) * 100) / 100
  }
  const keys: (keyof Micronutrients)[] = [
    'vitaminA', 'vitaminB1', 'vitaminB2', 'vitaminB3', 'vitaminB6',
    'vitaminB9', 'vitaminB12', 'vitaminC', 'vitaminD', 'vitaminE', 'vitaminK',
    'calcium', 'iron', 'magnesium', 'zinc', 'potassium', 'sodium'
  ]
  keys.forEach(add)
  return sum
}

// ============================================================
//  Smart Nutrition Gap Advisor
// ============================================================

interface FoodRichIn {
  nutrient: keyof Micronutrients
  foods: string[]
}

// Top food sources for each micronutrient (from our database)
const NUTRIENT_FOOD_SOURCES: FoodRichIn[] = [
  { nutrient: 'vitaminA',   foods: ['Sweet Potato (Boiled)', 'Spinach (Raw)', 'Kangkung / Water Spinach (Raw)', 'Egg (Boiled)'] },
  { nutrient: 'vitaminB1',  foods: ['Oats (Rolled, Dry)', 'Chicken Breast (Cooked)', 'Brown Rice (Cooked)', 'Tempeh (Soybean)'] },
  { nutrient: 'vitaminB2',  foods: ['Egg (Boiled)', 'Fresh Milk (Full Fat)', 'Tempeh (Soybean)', 'Yogurt (Plain, Full Fat)'] },
  { nutrient: 'vitaminB3',  foods: ['Chicken Breast (Cooked)', 'Tuna (Canned in Water)', 'Salmon (Cooked)', 'Peanut Butter (Natural)'] },
  { nutrient: 'vitaminB6',  foods: ['Salmon (Cooked)', 'Chicken Breast (Cooked)', 'Potato (Boiled)', 'Banana (Ambon / Cavendish)'] },
  { nutrient: 'vitaminB9',  foods: ['Edamame (Boiled)', 'Spinach (Raw)', 'Oats (Rolled, Dry)', 'Broccoli (Raw)'] },
  { nutrient: 'vitaminB12', foods: ['Sardines (Canned in Tomato)', 'Tuna (Canned in Water)', 'Salmon (Cooked)', 'Egg (Boiled)'] },
  { nutrient: 'vitaminC',   foods: ['Broccoli (Raw)', 'Kangkung / Water Spinach (Raw)', 'Spinach (Raw)', 'Avocado'] },
  { nutrient: 'vitaminD',   foods: ['Salmon (Cooked)', 'Sardines (Canned in Tomato)', 'Tuna (Canned in Water)', 'Egg (Boiled)'] },
  { nutrient: 'vitaminE',   foods: ['Avocado', 'Peanut Butter (Natural)', 'Olive Oil', 'Spinach (Raw)'] },
  { nutrient: 'vitaminK',   foods: ['Spinach (Raw)', 'Spinach (Cooked)', 'Broccoli (Raw)', 'Olive Oil'] },
  { nutrient: 'calcium',    foods: ['Sardines (Canned in Tomato)', 'Tofu (Firm)', 'Fresh Milk (Full Fat)', 'Tempeh (Soybean)'] },
  { nutrient: 'iron',       foods: ['Tempeh (Soybean)', 'Spinach (Cooked)', 'Sardines (Canned in Tomato)', 'Oats (Rolled, Dry)'] },
  { nutrient: 'magnesium',  foods: ['Oats (Rolled, Dry)', 'Peanut Butter (Natural)', 'Edamame (Boiled)', 'Spinach (Cooked)'] },
  { nutrient: 'zinc',       foods: ['Peanut Butter (Natural)', 'Oats (Rolled, Dry)', 'Chicken Breast (Cooked)', 'Tempeh (Soybean)'] },
  { nutrient: 'potassium',  foods: ['Avocado', 'Edamame (Boiled)', 'Banana (Ambon / Cavendish)', 'Salmon (Cooked)'] },
  { nutrient: 'sodium',     foods: [] }, // Not typically deficient; don't suggest sodium-rich foods
]

export function computeNutritionGaps(
  log: DailyNutritionLog,
  consumedMicros: Micronutrients
): NutritionGap[] {
  const targets = log.targetMicros
  const gaps: NutritionGap[] = []

  const microDefs: Array<{
    key: keyof Micronutrients
    label: string
    unit: string
    targetKey: keyof MicroTargets
  }> = [
    { key: 'vitaminA',   label: 'Vitamin A',   unit: 'mcg', targetKey: 'vitaminA' },
    { key: 'vitaminB1',  label: 'Vitamin B1',  unit: 'mg',  targetKey: 'vitaminB1' },
    { key: 'vitaminB2',  label: 'Vitamin B2',  unit: 'mg',  targetKey: 'vitaminB2' },
    { key: 'vitaminB3',  label: 'Vitamin B3',  unit: 'mg',  targetKey: 'vitaminB3' },
    { key: 'vitaminB6',  label: 'Vitamin B6',  unit: 'mg',  targetKey: 'vitaminB6' },
    { key: 'vitaminB9',  label: 'Folate B9',   unit: 'mcg', targetKey: 'vitaminB9' },
    { key: 'vitaminB12', label: 'Vitamin B12', unit: 'mcg', targetKey: 'vitaminB12' },
    { key: 'vitaminC',   label: 'Vitamin C',   unit: 'mg',  targetKey: 'vitaminC' },
    { key: 'vitaminD',   label: 'Vitamin D',   unit: 'mcg', targetKey: 'vitaminD' },
    { key: 'vitaminE',   label: 'Vitamin E',   unit: 'mg',  targetKey: 'vitaminE' },
    { key: 'vitaminK',   label: 'Vitamin K',   unit: 'mcg', targetKey: 'vitaminK' },
    { key: 'calcium',    label: 'Calcium',     unit: 'mg',  targetKey: 'calcium' },
    { key: 'iron',       label: 'Iron',        unit: 'mg',  targetKey: 'iron' },
    { key: 'magnesium',  label: 'Magnesium',   unit: 'mg',  targetKey: 'magnesium' },
    { key: 'zinc',       label: 'Zinc',        unit: 'mg',  targetKey: 'zinc' },
    { key: 'potassium',  label: 'Potassium',   unit: 'mg',  targetKey: 'potassium' },
    { key: 'sodium',     label: 'Sodium',      unit: 'mg',  targetKey: 'sodium' },
  ]

  for (const def of microDefs) {
    const consumed = consumedMicros[def.key] ?? 0
    const target = targets[def.targetKey] ?? 0
    if (target === 0) continue
    const pct = Math.round((consumed / target) * 100)
    const severity = pct >= 80 ? 'ok' : pct >= 50 ? 'low' : 'critical'
    const src = NUTRIENT_FOOD_SOURCES.find(n => n.nutrient === def.key)
    gaps.push({
      nutrient: def.label,
      unit: def.unit,
      consumed,
      target,
      pct,
      severity,
      suggestedFoods: src?.foods ?? []
    })
  }

  return gaps
}

/** Returns top 3 nutrients that need attention, with food suggestions */
export function getSmartRecommendations(
  gaps: NutritionGap[],
  consumedCalories: number,
  targetCalories: number,
  consumedProtein: number,
  targetProtein: number
): string[] {
  const suggestions: string[] = []

  const remainingCal = targetCalories - consumedCalories
  const remainingProtein = targetProtein - consumedProtein

  if (remainingProtein > 10) {
    // Find high-protein foods
    const highProtein = FOOD_DATABASE
      .filter(f => f.macrosPer100g.protein >= 15)
      .slice(0, 3)
      .map(f => f.name)
    suggestions.push(`⚡ You still need ~${Math.round(remainingProtein)}g protein. Consider: ${highProtein.join(', ')}.`)
  }

  if (remainingCal > 200 && remainingCal < 800) {
    suggestions.push(`📊 ${Math.round(remainingCal)} kcal remaining for the day — balanced snack opportunity.`)
  }

  const critical = gaps.filter(g => g.severity === 'critical' && g.suggestedFoods.length > 0).slice(0, 2)
  for (const gap of critical) {
    suggestions.push(`⚠️ Low ${gap.nutrient} (${gap.pct}%). Boost with: ${gap.suggestedFoods.slice(0, 2).join(', ')}.`)
  }

  return suggestions
}
