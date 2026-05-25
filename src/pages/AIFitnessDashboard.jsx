// ======================================================
// src/pages/DashboardPage.jsx
// FINAL PREMIUM MERGED DASHBOARD
// ======================================================

import {
  Flame,
  Dumbbell,
  LogOut,
  User,
  Activity,
  ChevronRight,
  Clock3,
  Target,
  Zap,
  Heart,
  Moon,
  Droplets,
  Brain,
  Trophy,
  TrendingUp,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  calculateBMI,
  getBMIStatus,
} from "../utils/workoutRecommendations";

const quotes = [
  "Push harder than yesterday.",
  "Discipline beats motivation.",
  "Consistency creates champions.",
  "Train insane or remain the same.",
  "Small progress is still progress.",
];

const DashboardPage = () => {

  const navigate =
    useNavigate();

    
  // ======================================================
  // USER
  // ======================================================

  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    ) || {};

  const userId =
    storedUser?.email ||
    "guest";

  const isGuestUser =
  userId === "guest";


  // ======================================================
  // SETTINGS
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
      currentTheme === "system" &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    );

  // ======================================================
  // THEME
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
      backdrop-blur-xl
      `

      : `
      bg-white/75
      border-white/60
      backdrop-blur-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ======================================================
  // RANDOM QUOTE
  // ======================================================

  const quote =
    quotes[
      Math.floor(
        Math.random() *
          quotes.length
      )
    ];

// ======================================================
// HISTORY
// ======================================================

const historyKey =
  `workout_history_${userId}`;

const realWorkoutHistory =
  JSON.parse(
    localStorage.getItem(
      historyKey
    )
  ) || [];

// ======================================================
// DEMO DATA
// ======================================================

const demoWorkoutHistory = [

  {
    date: "2026-05-20",
    totalCalories: 320,
    duration: 45,
  },

  {
    date: "2026-05-21",
    totalCalories: 450,
    duration: 60,
  },

  {
    date: "2026-05-22",
    totalCalories: 280,
    duration: 40,
  },
];

// ======================================================
// FINAL WORKOUT DATA
// ======================================================

const workoutHistory =

  isGuestUser

    ? []

    : realWorkoutHistory.length > 0

      ? realWorkoutHistory

      : demoWorkoutHistory;
// ======================================================
// STATS
// ======================================================

const totalWorkouts =

  isGuestUser
    ? 0
    : workoutHistory.length;

const totalCalories =

  isGuestUser

    ? 0

    : workoutHistory.reduce(
        (acc, item) =>
          acc +
          Number(
            item.totalCalories || 0
          ),
        0
      );

const totalHours =

  isGuestUser

    ? 0

    : Math.floor(
        workoutHistory.reduce(
          (acc, item) =>
            acc +
            Number(
              item.duration || 0
            ),
          0
        ) / 60
      );
// ======================================================
// STREAK
// ======================================================

const uniqueDates = [
  ...new Set(
    workoutHistory.map(
      (item) =>
        item.date
    )
  ),
];

let streak =
  isGuestUser
    ? 0
    : 0;

if (!isGuestUser) {

  let currentDate =
    new Date();

  while (true) {

    const formatted =
      currentDate
        .toISOString()
        .split("T")[0];

    if (
      uniqueDates.includes(
        formatted
      )
    ) {

      streak++;

      currentDate.setDate(
        currentDate.getDate() - 1
      );

    } else {

      break;
    }
  }
}
// ======================================================
// HEALTH PROFILE
// ======================================================

const healthProfile =
  JSON.parse(
    localStorage.getItem(
      `health_profile_${userId}`
    )
  ) || {

    feet: 5,
    inches: 8,
    weight: 72,
    currentWeight: 72,
    targetWeight: 65,
    healthStatus: "Healthy",
    diseases: [],
  };

// ======================================================
// HEIGHT CONVERSION
// ======================================================

const totalHeightInMeters =

  (
    (
      Number(
        healthProfile.feet || 0
      ) * 12

      +

      Number(
        healthProfile.inches || 0
      )
    )

    * 0.0254
  );

// ======================================================
// BMI CALCULATION
// ======================================================

const bmi =

  totalHeightInMeters > 0

    ? (

        Number(
          healthProfile.weight || 0
        )

        /

        (
          totalHeightInMeters *
          totalHeightInMeters
        )

      ).toFixed(1)

    : "0";

// ======================================================
// BMI DATA
// ======================================================

const bmiData =
  getBMIStatus(
    Number(bmi)
  );

// ======================================================
// HEALTH TYPE
// ======================================================

let healthType = "Healthy";

if (
  bmiData.status === "Underweight" ||
  bmiData.status === "Overweight" ||
  bmiData.status === "Obese"
) {

  healthType = "Unhealthy";

}

else if (
  bmiData.status === "Normal"
) {

  healthType = "Healthy";
}

  // const bmiData =
  //   getBMIStatus(bmi);

  // ======================================================
  // MONTHLY
  // ======================================================

  const currentMonth =
    new Date().getMonth();

  const monthlyWorkouts =
    workoutHistory.filter(
      (item) =>
        new Date(
          item.date
        ).getMonth() ===
        currentMonth
    );

  const monthlyProgress =
    Math.min(
      Math.floor(
        (
          monthlyWorkouts.length /
          20
        ) * 100
      ),
      100
    );

  // ======================================================
  // TODAY
  // ======================================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayWorkout =
    workoutHistory.find(
      (item) =>
        item.date === today
    );
    // ======================================================
// TODAY CALORIES
// ======================================================

const todayCalories =

  isGuestUser

    ? 0

    : Number(
        todayWorkout?.totalCalories || 0
      );

// ======================================================
// WEEKLY CALORIES
// ======================================================

// ======================================================
// WEEKLY CALORIES
// ======================================================

const weeklyCalories =

  isGuestUser

    ? 0

    : workoutHistory
        .filter((item) => {

          const workoutDate =
            new Date(item.date);

          const todayDate =
            new Date();

          const diffTime =
            todayDate - workoutDate;

          const diffDays =
            diffTime /
            (1000 * 60 * 60 * 24);

          return diffDays <= 7;
        })

        .reduce(
          (acc, item) =>
            acc +
            Number(
              item.totalCalories || 0
            ),
          0
        );

// ======================================================
// AVERAGE CALORIES
// ======================================================

const averageCalories =

  isGuestUser

    ? 0

    : totalWorkouts > 0

      ? Math.round(
          totalCalories /
          totalWorkouts
        )

      : 0;

  // ======================================================
  // LEVEL
  // ======================================================

  let level =
    "Beginner";

  if (
    totalWorkouts >= 100
  ) {

    level = "Elite";

  }

  else if (
    totalWorkouts >= 50
  ) {

    level = "Advanced";

  }

  else if (
    totalWorkouts >= 20
  ) {

    level = "Intermediate";
  }

  // ======================================================
  // FITNESS SCORE
  // ======================================================

const fitnessScore =

  isGuestUser

    ? 0

    : Math.min(
        100,
        Math.max(
          45,
          (
            streak * 4 +
            totalWorkouts +
            monthlyProgress
          ) / 2
        )
      );
  // ======================================================
  // HEALTH MESSAGE
  // ======================================================

 // ======================================================
// HEALTH MESSAGE
// ======================================================

const healthMessage =

  isGuestUser

    ? `
    No health insights available.
    Start your fitness journey by
    completing workouts and updating
    your health profile.
    `

    :

    bmiData.status ===
    "Underweight"

      ? `
      Focus on strength workouts
      and healthy calorie surplus.
      `

      :

      bmiData.status ===
      "Obese"

        ? `
        Safe fat-loss workouts and
        calorie control are recommended.
        `

        :

        bmiData.status ===
        "Overweight"

          ? `
          Stay consistent with workouts
          and calorie tracking.
          `

          :

          `
          Your body condition looks balanced.
          Maintain your routine.
          `;

  // ======================================================
  // MOTIVATION
  // ======================================================

  const motivationQuotes = {

    beginner: [
      "Every expert started as a beginner.",
      "Small progress is still progress.",
      "Show up today, stronger tomorrow.",
    ],

    consistent: [
      "Consistency beats motivation.",
      "You're building a powerful habit.",
      "Discipline creates champions.",
    ],

    advanced: [
      "Your dedication is inspiring.",
      "Elite mindset activated.",
      "You are outperforming your past self.",
    ],

    elite: [
      "You're unstoppable now.",
      "Champions train when others quit.",
      "Your discipline is rare.",
    ],
  };

  let motivationType =
    "beginner";

  if (streak >= 30)
    motivationType =
      "elite";

  else if (streak >= 14)
    motivationType =
      "advanced";

  else if (streak >= 5)
    motivationType =
      "consistent";

  const dynamicQuote =
    motivationQuotes[
      motivationType
    ][
      Math.floor(
        Math.random() * 3
      )
    ];

  // ======================================================
  // WATER + SLEEP
  // ======================================================

  const waterIntake = 2.5;

  const sleepHours = 7.5;

  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = () => {

    localStorage.removeItem(
      "gym_user"
    );

    navigate("/");
  };

  return (

    <div
      className={`
      min-h-screen
      ${bgClass}
      p-5
      pb-32
      overflow-x-hidden
      transition-all
      duration-500
      `}
    >

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        mb-6
        relative
        overflow-hidden
        `}
      >

        <div
          className="
          absolute
          top-[-100px]
          right-[-100px]
          w-[260px]
          h-[260px]
          rounded-full
          bg-pink-500/20
          blur-3xl
          "
        />

        <div className="
        relative
        z-10
        flex
        flex-col
        lg:flex-row
        justify-between
        gap-6
        ">

          {/* LEFT */}

          <div className="
          flex
          items-center
          gap-5
          ">

            <div
              className={`
              w-20
              h-20
              rounded-[28px]
              overflow-hidden
              flex
              items-center
              justify-center

              ${
                isDark

                  ? `
                  bg-gradient-to-r
                  from-pink-500
                  to-orange-500
                  `

                  : `
                  bg-gradient-to-r
                  from-pink-200
                  to-orange-200
                  `
              }
              `}
            >

              {settings?.profile?.image ? (

                <img
                  src={
                    settings.profile.image
                  }
                  alt="profile"
                  className="
                  w-full
                  h-full
                  object-cover
                  "
                />

              ) : (

                <User
                  className={`
                  w-10
                  h-10

                  ${
                    isDark
                      ? "text-white"
                      : "text-slate-700"
                  }
                  `}
                />

              )}
            </div>

            <div>

              <h1 className="
              text-4xl
              font-black
              ">
                Welcome,
                {" "}
                {storedUser?.name ||
                  "Athlete"}
              </h1>

              <p className={`${subText} mt-2`}>
                {quote}
              </p>
<div className="
flex
items-center
gap-3
mt-4
flex-wrap
">

  {/* STREAK */}

  <div
    className={`
    px-4
    py-2
    rounded-xl
    font-bold

    ${
      isDark

        ? `
        bg-pink-500/20
        text-pink-400
        `

        : `
        bg-pink-100
        text-pink-700
        `
    }
    `}
  >
    🔥 {streak} Day Streak
  </div>

  {/* LEVEL */}

  <div
    className={`
    px-4
    py-2
    rounded-xl
    font-bold

    ${
      isDark

        ? `
        bg-cyan-500/20
        text-cyan-400
        `

        : `
        bg-cyan-100
        text-cyan-700
        `
    }
    `}
  >
    🏆 {level}
  </div>

  {/* BMI */}

  <div
    className={`
    px-4
    py-2
    rounded-xl
    font-bold

    ${
      isDark

        ? `
        bg-orange-500/20
        text-orange-300
        `

        : `
        bg-orange-100
        text-orange-700
        `
    }
    `}
  >
    💪 BMI: {bmi}
  </div>

  {/* HEALTH TYPE */}

  <div
    className={`
    px-4
    py-2
    rounded-xl
    font-bold

    ${
      isDark

        ? `
        bg-green-500/20
        text-green-300
        `

        : `
        bg-green-100
        text-green-700
        `
    }
    `}
  >
    ❤️ {healthType}
  </div>

</div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="
          flex
          gap-4
          flex-wrap
          ">

            <button
              onClick={() =>
                navigate("/settings")
              }
              className={`
              h-14
              px-6
              rounded-2xl
              font-bold
              flex
              items-center
              gap-3

              ${
                isDark

                  ? `
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  text-white
                  `

                  : `
                  bg-gradient-to-r
                  from-cyan-200
                  to-blue-200
                  text-slate-800
                  `
              }
              `}
            >

              <User size={20} />

              Profile

            </button>

            <button
              onClick={logout}
              className={`
              h-14
              px-6
              rounded-2xl
              font-bold
              flex
              items-center
              gap-3

              ${
                isDark

                  ? `
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  text-white
                  `

                  : `
                  bg-gradient-to-r
                  from-pink-200
                  to-rose-200
                  text-slate-800
                  `
              }
              `}
            >

              <LogOut size={20} />

              Logout

            </button>
          </div>
        </div>
      </motion.div>

  {/* ====================================================== */}
{/* FITNESS OVERVIEW */}
{/* ====================================================== */}

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
mb-6
">

  {[
    {
      title: "Fitness Score",
      value: Math.round(fitnessScore),
      subtitle: "Overall performance",
      icon: <Activity />,
      gradient:
        "from-cyan-500 to-blue-500",
    },

    {
      title: "BMI Status",
      value: isGuestUser ? "0" : bmi,
      subtitle: bmiData.status,
      icon: <Heart />,
      gradient:
        "from-pink-500 to-orange-500",
    },

    {
      title: "Current Streak",
      value: `${streak} Days`,
      subtitle: "Workout consistency",
      icon: <Flame />,
      gradient:
        "from-orange-500 to-pink-500",
    },

    {
      title: "XP",
      value:
  isGuestUser
    ? "0"
    : `${totalWorkouts * 10}`,
      subtitle: "Your XP points",
      icon: <Trophy />,
      gradient:
        "from-violet-500 to-fuchsia-500",
    },

    {
      title: "Weekly Burn",
      value: `${weeklyCalories} kcal`,
      subtitle: "Last 7 days",
      icon: <TrendingUp />,
      gradient:
        "from-green-500 to-emerald-500",
    },

    {
      title: "Today's Burn",
      value: `${todayCalories} kcal`,
      subtitle: "Calories today",
      icon: <Zap />,
      gradient:
        "from-yellow-500 to-orange-500",
    },

    {
      title: "Avg Workout",
      value: `${averageCalories} kcal`,
      subtitle: "Daily hydration",
       icon: <Zap />,
      gradient:
        "from-sky-500 to-cyan-500",
    },

    {
     title: "Workouts",
      value: totalWorkouts,
      icon: <Dumbbell />,
      gradient:
        "from-indigo-500 to-violet-500",
    },
  ].map((item, index) => (

    <motion.div

      key={index}

      whileHover={{
        y: -4,
        scale: 1.01,
      }}

      transition={{
        duration: 0.25,
      }}

      className={`
      ${cardClass}
      border
      rounded-[28px]
      p-5
      relative
      overflow-hidden
      min-h-[180px]
      `}
    >

      {/* BACKGROUND GLOW */}

      <div
        className={`
        absolute
        top-[-40px]
        right-[-40px]
        w-32
        h-32
        rounded-full
        blur-3xl
        opacity-20
        bg-gradient-to-r
        ${item.gradient}
        `}
      />

      {/* CONTENT */}

      <div className="
      relative
      z-10
      h-full
      flex
      flex-col
      justify-between
      ">

        {/* TOP */}

        <div className="
        flex
        items-start
        justify-between
        ">

          <div>

            <p className={`
            text-sm
            font-medium
            ${subText}
            `}>

              {item.title}

            </p>

            <h2 className="
            text-3xl
            font-black
            mt-3
            leading-tight
            break-words
            ">

              {item.value}

            </h2>

          </div>

          <div
            className={`
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-r
            ${item.gradient}
            flex
            items-center
            justify-center
            text-white
            shadow-lg
            `}
          >

            {item.icon}

          </div>
        </div>

        {/* BOTTOM */}

        <div className="
        mt-6
        ">

          <div
            className={`
            inline-flex
            items-center
            gap-2
            px-3
            py-2
            rounded-xl
            text-xs
            font-semibold

            ${
              isDark

                ? "bg-white/10 text-slate-300"

                : "bg-slate-100 text-slate-600"
            }
            `}
          >

            <div className="
            w-2
            h-2
            rounded-full
            bg-emerald-400
            " />

            {item.subtitle}

          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>

  

   

    {/* ====================================================== */}
{/* HEALTH + MOTIVATION */}
{/* ====================================================== */}

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
  grid
  grid-cols-1
  xl:grid-cols-2
  gap-6
  ">

    {/* ====================================================== */}
    {/* HEALTH INSIGHTS */}
    {/* ====================================================== */}

    <div
      className={`
      rounded-[28px]
      p-6
      h-full

      ${
        isDark

          ? `
          bg-white/[0.03]
          border border-white/10
          `

          : `
          bg-violet-50
          border border-violet-100
          `
      }
      `}
    >

      {/* HEADER */}

      <div className="
      flex
      items-center
      gap-4
      mb-5
      ">

        <div className="
        w-14
        h-14
        rounded-[20px]
        bg-gradient-to-r
        from-violet-500
        to-pink-500
        flex
        items-center
        justify-center
        shadow-lg
        ">

          <Brain className="
          text-white
          w-7
          h-7
          " />

        </div>

        <div>

          <h2 className="
          text-2xl
          font-black
          ">
            Health Insights
          </h2>

          <p className={subText}>
            Personalized recommendations
          </p>

        </div>
      </div>

      {/* MESSAGE */}

      <p
        className={`
        text-base
        leading-8

        ${
          isDark
            ? "text-slate-300"
            : "text-slate-700"
        }
        `}
      >
        {healthMessage}
      </p>

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
        rounded-2xl
        bg-cyan-500/10
        text-cyan-400
        font-semibold
        text-sm
        ">
          Goal:
          {" "}
          {
      isGuestUser
        ? "No Data"
        : bmiData.goal
    }

        </div>

        <div className="
        px-4
        py-2
        rounded-2xl
        bg-orange-500/10
        text-orange-400
        font-semibold
        text-sm
        ">
          Burn:
          {" "}
           {
      isGuestUser
        ? "No Data"
        : bmiData.recommendedBurn
    }
        </div>

      </div>
    </div>

    {/* ====================================================== */}
    {/* MOTIVATION */}
    {/* ====================================================== */}

    <div
      className={`
      rounded-[28px]
      p-6
      h-full
      relative
      overflow-hidden

      ${
        isDark

          ? `
          bg-gradient-to-br
          from-pink-500/10
          to-orange-500/10
          border border-pink-500/10
          `

          : `
          bg-gradient-to-br
          from-pink-50
          to-orange-50
          border border-pink-100
          `
      }
      `}
    >

      {/* GLOW */}

      <div
        className="
        absolute
        top-[-50px]
        right-[-50px]
        w-40
        h-40
        rounded-full
        bg-pink-500/20
        blur-3xl
        "
      />

      {/* HEADER */}

      <div className="
      relative
      z-10
      flex
      items-center
      gap-4
      mb-5
      ">

        <div className="
        w-14
        h-14
        rounded-[20px]
        bg-gradient-to-r
        from-pink-500
        to-orange-500
        flex
        items-center
        justify-center
        shadow-lg
        ">

          <Zap className="
          text-white
          w-7
          h-7
          " />

        </div>

        <div>

          <h2 className="
          text-2xl
          font-black
          ">
            Daily Motivation
          </h2>

          <p className={subText}>
            Personalized fitness mindset
          </p>

        </div>
      </div>

      {/* MOTIVATION MESSAGE */}

      <div className="
      relative
      z-10
      ">

        <p
          className={`
          text-lg
          leading-8
          font-semibold

          ${
            isDark
              ? "text-slate-200"
              : "text-slate-700"
          }
          `}
        >

          {dynamicQuote}

        </p>

        {/* STREAK */}

        <div className="
        flex
        items-center
        gap-3
        mt-6
        flex-wrap
        ">

          <div
            className={`
            px-4
            py-2
            rounded-2xl
            text-sm
            font-bold

            ${
              isDark

                ? `
                bg-white/10
                text-pink-300
                `

                : `
                bg-white/70
                text-pink-600
                `
            }
            `}
          >

            🔥 {streak} Day Streak

          </div>

          <div
            className={`
            px-4
            py-2
            rounded-2xl
            text-sm
            font-bold

            ${
              isDark

                ? `
                bg-white/10
                text-orange-300
                `

                : `
                bg-white/70
                text-orange-600
                `
            }
            `}
          >

            🏆 {level}

          </div>

        </div>
      </div>
    </div>
  </div>
</div>

      {/* ====================================================== */}
      {/* WELLNESS */}
      {/* ====================================================== */}

      <div className="
      grid
      grid-cols-2
      xl:grid-cols-4
      gap-5
      mb-6
      ">

        {[
          {
            title: "Water",
             value:
            isGuestUser
            ? "0 L"
            :  "2.5L",
            icon: <Droplets />,
            color: "from-cyan-500 to-blue-500",
          },

          {
            title: "Sleep",
            value:
            isGuestUser
            ? "0 h"
            :  "7.5h",
            icon: <Moon />,
            color: "from-violet-500 to-purple-500",
          },

          {
            title: "Current Weight",
           value:
          isGuestUser
            ? "0 kg"
            : `${healthProfile.currentWeight} kg`,
            icon: <Trophy />,
            color: "from-yellow-500 to-orange-500",
          },

          {
            title: "Goal",
          value:
          isGuestUser
            ? "0 kg"
            : `${healthProfile.targetWeight}kg`,
            icon: <Target />,
            color: "from-pink-500 to-rose-500",
          },
        ].map((item, index) => (

          <div
            key={index}
            className={`
            ${cardClass}
            border
            rounded-[28px]
            p-5
            `}
          >

            <div
              className={`
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-r
              ${item.color}
              text-white
              flex
              items-center
              justify-center
              `}
            >
              {item.icon}
            </div>

            <h2 className="
            text-3xl
            font-black
            mt-5
            ">
              {item.value}
            </h2>

            <p className={`${subText} mt-2`}>
              {item.title}
            </p>

          </div>
        ))}
      </div>

      {/* ====================================================== */}
      {/* QUICK ACTIONS */}
      {/* ====================================================== */}

      <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-5
      mb-6
      ">

        <button
          onClick={() =>
            navigate("/workout-suggestions")
          }
          className="
          h-16
          rounded-[24px]
          bg-gradient-to-r
          from-pink-500
          to-orange-500
          text-white
          font-bold
          text-lg
          "
        >
          Workout Suggestions
        </button>

        <button
          onClick={() =>
            navigate("/sleep")
          }
          className="
          h-16
          rounded-[24px]
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
          text-white
          font-bold
          text-lg
          "
        >
         Wellness Tracker
        </button>

        <button
          onClick={() =>
            navigate("/water")
          }
          className="
          h-16
          rounded-[24px]
          bg-gradient-to-r
          from-violet-500
          to-fuchsia-500
          text-white
          font-bold
          text-lg
          "
        >
          Transformation Plan
        </button>
      </div>

      {/* ====================================================== */}
      {/* WEEKLY PROGRESS */}
      {/* ====================================================== */}

      <div className="
      grid
      grid-cols-1
      xl:grid-cols-3
      gap-6
      ">

        {/* LEFT */}

        <div className="xl:col-span-2">

          <div
            className={`
            ${cardClass}
            border
            rounded-[30px]
            p-7
            `}
          >

            <div className="
            flex
            justify-between
            items-center
            mb-8
            ">

              <div>

                <h2 className="
                text-3xl
                font-black
                ">
                  Weekly Progress
                </h2>

                <p className={`${subText} mt-2`}>
                  Stay consistent with workouts
                </p>

              </div>

              <div className="
              text-4xl
              font-black
              text-cyan-400
              ">
                {monthlyProgress}%
              </div>
            </div>

            <div
              className={`
              w-full
              h-5
              rounded-full
              overflow-hidden

              ${
                isDark
                  ? "bg-white/10"
                  : "bg-white/40"
              }
              `}
            >

              <motion.div

                initial={{
                  width: 0,
                }}

                animate={{
                  width:
                    `${monthlyProgress}%`,
                }}

                transition={{
                  duration: 1,
                }}

                className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                "
              />
            </div>

            <div className="
            grid
            grid-cols-7
            gap-3
            mt-8
            ">

              {[
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
              ].map((item, index) => (

                <div
                  key={index}
                  className={`
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  font-bold

                  ${
                    index < streak

                      ? `
                      bg-gradient-to-r
                      from-pink-500
                      to-orange-500
                      text-white
                      `

                      : isDark

                        ? "bg-white/10"

                        : "bg-white/40"
                  }
                  `}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div>

          <div
            className={`
            ${cardClass}
            border
            rounded-[30px]
            p-7
            `}
          >

            <h2 className="
            text-3xl
            font-black
            ">
              Workout Calendar
            </h2>

            <p className={`${subText} mt-3 leading-7`}>
              Track workout activities professionally.
            </p>

            <button
              onClick={() =>
                navigate("/calendar")
              }
              className={`
              mt-8
              w-full
              h-14
              rounded-2xl
              font-bold
              flex
              items-center
              justify-center
              gap-3

              ${
                isDark

                  ? `
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  text-white
                  `

                  : `
                  bg-gradient-to-r
                  from-cyan-200
                  to-blue-200
                  text-slate-700
                  `
              }
              `}
            >

              Open Calendar

              <ChevronRight size={18} />

            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;