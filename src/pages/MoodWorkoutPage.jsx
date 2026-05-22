// src/pages/MoodWorkoutPage.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  Flame,
  Brain,
  Moon,
  Smile,
  Play,
  Sparkles,
  RotateCcw,
  Filter,
  X,
  ArrowLeft,
} from "lucide-react";

import workoutModes from "../data/workoutModes";

const MoodWorkoutPage = () => {

  const navigate =
    useNavigate();

  const [
    selectedMood,
    setSelectedMood,
  ] = useState("");

  const [
    selectedLevel,
    setSelectedLevel,
  ] = useState("All");

  const [
    suggestedExercises,
    setSuggestedExercises,
  ] = useState([]);

  const [
    selectedExercise,
    setSelectedExercise,
  ] = useState(null);

  // ALL EXERCISES
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

  // RANDOM
  const shuffleArray =
    (array) => {

      return [...array]
        .sort(
          () =>
            0.5 -
            Math.random()
        )
        .slice(0, 4);
    };

  // MOODS
  const moodOptions = [
    {
      mood:
        "Energetic",
      emoji: "🔥",
      icon:
        Flame,
      gradient:
        "from-orange-500 to-red-500",
    },

    {
      mood:
        "Stressed",
      emoji: "🧠",
      icon:
        Brain,
      gradient:
        "from-cyan-500 to-blue-500",
    },

    {
      mood:
        "Tired",
      emoji: "🌙",
      icon:
        Moon,
      gradient:
        "from-indigo-500 to-purple-500",
    },

    {
      mood:
        "Happy",
      emoji: "😄",
      icon:
        Smile,
      gradient:
        "from-pink-500 to-purple-500",
    },
  ];

  // FILTER WORKOUTS
  const getMoodExercises =
    (
      mood,
      level
    ) => {

      let filtered = [];

      switch (mood) {

        case "Energetic":

          filtered =
            allExercises.filter(
              (exercise) =>
                exercise.category
                  .toLowerCase()
                  .includes(
                    "hiit"
                  ) ||

                exercise.level ===
                  "Advanced"
            );

          break;

        case "Stressed":

          filtered =
            allExercises.filter(
              (exercise) =>
                exercise.mode
                  .toLowerCase()
                  .includes(
                    "evening"
                  )
            );

          break;

        case "Tired":

          filtered =
            allExercises.filter(
              (exercise) =>
                exercise.level ===
                "Basic"
            );

          break;

        case "Happy":

          filtered =
            allExercises.filter(
              (exercise) =>
                exercise.level ===
                "Intermediate"
            );

          break;

        default:

          filtered = [];
      }

      if (
        level !== "All"
      ) {

        filtered =
          filtered.filter(
            (exercise) =>
              exercise.level ===
              level
          );
      }

      return shuffleArray(
        filtered
      );
    };

  // LOAD
  useEffect(() => {

    const savedMood =
      localStorage.getItem(
        "mood"
      );

    if (savedMood) {

      setSelectedMood(
        savedMood
      );

      setSuggestedExercises(
        getMoodExercises(
          savedMood,
          selectedLevel
        )
      );
    }

  }, []);

  // MOOD SELECT
  const handleMoodSelect =
    (mood) => {

      setSelectedMood(
        mood
      );

      localStorage.setItem(
        "mood",
        mood
      );

      setSuggestedExercises(
        getMoodExercises(
          mood,
          selectedLevel
        )
      );
    };

  // LEVEL CHANGE
  const handleLevelChange =
    (level) => {

      setSelectedLevel(
        level
      );

      if (
        selectedMood
      ) {

        setSuggestedExercises(
          getMoodExercises(
            selectedMood,
            level
          )
        );
      }
    };

  // EMBED URL
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
    <div className="min-h-screen bg-[#070B1A] overflow-x-hidden text-white">

      {/* HIDE SCROLLBAR */}
      <style>
        {`
          ::-webkit-scrollbar{
            width:0px;
            height:0px;
          }

          *{
            box-sizing:border-box;
          }
        `}
      </style>

      <div className="w-full px-5 py-5">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* BACK */}
            <button
              onClick={() =>
                navigate(-1)
              }
              className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition-all"
            >
              <ArrowLeft size={20} />
            </button>

            {/* TITLE */}
            <div>

              <h1 className="text-3xl font-bold">
                Workout Suggesstions
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Smart mood based workout suggestions
              </p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap items-center gap-3">

            {/* LEVELS */}
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-2xl px-3 py-3">

              <Filter
                size={18}
                className="text-slate-400"
              />

              {[
                "All",
                "Basic",
                "Intermediate",
                "Advanced",
              ].map(
                (
                  level,
                  index
                ) => (

                  <button
                    key={index}

                    onClick={() =>
                      handleLevelChange(
                        level
                      )
                    }

                    className={`px-5 h-11 rounded-xl text-sm font-semibold transition-all ${
                      selectedLevel ===
                      level
                        ? "bg-gradient-to-r from-pink-500 to-orange-500"
                        : "bg-white/[0.04] text-slate-300"
                    }`}
                  >
                    {level}
                  </button>
                )
              )}
            </div>

            {/* REFRESH */}
            <button
              onClick={() =>
                setSuggestedExercises(
                  getMoodExercises(
                    selectedMood,
                    selectedLevel
                  )
                )
              }

              className="h-14 px-6 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-3 text-sm font-semibold"
            >

              <RotateCcw size={18} />

              Refresh

            </button>
          </div>
        </div>

        {/* MOODS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          {moodOptions.map(
            (
              item,
              index
            ) => {

              const Icon =
                item.icon;

              return (

                <motion.button
                  key={index}

                  whileHover={{
                    y: -3,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  onClick={() =>
                    handleMoodSelect(
                      item.mood
                    )
                  }

                  className={`rounded-3xl border p-5 text-left transition-all duration-300 ${
                    selectedMood ===
                    item.mood
                      ? "border-white bg-white/[0.08]"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>

                    <Icon size={24} />

                  </div>

                  <div className="flex items-center gap-3 mt-5">

                    <span className="text-3xl">
                      {item.emoji}
                    </span>

                    <h2 className="text-xl font-bold">
                      {item.mood}
                    </h2>
                  </div>
                </motion.button>
              );
            }
          )}
        </div>

        {/* WORKOUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          {suggestedExercises.map(
            (
              exercise,
              index
            ) => (

              <motion.div
                key={index}

                whileHover={{
                  y: -4,
                }}

                className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] flex flex-col"
              >

                {/* IMAGE */}
                <div className="relative aspect-[16/10] overflow-hidden">

                  <img
                    src={
                      exercise.image
                    }

                    alt={
                      exercise.name
                    }

                    className="w-full h-full object-cover"
                  />

                  {/* LEVEL */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-xl text-xs font-semibold">

                    {
                      exercise.level
                    }

                  </div>

                  {/* PLAY */}
                  <button
                    onClick={() =>
                      setSelectedExercise(
                        exercise
                      )
                    }

                    className="absolute top-3 right-3 w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-lg"
                  >

                    <Play
                      size={16}
                    />

                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">

                  <h2 className="text-xl font-bold line-clamp-1">

                    {
                      exercise.name
                    }

                  </h2>

                  <p className="text-sm text-cyan-400 mt-1">

                    {
                      exercise.category
                    }

                  </p>

                  <p className="text-sm text-slate-400 leading-6 mt-3 line-clamp-2 flex-1">

                    {
                      exercise.description
                    }

                  </p>

                  {/* STATS */}
                  <div className="flex gap-5 mt-4 text-sm text-slate-500">

                    <p>
                      {
                        exercise.duration
                      }
                    </p>

                    <p>
                      {
                        exercise.calories
                      }
                    </p>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      setSelectedExercise(
                        exercise
                      )
                    }

                    className="mt-4 w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-sm font-semibold flex items-center justify-center gap-3"
                  >

                    <Play size={15} />

                    Start Workout

                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* EMPTY */}
        {selectedMood &&
          suggestedExercises.length ===
            0 && (

          <div className="py-20 text-center">

            <h2 className="text-2xl font-bold">
              No Workouts Found
            </h2>

            <p className="text-sm text-slate-400 mt-3">
              Try another difficulty level
            </p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedExercise && (

        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-5">

          <div className="w-full max-w-5xl rounded-3xl overflow-hidden bg-[#0F172A] border border-white/10">

            {/* VIDEO */}
            <iframe
              src={getEmbedUrl(
                selectedExercise.video
              )}

              title="Workout Video"

              className="w-full aspect-video"

              allowFullScreen
            />

            {/* DETAILS */}
            <div className="p-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-3xl font-bold">

                    {
                      selectedExercise.name
                    }

                  </h2>

                  <p className="text-cyan-400 text-sm mt-2">

                    {
                      selectedExercise.category
                    }

                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelectedExercise(
                      null
                    )
                  }

                  className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center"
                >

                  <X size={18} />

                </button>
              </div>

              <p className="mt-5 text-sm text-slate-300 leading-7">

                {
                  selectedExercise.description
                }

              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">

                  <p className="text-xs text-slate-400">
                    Duration
                  </p>

                  <h3 className="text-lg font-bold mt-2">
                    {
                      selectedExercise.duration
                    }
                  </h3>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">

                  <p className="text-xs text-slate-400">
                    Calories
                  </p>

                  <h3 className="text-lg font-bold mt-2">
                    {
                      selectedExercise.calories
                    }
                  </h3>
                </div>
              </div>

              {/* CLOSE */}
              <button
                onClick={() =>
                  setSelectedExercise(
                    null
                  )
                }

                className="mt-6 w-full h-12 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-sm font-semibold"
              >
                Close Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MoodWorkoutPage;