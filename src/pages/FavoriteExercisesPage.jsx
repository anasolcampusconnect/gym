import {
  Heart,
  Dumbbell,
  Search,
  Flame,
  ArrowLeft,
  Trash2,
  Info,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

const sampleExercises = [
  {
    id: 1,
    name: "Bench Press",
    category: "Chest",
    description:
      "Lie on bench and press bar upward.",
    sets: 3,
    reps: 10,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    name: "Pull Ups",
    category: "Back",
    description:
      "Pull your body upward using bar.",
    sets: 4,
    reps: 8,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    name: "Squats",
    category: "Legs",
    description:
      "Lower hips down and stand back up.",
    sets: 4,
    reps: 12,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
];

const FavoriteExercisesPage = () => {
  const navigate = useNavigate();

  const [favorites,
    setFavorites] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [selectedExercise,
    setSelectedExercise] =
    useState(null);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorite_exercises"
        )
      ) || sampleExercises;

    setFavorites(
      storedFavorites
    );
  }, []);

  const removeFavorite = (
    id
  ) => {
    const updated =
      favorites.filter(
        (item) =>
          item.id !== id
      );

    setFavorites(updated);

    localStorage.setItem(
      "favorite_exercises",
      JSON.stringify(updated)
    );
  };

  const filteredExercises =
    favorites.filter(
      (exercise) =>
        exercise.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white p-6">

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
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[36px] p-8 mb-8 shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          {/* LEFT */}
          <div>

            <button
              onClick={() =>
                navigate(
                  "/exercises"
                )
              }
              className="h-12 px-5 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3 font-bold mb-6 hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-5xl font-black">
              Favorite Exercises
            </h1>

            <p className="text-slate-400 mt-4 text-lg max-w-2xl leading-8">
              Quickly access your liked exercises and workout routines.
            </p>
          </div>

          {/* ICON */}
          <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-2xl">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
        </div>
      </motion.div>

      {/* SEARCH */}
      <div className="bg-white/5 border border-white/10 rounded-[28px] p-4 flex items-center gap-4 mb-8 backdrop-blur-xl">

        <Search className="text-pink-400" />

        <input
          type="text"
          placeholder="Search favorite exercises..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-transparent outline-none w-full text-white placeholder:text-slate-400 text-lg"
        />
      </div>

      {/* GRID */}
      {filteredExercises.length >
      0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredExercises.map(
            (exercise) => (
              <motion.div
                key={
                  exercise.id
                }
                whileHover={{
                  y: -6,
                }}
                className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl"
              >
                {/* IMAGE */}
                <div className="h-56 relative overflow-hidden">

                  <img
                    src={
                      exercise.image
                    }
                    alt={
                      exercise.name
                    }
                    className="w-full h-full object-cover"
                  />

                  {/* CATEGORY */}
                  <div className="absolute top-4 left-4 px-4 h-10 rounded-2xl bg-black/40 backdrop-blur-xl flex items-center font-bold">
                    {
                      exercise.category
                    }
                  </div>

                  {/* HEART */}
                  <button
                    onClick={() =>
                      removeFavorite(
                        exercise.id
                      )
                    }
                    className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl flex items-center justify-center"
                  >
                    <Heart className="fill-pink-500 text-pink-500" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="text-3xl font-black">
                        {
                          exercise.name
                        }
                      </h2>

                      <p className="text-slate-400 mt-2 leading-7">
                        {
                          exercise.description
                        }
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-xl">
                      <Dumbbell />
                    </div>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

                      <p className="text-slate-400 text-sm">
                        Sets
                      </p>

                      <h3 className="text-3xl font-black mt-2">
                        {
                          exercise.sets
                        }
                      </h3>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

                      <p className="text-slate-400 text-sm">
                        Reps
                      </p>

                      <h3 className="text-3xl font-black mt-2">
                        {
                          exercise.reps
                        }
                      </h3>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <button
                      onClick={() =>
                        setSelectedExercise(
                          exercise
                        )
                      }
                      className="h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold flex items-center justify-center gap-2"
                    >
                      <Info size={18} />
                      Details
                    </button>

                    <button
                      onClick={() =>
                        removeFavorite(
                          exercise.id
                        )
                      }
                      className="h-14 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 font-bold flex items-center justify-center gap-2"
                    >
                      <Trash2
                        size={18}
                      />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-[36px] p-16 text-center backdrop-blur-xl">

          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mx-auto shadow-2xl">

            <Heart className="w-14 h-14 text-white" />
          </div>

          <h2 className="text-4xl font-black mt-8">
            No Favorite Exercises
          </h2>

          <p className="text-slate-400 mt-4 text-lg">
            Start adding exercises to favorites.
          </p>
        </div>
      )}

      {/* MODAL */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-2xl bg-[#111827] border border-white/10 rounded-[36px] overflow-hidden shadow-2xl"
          >
            {/* IMAGE */}
            <div className="h-72 relative">

              <img
                src={
                  selectedExercise.image
                }
                alt={
                  selectedExercise.name
                }
                className="w-full h-full object-cover"
              />

              <button
                onClick={() =>
                  setSelectedExercise(
                    null
                  )
                }
                className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-black/50 backdrop-blur-xl text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-8">

              <div className="flex justify-between items-start">

                <div>
                  <h1 className="text-5xl font-black">
                    {
                      selectedExercise.name
                    }
                  </h1>

                  <p className="text-pink-400 mt-3 text-lg font-semibold">
                    {
                      selectedExercise.category
                    }
                  </p>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-xl">
                  <Flame />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-8">

                <h3 className="text-2xl font-black">
                  Description
                </h3>

                <p className="text-slate-300 leading-8 mt-3">
                  {
                    selectedExercise.description
                  }
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <p className="text-slate-400">
                    Sets
                  </p>

                  <h2 className="text-5xl font-black mt-3">
                    {
                      selectedExercise.sets
                    }
                  </h2>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <p className="text-slate-400">
                    Reps
                  </p>

                  <h2 className="text-5xl font-black mt-3">
                    {
                      selectedExercise.reps
                    }
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FavoriteExercisesPage;