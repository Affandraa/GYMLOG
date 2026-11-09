// ============================================================
// GYMLOG — Indonesian & International Food Database
// All nutritional values are per 100g (edible portion)
// 
// Sources:
//   TKPI  = Tabel Komposisi Pangan Indonesia (2017 ed.)
//   USDA  = USDA FoodData Central (SR Legacy / Foundation)
//   Est.  = Estimated / calculated from multiple references
//        (flag: isVerified = false)
//
// Micronutrients marked with undefined were not available
// in the reference — values are NOT fabricated.
// ============================================================

import type { FoodItem } from '../types/nutrition'

export const FOOD_DATABASE: FoodItem[] = [
  // ========== STAPLES ==========
  {
    id: 'white_rice_cooked',
    name: 'White Rice (Cooked)',
    indonesianName: 'Nasi Putih',
    category: 'Staple',
    servingSizeGrams: 200,
    macrosPer100g: { calories: 130, protein: 2.4, carbs: 28.6, fat: 0.3, fiber: 0.4, sugar: 0.1 },
    microsPer100g: {
      vitaminB1: 0.02, vitaminB3: 1.5,
      calcium: 10, iron: 0.2, magnesium: 12, potassium: 35, sodium: 1
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Nasi putih matang'
  },
  {
    id: 'brown_rice_cooked',
    name: 'Brown Rice (Cooked)',
    indonesianName: 'Nasi Merah',
    category: 'Staple',
    servingSizeGrams: 200,
    macrosPer100g: { calories: 123, protein: 2.7, carbs: 25.6, fat: 0.9, fiber: 1.8, sugar: 0.4 },
    microsPer100g: {
      vitaminB1: 0.1, vitaminB3: 2.6, vitaminB6: 0.15,
      magnesium: 44, potassium: 79, iron: 0.5, zinc: 0.6, sodium: 1
    },
    isVerified: true,
    source: 'USDA',
    notes: 'Medium-grain cooked'
  },
  {
    id: 'oats',
    name: 'Oats (Rolled, Dry)',
    indonesianName: 'Oat Kering',
    category: 'Staple',
    servingSizeGrams: 80,
    macrosPer100g: { calories: 379, protein: 13.2, carbs: 67.7, fat: 6.5, fiber: 10.1, sugar: 1.1 },
    microsPer100g: {
      vitaminB1: 0.76, vitaminB6: 0.1, vitaminB9: 56,
      calcium: 52, iron: 4.3, magnesium: 138, zinc: 4.0, potassium: 362, sodium: 2
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'potato_boiled',
    name: 'Potato (Boiled)',
    indonesianName: 'Kentang Rebus',
    category: 'Staple',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 87, protein: 1.9, carbs: 20.1, fat: 0.1, fiber: 1.8, sugar: 0.9 },
    microsPer100g: {
      vitaminB6: 0.3, vitaminB9: 15, vitaminC: 13,
      calcium: 5, iron: 0.3, magnesium: 22, potassium: 379, sodium: 4
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'sweet_potato_boiled',
    name: 'Sweet Potato (Boiled)',
    indonesianName: 'Ubi Jalar Rebus',
    category: 'Staple',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 90, protein: 2.0, carbs: 20.7, fat: 0.1, fiber: 3.3, sugar: 4.2 },
    microsPer100g: {
      vitaminA: 709, vitaminB6: 0.26, vitaminC: 12.8,
      calcium: 27, iron: 0.7, magnesium: 22, potassium: 230, sodium: 27
    },
    isVerified: true,
    source: 'USDA'
  },

  // ========== PROTEIN SOURCES ==========
  {
    id: 'chicken_breast_cooked',
    name: 'Chicken Breast (Cooked)',
    indonesianName: 'Dada Ayam Matang',
    category: 'Protein',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminB3: 13.7, vitaminB6: 0.9, vitaminB12: 0.3,
      calcium: 15, iron: 0.9, magnesium: 29, zinc: 1.0, potassium: 256, sodium: 74
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Dada ayam tanpa kulit, matang'
  },
  {
    id: 'chicken_breast_raw',
    name: 'Chicken Breast (Raw)',
    indonesianName: 'Dada Ayam Mentah',
    category: 'Protein',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 120, protein: 22.5, carbs: 0.0, fat: 2.6, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminB3: 11.0, vitaminB6: 0.74, vitaminB12: 0.3,
      calcium: 11, iron: 0.7, magnesium: 26, zinc: 0.9, potassium: 220, sodium: 74
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Tanpa kulit, mentah'
  },
  {
    id: 'egg_boiled',
    name: 'Egg (Boiled)',
    indonesianName: 'Telur Rebus',
    category: 'Protein',
    servingSizeGrams: 60,
    macrosPer100g: { calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, fiber: 0.0, sugar: 1.1 },
    microsPer100g: {
      vitaminA: 160, vitaminB2: 0.49, vitaminB12: 1.1,
      vitaminD: 2.0, vitaminE: 1.0,
      calcium: 50, iron: 1.2, magnesium: 10, zinc: 1.1, potassium: 126, sodium: 124
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Telur ayam, rebus matang'
  },
  {
    id: 'egg_white',
    name: 'Egg White (Raw)',
    indonesianName: 'Putih Telur',
    category: 'Protein',
    servingSizeGrams: 60,
    macrosPer100g: { calories: 52, protein: 10.9, carbs: 0.7, fat: 0.2, fiber: 0.0, sugar: 0.7 },
    microsPer100g: {
      vitaminB2: 0.44, sodium: 166, potassium: 163
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'tempeh',
    name: 'Tempeh (Soybean)',
    indonesianName: 'Tempe Kedelai',
    category: 'Protein',
    servingSizeGrams: 100,
    macrosPer100g: { calories: 193, protein: 18.5, carbs: 9.4, fat: 10.8, fiber: 4.1, sugar: 0.0 },
    microsPer100g: {
      vitaminB2: 0.36, vitaminB3: 2.6, vitaminB12: 0.1,
      calcium: 111, iron: 2.7, magnesium: 81, zinc: 1.1, potassium: 412, sodium: 9
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Tempe kedelai murni, mentah'
  },
  {
    id: 'tofu_firm',
    name: 'Tofu (Firm)',
    indonesianName: 'Tahu Putih',
    category: 'Protein',
    servingSizeGrams: 100,
    macrosPer100g: { calories: 83, protein: 9.0, carbs: 2.0, fat: 4.8, fiber: 0.3, sugar: 0.9 },
    microsPer100g: {
      vitaminB1: 0.06,
      calcium: 350, iron: 2.0, magnesium: 37, zinc: 0.8, potassium: 121, sodium: 14
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Tahu keras/padat'
  },
  {
    id: 'tuna_canned',
    name: 'Tuna (Canned in Water)',
    indonesianName: 'Ikan Tuna Kaleng',
    category: 'Protein',
    servingSizeGrams: 85,
    macrosPer100g: { calories: 116, protein: 25.5, carbs: 0.0, fat: 1.0, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminB3: 13.3, vitaminB6: 0.46, vitaminB12: 2.5,
      vitaminD: 5.4,
      calcium: 10, iron: 1.0, magnesium: 29, zinc: 0.9, potassium: 237, sodium: 300
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'tuna_fresh',
    name: 'Tuna (Fresh/Tongkol)',
    indonesianName: 'Ikan Tongkol / Tuna Segar',
    category: 'Protein',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 144, protein: 23.4, carbs: 0.0, fat: 4.9, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminB3: 11.6, vitaminB12: 2.2, vitaminD: 4.5,
      calcium: 24, iron: 1.1, magnesium: 35, zinc: 0.6, potassium: 441, sodium: 50
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Ikan tongkol/tuna segar'
  },
  {
    id: 'salmon_cooked',
    name: 'Salmon (Cooked)',
    indonesianName: 'Ikan Salmon Matang',
    category: 'Protein',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 208, protein: 20.5, carbs: 0.0, fat: 13.4, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminB3: 7.9, vitaminB6: 0.63, vitaminB12: 3.2,
      vitaminD: 11.1, vitaminE: 1.4,
      calcium: 10, iron: 0.4, magnesium: 25, zinc: 0.4, potassium: 363, sodium: 59
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'sardine_canned',
    name: 'Sardines (Canned in Tomato)',
    indonesianName: 'Ikan Sarden Kaleng',
    category: 'Protein',
    servingSizeGrams: 100,
    macrosPer100g: { calories: 162, protein: 17.8, carbs: 1.6, fat: 9.4, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminB12: 8.9, vitaminD: 4.8,
      calcium: 382, iron: 2.9, magnesium: 39, zinc: 1.3, potassium: 397, sodium: 400
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'kembung_fish',
    name: 'Mackerel / Kembung Fish',
    indonesianName: 'Ikan Kembung',
    category: 'Protein',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 103, protein: 19.0, carbs: 0.0, fat: 2.9, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminB12: 1.8, vitaminD: 3.2,
      calcium: 50, iron: 1.1, magnesium: 32, potassium: 360, sodium: 68
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Ikan kembung segar'
  },
  {
    id: 'whey_protein',
    name: 'Whey Protein Powder',
    indonesianName: 'Whey Protein',
    category: 'Supplement',
    servingSizeGrams: 30,
    macrosPer100g: { calories: 400, protein: 80.0, carbs: 10.0, fat: 5.0, fiber: 0.0, sugar: 5.0 },
    microsPer100g: {},
    isVerified: false,
    source: 'Estimated',
    notes: 'Generic whey isolate, varies by brand'
  },

  // ========== VEGETABLES ==========
  {
    id: 'spinach_raw',
    name: 'Spinach (Raw)',
    indonesianName: 'Bayam Segar',
    category: 'Vegetable',
    servingSizeGrams: 100,
    macrosPer100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4 },
    microsPer100g: {
      vitaminA: 469, vitaminB9: 194, vitaminC: 28.1,
      vitaminK: 483, vitaminE: 2.0,
      calcium: 99, iron: 2.7, magnesium: 79, zinc: 0.5, potassium: 558, sodium: 79
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'spinach_cooked',
    name: 'Spinach (Cooked)',
    indonesianName: 'Bayam Rebus / Tumis',
    category: 'Vegetable',
    servingSizeGrams: 100,
    macrosPer100g: { calories: 23, protein: 3.0, carbs: 3.7, fat: 0.3, fiber: 2.4, sugar: 0.4 },
    microsPer100g: {
      vitaminA: 524, vitaminB9: 146, vitaminC: 9.8,
      vitaminK: 494,
      calcium: 136, iron: 3.6, magnesium: 87, zinc: 0.8, potassium: 466, sodium: 70
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Bayam matang/rebus'
  },
  {
    id: 'kangkung_raw',
    name: 'Kangkung / Water Spinach (Raw)',
    indonesianName: 'Kangkung Segar',
    category: 'Vegetable',
    servingSizeGrams: 100,
    macrosPer100g: { calories: 19, protein: 2.6, carbs: 3.1, fat: 0.2, fiber: 2.1, sugar: 0.0 },
    microsPer100g: {
      vitaminA: 315, vitaminC: 55, vitaminB9: 57,
      calcium: 77, iron: 1.7, magnesium: 71, potassium: 312, sodium: 113
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Kangkung segar'
  },
  {
    id: 'broccoli_raw',
    name: 'Broccoli (Raw)',
    indonesianName: 'Brokoli Segar',
    category: 'Vegetable',
    servingSizeGrams: 100,
    macrosPer100g: { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6, sugar: 1.7 },
    microsPer100g: {
      vitaminA: 31, vitaminC: 89.2, vitaminK: 101.6, vitaminB9: 63,
      vitaminE: 0.78, vitaminB6: 0.18,
      calcium: 47, iron: 0.7, magnesium: 21, zinc: 0.4, potassium: 316, sodium: 33
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'edamame',
    name: 'Edamame (Boiled)',
    indonesianName: 'Edamame Rebus',
    category: 'Legume',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 121, protein: 11.9, carbs: 8.9, fat: 5.2, fiber: 5.2, sugar: 2.2 },
    microsPer100g: {
      vitaminA: 9, vitaminC: 6.1, vitaminB9: 311, vitaminK: 26.7,
      calcium: 63, iron: 2.3, magnesium: 64, zinc: 1.4, potassium: 436, sodium: 4
    },
    isVerified: true,
    source: 'USDA'
  },

  // ========== FRUITS ==========
  {
    id: 'banana_ambon',
    name: 'Banana (Ambon / Cavendish)',
    indonesianName: 'Pisang Ambon',
    category: 'Fruit',
    servingSizeGrams: 120,
    macrosPer100g: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, sugar: 12.2 },
    microsPer100g: {
      vitaminB6: 0.37, vitaminC: 8.7, vitaminB9: 20,
      calcium: 5, iron: 0.3, magnesium: 27, potassium: 358, sodium: 1
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Pisang ambon/cavendish'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    indonesianName: 'Alpukat',
    category: 'Fruit',
    servingSizeGrams: 150,
    macrosPer100g: { calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, fiber: 6.7, sugar: 0.7 },
    microsPer100g: {
      vitaminC: 10.0, vitaminB9: 81,
      vitaminK: 21, vitaminE: 2.1,
      calcium: 12, iron: 0.6, magnesium: 29, zinc: 0.6, potassium: 485, sodium: 7
    },
    isVerified: true,
    source: 'USDA'
  },

  // ========== DAIRY ==========
  {
    id: 'fresh_milk',
    name: 'Fresh Milk (Full Fat)',
    indonesianName: 'Susu Sapi Segar',
    category: 'Dairy',
    servingSizeGrams: 250,
    macrosPer100g: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0.0, sugar: 4.8 },
    microsPer100g: {
      vitaminA: 46, vitaminB2: 0.17, vitaminB12: 0.44,
      vitaminD: 0.5,
      calcium: 113, iron: 0.1, magnesium: 10, zinc: 0.4, potassium: 150, sodium: 43
    },
    isVerified: true,
    source: 'TKPI',
    notes: 'Susu sapi segar full fat'
  },
  {
    id: 'yogurt_plain',
    name: 'Yogurt (Plain, Full Fat)',
    indonesianName: 'Yogurt Plain',
    category: 'Dairy',
    servingSizeGrams: 200,
    macrosPer100g: { calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0.0, sugar: 4.7 },
    microsPer100g: {
      vitaminB12: 0.75, vitaminB2: 0.14,
      calcium: 121, iron: 0.1, magnesium: 12, zinc: 0.6, potassium: 155, sodium: 46
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'greek_yogurt',
    name: 'Greek Yogurt (Plain, Low Fat)',
    indonesianName: 'Greek Yogurt',
    category: 'Dairy',
    servingSizeGrams: 200,
    macrosPer100g: { calories: 73, protein: 9.0, carbs: 3.6, fat: 3.8, fiber: 0.0, sugar: 3.6 },
    microsPer100g: {
      vitaminB12: 1.0,
      calcium: 115, sodium: 36, potassium: 141
    },
    isVerified: false,
    source: 'Estimated',
    notes: 'Varies by brand'
  },

  // ========== FATS & OILS ==========
  {
    id: 'olive_oil',
    name: 'Olive Oil',
    indonesianName: 'Minyak Zaitun',
    category: 'Fat & Oil',
    servingSizeGrams: 15,
    macrosPer100g: { calories: 884, protein: 0.0, carbs: 0.0, fat: 100.0, fiber: 0.0, sugar: 0.0 },
    microsPer100g: {
      vitaminE: 14.4, vitaminK: 60.2
    },
    isVerified: true,
    source: 'USDA'
  },
  {
    id: 'peanut_butter',
    name: 'Peanut Butter (Natural)',
    indonesianName: 'Selai Kacang Natural',
    category: 'Fat & Oil',
    servingSizeGrams: 32,
    macrosPer100g: { calories: 588, protein: 25.1, carbs: 20.0, fat: 50.4, fiber: 6.0, sugar: 9.1 },
    microsPer100g: {
      vitaminB3: 13.1, vitaminB6: 0.44, vitaminE: 6.3,
      magnesium: 168, zinc: 2.9, potassium: 558, sodium: 10, iron: 1.7, calcium: 49
    },
    isVerified: true,
    source: 'USDA'
  }
]

// ========= Helper: search foods =========
export function searchFoods(query: string): FoodItem[] {
  if (!query.trim()) return FOOD_DATABASE
  const q = query.toLowerCase()
  return FOOD_DATABASE.filter(f =>
    f.name.toLowerCase().includes(q) ||
    (f.indonesianName?.toLowerCase().includes(q) ?? false) ||
    f.category.toLowerCase().includes(q)
  )
}

export function getFoodById(id: string): FoodItem | undefined {
  return FOOD_DATABASE.find(f => f.id === id)
}
