// src/pages/WorkoutPage.jsx

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  Dumbbell,
  ClipboardList,
  Lightbulb,
  History,
  Calendar,
  Timer,
  ChevronRight,
  Sparkles,
  Activity,
  Flame,
  BarChart3,
} from "lucide-react";

const WorkoutPage = () => {

  const navigate =
    useNavigate();

  // ============================================
  // USER + THEME
  // ============================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    );

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
      bg-white/70
      border-white/60
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      backdrop-blur-2xl
      `;

  const textSub =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ============================================
  // MENU
  // ============================================

  const menu = [

    {
      id: "library",

      label:
        "Exercise Library",

      description:
        "Explore all exercises and workouts",

      icon:
        Dumbbell,

      gradient:
        "from-orange-500 to-pink-500",

      lightGradient:
        "from-orange-200 to-pink-200",

      route:
        "/exercises-library",
    },

    {
      id: "logs",

      label:
        "Logs",

      description:
        "Track your daily workouts",

      icon:
        ClipboardList,

      gradient:
        "from-cyan-500 to-blue-500",

      lightGradient:
        "from-cyan-200 to-blue-200",

      route:
        "/log-workout",
    },

    {
      id: "suggestions",

      label:
        "AI Suggestions",

      description:
        "Smart workout recommendations",

      icon:
        Lightbulb,

      gradient:
        "from-purple-500 to-indigo-500",

      lightGradient:
        "from-purple-200 to-indigo-200",

      route:
        "/moodworkout",
    },

    {
      id: "history",

      label:
        "Track your History",

      description:
        "See completed workouts",

      icon:
        History,

      gradient:
        "from-green-500 to-emerald-500",

      lightGradient:
        "from-green-200 to-emerald-200",

      route:
        "/workout-history",
    },

    {
      id: "plans",

      label:
        "Schedule Plans & Routines",

      description:
        "Personalized fitness plans & your routines",

      icon:
        Calendar,

      gradient:
        "from-pink-500 to-rose-500",

      lightGradient:
        "from-pink-200 to-rose-200",

      route:
        "/workout-plans",
    },

    {
      id: "timer",

      label:
        "Timer",

      description:
        "Smart workout recovery tracker",

      icon:
        Timer,

      gradient:
        "from-yellow-500 to-orange-500",

      lightGradient:
        "from-yellow-200 to-orange-200",

      route:
        "/timer",
    },
  ];

  return (

    <div
      className={`
      min-h-screen
      overflow-x-hidden
      transition-all
      duration-500
      ${bgClass}
      `}
    >

      {/* SCROLLBAR */}

      <style>
        {`
          ::-webkit-scrollbar{
            width:0px;
            height:0px;
          }

          *{
            box-sizing:border-box;
            scrollbar-width:none;
          }
        `}
      </style>

      <div className="px-5 py-5 pb-32">

        {/* ============================================ */}
        {/* HERO */}
        {/* ============================================ */}

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
          relative
          overflow-hidden
          rounded-[36px]
          p-7
          mb-6

          ${
            isDark

              ? `
              bg-gradient-to-r
              from-[#2563EB]
              via-[#7C3AED]
              to-[#EC4899]
              `

              : `
              bg-gradient-to-r
              from-pink-200
              via-purple-200
              to-cyan-200
              shadow-[0_10px_40px_rgba(236,72,153,0.12)]
              `
          }
          `}
        >

          {/* GLOW */}

          <div
            className={`
            absolute
            top-0
            right-0
            w-72
            h-72
            rounded-full
            blur-3xl

            ${
              isDark
                ? "bg-white/10"
                : "bg-white/40"
            }
            `}
          />

          <div className="relative z-10">

            {/* TAG */}

            <div
              className={`
              inline-flex
              items-center
              gap-2
              px-4
              h-10
              rounded-2xl
              text-sm
              font-semibold
              backdrop-blur-xl

              ${
                isDark

                  ? `
                  bg-white/15
                  text-white
                  `

                  : `
                  bg-white/60
                  text-slate-800
                  `
              }
              `}
            >

              <Sparkles size={16} />

              Professional Fitness Hub

            </div>

            {/* TITLE */}

            <h1
              className={`
              text-4xl
              md:text-5xl
              font-black
              leading-tight
              mt-5

              ${
                isDark
                  ? "text-white"
                  : "text-slate-900"
              }
              `}
            >

              Smart Workout Center

            </h1>

            {/* DESCRIPTION */}

            <p
              className={`
              text-sm
              md:text-base
              leading-7
              mt-5
              max-w-2xl

              ${
                isDark
                  ? "text-white/80"
                  : "text-slate-700"
              }
              `}
            >

              Track workouts, view progress,
              generate AI workout suggestions,
              create routines and stay fit with
              your personalized fitness dashboard.

            </p>

            {/* STATS */}

            <div className="flex flex-wrap gap-4 mt-7">

              {[
                {
                  icon: Flame,
                  text: "Daily Training",
                },

                {
                  icon: BarChart3,
                  text: "Progress Tracking",
                },

                {
                  icon: Activity,
                  text: "AI Suggestions",
                },
              ].map(
                (
                  item,
                  index
                ) => {

                  const Icon =
                    item.icon;

                  return (

                    <div
                      key={index}

                      className={`
                      px-5
                      h-12
                      rounded-2xl
                      flex
                      items-center
                      gap-3
                      text-sm
                      font-semibold
                      backdrop-blur-xl

                      ${
                        isDark

                          ? `
                          bg-white/15
                          text-white
                          `

                          : `
                          bg-white/60
                          text-slate-800
                          `
                      }
                      `}
                    >

                      <Icon size={18} />

                      {item.text}

                    </div>
                  );
                }
              )}
            </div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* SECTION TITLE */}
        {/* ============================================ */}

        <div className="mb-6">

          <h2 className="text-3xl font-black">
            Workout Features
          </h2>

          <p className={`text-sm mt-2 ${textSub}`}>
            Access all workout modules and tools
          </p>

        </div>

        {/* ============================================ */}
        {/* GRID */}
        {/* ============================================ */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >

          {menu.map(
            (
              item,
              index
            ) => {

              const Icon =
                item.icon;

              return (

                <motion.div

                  key={index}

                  whileHover={{
                    y: -5,
                  }}

                  transition={{
                    duration: 0.25,
                  }}

                  className={`
                  group
                  relative
                  overflow-hidden
                  border
                  rounded-[30px]
                  p-5
                  transition-all
                  duration-500

                  ${cardClass}
                  `}
                >

                  {/* GLOW */}

                  <div
                    className={`
                    absolute
                    top-0
                    right-0
                    w-40
                    h-40
                    rounded-full
                    blur-3xl
                    opacity-20
                    bg-gradient-to-r

                    ${
                      isDark
                        ? item.gradient
                        : item.lightGradient
                    }
                    `}
                  />

                  <div className="relative z-10">

                    {/* ICON */}

                    <div
                      className={`
                      w-16
                      h-16
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      shadow-xl
                      bg-gradient-to-r

                      ${
                        isDark
                          ? item.gradient
                          : item.lightGradient
                      }

                      ${
                        isDark
                          ? "text-white"
                          : "text-slate-800"
                      }
                      `}
                    >

                      <Icon size={28} />

                    </div>

                    {/* TITLE */}

                    <h2 className="text-2xl font-black mt-6">
                      {item.label}
                    </h2>

                    {/* DESCRIPTION */}

                    <p
                      className={`
                      text-sm
                      leading-7
                      mt-3
                      ${textSub}
                      `}
                    >
                      {item.description}
                    </p>

                    {/* BUTTON */}

                    <button
                      onClick={() =>
                        navigate(
                          item.route
                        )
                      }

                      className={`
                      mt-6
                      w-full
                      h-12
                      rounded-2xl
                      text-sm
                      font-bold
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition-all
                      duration-300
                      bg-gradient-to-r

                      ${
                        isDark

                          ? `
                          ${item.gradient}
                          text-white
                          shadow-lg
                          `

                          : `
                          ${item.lightGradient}
                          text-slate-900
                          border
                          border-white/60
                          `
                      }
                      `}
                    >

                      Open Section

                      <ChevronRight
                        size={18}
                      />

                    </button>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* ============================================ */}
        {/* BOTTOM CTA */}
        {/* ============================================ */}

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
          mt-8
          rounded-[30px]
          border
          p-6

          ${cardClass}
          `}
        >

          <div
            className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            "
          >

            <div>

              <h2 className="text-3xl font-black">
                Ready To Train?
              </h2>

              <p
                className={`
                text-sm
                mt-3
                leading-7
                ${textSub}
                `}
              >

                Start your personalized fitness
                journey and achieve your goals
                with AI powered workouts.

              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/moodworkout"
                )
              }

              className={`
              h-14
              px-8
              rounded-2xl
              text-sm
              font-bold
              transition-all
              duration-300

              ${
                isDark

                  ? `
                  bg-gradient-to-r
                  from-pink-500
                  to-orange-500
                  text-white
                  shadow-xl
                  `

                  : `
                  bg-gradient-to-r
                  from-pink-200
                  to-orange-200
                  text-slate-900
                  border
                  border-white/60
                  shadow-md
                  `
              }
              `}
            >

              Start Workout

            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkoutPage;