// ======================================================
// src/pages/WorkoutSuggestionsPage.jsx
// AUTO USER DATA SMART SUGGESTIONS PAGE
// ======================================================

import {
  useState,
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Activity,
  Apple,
  Dumbbell,
  User,
  Scale,
  Ruler,
  Target,
  Flame,
} from "lucide-react";

// ======================================================
// PAGE
// ======================================================

const WorkoutSuggestionsPage = () => {

  // ======================================================
  // USER
  // ======================================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    ) || {};

  const userId =
    currentUser?.email ||
    "guest";

  // ======================================================
  // HEALTH PROFILE
  // ======================================================

  const healthProfile =
    JSON.parse(
      localStorage.getItem(
        `health_profile_${userId}`
      )
    ) || {};

  // ======================================================
  // STATES
  // ======================================================

  const [age, setAge] =
    useState("");

  const [
    currentWeight,
    setCurrentWeight,
  ] = useState("");

  const [
    targetWeight,
    setTargetWeight,
  ] = useState("");

  const [feet, setFeet] =
    useState("");

  const [inches, setInches] =
    useState("");

  const [
    result,
    setResult,
  ] = useState(null);

  // ======================================================
  // AUTO LOAD USER DATA
  // ======================================================

  useEffect(() => {

    if (
      userId !== "guest"
    ) {

      setAge(
        healthProfile?.age || 22
      );

      setCurrentWeight(
        healthProfile?.weight || 72
      );

      setTargetWeight(
        healthProfile?.targetWeight || 65
      );

      setFeet(
        healthProfile?.feet || 5
      );

      setInches(
        healthProfile?.inches || 8
      );

    }

  }, []);

  // ======================================================
  // THEME
  // ======================================================

  const settings =
    JSON.parse(
      localStorage.getItem(
        `gym_settings_${userId}`
      )
    ) || {};

  const currentTheme =
    settings?.theme ||
    "dark";

  const isDark =
    currentTheme === "dark" ||

    (
      currentTheme ===
        "system" &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    );

  // ======================================================
  // THEME CLASSES
  // ======================================================

  const bgClass =
    isDark

      ? `
      bg-[#070B1A]
      text-white
      `

      : `
      bg-gradient-to-br
      from-[#fdf2f8]
      via-[#eef2ff]
      to-[#ecfeff]
      text-slate-900
      `;

  const cardClass =
    isDark

      ? `
      bg-white/[0.04]
      border-white/10
      `

      : `
      bg-white/80
      border-white/60
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const inputClass =
    isDark

      ? `
      bg-white/5
      border-white/10
      text-white
      `

      : `
      bg-white
      border-slate-200
      text-slate-800
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ======================================================
  // BMI
  // ======================================================

  const calculateBMI = () => {

    const totalInches =
      Number(feet) * 12 +
      Number(inches);

    const meters =
      totalInches * 0.0254;

    const bmi =
      (
        Number(currentWeight) /
        (meters * meters)
      ).toFixed(1);

    return bmi;
  };

  // ======================================================
  // AUTO GENERATE
  // ======================================================

  useEffect(() => {

    if (
      currentWeight &&
      feet &&
      inches &&
      targetWeight
    ) {

      generateSuggestions();
    }

  }, [
    currentWeight,
    feet,
    inches,
    targetWeight,
  ]);

  // ======================================================
  // GENERATE
  // ======================================================

  const generateSuggestions =
    () => {

      const bmi =
        calculateBMI();

      let bmiStatus =
        "";

      let goal =
        "";

      let workouts = [];

      let foods = [];

      let calories =
        "";

      // ======================================================
      // UNDERWEIGHT
      // ======================================================

      if (bmi < 18.5) {

        bmiStatus =
          "Underweight";

        goal =
          "Healthy Weight Gain";

        calories =
          "2500 - 3000 kcal/day";

        workouts = [

          {
            name:
              "Strength Training",
            image:
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Bench Press",
            image:
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Deadlifts",
            image:
              "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Squats",
            image:
              "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
          },
        ];

        foods = [

          {
            name:
              "Milk",
            image:
              "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Eggs",
            image:
              "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Peanut Butter",
            image:
              "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Chicken",
            image:
              "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
          },
        ];
      }

      // ======================================================
      // NORMAL
      // ======================================================

      else if (
        bmi >= 18.5 &&
        bmi < 25
      ) {

        bmiStatus =
          "Normal";

        goal =
          "Maintain Fitness";

        calories =
          "2200 - 2600 kcal/day";

        workouts = [

          {
            name:
              "Jogging",
            image:
              "https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Cycling",
            image:
              "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Push Ups",
            image:
              "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200",
          },

          {
            name:
              "Yoga",
            image:
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
          },
        ];

        foods = [

          {
            name:
              "Salad",
            image:
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Fruits",
            image:
              "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Rice",
            image:
              "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Protein Meal",
            image:
              "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1200&auto=format&fit=crop",
          },
        ];
      }

      // ======================================================
      // OVERWEIGHT / OBESE
      // ======================================================

      else {

        bmiStatus =
          bmi >= 30
            ? "Obese"
            : "Overweight";

        goal =
          "Healthy Fat Loss";

        calories =
          "1500 - 2000 kcal/day";

        workouts = [

          {
            name:
              "Slow Walking",
            image:
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Treadmill",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Cycling",
            image:
              "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Low Impact Cardio",
            image:
              "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
          },
        ];

        foods = [

          {
            name:
              "Green Salad",
            image:
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Soup",
            image:
              "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Fruits",
            image:
              "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
          },

          {
            name:
              "Vegetables",
            image:
              "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
          },
        ];
      }

      setResult({

        bmi,
        bmiStatus,
        goal,
        workouts,
        foods,
        calories,
      });
    };

  return (

    <div
      className={`
      min-h-screen
      ${bgClass}
      p-5
      pb-32
      transition-all
      duration-500
      `}
    >

      {/* HEADER */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        mb-6
        `}
      >

        <div className="
        flex
        items-center
        gap-4
        ">

          <div className="
          w-16
          h-16
          rounded-[22px]
          bg-gradient-to-r
          from-pink-500
          to-orange-500
          flex
          items-center
          justify-center
          ">

            <Activity className="
            text-white
            w-8
            h-8
            " />

          </div>

          <div>

            <h1 className="
            text-3xl
            font-black
            ">
              Smart Suggestions
            </h1>

            <p className={subText}>
              Personalized workout & food plans
            </p>

          </div>
        </div>
      </div>

      {/* USER DETAILS */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[30px]
        p-6
        mb-6
        `}
      >

        <h2 className="
        text-2xl
        font-black
        mb-5
        ">
          Your Health Details
        </h2>

        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        ">

          {/* AGE */}

          <div>

            <label className="
            text-sm
            font-semibold
            mb-2
            block
            ">
              Age
            </label>

            <div className="relative">

              <User className="
              absolute
              left-4
              top-4
              w-5
              h-5
              text-slate-400
              " />

              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) =>
                  setAge(
                    e.target.value
                  )
                }
                className={`
                h-14
                w-full
                rounded-2xl
                border
                pl-12
                pr-4
                outline-none
                ${inputClass}
                `}
              />
            </div>
          </div>

          {/* CURRENT WEIGHT */}

          <div>

            <label className="
            text-sm
            font-semibold
            mb-2
            block
            ">
              Current Weight (kg)
            </label>

            <div className="relative">

              <Scale className="
              absolute
              left-4
              top-4
              w-5
              h-5
              text-slate-400
              " />

              <input
                type="number"
                placeholder="Enter current weight"
                value={currentWeight}
                onChange={(e) =>
                  setCurrentWeight(
                    e.target.value
                  )
                }
                className={`
                h-14
                w-full
                rounded-2xl
                border
                pl-12
                pr-4
                outline-none
                ${inputClass}
                `}
              />
            </div>
          </div>

          {/* HEIGHT FEET */}

          <div>

            <label className="
            text-sm
            font-semibold
            mb-2
            block
            ">
              Height (Feet)
            </label>

            <div className="relative">

              <Ruler className="
              absolute
              left-4
              top-4
              w-5
              h-5
              text-slate-400
              " />

              <input
                type="number"
                placeholder="Height in feet"
                value={feet}
                onChange={(e) =>
                  setFeet(
                    e.target.value
                  )
                }
                className={`
                h-14
                w-full
                rounded-2xl
                border
                pl-12
                pr-4
                outline-none
                ${inputClass}
                `}
              />
            </div>
          </div>

          {/* HEIGHT INCHES */}

          <div>

            <label className="
            text-sm
            font-semibold
            mb-2
            block
            ">
              Height (Inches)
            </label>

            <div className="relative">

              <Ruler className="
              absolute
              left-4
              top-4
              w-5
              h-5
              text-slate-400
              " />

              <input
                type="number"
                placeholder="Height in inches"
                value={inches}
                onChange={(e) =>
                  setInches(
                    e.target.value
                  )
                }
                className={`
                h-14
                w-full
                rounded-2xl
                border
                pl-12
                pr-4
                outline-none
                ${inputClass}
                `}
              />
            </div>
          </div>

          {/* TARGET WEIGHT */}

          <div>

            <label className="
            text-sm
            font-semibold
            mb-2
            block
            ">
              Target Weight (kg)
            </label>

            <div className="relative">

              <Target className="
              absolute
              left-4
              top-4
              w-5
              h-5
              text-slate-400
              " />

              <input
                type="number"
                placeholder="Enter target weight"
                value={targetWeight}
                onChange={(e) =>
                  setTargetWeight(
                    e.target.value
                  )
                }
                className={`
                h-14
                w-full
                rounded-2xl
                border
                pl-12
                pr-4
                outline-none
                ${inputClass}
                `}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS */}

      {result && (

        <div className="space-y-6">

          {/* BMI DETAILS */}

          <div
            className={`
            ${cardClass}
            border
            rounded-[30px]
            p-6
            `}
          >

            <div className="
            flex
            flex-wrap
            gap-4
            ">

              <div className="
              px-5
              py-3
              rounded-2xl
              bg-pink-500/10
              text-pink-400
              font-bold
              ">
                BMI Score:
                {" "}
                {result.bmi}
              </div>

              <div className="
              px-5
              py-3
              rounded-2xl
              bg-cyan-500/10
              text-cyan-400
              font-bold
              ">
                Status:
                {" "}
                {result.bmiStatus}
              </div>

              <div className="
              px-5
              py-3
              rounded-2xl
              bg-orange-500/10
              text-orange-400
              font-bold
              ">
                Goal:
                {" "}
                {result.goal}
              </div>

              <div className="
              px-5
              py-3
              rounded-2xl
              bg-green-500/10
              text-green-400
              font-bold
              ">
                Calories:
                {" "}
                {result.calories}
              </div>
            </div>
          </div>

          {/* WORKOUTS */}

          <div>

            <div className="
            flex
            items-center
            gap-3
            mb-5
            ">

              <Dumbbell className="
              text-pink-400
              " />

              <h2 className="
              text-3xl
              font-black
              ">
                Recommended Workouts
              </h2>
            </div>

            <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            ">

              {result.workouts.map(
                (
                  item,
                  index
                ) => (

                  <motion.div

                    key={index}

                    whileHover={{
                      y: -4,
                    }}

                    className={`
                    ${cardClass}
                    border
                    rounded-[28px]
                    overflow-hidden
                    `}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                      w-full
                      h-44
                      object-cover
                      "
                    />

                    <div className="p-4">

                      <h3 className="
                      text-xl
                      font-bold
                      ">
                        {item.name}
                      </h3>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* FOODS */}

          <div>

            <div className="
            flex
            items-center
            gap-3
            mb-5
            ">

              <Apple className="
              text-green-400
              " />

              <h2 className="
              text-3xl
              font-black
              ">
                Recommended Foods
              </h2>
            </div>

            <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            ">

              {result.foods.map(
                (
                  item,
                  index
                ) => (

                  <motion.div

                    key={index}

                    whileHover={{
                      y: -4,
                    }}

                    className={`
                    ${cardClass}
                    border
                    rounded-[28px]
                    overflow-hidden
                    `}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                      w-full
                      h-44
                      object-cover
                      "
                    />

                    <div className="p-4">

                      <h3 className="
                      text-xl
                      font-bold
                      ">
                        {item.name}
                      </h3>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutSuggestionsPage;