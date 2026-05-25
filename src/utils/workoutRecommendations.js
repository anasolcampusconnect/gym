// ===============================================
// src/utils/workoutRecommendations.js
// COMPLETE ADVANCED SAFE AI WORKOUT ENGINE
// ===============================================

// ===============================================
// BMI CALCULATION
// ===============================================

export const calculateBMI = (
  heightCm,
  weightKg
) => {

  const heightMeter =
    heightCm / 100;

  const bmi =
    weightKg /
    (
      heightMeter *
      heightMeter
    );

  return bmi.toFixed(1);
};

// ===============================================
// BMI STATUS
// ===============================================

export const getBMIStatus =
  (bmi) => {

    bmi = Number(bmi);

    if (bmi < 18.5) {

      return {
        status: "Underweight",
        goal: "Healthy Weight Gain",
        dailyCalories:
          "2200 - 2800 kcal",
        recommendedBurn:
          "150 - 250 kcal/day",
        color:
          "text-cyan-400",
      };
    }

    if (
      bmi >= 18.5 &&
      bmi < 25
    ) {

      return {
        status: "Normal",
        goal: "Maintain Fitness",
        dailyCalories:
          "2000 - 2500 kcal",
        recommendedBurn:
          "250 - 350 kcal/day",
        color:
          "text-green-400",
      };
    }

    if (
      bmi >= 25 &&
      bmi < 30
    ) {

      return {
        status: "Overweight",
        goal: "Safe Fat Loss",
        dailyCalories:
          "1800 - 2200 kcal",
        recommendedBurn:
          "350 - 500 kcal/day",
        color:
          "text-yellow-400",
      };
    }

    return {
      status: "Obese",
      goal:
        "Weight Reduction",
      dailyCalories:
        "1500 - 2000 kcal",
      recommendedBurn:
        "500 - 700 kcal/day",
      color:
        "text-red-400",
    };
  };

// ===============================================
// FOOD SUGGESTIONS
// ===============================================

export const foodSuggestions =
{

  Underweight: [

    "🥛 Milk",
    "🥚 Eggs",
    "🍌 Banana Shake",
    "🥜 Peanut Butter",
    "🍗 Chicken",
    "🧀 Paneer",
  ],

  Normal: [

    "🥗 Salads",
    "🍎 Fruits",
    "🥛 Yogurt",
    "🍞 Wheat Bread",
    "🥜 Nuts",
  ],

  Overweight: [

    "🥦 Broccoli",
    "🍵 Green Tea",
    "🍋 Lemon Water",
    "🍎 Apple",
    "🥗 Salad",
  ],

  Obese: [

    "🥒 Cucumber",
    "🍲 Oats",
    "🥗 Fiber Foods",
    "🍵 Green Tea",
    "🍎 Fruits",
  ],
};

// ===============================================
// SAFE EXERCISES
// ===============================================

const exercises = [

  // ===========================================
  // HEART PATIENT SAFE
  // ===========================================

  {
    name: "Slow Walking",
    category: "Cardio",
    level: "Beginner",
    calories: 80,
    diseases: ["heart", "bp"],
    bmi: [
      "Normal",
      "Overweight",
      "Obese",
    ],
    description:
      "Heart-safe low intensity walking.",
    image:
     "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200",
  },

  {
    name: "Chair Yoga",
    category: "Recovery",
    level: "Beginner",
    calories: 40,
    diseases: [
      "heart",
      "arthritis",
    ],
    bmi: [
      "Underweight",
      "Normal",
    ],
    description:
      "Gentle stretching for heart patients.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
  },

  {
    name: "Breathing Exercise",
    category: "Recovery",
    level: "Beginner",
    calories: 20,
    diseases: [
      "heart",
      "asthma",
      "bp",
    ],
    bmi: [
      "Underweight",
      "Normal",
      "Overweight",
      "Obese",
    ],
    description:
      "Improves breathing and oxygen flow.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
  },

  // ===========================================
  // ASTHMA SAFE
  // ===========================================

  {
    name: "Light Cycling",
    category: "Cardio",
    level: "Beginner",
    calories: 100,
    diseases: ["asthma"],
    bmi: [
      "Normal",
      "Overweight",
    ],
    description:
      "Controlled cardio for asthma patients.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
  },

  // ===========================================
  // DIABETES SAFE
  // ===========================================

  {
    name: "Treadmill Walking",
    category: "Fat Loss",
    level: "Beginner",
    calories: 140,
    diseases: [
      "diabetes",
      "obesity",
      "bp",
    ],
    bmi: [
      "Overweight",
      "Obese",
    ],
    description:
      "Safe fat burning workout.",
    image:
       "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
  },

  // ===========================================
  // KNEE SAFE
  // ===========================================

  {
    name: "Swimming",
    category: "Recovery",
    level: "Intermediate",
    calories: 180,
    diseases: [
      "kneePain",
      "arthritis",
    ],
    bmi: [
      "Overweight",
      "Obese",
    ],
    description:
      "Low impact exercise for joints.",
    image:
      "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=1200",
  },

  // ===========================================
  // UNDERWEIGHT SAFE
  // ===========================================

  {
    name: "Resistance Band",
    category: "Strength",
    level: "Beginner",
    calories: 90,
    diseases: [
      "underweight",
      "thyroid",
    ],
    bmi: [
      "Underweight",
    ],
    description:
      "Safe muscle gain workout.",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
  },

  {
    name: "Push Ups",
    category: "Strength",
    level: "Intermediate",
    calories: 110,
    diseases: ["underweight"],
    bmi: ["Underweight"],
    description:
      "Build lean muscle mass safely.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
  },
];

// ===============================================
// MAIN ENGINE
// ===============================================

export const getWorkoutSuggestions =
({
  bmi,
  diseases,
  targetCalories,
}) => {

  const bmiInfo =
    getBMIStatus(bmi);

  let filtered =
    exercises.filter(
      (exercise) => {

        // BMI MATCH

        const bmiMatch =
          exercise.bmi.includes(
            bmiInfo.status
          );

        // DISEASE MATCH

        let diseaseMatch =
          true;

        if (
          diseases.length > 0
        ) {

          diseaseMatch =
            diseases.some(
              (disease) =>
                exercise.diseases.includes(
                  disease
                )
            );
        }

        // CALORIES

        let calorieMatch =
          true;

        if (
          targetCalories
        ) {

          calorieMatch =
            exercise.calories <=
            targetCalories;
        }

        return (
          bmiMatch &&
          diseaseMatch &&
          calorieMatch
        );
      }
    );

  // SORT CLOSEST CALORIES

  filtered.sort(
    (a, b) => {

      if (
        !targetCalories
      ) {

        return 0;
      }

      return (
        Math.abs(
          targetCalories -
          a.calories
        ) -
        Math.abs(
          targetCalories -
          b.calories
        )
      );
    }
  );

  // FALLBACK

  if (
    filtered.length === 0
  ) {

    filtered =
      exercises.filter(
        (exercise) =>
          exercise.level ===
          "Beginner"
      );
  }

  return {

    bmiInfo,

    exercises: filtered,

    foods:
      foodSuggestions[
        bmiInfo.status
      ] || [],
  };
};