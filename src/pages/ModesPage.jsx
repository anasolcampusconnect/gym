// src/pages/ModesPage.jsx

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  Flame,
  Dumbbell,
  Moon,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
  ChevronRight,
  User,
} from "lucide-react";

import workoutModes from "../data/workoutModes";

const ModesPage = () => {

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
      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      backdrop-blur-2xl
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

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

      {/* HIDE SCROLLBAR */}

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
        {/* HERO SECTION */}
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

  className="
  relative
  overflow-hidden
  rounded-[40px]
  h-[600px]
  mb-7

  "
>

  {/* FULL IMAGE */}

  <img
    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1800&auto=format&fit=crop"
    alt="Fitness"
    className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    scale-[1.02]
    "
  />

  {/* DARK OVERLAY FOR BOTH THEMES */}

  <div
    className="
    absolute
    inset-0
    bg-gradient-to-r
    from-black/85
    via-black/60
    to-black/40
    "
  />

  {/* PINK BLUR */}

  <div
    className="
    absolute
    top-[-80px]
    right-[-50px]
    w-[350px]
    h-[350px]
    rounded-full
    blur-3xl
    bg-pink-500/20
    "
  />

  {/* CONTENT */}

  <div
    className="
    relative
    z-10
    h-full
    flex
    items-center
    "
  >

    <div className="max-w-3xl px-8">

      {/* TAG */}

      <div
        className="
        inline-flex
        items-center
        gap-2
        px-5
        h-11
        rounded-2xl
        text-sm
        font-semibold
        backdrop-blur-xl
        bg-white/10
        text-white
        border
        border-white/10
        "
      >

        <Sparkles size={16} />

        Smart Fitness Platform

      </div>

      {/* TITLE */}

      <h1
        className="
        text-5xl
        md:text-7xl
        font-black
        leading-[1.05]
        mt-7
        text-white
        "
      >

        Transform
        <br />

        Your Body
        <br />

        With Smart Fitness

      </h1>

      {/* DESCRIPTION */}

      <p
        className="
        mt-6
        text-base
        md:text-lg
        leading-8
        max-w-2xl
        text-white/75
        "
      >

        Build strength, stay consistent,
        track progress and unlock AI powered
        personalized workouts designed for
        your fitness journey.

      </p>

      {/* BUTTONS */}

      <div className="flex flex-wrap gap-4 mt-8">

        <button
          onClick={() =>
            navigate(
              "/moodworkout"
            )
          }

          className="
          h-14
          px-7
          rounded-2xl
          text-sm
          font-bold
          flex
          items-center
          gap-3
          transition-all
          duration-300
          bg-white
          text-black
          hover:scale-105
          shadow-2xl
          "
        >

          Start Workout

          <ArrowRight size={18} />

        </button>

        <button
          onClick={() =>
            navigate(
              "/analytics"
            )
          }

          className="
          h-14
          px-7
          rounded-2xl
          text-sm
          font-semibold
          backdrop-blur-xl
          transition-all
          duration-300
          bg-white/10
          border
          border-white/10
          text-white
          hover:bg-white/15
          "
        >

          View Progress

        </button>

      </div>

      {/* STATS */}

      <div className="flex flex-wrap gap-4 mt-10">

        {[
          {
            icon: Flame,
            text: "Daily Training",
          },

          {
            icon: TrendingUp,
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

                className="
                px-5
                h-12
                rounded-2xl
                flex
                items-center
                gap-3
                text-sm
                font-semibold
                backdrop-blur-xl
                bg-white/10
                border
                border-white/10
                text-white
                "
              >

                <Icon size={18} />

                {item.text}

              </div>
            );
          }
        )}
      </div>
    </div>
  </div>
</motion.div>

      {/* ============================================ */}
{/* HIGHLIGHT CARDS */}
{/* ============================================ */}

<div
  className="
  grid
  grid-cols-2
  lg:grid-cols-4
  gap-4
  mb-7
  "
>

  {[
    {
      icon: Flame,
      value: "150+",
      text: "Active Exercises",
      gradient:
        isDark
          ? "from-orange-500 to-pink-500"
          : "from-[#FFD6A5] to-[#FFCAD4]",
    },

    {
      icon: TrendingUp,
      value: "20+",
      text: "Workout Categories",
      gradient:
        isDark
          ? "from-cyan-500 to-blue-500"
          : "from-[#BDE0FE] to-[#A2D2FF]",
    },
     {
      icon: User,
      value: "1500+",
      text: "Active Users",
      gradient:
        isDark
          ? "from-emerald-500 to-teal-500"
          : "from-[#C7F9CC] to-[#99F6E4]",
    },

    {
      icon: Activity,
      value: "AI",
      text: "Smart Suggestions",
      gradient:
        isDark
          ? "from-purple-500 to-indigo-500"
          : "from-[#D8B4FE] to-[#C4B5FD]",
    },

   
  ].map(
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
            scale: 1.01,
          }}

          transition={{
            duration: 0.25,
          }}

          className={`
          relative
          overflow-hidden
          border
          rounded-[30px]
          p-5
          transition-all
          duration-500

          ${
            isDark

              ? `
              bg-white/[0.04]
              border-white/10
              backdrop-blur-2xl
              `

              : `
              bg-white/65
              border-white/70
              backdrop-blur-2xl
              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              `
          }
          `}
        >

          {/* GLOW */}

          <div
            className={`
            absolute
            top-[-30px]
            right-[-30px]
            w-28
            h-28
            rounded-full
            blur-3xl
            opacity-40

            ${
              isDark
                ? "bg-white/10"
                : "bg-white/80"
            }
            `}
          />

          {/* ICON */}

          <div
            className={`
            relative
            z-10
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-r
            ${item.gradient}
            flex
            items-center
            justify-center

            ${
              isDark
                ? "text-white"
                : "text-slate-800"
            }
            `}
          >

            <Icon size={24} />

          </div>

          {/* VALUE */}

          <h2
            className={`
            relative
            z-10
            text-3xl
            font-black
            mt-5

            ${
              isDark
                ? "text-white"
                : "text-slate-900"
            }
            `}
          >

            {item.value}

          </h2>

          {/* TEXT */}

          <p
            className={`
            relative
            z-10
            text-sm
            mt-2

            ${
              isDark
                ? "text-slate-400"
                : "text-slate-600"
            }
            `}
          >

            {item.text}

          </p>

        </motion.div>
      );
    }
  )}
</div>

        {/* ============================================ */}
        {/* SECTION TITLE */}
        {/* ============================================ */}

        <div
          className="
          flex
          items-center
          justify-between
          mb-6
          "
        >

          <div>

            <h2 className="text-3xl font-black">
              Workout Modes
            </h2>

            <p className={`text-sm mt-2 ${subText}`}>
              Select your preferred training style
            </p>

          </div>
        </div>

        {/* ============================================ */}
        {/* MODES */}
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

          {workoutModes.map(
            (mode) => {

              return (

                <motion.div

                  key={mode.id}

                  whileHover={{
                    y: -5,
                  }}

                  transition={{
                    duration: 0.25,
                  }}

                  className={`
                  group
                  overflow-hidden
                  rounded-[32px]
                  border
                  cursor-pointer
                  transition-all
                  duration-500

                  ${cardClass}
                  `}
                >

                  {/* IMAGE */}

                  <div
                    className="
                    relative
                    overflow-hidden
                    h-60
                    "
                  >

                    <img
                      src={mode.image}
                      alt={mode.title}
                      className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-110
                      "
                    />

                    {/* OVERLAY */}

                    <div
                      className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/20
                      to-transparent
                      "
                    />

                    {/* ICON */}

                    <div
                      className={`
                      absolute
                      top-4
                      left-4
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-r
                      ${mode.gradient}
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      `}
                    >

                      {mode.title.includes(
                        "Morning"
                      ) ? (

                        <Flame size={24} />

                      ) : mode.title.includes(
                        "Afternoon"
                      ) ? (

                        <Dumbbell size={24} />

                      ) : (

                        <Moon size={24} />

                      )}

                    </div>

                    {/* TEXT */}

                    <div className="absolute bottom-5 left-5 right-5">

                      <h2 className="text-3xl font-black text-white">
                        {mode.title}
                      </h2>

                      <p className="text-sm text-white/70 mt-2 leading-6">
                        {mode.description}
                      </p>

                    </div>
                  </div>

                  {/* FOOTER */}

                  <div className="p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className={`text-sm ${subText}`}>
                          Categories
                        </p>

                        <h3 className="text-xl font-bold mt-1">
                          {
                            mode.categories
                              .length
                          }
                        </h3>

                      </div>

                      <div>

                        <p className={`text-sm ${subText}`}>
                          Levels
                        </p>

                        <h3 className="text-xl font-bold mt-1">
                          3
                        </h3>

                      </div>

                      <div>

                        <p className={`text-sm ${subText}`}>
                          Exercises
                        </p>

                        <h3 className="text-xl font-bold mt-1">

                          {mode.categories.reduce(
                            (
                              total,
                              category
                            ) =>

                              total +

                              category.subcategories.reduce(
                                (
                                  subTotal,
                                  sub
                                ) =>

                                  subTotal +

                                  sub.exercises.length,

                                0
                              ),

                            0
                          )}

                        </h3>
                      </div>
                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={() =>
                        navigate(
                          `/categories/${mode.slug}`
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

                      ${
                        isDark

                          ? `
                          bg-gradient-to-r
                          ${mode.gradient}
                          text-white
                          shadow-lg
                          `

                          : `
                          bg-gradient-to-r
                          from-pink-200
                          to-orange-200
                          text-slate-900
                          border
                          border-white/60
                          `
                      }
                      `}
                    >

                      Explore Mode

                      <ChevronRight size={18} />

                    </button>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ModesPage;