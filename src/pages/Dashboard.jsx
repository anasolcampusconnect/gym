// src/pages/DashboardPage.jsx

import {
  Flame,
  Dumbbell,
  LogOut,
  User,
  Activity,
  ChevronRight,
  Settings,
  Clock3,
  Target,
  Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  // =========================================
  // USER
  // =========================================

  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    ) || {};

  const userId =
    storedUser?.email ||
    "guest";

  // =========================================
  // SETTINGS
  // =========================================

  const settings =
    JSON.parse(
      localStorage.getItem(
        `gym_settings_${userId}`
      )
    ) || {};

  const currentTheme =
    settings?.theme ||
    "light";

  const isDark =
    currentTheme ===
      "dark" ||
    (
      currentTheme ===
        "system" &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    );

  // =========================================
  // THEME
  // =========================================

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
      bg-white/70
      border-white/50
      backdrop-blur-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // =========================================
  // RANDOM QUOTE
  // =========================================

  const quote =
    quotes[
      Math.floor(
        Math.random() *
          quotes.length
      )
    ];

  // =========================================
  // HISTORY
  // =========================================

  const historyKey =
    `workout_history_${userId}`;

  const workoutHistory =
    JSON.parse(
      localStorage.getItem(
        historyKey
      )
    ) || [];

  // =========================================
  // STATS
  // =========================================

  const totalWorkouts =
    workoutHistory.length;

  const totalCalories =
    workoutHistory.reduce(
      (acc, item) =>
        acc +
        Number(
          item.totalCalories || 0
        ),
      0
    );

  const totalHours =
    totalWorkouts;

  // =========================================
  // STREAK
  // =========================================

  const uniqueDates = [
    ...new Set(
      workoutHistory.map(
        (item) =>
          item.date
      )
    ),
  ];

  let streak = 0;

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
        currentDate.getDate() -
          1
      );

    } else {

      break;
    }
  }

  // =========================================
  // BMI
  // =========================================

  const profile =
    settings?.profile || {};

  const bmi =
    profile?.heightFt &&
    profile?.weight

      ? (
          Number(
            profile.weight
          ) /

          Math.pow(
            (
              (
                (
                  Number(
                    profile.heightFt
                  ) * 12
                ) +

                Number(
                  profile.heightInch || 0
                )
              ) * 0.0254
            ),
            2
          )
        ).toFixed(1)

      : null;

  let healthMessage =
    "";

  if (!bmi) {

    healthMessage =
      "Start tracking your fitness journey today.";

  }

  else if (bmi < 18.5) {

    healthMessage =
      "Focus on strength and healthy weight gain.";

  }

  else if (bmi < 25) {

    healthMessage =
      "Excellent shape. Burn 300 kcal daily to maintain fitness.";

  }

  else if (bmi < 30) {

    healthMessage =
      "Burn around 500 kcal daily to reach ideal fitness.";

  }

  else {

    healthMessage =
      "High BMI detected. Burn 700+ kcal daily consistently.";
  }

  // =========================================
  // MOTIVATION
  // =========================================

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

  // =========================================
  // MONTHLY
  // =========================================

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

  // =========================================
  // TODAY
  // =========================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayWorkout =
    workoutHistory.find(
      (item) =>
        item.date ===
        today
    );

  // =========================================
  // LEVEL
  // =========================================

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

  // =========================================
  // LOGOUT
  // =========================================

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

      {/* HEADER */}

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
        `}
      >

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          {/* USER */}

          <div className="flex items-center gap-5">

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

              <h1 className="text-4xl font-black">
                Welcome,
                {" "}
                {storedUser?.name ||
                  "Athlete"}
              </h1>

              <p className={`${subText} mt-2`}>
                {quote}
              </p>

              <div className="flex items-center gap-3 mt-4 flex-wrap">

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

              </div>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex gap-4 flex-wrap">

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

      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        {[
          {
            title:
              "Total Workouts",
            value:
              totalWorkouts,
            icon:
              <Dumbbell />,
          },

          {
            title:
              "Calories Burned",
            value:
              `${totalCalories} kcal`,
            icon:
              <Flame />,
          },

          {
            title:
              "Workout Hours",
            value:
              `${totalHours} hrs`,
            icon:
              <Clock3 />,
          },

          {
            title:
              "Monthly Goal",
            value:
              `${monthlyProgress}%`,
            icon:
              <Target />,
          },

        ].map(
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
              p-5
              `}
            >

              <div
                className={`
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center

                ${
                  isDark

                    ? `
                    bg-white/10
                    text-white
                    `

                    : `
                    bg-gradient-to-r
                    from-pink-100
                    to-orange-100
                    text-slate-700
                    `
                }
                `}
              >

                {item.icon}

              </div>

              <h2 className="text-3xl font-black mt-5">
                {item.value}
              </h2>

              <p className={`${subText} mt-2`}>
                {item.title}
              </p>

            </motion.div>
          )
        )}
      </div>

      {/* TODAY + MOTIVATION */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-5
        mb-6
        "
      >

      

       {/* TODAY */}

<motion.div

  whileHover={{
    y: -3,
  }}

  className={`
  rounded-[30px]
  p-6
  shadow-xl
  overflow-hidden
  relative

  ${
    isDark

      ? `
      bg-gradient-to-br
      from-pink-500
      via-rose-500
      to-orange-500
      `

      : `
      bg-gradient-to-br
      from-pink-200
      via-rose-100
      to-orange-100
      `
  }
  `}
>

  <div
    className="
    flex
    flex-col
    justify-between
    h-full
    min-h-[310px]
    "
  >

    {/* TOP */}

    <div>

      <div
        className={`
        w-12
        h-12
        rounded-2xl
        flex
        items-center
        justify-center
        mb-5

        ${
          isDark
            ? "bg-white/20"
            : "bg-white/60"
        }
        `}
      >

        <Activity
          className={`
          w-6
          h-6

          ${
            isDark
              ? "text-white"
              : "text-slate-700"
          }
          `}
        />

      </div>

      {/* TITLE */}

      <h2
        className={`
        text-4xl
        font-black
        leading-tight

        ${
          isDark
            ? "text-white"
            : "text-slate-800"
        }
        `}
      >
        Today's Workout
      </h2>

      {/* DESCRIPTION */}

      <p
        className={`
        mt-5
        text-lg
        font-semibold
        leading-8

        ${
          isDark
            ? "text-white"
            : "text-slate-700"
        }
        `}
      >

        {todayWorkout

          ? `You burned ${
              todayWorkout.totalCalories || 0
            } kcal today and completed your workout successfully.`

          : "No workout completed today. Start now and maintain your streak."
        }

      </p>

      {/* STREAK */}

      <p
        className={`
        mt-4
        text-sm
        leading-7

        ${
          isDark
            ? "text-white/80"
            : "text-slate-600"
        }
        `}
      >

        {streak > 0

          ? `${streak} day streak ongoing. Keep your consistency alive.`

          : "Build your first streak today and stay disciplined."
        }

      </p>
    </div>

    {/* FOOTER */}

    <div
      className="
      flex
      items-center
      justify-between
      mt-8
      "
    >

      <div>

      </div>

      <div className="text-5xl">
        💪
      </div>

    </div>
  </div>
</motion.div>
        {/* MOTIVATION */}

        <motion.div

          whileHover={{
            y: -3,
          }}

          className={`
          rounded-[30px]
          p-6
          shadow-xl

          ${
            isDark

              ? `
              bg-gradient-to-r
              from-purple-500
              via-violet-500
              to-indigo-500
              `

              : `
              bg-gradient-to-r
              from-violet-200
              via-fuchsia-100
              to-indigo-100
              `
          }
          `}
        >

          <div
            className="
            flex
            flex-col
            justify-between
            h-full
            "
          >

            <div>

              <div
                className={`
                w-12
                h-12
                rounded-2xl
                flex
                items-center
                justify-center
                mb-5

                ${
                  isDark
                    ? "bg-white/20"
                    : "bg-white/60"
                }
                `}
              >

                <Zap
                  className={`
                  w-6
                  h-6

                  ${
                    isDark
                      ? "text-white"
                      : "text-slate-700"
                  }
                  `}
                />

              </div>

              <h2
                className={`
                text-3xl
                font-black

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-800"
                }
                `}
              >
                Stay Motivated
              </h2>

              <p
                className={`
                mt-4
                text-lg
                font-semibold
                leading-8

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-700"
                }
                `}
              >
                {dynamicQuote}
              </p>

              <p
                className={`
                mt-4
                text-sm
                leading-7

                ${
                  isDark
                    ? "text-white/80"
                    : "text-slate-600"
                }
                `}
              >
                {healthMessage}
              </p>
            </div>

            <div
              className="
              flex
              items-center
              justify-between
              mt-6
              "
            >

              <div
                className={`
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold

                ${
                  isDark

                    ? `
                    bg-white/15
                    text-white
                    `

                    : `
                    bg-white/60
                    text-slate-700
                    `
                }
                `}
              >
                💪 Keep Grinding
              </div>

              <div className="text-5xl">
                🔥
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

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

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-black">
                  Weekly Progress
                </h2>

                <p className={`${subText} mt-2`}>
                  Stay consistent with workouts
                </p>

              </div>

              <div className="text-4xl font-black text-cyan-400">
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

                className={`
                h-full
                rounded-full

                ${
                  isDark

                    ? `
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-500
                    `

                    : `
                    bg-gradient-to-r
                    from-cyan-300
                    to-blue-300
                    `
                }
                `}
              />
            </div>

            <div className="grid grid-cols-7 gap-3 mt-8">

              {[
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
              ].map(
                (
                  item,
                  index
                ) => (

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

                        ? isDark

                          ? `
                          bg-gradient-to-r
                          from-pink-500
                          to-orange-500
                          text-white
                          `

                          : `
                          bg-gradient-to-r
                          from-pink-200
                          to-orange-200
                          text-slate-700
                          `

                        : isDark

                          ? "bg-white/10"

                          : "bg-white/40"
                    }
                    `}
                  >
                    {item}
                  </div>
                )
              )}
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

            <h2 className="text-3xl font-black">
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