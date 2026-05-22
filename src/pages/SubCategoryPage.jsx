// src/pages/SubCategoryPage.jsx

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  Layers3,
  Dumbbell,
} from "lucide-react";

import workoutModes from "../data/workoutModes";

const SubCategoryPage = () => {

  const {
    slug,
    categoryId,
  } = useParams();

  const navigate =
    useNavigate();

  // ============================================
  // USER
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

  // ============================================
  // SETTINGS
  // ============================================

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
  // THEME
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
      border-white/70
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ============================================
  // FIND MODE
  // ============================================

  const mode =
    workoutModes.find(
      (item) =>
        item.slug === slug
    );

  if (!mode) {

    return (

      <div
        className="
        min-h-screen
        bg-[#070B1A]
        text-white
        flex
        items-center
        justify-center
        text-3xl
        font-black
        "
      >

        Mode Not Found

      </div>
    );
  }

  // ============================================
  // FIND CATEGORY
  // ============================================

  const category =
    mode.categories.find(
      (item) =>
        item.id === Number(categoryId)
    );

  if (!category) {

    return (

      <div
        className="
        min-h-screen
        bg-[#070B1A]
        text-white
        flex
        items-center
        justify-center
        text-3xl
        font-black
        "
      >

        Category Not Found

      </div>
    );
  }

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
        rounded-[34px]
        p-6
        mb-7
        overflow-hidden
        relative
        `}
      >

        {/* GLOW */}

        <div
          className="
          absolute
          top-[-120px]
          right-[-120px]
          w-[260px]
          h-[260px]
          rounded-full
          bg-pink-500/20
          blur-3xl
          "
        />

        {/* CONTENT */}

        <div className="flex items-center justify-between gap-5 flex-wrap relative z-10">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className={`
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              transition-all
              duration-300

              ${
                isDark

                  ? `
                  bg-white/10
                  border
                  border-white/10
                  text-white
                  hover:bg-white/15
                  `

                  : `
                  bg-white
                  border
                  border-white/70
                  text-slate-700
                  shadow-md
                  hover:bg-pink-50
                  `
              }
              `}
            >

              <ArrowLeft size={22} />

            </button>

            <div>

              <h1 className="text-4xl font-black">
                {category.name}
              </h1>

              <p className={`${subText} mt-2`}>
                Select your workout difficulty professionally
              </p>

            </div>
          </div>

          {/* RIGHT */}

          <div
            className={`
            w-20
            h-20
            rounded-[28px]
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

            <Layers3
              size={38}
              className={
                isDark
                  ? "text-white"
                  : "text-slate-800"
              }
            />

          </div>
        </div>
      </motion.div>

      {/* SUB CATEGORY GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {category.subcategories?.map(
          (
            sub,
            index
          ) => (

            <motion.div

              key={sub.id}

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: index * 0.08,
              }}

              whileHover={{
                y: -6,
              }}

              onClick={() =>
                navigate(
                  `/workout-session/${slug}/${category.id}/${sub.id}`
                )
              }

              className={`
              ${cardClass}
              border
              rounded-[30px]
              overflow-hidden
              cursor-pointer
              transition-all
              duration-300
              `}
            >

              {/* IMAGE */}

              <div className="h-56 overflow-hidden relative">

                <img
                  src={sub.image}
                  alt={sub.level}
                  className="
                  w-full
                  h-full
                  object-cover
                  hover:scale-105
                  transition-all
                  duration-500
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

                {/* BADGE */}

                <div
                  className="
                  absolute
                  top-4
                  right-4
                  px-4
                  h-10
                  rounded-2xl
                  bg-white/15
                  backdrop-blur-xl
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-white
                  text-sm
                  font-bold
                  "
                >

                  {
                    sub.exercises?.length
                  } Exercises

                </div>

                {/* LEVEL */}

                <div className="absolute bottom-5 left-5">

                  <h2 className="text-3xl font-black text-white">
                    {sub.level}
                  </h2>

                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5">

                <div className="flex items-center gap-3">

                  <div
                    className={`
                    w-12
                    h-12
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
                        text-slate-800
                        `
                    }
                    `}
                  >

                    <Dumbbell size={20} />

                  </div>

                  <div>

                    <h3 className="text-xl font-black">
                      {sub.level}
                    </h3>

                    <p className={`${subText} text-sm`}>
                      Workout Difficulty
                    </p>

                  </div>
                </div>

                <p
                  className={`
                  text-sm
                  leading-7
                  mt-5
                  ${subText}
                  `}
                >

                  Train smarter with structured exercises,
                  guided workout sessions and progressive
                  levels designed for your fitness journey.

                </p>

                {/* BUTTON */}

                <button
                  className={`
                  mt-6
                  h-12
                  px-5
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300

                  ${
                    isDark

                      ? `
                      bg-white/10
                      border
                      border-white/10
                      text-white
                      hover:bg-white/15
                      `

                      : `
                      bg-gradient-to-r
                      from-pink-100
                      to-orange-100
                      text-slate-800
                      shadow-md
                      `
                  }
                  `}
                >

                  Start Workout

                </button>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default SubCategoryPage;