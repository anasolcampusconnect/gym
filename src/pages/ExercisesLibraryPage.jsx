// src/pages/ExercisesLibrary.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Heart,
  Play,
  Flame,
  Clock3,
  Filter,
  LayoutDashboard,
  X,
} from "lucide-react";

import workoutModes from "../data/workoutModes";

const ExercisesLibrary = () => {

  const navigate =
    useNavigate();

  // ============================================
  // STATES
  // ============================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    selectedLevel,
    setSelectedLevel,
  ] = useState("All");

  const [
    selectedCalories,
    setSelectedCalories,
  ] = useState("All");

  const [
    favorites,
    setFavorites,
  ] = useState([]);

  const [
    selectedExercise,
    setSelectedExercise,
  ] = useState(null);

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
      bg-white/[0.05]
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
  // FAVORITES
  // ============================================

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(
          "favorite_exercises"
        )
      ) || [];

    setFavorites(stored);

  }, []);

  const toggleFavorite =
    (exercise) => {

      let updated = [];

      const exists =
        favorites.find(
          (item) =>
            item.name ===
            exercise.name
        );

      if (exists) {

        updated =
          favorites.filter(
            (item) =>
              item.name !==
              exercise.name
          );

      } else {

        updated = [
          ...favorites,
          exercise,
        ];
      }

      setFavorites(updated);

      localStorage.setItem(
        "favorite_exercises",
        JSON.stringify(
          updated
        )
      );
    };

  // ============================================
  // VIDEO EMBED
  // ============================================

  const getEmbedUrl =
    (url) => {

      if (
        url?.includes(
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

  // ============================================
  // ALL EXERCISES
  // ============================================

  const allExercises =
    workoutModes.flatMap(
      (mode) =>

        mode.categories.flatMap(
          (category) =>

            category.subcategories.flatMap(
              (subcategory) =>

                subcategory.exercises.map(
                  (exercise) => ({

                    ...exercise,

                    category:
                      category.name,

                    level:
                      subcategory.level,

                    mode:
                      mode.title,
                  })
                )
            )
        )
    );

  // ============================================
  // FILTER OPTIONS
  // ============================================

  const categoryOptions = [

    "All",

    ...new Set(
      allExercises.map(
        (item) =>
          item.category
      )
    ),
  ];

  const levelOptions = [

    "All",

    ...new Set(
      allExercises.map(
        (item) =>
          item.level
      )
    ),
  ];

  const caloriesOptions = [

    "All",

    ...new Set(

      allExercises

        .filter((item) => {

          const matchesCategory =

            selectedCategory === "All"

              ? true

              : item.category ===
                selectedCategory;

          const matchesLevel =

            selectedLevel === "All"

              ? true

              : item.level ===
                selectedLevel;

          return (
            matchesCategory &&
            matchesLevel
          );
        })

        .map(
          (item) =>
            item.calories
        )
    ),
  ];

  // ============================================
  // FILTERED EXERCISES
  // ============================================

  const filteredExercises =
    allExercises.filter(
      (exercise) => {

        const matchesSearch =
          exercise.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          selectedCategory ===
          "All"

            ? true

            : exercise.category ===
              selectedCategory;

        const matchesLevel =
          selectedLevel ===
          "All"

            ? true

            : exercise.level ===
              selectedLevel;

        const matchesCalories =
          selectedCalories ===
          "All"

            ? true

            : exercise.calories ===
              selectedCalories;

        return (

          matchesSearch &&
          matchesCategory &&
          matchesLevel &&
          matchesCalories
        );
      }
    );

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

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-black">
            Exercise Library
          </h1>

          <p className={`${subText} mt-2`}>
            Find workouts by category and difficulty
          </p>

        </div>

        <div className="flex gap-3 flex-wrap">

          <button
            onClick={() =>
              navigate("/workout")
            }
            className={`
            h-11
            px-5
            rounded-xl
            text-sm
            font-semibold
            flex
            items-center
            gap-2

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
                text-slate-900
                shadow-md
                `
            }
            `}
          >

            <LayoutDashboard size={16} />

            Back

          </button>

          <button
            onClick={() =>
              navigate(
                "/favorites-exercise"
              )
            }
            className={`
            h-11
            px-5
            rounded-xl
            text-sm
            font-semibold
            flex
            items-center
            gap-2

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

            <Heart size={16} />

            Favorites

          </button>
        </div>
      </div>

      {/* SEARCH */}

      <div
        className={`
        ${cardClass}
        border
        rounded-2xl
        h-14
        px-5
        flex
        items-center
        gap-3
        mb-6
        `}
      >

        <Search
          size={18}
          className={subText}
        />

        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className={`
          bg-transparent
          outline-none
          w-full
          text-sm

          ${
            isDark
              ? "placeholder:text-slate-500"
              : "placeholder:text-slate-400"
          }
          `}
        />

      </div>

      {/* FILTERS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* CATEGORY */}

        <div className={`${cardClass} border rounded-[24px] p-4`}>

          <p className={`text-xs font-semibold mb-3 ${subText}`}>
            Categories
          </p>

          <select
            value={selectedCategory}
            onChange={(e) => {

              setSelectedCategory(
                e.target.value
              );

              setSelectedCalories(
                "All"
              );
            }}
            className={`
            w-full
            h-12
            rounded-2xl
            px-4
            text-sm
            font-medium
            outline-none

            ${
              isDark

                ? `
                bg-[#1A2035]
                border border-white/10
                text-white
                `

                : `
                bg-gradient-to-r
                from-pink-50
                to-orange-50
                border border-pink-100
                text-slate-800
                `
            }
            `}
          >

            {categoryOptions.map(
              (item, index) => (

                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>
        </div>

        {/* LEVEL */}

        <div className={`${cardClass} border rounded-[24px] p-4`}>

          <p className={`text-xs font-semibold mb-3 ${subText}`}>
            Difficulty
          </p>

          <select
            value={selectedLevel}
            onChange={(e) => {

              setSelectedLevel(
                e.target.value
              );

              setSelectedCalories(
                "All"
              );
            }}
            className={`
            w-full
            h-12
            rounded-2xl
            px-4
            text-sm
            font-medium
            outline-none

            ${
              isDark

                ? `
                bg-[#1A2035]
                border border-white/10
                text-white
                `

                : `
                bg-gradient-to-r
                from-cyan-50
                to-blue-50
                border border-cyan-100
                text-slate-800
                `
            }
            `}
          >

            {levelOptions.map(
              (item, index) => (

                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>
        </div>

        {/* CALORIES */}

        <div className={`${cardClass} border rounded-[24px] p-4`}>

          <p className={`text-xs font-semibold mb-3 ${subText}`}>
            Calories
          </p>

          <select
            value={selectedCalories}
            onChange={(e) =>
              setSelectedCalories(
                e.target.value
              )
            }
            className={`
            w-full
            h-12
            rounded-2xl
            px-4
            text-sm
            font-medium
            outline-none

            ${
              isDark

                ? `
                bg-[#1A2035]
                border border-white/10
                text-white
                `

                : `
                bg-gradient-to-r
                from-orange-50
                to-pink-50
                border border-orange-100
                text-slate-800
                `
            }
            `}
          >

            {caloriesOptions.map(
              (item, index) => (

                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>
        </div>
      </div>

      {/* RESULTS */}

      <div className="flex items-center gap-3 mb-6">

        <Filter
          size={18}
          className="text-cyan-400"
        />

        <p className={`text-sm ${subText}`}>

          {filteredExercises.length}
          {" "}
          Exercises Found

        </p>
      </div>

      {/* EXERCISES */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredExercises.map(
          (
            exercise,
            index
          ) => {

            const isFavorite =
              favorites.find(
                (item) =>
                  item.name ===
                  exercise.name
              );

            return (

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
                  delay:
                    index * 0.03,
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

                <div className="h-44 relative overflow-hidden">

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

                  <button
                    onClick={() =>
                      toggleFavorite(
                        exercise
                      )
                    }
                    className="
                    absolute
                    top-4
                    right-4
                    w-10
                    h-10
                    rounded-full
                    bg-white/80
                    backdrop-blur-xl
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Heart
                      size={18}
                      className={
                        isFavorite
                          ? "text-red-500 fill-red-500"
                          : "text-slate-700"
                      }
                    />

                  </button>

                  <div className="absolute top-4 left-4">

                    <div
                      className="
                      px-3
                      h-8
                      rounded-full
                      bg-white/80
                      backdrop-blur-xl
                      text-slate-800
                      text-xs
                      font-bold
                      flex
                      items-center
                      "
                    >

                      {exercise.level}

                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <h2 className="text-2xl font-black">
                    {exercise.name}
                  </h2>

                  <p
                    className={`
                    text-sm
                    leading-7
                    mt-3
                    ${subText}
                    `}
                  >

                    {exercise.description}

                  </p>

                  <div className="flex flex-wrap gap-3 mt-5">

                    <div
                      className={`
                      px-4
                      h-10
                      rounded-xl
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold

                      ${
                        isDark
                          ? "bg-white/10"
                          : "bg-pink-100"
                      }
                      `}
                    >

                      <Clock3 size={15} />

                      {exercise.duration}

                    </div>

                    <div
                      className={`
                      px-4
                      h-10
                      rounded-xl
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold

                      ${
                        isDark
                          ? "bg-white/10"
                          : "bg-orange-100"
                      }
                      `}
                    >

                      <Flame size={15} />

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
                    flex
                    items-center
                    justify-center
                    gap-2

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

                    <Play size={16} />

                    Start Exercise

                  </button>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

  

{selectedExercise && (

  <div
    className="
    fixed
    inset-0
    z-[99999]
    overflow-y-auto
    scrollbar-hide
    "
  >

    {/* BACKDROP */}

    <div
      onClick={() =>
        setSelectedExercise(null)
      }
      className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-xl
      "
    />

    {/* MODAL WRAPPER */}

    <div
      className="
      relative
      min-h-screen
      w-full
      flex
      justify-center
      items-start
      px-3
      md:px-6
      py-6
      md:py-10
      "
    >

      {/* MODAL CARD */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 0.35,
        }}

        className={`
        relative
        w-full
        max-w-5xl
        rounded-[34px]
        overflow-hidden
        z-50
        mb-28

        ${
          isDark

            ? `
            bg-[#0B1120]
            border border-white/10
            `

            : `
            bg-white
            border border-white/70
            shadow-[0_20px_80px_rgba(0,0,0,0.15)]
            `
        }
        `}
      >

        {/* CLOSE */}

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

        {/* CONTENT */}

        <div
          className="
          p-6
          md:p-8
          pb-10
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
                "Improves stamina",
                "Burns calories fast",
                "Builds strength",
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

                    <Flame
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
      </motion.div>
    </div>
  </div>
)}
    </div>
  );
};

export default ExercisesLibrary;