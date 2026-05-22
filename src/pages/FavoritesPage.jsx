// src/pages/FavoritesPage.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Heart,
  Trash2,
  Search,
  X,
  Play,
  Clock3,
  Flame,
} from "lucide-react";

const FavoritesPage = () => {

  const navigate =
    useNavigate();

  const [
    favorites,
    setFavorites,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

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
  // BODY SCROLL LOCK
  // ============================================

  useEffect(() => {

    if (selectedExercise) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [selectedExercise]);

  // ============================================
  // LOAD FAVORITES
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

  // ============================================
  // DELETE FAVORITE
  // ============================================

  const deleteFavorite =
    (exerciseName) => {

      const updated =
        favorites.filter(
          (exercise) =>
            exercise.name !==
            exerciseName
        );

      setFavorites(updated);

      localStorage.setItem(
        "favorite_exercises",
        JSON.stringify(
          updated
        )
      );
    };

  // ============================================
  // SEARCH
  // ============================================

  const filteredFavorites =
    favorites.filter(
      (exercise) =>

        exercise.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        exercise.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // ============================================
  // YOUTUBE EMBED
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

      if (
        url.includes(
          "youtu.be/"
        )
      ) {

        const videoId =
          url.split(
            "youtu.be/"
          )[1];

        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url;
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

      {/* HIDE SCROLLBAR */}

      <style>
        {`
          ::-webkit-scrollbar{
            width:0px;
          }
        `}
      </style>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

        <div>

          <h1 className="text-3xl font-black">
            Favorite Exercises
          </h1>

          <p className={`${subText} text-sm mt-2`}>
            Your saved workouts
          </p>

        </div>

        <button
          onClick={() =>
            navigate(
              "/exercises-library"
            )
          }
          className={`
          h-11
          px-5
          rounded-2xl
          font-semibold
          text-sm

          ${
            isDark

              ? `
              bg-white/10
              border border-white/10
              text-white
              `

              : `
              bg-white
              border border-white/70
              text-slate-800
              shadow-md
              `
          }
          `}
        >

          Back

        </button>
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
        mb-8
        `}
      >

        <Search
          size={18}
          className={subText}
        />

        <input
          type="text"
          placeholder="Search favorite exercises..."
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

      {/* FAVORITES */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredFavorites.map(
          (
            exercise,
            index
          ) => (

            <div
              key={index}
              className={`
              ${cardClass}
              border
              rounded-[28px]
              overflow-hidden
              `}
            >

              {/* IMAGE */}

              <div className="h-52 relative overflow-hidden">

                <img
                  src={
                    exercise.image
                  }
                  alt={
                    exercise.name
                  }
                  className="
                  w-full
                  h-full
                  object-cover
                  hover:scale-105
                  transition-all
                  duration-500
                  "
                />

                {/* HEART */}

                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-xl flex items-center justify-center">

                  <Heart
                    size={18}
                    className="fill-red-500 text-red-500"
                  />
                </div>

                {/* DELETE */}

                <button
                  onClick={() =>
                    deleteFavorite(
                      exercise.name
                    )
                  }
                  className="
                  absolute
                  top-3
                  right-3
                  w-10
                  h-10
                  rounded-xl
                  bg-red-500/20
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  hover:bg-red-500
                  transition-all
                  "
                >

                  <Trash2
                    size={18}
                    className="text-white"
                  />

                </button>
              </div>

              {/* CONTENT */}

              <div className="p-5">

                <h2 className="text-2xl font-black">
                  {exercise.name}
                </h2>

                <p className="text-cyan-400 text-sm mt-2">
                  {exercise.category}
                </p>

                <div className="flex gap-3 mt-5">

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

                {/* BUTTON */}

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
            </div>
          )
        )}
      </div>

      {/* EMPTY */}

      {filteredFavorites.length === 0 && (

        <div className="flex flex-col items-center justify-center py-24">

          <h2 className="text-3xl font-black">
            No Favorites Found
          </h2>

          <p className={`${subText} mt-3`}>
            Add exercises to favorites
          </p>

        </div>
      )}

      {/* MODAL */}

      {selectedExercise && (

        <div
          className="
          fixed
          inset-0
          z-[99999]
          overflow-y-auto
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
            bg-black/40
            backdrop-blur-2xl
            "
          />

          {/* WRAPPER */}

          <div
            className="
            relative
            min-h-screen
            flex
            items-start
            justify-center
            px-3
            md:px-6
            py-6
            md:py-10
            "
          >

            {/* CARD */}

            <div
              className={`
              relative
              z-50
              w-full
              max-w-5xl
              rounded-[34px]
              overflow-hidden
              mb-24

              ${
                isDark

                  ? `
                  bg-[#091226]
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
                w-11
                h-11
                rounded-xl
                bg-black/60
                backdrop-blur-xl
                flex
                items-center
                justify-center
                text-white
                "
              >

                <X size={20} />

              </button>

              {/* VIDEO */}

              <div className="w-full aspect-video bg-black">

                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(
                    selectedExercise.video
                  )}
                  title={
                    selectedExercise.name
                  }
                  allowFullScreen
                  className="border-0"
                />

              </div>

              {/* DETAILS */}

              <div className="p-6 md:p-8 pb-10">

                <h2 className="text-4xl font-black">
                  {
                    selectedExercise.name
                  }
                </h2>

                <div className="flex gap-4 flex-wrap mt-5">

                  <div
                    className={`
                    px-5
                    h-11
                    rounded-2xl
                    flex
                    items-center
                    gap-2
                    font-semibold

                    ${
                      isDark
                        ? "bg-white/10"
                        : "bg-pink-100"
                    }
                    `}
                  >

                    <Clock3 size={16} />

                    {
                      selectedExercise.duration
                    }

                  </div>

                  <div
                    className={`
                    px-5
                    h-11
                    rounded-2xl
                    flex
                    items-center
                    gap-2
                    font-semibold

                    ${
                      isDark
                        ? "bg-white/10"
                        : "bg-orange-100"
                    }
                    `}
                  >

                    <Flame size={16} />

                    {
                      selectedExercise.calories
                    }

                  </div>
                </div>

                {/* DESCRIPTION */}

                <p
                  className={`
                  mt-6
                  text-sm
                  leading-8
                  ${subText}
                  `}
                >

                  {
                    selectedExercise.description
                  }

                </p>

                {/* INSTRUCTIONS */}

                <div className="mt-10">

                  <h3 className="text-2xl font-black mb-5">
                    Instructions
                  </h3>

                  <ul className={`space-y-4 text-sm ${subText}`}>

                    <li>• Maintain proper posture</li>

                    <li>• Keep breathing steady</li>

                    <li>• Focus on correct form</li>

                    <li>• Avoid sudden movements</li>

                    <li>• Perform slowly and controlled</li>

                  </ul>
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

                    Continue

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

export default FavoritesPage;