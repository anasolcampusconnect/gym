// src/data/workoutModes.js

const workoutModes = [

  // =========================================================
  // MORNING MODE
  // =========================================================
  {
    id: 1,

    slug: "morning",

    title: "Morning Fitness",

    description:
      "Start your day with energetic workouts",

    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",

    gradient:
      "from-orange-500 to-pink-500",

    categories: [

      // =====================================================
      // HIIT
      // =====================================================
      {
        id: 11,

        name: "HIIT",

        image:
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",

        subcategories: [

 // BASIC
          {
            id: 111,

            level: "Basic",

            image:
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",

            exercises: [
        {
  name: "Jumping Jacks",
  description:
    "Jump while spreading legs and raising arms overhead.",
  duration: "30 Sec",
  calories: "40 kcal",
  image:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "High Knees",
  description:
    "Run in place while lifting knees high for cardio endurance.",
  duration: "40 Sec",
  calories: "55 kcal",
  image:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Mountain Climbers",
  description:
    "Drive knees toward chest quickly from plank position.",
  duration: "45 Sec",
  calories: "60 kcal",
  image:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Burpees",
  description:
    "Full body explosive workout combining squat and push-up.",
  duration: "30 Sec",
  calories: "75 kcal",
  image:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Jump Squats",
  description:
    "Explosive squat exercise to improve lower body strength.",
  duration: "20 Reps",
  calories: "70 kcal",
  image:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
    
 },
            ],
          },

          // INTERMEDIATE
         // MORNING → HIIT → INTERMEDIATE

{
  id: 112,
  level: "Intermediate",
  image:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",

  exercises: [

    {
      name: "Box Jumps",
      description:
        "Explosive jumping movement to improve lower body power.",
      duration: "15 Reps",
      calories: "80 kcal",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=52rU6nhx1MU",
    },

    {
      name: "Battle Ropes",
      description:
        "High intensity cardio exercise using heavy ropes.",
      duration: "40 Sec",
      calories: "95 kcal",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=52rU6nhx1MU",
    },

    {
      name: "Skater Jumps",
      description:
        "Side-to-side jumping exercise for agility and balance.",
      duration: "30 Sec",
      calories: "70 kcal",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=52rU6nhx1MU",
    },

    {
      name: "Plank Jacks",
      description:
        "Core focused cardio movement from plank position.",
      duration: "45 Sec",
      calories: "65 kcal",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=52rU6nhx1MU",
    },

    {
      name: "Tuck Jumps",
      description:
        "Explosive jumping exercise bringing knees toward chest.",
      duration: "20 Reps",
      calories: "85 kcal",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=52rU6nhx1MU",
    },
  ],
},

          // ADVANCED
      // MORNING → HIIT → ADVANCED

{
  id: 113,
  level: "Advanced",
  image:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",

  exercises: [

    {
      name: "Plyometric Pushups",
      description:
        "Explosive push-up variation for upper body power.",
      duration: "20 Reps",
      calories: "100 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Sprint Intervals",
      description:
        "Maximum effort sprint training for endurance and speed.",
      duration: "60 Sec",
      calories: "120 kcal",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Burpee Pull Ups",
      description:
        "Full body intense movement combining burpees and pull-ups.",
      duration: "15 Reps",
      calories: "130 kcal",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Jump Lunges",
      description:
        "Explosive lunge exercise improving leg strength.",
      duration: "25 Reps",
      calories: "95 kcal",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Bear Crawls",
      description:
        "Full body crawling exercise for endurance and stability.",
      duration: "50 Sec",
      calories: "90 kcal",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },
  ],
},
        ],
      },

      // =====================================================
      // CARDIO
      // =====================================================
      {
        id: 12,

        name: "Cardio",

        image:
          "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200",
          video:"https://www.youtube.com/watch?v=iSSAk4XCsRA",

        subcategories: [
 {
            id: 121,

            level: "Basic",

            image:
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",

            exercises: [


          // BASIC
         {
  name: "Jogging",
  description:
    "Light running exercise to improve heart health.",
  duration: "10 Min",
  calories: "120 kcal",
  image:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Cycling",
  description:
    "Low impact cardio workout for stamina and endurance.",
  duration: "15 Min",
  calories: "180 kcal",
  image:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Skipping",
  description:
    "Jump rope exercise for fat burn and coordination.",
  duration: "5 Min",
  calories: "90 kcal",
  image:
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Walking",
  description:
    "Simple low intensity exercise for daily activity.",
  duration: "20 Min",
  calories: "70 kcal",
  image:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Step Ups",
  description:
    "Leg strengthening cardio movement using elevated platform.",
  duration: "20 Reps",
  calories: "50 kcal",
  image:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
 },
            ],
          },


          // INTERMEDIATE
        // MORNING → CARDIO → INTERMEDIATE

{
  id: 122,
  level: "Intermediate",
  image:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",

  exercises: [

    {
      name: "Cycling Sprints",
      description:
        "High speed cycling intervals for endurance training.",
      duration: "15 Min",
      calories: "220 kcal",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=1VYlOKUdylM",
    },

    {
      name: "Rowing",
      description:
        "Full body cardio machine workout improving stamina.",
      duration: "12 Min",
      calories: "200 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=1VYlOKUdylM",
    },

    {
      name: "Stair Climber",
      description:
        "Leg focused cardio exercise using stair movement.",
      duration: "10 Min",
      calories: "180 kcal",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=1VYlOKUdylM",
    },

    {
      name: "Jog Intervals",
      description:
        "Alternating running and jogging for calorie burn.",
      duration: "20 Min",
      calories: "210 kcal",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=1VYlOKUdylM",
    },

    {
      name: "Power Walking",
      description:
        "Fast walking cardio exercise for heart health.",
      duration: "25 Min",
      calories: "150 kcal",
      image:
        "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=1VYlOKUdylM",
    },
  ],
},

          // ADVANCED
        // MORNING → CARDIO → ADVANCED

{
  id: 123,
  level: "Advanced",
  image:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200",

  exercises: [

    {
      name: "Marathon Run",
      description:
        "Long distance endurance running exercise.",
      duration: "45 Min",
      calories: "450 kcal",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Spin Bike HIIT",
      description:
        "High intensity interval cycling workout.",
      duration: "20 Min",
      calories: "350 kcal",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Hill Sprints",
      description:
        "Sprint training on incline surfaces for power.",
      duration: "15 Min",
      calories: "300 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Battle Rope Cardio",
      description:
        "Intense rope movement workout for fat burn.",
      duration: "12 Min",
      calories: "260 kcal",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },

    {
      name: "Air Bike",
      description:
        "Full body cardio workout using resistance bike.",
      duration: "18 Min",
      calories: "320 kcal",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },
  ],
},
        ],
      },
    ],
  },
// =========================================================
// AFTERNOON MODE
// =========================================================
{
  id: 2,

  slug: "afternoon",

  title: "Afternoon Strength",

  description:
    "Muscle building and strength training",

  image:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
   

  gradient:
    "from-cyan-500 to-blue-500",

  categories: [

    {
      id: 21,

      name: "Strength Training",

      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
   

      subcategories: [

        // BASIC
        {
          id: 211,

          level: "Basic",

          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
             video:"https://www.youtube.com/watch?v=iSSAk4XCsRA",

          exercises: [

            {
  name: "Bench Press",
  description:
    "Upper body strength exercise targeting chest muscles.",
  duration: "12 Reps",
  calories: "70 kcal",
  image:
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Push Ups",
  description:
    "Classic bodyweight exercise for chest and arms.",
  duration: "20 Reps",
  calories: "50 kcal",
  image:
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Bodyweight Squats",
  description:
    "Lower body movement to build leg strength.",
  duration: "20 Reps",
  calories: "60 kcal",
  image:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Dumbbell Curl",
  description:
    "Arm exercise focusing on biceps development.",
  duration: "15 Reps",
  calories: "40 kcal",
  image:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Plank",
  description:
    "Core stability exercise to strengthen abdominal muscles.",
  duration: "60 Sec",
  calories: "25 kcal",
  image:
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},
          ],
        },

        // INTERMEDIATE
      // AFTERNOON → INTERMEDIATE

{
  id: 212,
  level: "Intermediate",
  image:
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",

  exercises: [

    {
      name: "Incline Bench Press",
      description:
        "Chest focused exercise targeting upper pec muscles.",
      duration: "12 Reps",
      calories: "90 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=8iPEnn-ltC8",
    },

    {
      name: "Deadlift",
      description:
        "Compound exercise strengthening back and legs.",
      duration: "10 Reps",
      calories: "120 kcal",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ytGaGIn3SjE",
    },

    {
      name: "Pull Ups",
      description:
        "Upper body movement targeting lats and arms.",
      duration: "12 Reps",
      calories: "70 kcal",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    },

    {
      name: "Walking Lunges",
      description:
        "Leg strengthening movement improving balance.",
      duration: "20 Reps",
      calories: "85 kcal",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=wrwwXE_x-pQ",
    },

    {
      name: "Shoulder Press",
      description:
        "Strength exercise for shoulder muscle growth.",
      duration: "12 Reps",
      calories: "75 kcal",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=qEwKCR5JCog",
    },
  ],
},

        // ADVANCED
      // AFTERNOON → ADVANCED

{
  id: 213,
  level: "Advanced",
  image:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",

  exercises: [

    {
      name: "Barbell Squats",
      description:
        "Heavy lower body exercise for maximum strength.",
      duration: "10 Reps",
      calories: "150 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=ultWZbUMPL8",
    },

    {
      name: "Romanian Deadlift",
      description:
        "Hamstring and glute focused strength movement.",
      duration: "12 Reps",
      calories: "130 kcal",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=2SHsk9AzdjA",
    },

    {
      name: "Weighted Pull Ups",
      description:
        "Advanced back workout with additional resistance.",
      duration: "10 Reps",
      calories: "110 kcal",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    },

    {
      name: "Arnold Press",
      description:
        "Shoulder movement increasing muscle definition.",
      duration: "12 Reps",
      calories: "90 kcal",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=vj2w851ZHRM",
    },

    {
      name: "Bulgarian Split Squat",
      description:
        "Single leg workout improving stability and strength.",
      duration: "15 Reps",
      calories: "100 kcal",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=2C-uNgKwPLE",
    },
  ],
},
      ],
    },
  ],
},

// =========================================================
// EVENING MODE
// =========================================================
{
  id: 3,

  slug: "evening",

  title: "Evening Recovery",

  description:
    "Relax and recover your body",

  image:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",


  gradient:
    "from-purple-500 to-indigo-500",

  categories: [

    {
      id: 31,

      name: "Recovery Training",

      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
    

      subcategories: [

        // BASIC
        {
          id: 311,

          level: "Basic",

          image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
             video:"https://www.youtube.com/watch?v=iSSAk4XCsRA",
          exercises: [
{
  name: "Meditation",
  description:
    "Relax the mind and improve breathing focus.",
  duration: "10 Min",
  calories: "15 kcal",
  image:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Breathing Exercise",
  description:
    "Controlled breathing technique for stress relief.",
  duration: "5 Min",
  calories: "8 kcal",
  image:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Child Pose",
  description:
    "Gentle yoga pose for flexibility and relaxation.",
  duration: "5 Min",
  calories: "12 kcal",
  image:
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Slow Walk",
  description:
    "Low intensity recovery walk to relax muscles.",
  duration: "20 Min",
  calories: "45 kcal",
  image:
    "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},

{
  name: "Neck Stretch",
  description:
    "Stretching exercise to reduce neck stiffness.",
  duration: "5 Min",
  calories: "10 kcal",
  image:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
  video:
    "https://www.youtube.com/watch?v=iSSAk4XCsRA",
},
          ],
        },

     // EVENING → INTERMEDIATE

{
  id: 312,
  level: "Intermediate",
  image:
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",

  exercises: [

    {
      name: "Yoga Flow",
      description:
        "Smooth yoga sequence improving flexibility and mobility.",
      duration: "20 Min",
      calories: "80 kcal",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    },

    {
      name: "Foam Rolling",
      description:
        "Muscle recovery technique reducing soreness and tightness.",
      duration: "10 Min",
      calories: "25 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=8caF1Keg2XU",
    },

    {
      name: "Hip Stretch",
      description:
        "Mobility exercise improving hip flexibility.",
      duration: "8 Min",
      calories: "18 kcal",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=Ho9em79_0qg",
    },

    {
      name: "Hamstring Stretch",
      description:
        "Stretch exercise reducing tightness in back legs.",
      duration: "7 Min",
      calories: "15 kcal",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    },

    {
      name: "Wall Stretch",
      description:
        "Upper body recovery stretch improving posture.",
      duration: "5 Min",
      calories: "12 kcal",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=Ho9em79_0qg",
    },
  ],
},

        // ADVANCED
     // EVENING → ADVANCED

{
  id: 313,
  level: "Advanced",
  image:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",

  exercises: [

    {
      name: "Advanced Yoga Flow",
      description:
        "Complex yoga movements improving flexibility and balance.",
      duration: "30 Min",
      calories: "120 kcal",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    },

    {
      name: "Deep Stretch Routine",
      description:
        "Full body flexibility workout for recovery.",
      duration: "20 Min",
      calories: "60 kcal",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=Ho9em79_0qg",
    },

    {
      name: "Mobility Flow",
      description:
        "Joint mobility sequence improving movement quality.",
      duration: "15 Min",
      calories: "45 kcal",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=8caF1Keg2XU",
    },

    {
      name: "Recovery Pilates",
      description:
        "Core focused recovery workout improving posture.",
      duration: "25 Min",
      calories: "95 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=lCg_gh_fppI",
    },

    {
      name: "Full Body Stretch",
      description:
        "Advanced stretching routine for complete body recovery.",
      duration: "18 Min",
      calories: "50 kcal",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
      video:
        "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    },
  ],
},
      ],
    },
  ],
},
];

export default workoutModes;