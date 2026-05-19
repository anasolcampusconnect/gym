import {
  Search,
  Heart,
  Plus,
  Dumbbell,
  X,
  Flame,
  Home,
} from "lucide-react";

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

const defaultExercises = [
 {
    id: 1,
    name: "Bench Press",
    category: "Chest",
    description:
      "Lie on bench, lower bar to chest, press up.",
    defaultSets: 3,
    defaultReps: 10,
    tips:
      "Keep back flat and don't bounce the bar.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    name: "Pull Ups",
    category: "Back",
    description:
      "Hang from bar and pull body upward.",
    defaultSets: 4,
    defaultReps: 8,
    tips:
      "Control movement and avoid swinging.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    name: "Squats",
    category: "Legs",
    description:
      "Lower hips down and stand back up.",
    defaultSets: 4,
    defaultReps: 12,
    tips:
      "Keep knees aligned with feet.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 4,
    name: "Shoulder Press",
    category: "Shoulders",
    description:
      "Press dumbbells overhead.",
    defaultSets: 3,
    defaultReps: 10,
    tips:
      "Avoid arching lower back.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 5,
    name: "Bicep Curl",
    category: "Arms",
    description:
      "Curl dumbbells upward.",
    defaultSets: 3,
    defaultReps: 12,
    tips:
      "Keep elbows stationary.",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 6,
    name: "Mountain Climbers",
    category: "Cardio",
    description:
      "Drive knees quickly toward chest.",
    defaultSets: 3,
    defaultReps: 20,
    tips:
      "Keep core tight.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 7,
    name: "Plank",
    category: "Core",
    description:
      "Hold body in straight line.",
    defaultSets: 3,
    defaultReps: 60,
    tips:
      "Do not let hips sag.",
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Cardio",
  "Core",
];

const ExerciseLibraryPage = () => {

  const navigate =
    useNavigate();

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    selectedExercise,
    setSelectedExercise,
  ] = useState(null);

  const [
    exercises,
    setExercises,
  ] = useState([]);

  const [
    favorites,
    setFavorites,
  ] = useState([]);

//   const deleteExercise = (id) => {

//   const customExercises =
//     JSON.parse(
//       localStorage.getItem(
//         "custom_exercises"
//       )
//     ) || [];

//   const updated =
//     customExercises.filter(
//       (item) =>
//         item.id !== id
//     );

//   localStorage.setItem(
//     "custom_exercises",
//     JSON.stringify(updated)
//   );

//   const mergedExercises = [
//     ...defaultExercises,
//     ...updated,
//   ];

//   setExercises(
//     mergedExercises
//   );
// };
  // LOAD DATA
  useEffect(() => {

    const customExercises =
      JSON.parse(
        localStorage.getItem(
          "custom_exercises"
        )
      ) || [];

    const mergedExercises = [
      ...defaultExercises,
      ...customExercises,
    ];

    setExercises(
      mergedExercises
    );

    const storedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorite_exercises"
        )
      ) || [];

    setFavorites(
      storedFavorites
    );

  }, []);

  // FILTER
  const filteredExercises =
    exercises.filter(
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

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  // FAVORITES
  const toggleFavorite =
    (exercise) => {

      const exists =
        favorites.find(
          (item) =>
            item.id ===
            exercise.id
        );

      let updatedFavorites =
        [];

      if (exists) {

        updatedFavorites =
          favorites.filter(
            (item) =>
              item.id !==
              exercise.id
          );

      } else {

        updatedFavorites = [
          ...favorites,
          exercise,
        ];
      }

      setFavorites(
        updatedFavorites
      );

      localStorage.setItem(
        "favorite_exercises",
        JSON.stringify(
          updatedFavorites
        )
      );
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white p-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
      <div   className="flex gap-4 flex-wrap">
       <button
        onClick={() =>
          navigate(
            "/dashboard"
          )
        }
        className="h-12 px-5 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3 font-bold mb-6 hover:bg-white/20 transition-all">

             <Home size={20} />
             Dashboard
          </button>
      </div>
        <div>
          <h1 className="text-5xl font-black">
            Exercise Library
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Explore exercises and custom workouts.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 flex-wrap">

          {/* FAVORITES */}
          <button
            onClick={() =>
              navigate(
                "/favorites"
              )
            }
            className="h-14 px-7 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 font-bold flex items-center gap-3 shadow-2xl"
          >
            <Heart size={20} />
            Favorites
          </button>

          {/* CUSTOM */}
          <button
            onClick={() =>
              navigate(
                "/custom-exercises"
              )
            }
            className="h-14 px-7 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 font-bold flex items-center gap-3 shadow-2xl"
          >
            <Plus size={20} />
            Add Custom Exercise
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white/5 border border-white/10 rounded-[28px] p-4 flex items-center gap-4 mb-8 backdrop-blur-xl">

        <Search className="text-pink-400" />

        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-transparent outline-none w-full text-white placeholder:text-slate-400 text-lg"
        />
      </div>

      {/* CATEGORY */}
      <div className="flex flex-wrap gap-4 mb-10">

        {categories.map(
          (category, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedCategory(
                  category
                )
              }
              className={`h-12 px-6 rounded-2xl font-bold transition-all ${
                selectedCategory ===
                category
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-xl"
                  : "bg-white/5 border border-white/10 text-slate-300"
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredExercises.map(
          (exercise) => {

            const isFavorite =
              favorites.find(
                (item) =>
                  item.id ===
                  exercise.id
              );

            return (
            <motion.div
  key={exercise.id}
  whileHover={{
    y: -6,
  }}
  className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col h-full"
>

  {/* IMAGE */}
  <div className="h-[260px] min-h-[260px] max-h-[260px] relative overflow-hidden bg-black">

    <img
      src={
        exercise.image
          ? exercise.image
          : "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
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

    {/* FAVORITE */}
    <button
      onClick={() =>
        toggleFavorite(
          exercise
        )
      }
      className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl flex items-center justify-center"
    >
      <Heart
        className={
          isFavorite
            ? "fill-pink-500 text-pink-500"
            : "text-white"
        }
      />
    </button>
  </div>

  {/* CONTENT */}
  <div className="p-6 flex flex-col flex-1">

    {/* TITLE */}
    <div className="flex justify-between items-start gap-4">

      <div className="flex-1">

        <h2 className="text-3xl font-black line-clamp-1">
          {
            exercise.name
          }
        </h2>

        <p className="text-slate-400 mt-3 leading-7 min-h-[70px] line-clamp-3">
          {
            exercise.description
          }
        </p>
      </div>

      <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-xl">
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
          {exercise.defaultSets || exercise.sets}
        </h3>
      </div>

      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

        <p className="text-slate-400 text-sm">
          Reps
        </p>

        <h3 className="text-3xl font-black mt-2">
          {exercise.defaultReps || exercise.reps}
        </h3>
      </div>
    </div>

    {/* BUTTON */}
    <div className="mt-auto pt-6">

      <button
        onClick={() =>
          setSelectedExercise(
            exercise
          )
        }
        className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold"
      >
        View Details
      </button>

    </div>
  </div>
</motion.div>
            );
          }
        )}
      </div>

      {/* MODAL */}
  {/* MODAL */}
  <style>
{`
  .hide-scrollbar::-webkit-scrollbar {
    width: 0px;
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}
</style>
{selectedExercise && (
 <div className="hide-scrollbar fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
   className="hide-scrollbar w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#111827] border border-white/10 rounded-[36px] shadow-2xl"
    >

      {/* IMAGE */}
      <div className="h-[320px] w-full relative overflow-hidden">

        <img
          src={
            selectedExercise.image
              ? selectedExercise.image
              : "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
          }
          alt={
            selectedExercise.name
          }
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent" />

        {/* CLOSE */}
        <button
          onClick={() =>
            setSelectedExercise(
              null
            )
          }
          className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
        >
          <X size={26} />
        </button>

        {/* CATEGORY */}
        <div className="absolute bottom-6 left-6 px-5 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/20 backdrop-blur-xl flex items-center font-bold text-pink-400">
          {
            selectedExercise.category
          }
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">

        {/* TITLE */}
        <h1 className="text-5xl font-black">
          {
            selectedExercise.name
          }
        </h1>

        {/* DESCRIPTION */}
        <div className="mt-8">

          <h3 className="text-2xl font-bold mb-4 text-cyan-400">
            Description
          </h3>

          <p className="text-slate-300 leading-8 text-lg">
            {
              selectedExercise.description
            }
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {/* SETS */}
          <div className="bg-white/5 border border-white/10 rounded-[28px] p-6">

            <p className="text-slate-400 text-lg">
              Default Sets
            </p>

            <h2 className="text-5xl font-black mt-4 text-cyan-400">
              {
                selectedExercise.defaultSets ||
                selectedExercise.sets
              }
            </h2>
          </div>

          {/* REPS */}
          <div className="bg-white/5 border border-white/10 rounded-[28px] p-6">

            <p className="text-slate-400 text-lg">
              Default Reps
            </p>

            <h2 className="text-5xl font-black mt-4 text-pink-400">
              {
                selectedExercise.defaultReps ||
                selectedExercise.reps
              }
            </h2>
          </div>
        </div>

        {/* TIPS */}
        <div className="mt-10 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-white/10 rounded-[30px] p-7">

          <h3 className="text-2xl font-black mb-5 flex items-center gap-3">

            <Flame className="text-orange-400" />

            Exercise Tips
          </h3>

          <p className="text-slate-300 text-lg leading-8">
            {
              selectedExercise.tips
                ? selectedExercise.tips
                : "No tips available for this exercise."
            }
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            setSelectedExercise(
              null
            )
          }
          className="w-full h-16 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 font-black text-lg mt-10"
        >
          Close Details
        </button>

      </div>
    </motion.div>
  </div>
)}
    </div>
  );
};

export default ExerciseLibraryPage;