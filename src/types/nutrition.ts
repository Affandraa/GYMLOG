// ============================================================
// GYMLOG — Nutrition Types (Phase 3)
// ============================================================

export interface Micronutrients {
  // Vitamins (units vary — see field comments)
  vitaminA?: number    // mcg RAE
  vitaminB1?: number   // mg (Thiamine)
  vitaminB2?: number   // mg (Riboflavin)
  vitaminB3?: number   // mg NE (Niacin)
  vitaminB6?: number   // mg
  vitaminB9?: number   // mcg DFE (Folate)
  vitaminB12?: number  // mcg
  vitaminC?: number    // mg
  vitaminD?: number    // mcg (1 mcg = 40 IU)
  vitaminE?: number    // mg alpha-tocopherol
  vitaminK?: number    // mcg
  // Minerals
  calcium?: number     // mg
  iron?: number        // mg
  magnesium?: number   // mg
  zinc?: number        // mg
  potassium?: number   // mg
  sodium?: number      // mg
}

export interface Macronutrients {
  calories: number   // kcal
  protein: number    // g
  carbs: number      // g
  fat: number        // g
  fiber: number      // g
  sugar: number      // g
}

export type FoodSource = 'TKPI' | 'USDA' | 'Estimated'

export type FoodCategory =
  | 'Staple'      // Rice, bread, noodles
  | 'Protein'     // Chicken, eggs, fish, tempeh, tofu
  | 'Vegetable'   // Spinach, broccoli, kangkung
  | 'Fruit'       // Banana, avocado
  | 'Dairy'       // Milk, yogurt
  | 'Fat & Oil'   // Olive oil, peanut butter
  | 'Legume'      // Edamame, lentils
  | 'Supplement'  // Whey protein
  | 'Other'

export interface FoodItem {
  id: string
  name: string                    // English name
  indonesianName?: string         // Bahasa Indonesia name
  category: FoodCategory
  servingSizeGrams: number        // Default serving in grams (for portion slider default)
  macrosPer100g: Macronutrients   // All macros per 100g
  microsPer100g: Micronutrients   // Micros per 100g (only verified values included)
  isVerified: boolean             // true = from TKPI/USDA
  source: FoodSource
  notes?: string                  // e.g. "Cooked weight", "Estimated fiber"
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface MealEntry {
  id: string
  foodId: string
  foodName: string
  mealType: MealType
  portionGrams: number
  // Calculated nutrients at the recorded portion
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  micros: Micronutrients
  loggedAt: string  // ISO 8601
}

export interface MacroTargets {
  calories: number
  protein: number   // g
  carbs: number     // g
  fat: number       // g
  fiber: number     // g
}

export interface MicroTargets {
  vitaminA: number    // mcg
  vitaminB1: number   // mg
  vitaminB2: number   // mg
  vitaminB3: number   // mg
  vitaminB6: number   // mg
  vitaminB9: number   // mcg
  vitaminB12: number  // mcg
  vitaminC: number    // mg
  vitaminD: number    // mcg
  vitaminE: number    // mg
  vitaminK: number    // mcg
  calcium: number     // mg
  iron: number        // mg
  magnesium: number   // mg
  zinc: number        // mg
  potassium: number   // mg
  sodium: number      // mg
}

export interface DailyNutritionLog {
  date: string            // YYYY-MM-DD
  meals: MealEntry[]
  targetCalories: number
  targetMacros: MacroTargets
  targetMicros: MicroTargets
  waterMl: number         // ml consumed today
}

export interface NutritionGap {
  nutrient: string
  unit: string
  consumed: number
  target: number
  pct: number         // consumed / target * 100
  severity: 'ok' | 'low' | 'critical'
  suggestedFoods: string[]  // food names from database
}
