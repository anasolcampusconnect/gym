// src/pages/WorkoutSessionPage.jsx

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";
import {
  motion,
} from "framer-motion";

import workoutModes from "../data/workoutModes";

import {
  Play,
  X,
  ArrowLeft,
  Flame,
  Clock3,
  Dumbbell,
  Activity,
} from "lucide-react";

const WorkoutSessionPage = () => {

  const {
    slug,
    categoryId,
    subId,
  } = useParams();

  const navigate =
    useNavigate();

  const [
    selectedExercise,
    setSelectedExercise,
  ] = useState(null);

  const isModalOpen =
  selectedExercise !== null;

  // ============================================
  // USER + THEME
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
    useEffect(() => {

  if (isModalOpen) {

    document.body.classList.add(
      "modal-open"
    );

  } else {

    document.body.classList.remove(
      "modal-open"
    );
  }

  return () => {

    document.body.classList.remove(
      "modal-open"
    );
  };

}, [isModalOpen]);

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
      backdrop-blur-2xl
      `

      : `
      bg-white/70
      border-white/70
      backdrop-blur-2xl
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ============================================
  // FIND DATA
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

  const subcategory =
    category.subcategories.find(
      (item) =>
        item.id === Number(subId)
    );

  if (!subcategory) {

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

        Subcategory Not Found

      </div>
    );
  }

  // ============================================
  // VIDEO URL
  // ============================================

  const getEmbedUrl =
    (url) => {

      if (
        url.includes(
          "watch?v="
        )
      ) {

        return url.replace(
          "watch?v=",
          "embed/"
        );
      }

      return url;
    };

  return (

    <div
      className={`
      min-h-screen
      ${bgClass}
      p-5
      pb-24
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
        rounded-[34px]
        p-6
        mb-7
        relative
        overflow-hidden
        `}
      >

        {/* GLOW */}

        <div
          className="
          absolute
          top-[-120px]
          right-[-100px]
          w-[280px]
          h-[280px]
          rounded-full
          bg-pink-500/20
          blur-3xl
          "
        />

        <div className="relative z-10">

          {/* TOP */}

          <div className="flex items-center justify-between flex-wrap gap-5">

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  navigate(-1)
                }
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
                    `

                    : `
                    bg-white
                    border
                    border-white/70
                    text-slate-700
                    shadow-md
                    `
                }
                `}
              >

                <ArrowLeft size={22} />

              </button>

              <div>

                <h1 className="text-4xl font-black">
                  {subcategory.level}
                </h1>

                <p className={`${subText} mt-2`}>
                  Professional guided exercises
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

              <Dumbbell
                size={38}
                className={
                  isDark
                    ? "text-white"
                    : "text-slate-800"
                }
              />

            </div>
          </div>

          {/* STATS */}

          <div className="flex flex-wrap gap-4 mt-8">

            <div
              className={`
              px-5
              h-12
              rounded-2xl
              flex
              items-center
              gap-3
              text-sm
              font-semibold

              ${
                isDark

                  ? `
                  bg-white/10
                  border border-white/10
                  text-white
                  `

                  : `
                  bg-pink-100
                  border border-pink-200
                  text-slate-800
                  `
              }
              `}
            >

              <Activity size={18} />

              {
                subcategory.exercises.length
              } Exercises

            </div>

            <div
              className={`
              px-5
              h-12
              rounded-2xl
              flex
              items-center
              gap-3
              text-sm
              font-semibold

              ${
                isDark

                  ? `
                  bg-white/10
                  border border-white/10
                  text-white
                  `

                  : `
                  bg-orange-100
                  border border-orange-200
                  text-slate-800
                  `
              }
              `}
            >

              <Flame size={18} />

              Fat Burn Training

            </div>

            <div
              className={`
              px-5
              h-12
              rounded-2xl
              flex
              items-center
              gap-3
              text-sm
              font-semibold

              ${
                isDark

                  ? `
                  bg-white/10
                  border border-white/10
                  text-white
                  `

                  : `
                  bg-cyan-100
                  border border-cyan-200
                  text-slate-800
                  `
              }
              `}
            >

              <Clock3 size={18} />

              Daily Fitness

            </div>
          </div>
        </div>
      </motion.div>

      {/* EXERCISES */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {subcategory.exercises.map(
          (
            exercise,
            index
          ) => (

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

              transition={{
                delay: index * 0.05,
              }}

              whileHover={{
                y: -5,
              }}

              className={`
              ${cardClass}
              border
              rounded-[30px]
              overflow-hidden
              `}
            >

              {/* IMAGE */}

              <div className="h-56 relative overflow-hidden">

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

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-transparent
                  "
                />

                <button
                  onClick={() =>
                    setSelectedExercise(
                      exercise
                    )
                  }
                  className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  "
                >

                  <div
                    className="
                    w-16
                    h-16
                    rounded-full
                    bg-white/20
                    backdrop-blur-xl
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Play
                      size={28}
                      fill="white"
                      className="text-white ml-1"
                    />

                  </div>
                </button>

                <div className="absolute bottom-5 left-5">

                  <h2 className="text-3xl font-black text-white">
                    {exercise.name}
                  </h2>

                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5">

                <p
                  className={`
                  text-sm
                  leading-7
                  ${subText}
                  `}
                >

                  {exercise.description}

                </p>

                <div className="flex flex-wrap gap-4 mt-5">

                  <div
                    className={`
                    px-4
                    h-11
                    rounded-2xl
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold

                    ${
                      isDark
                        ? `bg-white/10 text-white`
                        : `bg-pink-100 text-slate-800`
                    }
                    `}
                  >

                    <Clock3 size={16} />

                    {exercise.duration}

                  </div>

                  <div
                    className={`
                    px-4
                    h-11
                    rounded-2xl
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold

                    ${
                      isDark
                        ? `bg-white/10 text-white`
                        : `bg-orange-100 text-slate-800`
                    }
                    `}
                  >

                    <Flame size={16} />

                    {exercise.calories}

                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedExercise(
                      exercise
                    )
                  }
                  className={`
                  mt-6
                  w-full
                  h-12
                  rounded-2xl
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
                      `

                      : `
                      bg-gradient-to-r
                      from-pink-200
                      to-orange-200
                      text-slate-900
                      shadow-md
                      `
                  }
                  `}
                >

                  Watch Exercise

                </button>
              </div>
            </motion.div>
          )
        )}
      </div>

   {/* MODAL */}

{selectedExercise && (

  <div
    className="
    fixed
    inset-0
    z-[99999]
    overflow-y-scroll
    scrollbar-hide
    "
  >

    {/* BLUR BACKGROUND */}

    <div
      onClick={() =>
        setSelectedExercise(null)
      }
      className="
      fixed
      inset-0
      backdrop-blur-2xl
      bg-black/20
      "
    />

    {/* MODAL WRAPPER */}

    <div
      className="
      relative
      z-10
      min-h-screen
      flex
      items-start
      justify-center
      px-3
      py-4
      md:px-6
      md:py-6
      "
    >

      {/* MODAL CARD */}

      <div
        className={`
        relative
        w-full
        max-w-5xl
        rounded-[34px]
        overflow-hidden

        ${
          isDark

            ? `
            bg-[#0F172A]/95
            border border-white/10
            backdrop-blur-2xl
            `

            : `
            bg-white/95
            border border-white/70
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.15)]
            `
        }
        `}
      >

        {/* CLOSE BUTTON */}

        <button
          onClick={() =>
            setSelectedExercise(null)
          }
          className="
          absolute
          top-4
          right-4
          z-50
          w-12
          h-12
          rounded-full
          bg-black/50
          backdrop-blur-xl
          text-white
          flex
          items-center
          justify-center
          "
        >

          <X size={20} />

        </button>

        {/* VIDEO */}

        <div className="w-full aspect-video bg-black">

          <iframe
            src={getEmbedUrl(
              selectedExercise.video
            )}
            title="Exercise Video"
            className="w-full h-full"
            allowFullScreen
          />

        </div>

        {/* DETAILS */}

        <div
          className="
          p-6
          md:p-8
          pb-32
          "
        >

          <h2 className="text-4xl font-black">
            {selectedExercise.name}
          </h2>

          <p
            className={`
            mt-5
            text-sm
            leading-8
            ${subText}
            `}
          >

            {selectedExercise.description}

          </p>

          {/* STATS */}

          <div className="flex flex-wrap gap-4 mt-6">

            <div
              className={`
              px-5
              h-12
              rounded-2xl
              flex
              items-center
              gap-3
              font-semibold

              ${
                isDark
                  ? "bg-white/10"
                  : "bg-pink-100"
              }
              `}
            >

              <Clock3 size={18} />

              {selectedExercise.duration}

            </div>

            <div
              className={`
              px-5
              h-12
              rounded-2xl
              flex
              items-center
              gap-3
              font-semibold

              ${
                isDark
                  ? "bg-white/10"
                  : "bg-orange-100"
              }
              `}
            >

              <Flame size={18} />

              {selectedExercise.calories}

            </div>

          </div>

          {/* BENEFITS */}

          <div className="mt-10">

            <h3 className="text-2xl font-black mb-5">
              Benefits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {[
                "Improves endurance",
                "Burns calories effectively",
                "Builds muscle strength",
                "Enhances flexibility",
              ].map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className={`
                    p-5
                    rounded-2xl
                    flex
                    items-center
                    gap-3

                    ${
                      isDark

                        ? `
                        bg-white/5
                        border border-white/10
                        `

                        : `
                        bg-slate-50
                        border border-slate-200
                        `
                    }
                    `}
                  >

                    <Activity
                      size={18}
                      className="text-pink-500"
                    />

                    {item}

                  </div>
                )
              )}

            </div>
          </div>

          {/* BUTTONS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">

            <button
              onClick={() =>
                navigate("/timer")
              }
              className={`
              h-14
              rounded-2xl
              font-bold

              ${
                isDark

                  ? `
                  bg-gradient-to-r
                  from-orange-500
                  to-pink-500
                  text-white
                  `

                  : `
                  bg-gradient-to-r
                  from-pink-200
                  to-orange-200
                  text-slate-900
                  shadow-md
                  `
              }
              `}
            >

              Start Workout

            </button>

            <button
              onClick={() =>
                setSelectedExercise(null)
              }
              className={`
              h-14
              rounded-2xl
              font-bold

              ${
                isDark

                  ? `
                  bg-white/10
                  border border-white/10
                  text-white
                  `

                  : `
                  bg-white
                  border border-slate-200
                  text-slate-800
                  `
              }
              `}
            >

              Close

            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default WorkoutSessionPage;