// ============================================
// src/pages/WorkoutSuggestions.jsx
// COMPLETE UPDATED PROFESSIONAL SMART
// WORKOUT SUGGESTIONS PAGE
// ============================================

import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Heart,
  Flame,
  Activity,
  Scale,
  Target,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import {
  calculateBMI,
  getBMIStatus,
  getWorkoutSuggestions,
} from "../utils/workoutRecommendations";
// import { selectAxisRangeWithReverse } from "recharts/types/state/selectors/axisSelectors";

const WorkoutSuggestions = () => {

  // ============================================
  // STATES
  // ============================================

  const [
    height,
    setHeight,
  ] = useState("");
 const [
    age,
    setAge,
  ] = useState("");

  const [
    weight,
    setWeight,
  ] = useState("");

  const [
    targetCalories,
    setTargetCalories,
  ] = useState("");

  const [
    fitnessLevel,
    setFitnessLevel,
  ] = useState("beginner");

  const [
    preferredWorkout,
    setPreferredWorkout,
  ] = useState("");

  const [
    diseases,
    setDiseases,
  ] = useState([]);

  const [
    bmiData,
    setBmiData,
  ] = useState(null);

  const [
  suggestions,
  setSuggestions,
] = useState([]);

const [
  foodSuggestions,
  setFoodSuggestions,
] = useState([]);
const [
  showFoods,
  setShowFoods,
] = useState(false);

  // ============================================
  // THEME
  // ============================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    ) || {};

  const userId =
    currentUser?.email ||
    "guest";

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
      currentTheme === "system" &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    );

  // ============================================
  // THEME CLASSES
  // ============================================

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
      border-white/70
      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      backdrop-blur-xl
      `;

  const inputClass =
    isDark

      ? `
      bg-white/5
      border-white/10
      text-white
      placeholder:text-slate-500
      `

      : `
      bg-white
      border-slate-200
      text-slate-800
      placeholder:text-slate-400
      shadow-sm
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ============================================
  // DISEASE OPTIONS
  // ============================================

  const diseaseOptions = [

    {
      value: "heart",
      label: "Heart Patient",
    },

    {
      value: "asthma",
      label: "Asthma",
    },

    {
      value: "kneePain",
      label: "Knee Pain",
    },

    {
      value: "diabetes",
      label: "Diabetes",
    },

    {
      value: "bp",
      label: "Blood Pressure",
    },

    {
      value: "obesity",
      label: "Obesity",
    },

    {
      value: "thyroid",
      label: "Thyroid",
    },

    {
      value: "arthritis",
      label: "Arthritis",
    },
  ];

// ============================================
// GENERATE
// ============================================

const generateSuggestions =
  () => {

    if (
      !height ||
      !weight
    ) {

      alert(
        "Please enter height and weight"
      );

      return;
    }

    const bmi =
      calculateBMI(
        Number(height),
        Number(weight)
      );

    const bmiStatus =
      getBMIStatus(bmi);

    setBmiData({

      bmi,

      ...bmiStatus,
    });

    const recommended =
      getWorkoutSuggestions({

        bmi,

        diseases,

        targetCalories:
          Number(
            targetCalories
          ),
      });

    // IMPORTANT FIX

    setSuggestions(
      recommended.exercises || []
    );

   setFoodSuggestions(
  recommended.foods || []
);

setShowFoods(false);
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
        rounded-[34px]
        p-6
        mb-7
        `}
      >

        <div className="
        flex
        justify-between
        items-center
        ">

          <div>

            <h1 className="
            text-5xl
            font-black
            ">
              Smart Workout Suggestions
            </h1>

            <p className={`
            mt-3
            text-lg
            ${subText}
            `}>
              AI-powered safe workout recommendations
            </p>

          </div>

          <div className="
          w-24
          h-24
          rounded-[30px]
          bg-gradient-to-r
          from-pink-500
          to-orange-500
          flex
          items-center
          justify-center
          shadow-2xl
          ">

            <Sparkles className="
            w-12
            h-12
            text-white
            " />

          </div>
        </div>
      </div>

      {/* FORM */}
{/* ============================================ */}
{/* USER HEALTH FORM */}
{/* ============================================ */}

<div
  className={`
  ${cardClass}
  border
  rounded-[34px]
  p-6
  mb-7
  `}
>

  {/* TITLE */}

  <div className="mb-7">

    <h2 className="
    text-3xl
    font-black
    ">
      Personal Health Details
    </h2>

    <p className={`${subText} mt-2`}>
      Fill your details to generate personalized workout and food suggestions
    </p>

  </div>

  {/* FORM GRID */}

  <div className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-5
  ">

    {/* HEIGHT */}

    <div>

      <label className="
      block
      mb-2
      text-sm
      font-semibold
      ">
        Height (cm)
      </label>

      <input
        type="number"
        placeholder="Enter your height"
        value={height}
        onChange={(e) =>
          setHeight(
            e.target.value
          )
        }
        className={`
        h-14
        rounded-2xl
        border
        px-5
        w-full
        outline-none
        transition-all
        ${inputClass}
        `}
      />

    </div>

    {/* WEIGHT */}

    <div>

      <label className="
      block
      mb-2
      text-sm
      font-semibold
      ">
        Current Weight (kg)
      </label>

      <input
        type="number"
        placeholder="Enter your current weight"
        value={weight}
        onChange={(e) =>
          setWeight(
            e.target.value
          )
        }
        className={`
        h-14
        rounded-2xl
        border
        px-5
        w-full
        outline-none
        transition-all
        ${inputClass}
        `}
      />
      
      

    </div>
     <div>

      <label className="
      block
      mb-2
      text-sm
      font-semibold
      ">
        Current Age(years)
      </label>

      <input
        type="number"
        placeholder="Enter your current age"
        value={age}
        onChange={(e) =>
        setAge(e.target.value)
        }
        className={`
        h-14
        rounded-2xl
        border
        px-5
        w-full
        outline-none
        transition-all
        ${inputClass}
        `}
      />
    </div>

    {/* TARGET CALORIES */}

    <div>

      <label className="
      block
      mb-2
      text-sm
      font-semibold
      ">
        Daily Target Calories
      </label>

      <input
        type="number"
        placeholder="Example: 2200"
        value={targetCalories}
        onChange={(e) =>
          setTargetCalories(
            e.target.value
          )
        }
        className={`
        h-14
        rounded-2xl
        border
        px-5
        w-full
        outline-none
        transition-all
        ${inputClass}
        `}
      />

    </div>

    {/* FITNESS LEVEL */}

    {/* <div>

      <label className="
      block
      mb-2
      text-sm
      font-semibold
      ">
        Fitness Level
      </label>

      <select
        value={fitnessLevel}
        onChange={(e) =>
          setFitnessLevel(
            e.target.value
          )
        }
        className={`
        h-14
        rounded-2xl
        border
        px-5
        w-full
        outline-none
        transition-all
        cursor-pointer
        ${inputClass}
        `}
      >

        <option value="beginner">
          Beginner
        </option>

        <option value="intermediate">
          Intermediate
        </option>

        <option value="advanced">
          Advanced
        </option>

      </select>

    </div> */}

  </div>

  {/* HEALTH CONDITIONS */}

  <div className="mt-8">

    <div className="
    flex
    items-center
    gap-3
    mb-5
    ">

      <ShieldCheck className="
      text-green-400
      " />

      <h2 className="
      text-2xl
      font-bold
      ">
        Health Conditions
      </h2>

    </div>

    <div className="
    flex
    flex-wrap
    gap-3
    ">

      {diseaseOptions.map(
        (item, index) => {

          const active =
            diseases.includes(
              item.value
            );

          return (

            <button
              key={index}
              onClick={() => {

                if (active) {

                  setDiseases(
                    diseases.filter(
                      (d) =>
                        d !==
                        item.value
                    )
                  );

                } else {

                  setDiseases([
                    ...diseases,
                    item.value,
                  ]);
                }
              }}
              className={`
              px-5
              h-12
              rounded-2xl
              font-semibold
              transition-all
              duration-300

              ${
                active

                  ? `
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  text-white
                  shadow-lg
                  `

                  : `
                  ${
                    isDark
                      ? `
                        bg-white/10
                        border
                        border-white/10
                      `
                      : `
                        bg-slate-100
                        border
                        border-slate-200
                      `
                  }
                  `
              }
              `}
            >

              {item.label}

            </button>
          );
        }
      )}

    </div>
  </div>

  {/* BUTTON */}

  <button
    onClick={
      generateSuggestions
    }
    className="
    mt-8
    w-full
    h-16
    rounded-[24px]
    bg-gradient-to-r
    from-pink-500
    to-orange-500
    text-white
    font-bold
    text-xl
    shadow-2xl
    hover:scale-[1.01]
    transition-all
    duration-300
    "
  >

    Generate Smart Suggestions

  </button>

</div>

      {/* BMI */}

      {bmiData && (

        <div
          className={`
          ${cardClass}
          border
          rounded-[34px]
          p-6
          mb-7
          `}
        >

          <div className="
          flex
          items-center
          gap-5
          ">

            <div className="
            w-20
            h-20
            rounded-[24px]
            bg-cyan-500/20
            flex
            items-center
            justify-center
            ">

              <Scale className="
              text-cyan-400
              w-10
              h-10
              " />

            </div>

            <div>

              <h2 className="
              text-4xl
              font-black
              ">
                BMI: {bmiData.bmi}
              </h2>

              <p className={`
              text-xl
              font-semibold
              ${bmiData.color}
              `}>
                {bmiData.status}
              </p>

              <p className={`
              mt-2
              ${subText}
              `}>
                Goal: {bmiData.goal}
              </p>

            </div>
          </div>
        </div>
      )}
         {/* SUGGESTIONS */}

      <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-6
      ">

  {suggestions?.map(
          (
            exercise,
            index
          ) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 30,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              whileHover={{
                y: -5,
              }}

              className={`
              ${cardClass}
              border
              rounded-[32px]
              overflow-hidden
              `}
            >

              {/* IMAGE */}

              <div className="
              h-52
              overflow-hidden
              ">

                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="
                  w-full
                  h-full
                  object-cover
                  hover:scale-105
                  transition-all
                  duration-500
                  "
                />

              </div>

              {/* CONTENT */}

              <div className="p-5">

                <div className="
                flex
                justify-between
                items-start
                gap-3
                ">

                  <div>

                    <h2 className="
                    text-3xl
                    font-black
                    leading-tight
                    ">
                      {exercise.name}
                    </h2>

                    <p className={`
                    mt-3
                    leading-7
                    ${subText}
                    `}>
                      {exercise.description}
                    </p>

                  </div>

                  <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-pink-500
                  to-orange-500
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  ">

                    <Activity className="
                    text-white
                    w-7
                    h-7
                    " />

                  </div>
                </div>

                {/* TAGS */}

                <div className="
                flex
                flex-wrap
                gap-3
                mt-5
                ">

                  <div className="
                  px-4
                  h-10
                  rounded-xl
                  bg-pink-500/15
                  text-pink-400
                  flex
                  items-center
                  font-semibold
                  ">

                    {exercise.level}

                  </div>

                  <div className="
                  px-4
                  h-10
                  rounded-xl
                  bg-cyan-500/15
                  text-cyan-400
                  flex
                  items-center
                  font-semibold
                  ">

                    {exercise.category}

                  </div>

                  <div className="
                  px-4
                  h-10
                  rounded-xl
                  bg-orange-500/15
                  text-orange-400
                  flex
                  items-center
                  font-semibold
                  ">

                    {exercise.calories}

                  </div>

                </div>

                {/* SAFETY */}

                <div
                  className={`
                  mt-6
                  rounded-2xl
                  p-4

                  ${
                    isDark

                      ? `
                      bg-green-500/10
                      border
                      border-green-500/20
                      `

                      : `
                      bg-green-50
                      border
                      border-green-200
                      `
                  }
                  `}
                >

                  <div className="
                  flex
                  items-center
                  gap-3
                  ">

                    <ShieldCheck className="
                    text-green-400
                    w-5
                    h-5
                    " />

                    <p className={`
                    text-sm
                    font-medium

                    ${
                      isDark
                        ? "text-green-300"
                        : "text-green-700"
                    }
                    `}>
                      Safe & recommended for your health profile
                    </p>

                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
{/* ============================================ */}
{/* SHOW FOOD BUTTON */}
{/* ============================================ */}

{
  suggestions.length > 0 && (

    <div className="mt-8 mb-8">

      <button
        onClick={() =>
          setShowFoods(true)
        }
        className="
        w-full
        h-16
        rounded-[24px]
        bg-gradient-to-r
        from-green-500
        to-emerald-500
        text-white
        font-bold
        text-xl
        shadow-2xl
        hover:scale-[1.01]
        transition-all
        duration-300
        "
      >

        View Recommended Foods

      </button>

    </div>
  )
}

{/* ============================================ */}
{/* FOOD SUGGESTIONS WITH IMAGES */}
{/* ============================================ */}
{
  showFoods &&
  foodSuggestions.length > 0 && (

    <div
      className={`
      ${cardClass}
      border
      rounded-[34px]
      p-6
      mb-7
      `}
    >

      <div className="
      flex
      items-center
      justify-between
      mb-6
      flex-wrap
      gap-4
      ">

        <div>

          <h2 className="
          text-3xl
          font-black
          ">
            Recommended Foods
          </h2>

          <p className={`${subText} mt-2`}>
            Personalized healthy food suggestions
          </p>

        </div>

        <div className="
        px-5
        py-3
        rounded-2xl
        bg-gradient-to-r
        from-pink-500
        to-orange-500
        text-white
        font-bold
        ">
          {foodSuggestions.length} Foods
        </div>
      </div>

      {/* FOOD DATA */}

      {[
        {
          name: "Salads",
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Fruits",
          image:
            "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Yogurt",
          image:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Wheat Bread",
          image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Nuts",
          image:
            "https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Eggs",
          image:
            "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Oats",
          image:
            "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Chicken",
          image:
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1200&auto=format&fit=crop",
        },

      ]
       .filter((item) =>

  foodSuggestions.some(
    (food) =>

      food
        .toLowerCase()
        .includes(
          item.name.toLowerCase()
        )
  )
)

        .map((food, index) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            whileHover={{
              y: -5,
            }}

            className={`
            mb-5
            overflow-hidden
            rounded-[28px]
            border

            ${
              isDark

                ? `
                border-white/10
                bg-white/[0.03]
                `

                : `
                border-orange-100
                bg-white
                `
            }
            `}
          >

            <div className="
            grid
            grid-cols-1
            md:grid-cols-[220px_1fr]
            ">

              {/* IMAGE */}

              <div className="
              h-[220px]
              overflow-hidden
              ">

                <img
                  src={food.image}
                  alt={food.name}
                  className="
                  w-full
                  h-full
                  object-cover
                  hover:scale-110
                  transition-all
                  duration-500
                  "
                />

              </div>

              {/* CONTENT */}

              <div className="
              p-6
              flex
              flex-col
              justify-center
              ">

                <div className="
                flex
                items-center
                justify-between
                gap-4
                flex-wrap
                ">

                  <div>

                    <h3 className="
                    text-3xl
                    font-black
                    ">
                      {food.name}
                    </h3>

                    <p className={`${subText} mt-3 leading-7`}>

                      {
                        food.name === "Salads"
                          ? "Rich in fiber and nutrients for healthy digestion and weight balance."

                        : food.name === "Fruits"
                          ? "Packed with vitamins, antioxidants and natural energy."

                        : food.name === "Yogurt"
                          ? "Excellent for gut health, protein and recovery."

                        : food.name === "Wheat Bread"
                          ? "Healthy carbohydrates for sustained daily energy."

                        : food.name === "Nuts"
                          ? "Healthy fats and proteins for muscle recovery."

                        : food.name === "Eggs"
                          ? "High-quality protein for muscle growth and strength."

                        : food.name === "Oats"
                          ? "Improves heart health and keeps you full longer."

                        : "Lean protein source supporting muscle development."
                      }

                    </p>

                  </div>

                  <div className="
                  px-5
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-pink-500
                  to-orange-500
                  text-white
                  font-bold
                  ">
                    Healthy Choice
                  </div>

                </div>

                {/* TAGS */}

                <div className="
                flex
                flex-wrap
                gap-3
                mt-6
                ">

                  <div className="
                  px-4
                  py-2
                  rounded-xl
                  bg-green-500/15
                  text-green-400
                  font-semibold
                  text-sm
                  ">
                    Rich Nutrition
                  </div>

                  <div className="
                  px-4
                  py-2
                  rounded-xl
                  bg-cyan-500/15
                  text-cyan-400
                  font-semibold
                  text-sm
                  ">
                    Fitness Friendly
                  </div>

                  <div className="
                  px-4
                  py-2
                  rounded-xl
                  bg-orange-500/15
                  text-orange-400
                  font-semibold
                  text-sm
                  ">
                    Recommended
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  )
}

   
    </div>
  );
};

export default WorkoutSuggestions;