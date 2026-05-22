import {
  ArrowLeft,
  Search,
  Trash2,
  Pencil,
  ChevronDown,
  ChevronUp,
  Flame,
  Clock3,
  Activity,
  X,
  CalendarDays,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import workoutModes from "../data/workoutModes";

const WorkoutHistoryPage = () => {

  const navigate =
    useNavigate();

  // =========================================
  // USER
  // =========================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    );

  const userId =
    currentUser?.email ||
    "guest";



  // =========================================
  // STATES
  // =========================================

  const [workouts,
    setWorkouts] =
    useState([]);

  const [expanded,
    setExpanded] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("");

  const [
    exerciseFilter,
    setExerciseFilter,
  ] = useState("");

  const [
    startDate,
    setStartDate,
  ] = useState("");

  const [
    endDate,
    setEndDate,
  ] = useState("");

  const [editWorkout,
    setEditWorkout] =
    useState(null);

  const [editOpen,
    setEditOpen] =
    useState(false);

  const historyKey =
  `workout_history_${userId}`;
  // =========================================
// THEME
// =========================================

const settings =
  JSON.parse(
    localStorage.getItem(
      `gym_settings_${userId}`
    )
  ) || {};

const currentTheme =
  settings?.theme || "dark";

const isDark =
  currentTheme === "dark" ||

  (
    currentTheme === "system" &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
  );

// =========================================
// THEME CLASSES
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
    `

    : `
    bg-white/75
    border-white/70
    backdrop-blur-xl
    shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    `;

const inputClass =
  isDark

    ? `
    bg-white/5
    border-white/10
    text-white
    placeholder:text-slate-500
    `

    : `
    bg-white
    border-slate-200
    text-slate-800
    placeholder:text-slate-400
    shadow-sm
    `;

const subText =
  isDark
    ? "text-slate-400"
    : "text-slate-500";
const dropdownClass =
  isDark

    ? `
    bg-[#111827]
    border-white/10
    text-white
    `

    : `
    bg-white
    border-slate-200
    text-slate-800
    shadow-sm
    `;

const modalCardClass =
  isDark

    ? `
    bg-white/[0.04]
    border-white/10
    `

    : `
    bg-[#ffffff]
    border-slate-200
    shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    `;

const detailsText =
  isDark
    ? "text-slate-300"
    : "text-slate-600";

const labelClass =
  isDark
    ? "text-slate-400"
    : "text-slate-500";

  // =========================================
  // HIDE BODY SCROLL
  // =========================================

  useEffect(() => {

    if (editOpen) {

      document.body.style.overflow =
        "hidden";

      document.body.classList.add(
        "modal-open"
      );

    } else {

      document.body.style.overflow =
        "auto";

      document.body.classList.remove(
        "modal-open"
      );
    }

    return () => {

      document.body.style.overflow =
        "auto";

      document.body.classList.remove(
        "modal-open"
      );
    };

  }, [editOpen]);

  // =========================================
  // ALL EXERCISES
  // =========================================

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
                  })
                )
            )
        )
    );

  // =========================================
  // CATEGORY LIST
  // =========================================

  const categories = [
    ...new Set(
      allExercises.map(
        (item) =>
          item.category
      )
    ),
  ];

  // =========================================
  // LOAD HISTORY
  // =========================================
useEffect(() => {

  const history =
    JSON.parse(
      localStorage.getItem(
        historyKey
      )
    ) || [];

  // FIX OLD DATA
  const updatedHistory =
    history.map(
      (workout) => {

        const updatedExercises =
          workout.exercises.map(
            (exercise) => {

              // IF CALORIES ALREADY EXISTS
              // KEEP IT

              if (
                exercise.burnedCalories &&
                exercise.burnedCalories > 0
              ) {

                return exercise;
              }

              // OTHERWISE CALCULATE
              const burnedCalories =
                calculateCalories(
                  exercise.exercise || "",
                  Number(
                    exercise.sets || 0
                  ),
                  Number(
                    exercise.reps || 0
                  ),
                  Number(
                    exercise.weight || 0
                  ),
                  Number(
                    exercise.duration || 0
                  )
                );

              return {
                ...exercise,
                burnedCalories,
              };
            }
          );

        // TOTAL CALORIES
        const totalCalories =
          updatedExercises.reduce(
            (acc, item) =>
              acc +
              Number(
                item.burnedCalories || 0
              ),
            0
          );

        return {
          ...workout,
          exercises:
            updatedExercises,
          totalCalories,
        };
      }
    );

  // SAVE FIXED DATA
  localStorage.setItem(
    historyKey,
    JSON.stringify(
      updatedHistory
    )
  );

  setWorkouts(
    updatedHistory.reverse()
  );

}, []);

  // =========================================
  // CALCULATE CALORIES
  // =========================================

  const calculateCalories = (
    exercise,
    sets,
    reps,
    weight,
    duration
  ) => {

    const lower =
      exercise.toLowerCase();

    let calories = 0;

    if (
      lower.includes("jump") ||
      lower.includes("burpee") ||
      lower.includes("running") ||
      lower.includes("cycling") ||
      lower.includes("walk") ||
      lower.includes("cardio")
    ) {

      calories =
        duration * 10 +
        sets * 5 +
        reps * 0.8;
    }

    else if (
      lower.includes("bench") ||
      lower.includes("curl") ||
      lower.includes("deadlift") ||
      lower.includes("press") ||
      lower.includes("squat") ||
      lower.includes("pull")
    ) {

      calories =
        duration * 6 +
        weight * 0.5 +
        reps * 0.4 +
        sets * 4;
    }

    else if (
      lower.includes("yoga") ||
      lower.includes("stretch")
    ) {

      calories =
        duration * 4 +
        sets * 2;
    }

    else {

      calories =
        duration * 5 +
        sets * 3 +
        reps * 0.3 +
        weight * 0.2;
    }

    return Math.round(
      calories
    );
  };

  // =========================================
  // DELETE
  // =========================================

  const deleteWorkout =
    (id) => {

      const updated =
        workouts.filter(
          (item) =>
            item.id !== id
        );

      setWorkouts(
        updated
      );

      localStorage.setItem(
        historyKey,
        JSON.stringify(
          updated.reverse()
        )
      );
    };

  // =========================================
  // UPDATE WORKOUT
  // =========================================

  const updateWorkout =
    () => {

      const updatedExercises =
        editWorkout.exercises.map(
          (exercise) => {

            const burnedCalories =
              calculateCalories(
                exercise.exercise,
                Number(
                  exercise.sets
                ),
                Number(
                  exercise.reps
                ),
                Number(
                  exercise.weight
                ),
                Number(
                  exercise.duration
                )
              );

            return {
              ...exercise,
              burnedCalories,
            };
          }
        );

      const totalCalories =
        updatedExercises.reduce(
          (acc, item) =>
            acc +
            Number(
              item.burnedCalories || 0
            ),
          0
        );

      const finalWorkout = {
        ...editWorkout,
        exercises:
          updatedExercises,
        totalCalories,
      };

      const updated =
        workouts.map(
          (item) => {

            if (
              item.id ===
              finalWorkout.id
            ) {

              return finalWorkout;
            }

            return item;
          }
        );

      setWorkouts(updated);

      localStorage.setItem(
        historyKey,
        JSON.stringify(
          [...updated].reverse()
        )
      );

      setEditOpen(false);

      alert(
        "Workout Updated Successfully"
      );
    };

  // =========================================
  // FILTERS
  // =========================================

  const filtered =
    workouts.filter(
      (workout) => {

        const matchesSearch =
          workout.notes
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          categoryFilter === ""
            ? true
            : workout.exercises.some(
                (exercise) =>
                  exercise.category ===
                  categoryFilter
              );

        const matchesExercise =
          exerciseFilter === ""
            ? true
            : workout.exercises.some(
                (exercise) =>
                  exercise.exercise ===
                  exerciseFilter
              );

        const workoutDate =
          new Date(
            workout.date
          );

        const start =
          startDate
            ? new Date(
                startDate
              )
            : null;

        const end =
          endDate
            ? new Date(
                endDate
              )
            : null;

        const matchesDate =
          (!start ||
            workoutDate >=
              start) &&
          (!end ||
            workoutDate <=
              end);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesExercise &&
          matchesDate
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
    

      {/* HIDE SCROLLBAR */}
      <style>
        {`
          ::-webkit-scrollbar{
            width:0px;
            height:0px;
          }

          *{
            scrollbar-width:none;
          }

          .edit-scroll::-webkit-scrollbar{
            width:0px;
          }

          .edit-scroll{
            scrollbar-width:none;
          }
        `}
      </style>

      {/* HEADER */}
      <div
  className={`
  ${cardClass}
  border
  rounded-[34px]
  p-6
  mb-6
  `}
>
        <button
          onClick={() =>
            navigate("/workout")
          }
         className={`
h-12
px-5
rounded-2xl
flex
items-center
gap-2
mb-6
transition-all

${
  isDark

    ? `
    bg-white/10
    text-white
    `

    : `
    bg-white
    text-slate-800
    border border-slate-200
    shadow-md
    `
}
`}
        >

          <ArrowLeft size={18} />

          Back
        </button>

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black">
              Workout History
            </h1>

<p className={`${subText} mt-3 text-lg`}>
              Track and manage workouts
            </p>
          </div>

          <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">

            <Flame className="w-12 h-12" />

          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-7">

        {/* SEARCH */}
<div
  className={`
  h-14
  rounded-2xl
  border
  px-4
  flex
  items-center
  gap-3
  transition-all

  ${inputClass}
  `}
>
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-transparent outline-none w-full"
          />
        </div>

        {/* CATEGORY */}
        <select 
        
        style={{
          colorScheme: isDark
            ? "dark"
            : "light",
        }}
          value={categoryFilter}
          onChange={(e) => {

            setCategoryFilter(
              e.target.value
            );

            setExerciseFilter("");
          }}
  className={`
h-14
rounded-2xl
border
px-4
outline-none
transition-all
cursor-pointer

${dropdownClass}
`}
        >

          <option value="">
            All Categories
          </option>

          {categories.map(
            (
              item,
              index
            ) => (

              <option
                key={index}
                value={item}
               className={
  isDark
    ? "bg-[#111827] text-white"
    : "bg-white text-slate-800"
}
              >
                {item}
              </option>
            )
          )}
        </select>

        {/* EXERCISE */}
        <select 
                style={{
          colorScheme: isDark
            ? "dark"
            : "light",
        }}
          value={exerciseFilter}
          onChange={(e) =>
            setExerciseFilter(
              e.target.value
            )
          }
className={`
h-14
rounded-2xl
border
px-4
outline-none
transition-all
cursor-pointer

${dropdownClass}
`}
        >

          <option value="">
            All Exercises
          </option>

          {allExercises
            .filter(
              (item) =>
                categoryFilter === ""
                  ? true
                  : item.category ===
                    categoryFilter
            )
            .map(
              (
                item,
                index
              ) => (

                <option
                  key={index}
                  value={item.name}
                className={
  isDark
    ? "bg-[#111827] text-white"
    : "bg-white text-slate-800"
}
                >
                  {item.name}
                </option>
              )
            )}
        </select>

        {/* START DATE */}
        <div className={`
h-14
rounded-2xl
border
px-4
flex
items-center
gap-3

${inputClass}
`}>

          <CalendarDays
            size={18}
            className="text-pink-400"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="bg-transparent outline-none w-full"
          />
        </div>

        {/* END DATE */}
        <div
  className={`
  h-14
  rounded-2xl
  border
  px-4
  flex
  items-center
  gap-3

  ${inputClass}
  `}
>

          <CalendarDays
            size={18}
            className="text-orange-400"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* HISTORY */}
      <div className="space-y-5">

        {filtered.map(
          (
            workout,
            index
          ) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
         className={`
${cardClass}
border
rounded-[30px]
overflow-hidden
`}
            >

              {/* TOP */}
              <div className="p-6 flex justify-between items-start">

                <div>

                  <div className="flex flex-wrap gap-3 mb-4">

                    <div className="px-4 py-2 rounded-xl bg-pink-500/20 text-pink-400 font-semibold">
                      {workout.date}
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-semibold">
                      {workout.exercises.length}
                      {" "}
                      Exercises
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-orange-500/20 text-orange-400 font-semibold">
                     {
  workout.totalCalories
    ? workout.totalCalories
    : workout.exercises.reduce(
        (acc, item) =>
          acc +
          calculateCalories(
            item.exercise || "",
            Number(item.sets || 0),
            Number(item.reps || 0),
            Number(item.weight || 0),
            Number(item.duration || 0)
          ),
        0
      )
}
{" "}
kcal
                    </div>
                     <div className="px-4 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 font-semibold flex items-center gap-2">

                      {/* <Star
                        size={16}
                        className="fill-yellow-400"
                      /> */}
                   
                      {workout.rating || 0}/10

                    </div>
                
                    
                  </div>

                  <p className={`
text-lg
${subText}
`}>
                    {workout.notes}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => {

                      setEditWorkout(
                        JSON.parse(
                          JSON.stringify(
                            workout
                          )
                        )
                      );

                      setEditOpen(
                        true
                      );
                    }}
                    className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center"
                  >

                    <Pencil size={18} />

                  </button>

                  <button
                    onClick={() =>
                      deleteWorkout(
                        workout.id
                      )
                    }
                    className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center"
                  >

                    <Trash2 size={18} />

                  </button>

                  <button
                    onClick={() =>
                      setExpanded(
                        expanded ===
                          workout.id
                          ? null
                          : workout.id
                      )
                    }
                  className={`
w-12
h-12
rounded-2xl
flex
items-center
justify-center

${
  isDark
    ? "bg-white/10"
    : "bg-slate-100 text-slate-700"
}
`}
                  >

                    {expanded ===
                    workout.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                </div>
              </div>
{/* DETAILS */}
{expanded === workout.id && (

  <div
    className={`
    border-t
    px-5
    py-5

    ${
      isDark
        ? "border-white/10"
        : "border-slate-200"
    }
    `}
  >

    <div className="max-w-4xl">

      {workout.exercises.map(
        (
          exercise,
          i
        ) => (

          <div
            key={i}
            className={`
            rounded-[24px]
            border
            p-5
            transition-all

            ${
              isDark

                ? `
                bg-white/[0.04]
                border-white/10
                `

                : `
                bg-white
                border-slate-200
                shadow-[0_6px_20px_rgba(15,23,42,0.05)]
                `
            }
            `}
          >

            {/* TOP */}
            <div className="flex items-start justify-between mb-5">

              <div>

                <h2
                  className={`
                  text-2xl
                  font-black

                  ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }
                  `}
                >
                  {exercise.exercise}
                </h2>

                <p
                  className={`
                  mt-1
                  text-sm

                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                  `}
                >
                  Exercise Details
                </p>

              </div>

              <div className="
              w-12
              h-12
              rounded-2xl
              bg-orange-500/10
              flex
              items-center
              justify-center
              ">

                <Flame
                  className="
                  w-6
                  h-6
                  text-orange-400
                  "
                />

              </div>

            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              {[
                {
                  label: "Category",
                  value: exercise.category,
                },
                {
                  label: "Sets",
                  value: exercise.sets,
                },
                {
                  label: "Reps",
                  value: exercise.reps,
                },
                {
                  label: "Weight",
                  value: `${exercise.weight} kg`,
                },
                {
                  label: "Duration",
                  value: `${exercise.duration} min`,
                },
              ].map((item, idx) => (

                <div
                  key={idx}
                  className={`
                  rounded-2xl
                  border
                  px-4
                  py-3

                  ${
                    isDark

                      ? `
                      bg-white/[0.03]
                      border-white/10
                      `

                      : `
                      bg-slate-50
                      border-slate-200
                      `
                  }
                  `}
                >

                  <p
                    className={`
                    text-xs
                    mb-1

                    ${
                      isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                    `}
                  >
                    {item.label}
                  </p>

                  <h3
                    className={`
                    text-base
                    font-bold

                    ${
                      isDark
                        ? "text-white"
                        : "text-slate-900"
                    }
                    `}
                  >
                    {item.value}
                  </h3>

                </div>
              ))}

              {/* CALORIES */}
              <div
                className="
                rounded-2xl
                border
                border-orange-500/20
                bg-orange-500/10
                px-4
                py-3
                flex
                flex-col
                justify-center
                "
              >

                <p className="text-xs text-orange-400 mb-1">
                  Burned Calories
                </p>

                <h2 className="
                text-2xl
                font-black
                text-orange-500
                ">
                  {
                    exercise.burnedCalories
                      ? exercise.burnedCalories
                      : calculateCalories(
                          exercise.exercise || "",
                          Number(exercise.sets || 0),
                          Number(exercise.reps || 0),
                          Number(exercise.weight || 0),
                          Number(exercise.duration || 0)
                        )
                  } kcal
                </h2>

              </div>

            </div>

          </div>
        )
      )}

    </div>

  </div>
)}
  
            </motion.div>
          )
        )}
      </div>

   {/* EDIT MODAL */}
{editOpen && editWorkout && (

<div
  className="
  fixed
  inset-0
  z-[99999]
  bg-black/70
  backdrop-blur-md
  overflow-y-auto
  overflow-x-hidden
  flex
  justify-center
  items-start
  py-10
  px-4
  "
>

  <motion.div
    initial={{
      opacity: 0,
      scale: 0.96,
      y: 20,
    }}
    animate={{
      opacity: 1,
      scale: 1,
      y: 0,
    }}
    transition={{
      duration: 0.25,
    }}
    className={`
    relative
    w-full
    max-w-6xl
    rounded-[36px]
    border
    p-6
    overflow-hidden

    ${
      isDark

        ? `
        bg-[#0B1120]
        border-white/10
        text-white
        shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        `

        : `
        bg-[#fcfcff]
        border-[#e2e8f0]
        text-slate-900
        shadow-[0_20px_70px_rgba(15,23,42,0.12)]
        `
    }
    `}
  >

    {/* CLOSE */}
    <button
      onClick={() =>
        setEditOpen(false)
      }
      className="
      absolute
      top-5
      right-5
      w-12
      h-12
      rounded-2xl
      bg-red-500/10
      text-red-400
      flex
      items-center
      justify-center
      hover:scale-105
      transition-all
      "
    >
      <X />
    </button>

    {/* TITLE */}
    <h1 className="text-4xl font-black mb-8">
      Edit Workout
    </h1>

    {/* EXERCISES */}
    <div className="space-y-6">

      {editWorkout.exercises.map(
        (
          exercise,
          index
        ) => {

          const categoryExercises =
            allExercises.filter(
              (item) =>
                item.category ===
                exercise.category
            );

          return (

            <div
              key={index}
              className={`
              border
              rounded-[30px]
              p-6

              ${
                isDark

                  ? `
                  bg-white/[0.04]
                  border-white/10
                  `

                  : `
                  bg-white
                  border-slate-200
                  shadow-sm
                  `
              }
              `}
            >

              <h2 className="text-2xl font-bold mb-6">
                Exercise {index + 1}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* CATEGORY */}
                <div>
                  <label
                    className={`
                    text-sm
                    mb-2
                    block
                    ${
                      isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                    `}
                  >
                    Workout Category
                  </label>

                  <select
                    style={{
                      colorScheme:
                        isDark
                          ? "dark"
                          : "light",
                    }}
                    value={
                      exercise.category
                    }
                    onChange={(e) => {

                      const updated =
                        [...editWorkout.exercises];

                      updated[index].category =
                        e.target.value;

                      updated[index].exercise =
                        "";

                      setEditWorkout({
                        ...editWorkout,
                        exercises:
                          updated,
                      });
                    }}
                    className={`
                    h-14
                    rounded-2xl
                    border
                    px-4
                    outline-none
                    w-full
                    cursor-pointer
                    transition-all

                    ${
                      isDark

                        ? `
                        bg-[#111827]
                        border-white/10
                        text-white
                        `

                        : `
                        bg-white
                        border-slate-200
                        text-slate-800
                        shadow-sm
                        `
                    }
                    `}
                  >

                    {categories.map(
                      (
                        item,
                        i
                      ) => (

                        <option
                          key={i}
                          value={item}
                          className={
                            isDark
                              ? "bg-[#111827] text-white"
                              : "bg-white text-slate-800"
                          }
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>
                </div>

                {/* EXERCISE */}
                <div>
                  <label
                    className={`
                    text-sm
                    mb-2
                    block
                    ${
                      isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                    `}
                  >
                    Exercise Name
                  </label>

                  <select
                    style={{
                      colorScheme:
                        isDark
                          ? "dark"
                          : "light",
                    }}
                    value={
                      exercise.exercise
                    }
                    onChange={(e) => {

                      const updated =
                        [...editWorkout.exercises];

                      updated[index].exercise =
                        e.target.value;

                      setEditWorkout({
                        ...editWorkout,
                        exercises:
                          updated,
                      });
                    }}
                    className={`
                    h-14
                    rounded-2xl
                    border
                    px-4
                    outline-none
                    w-full
                    cursor-pointer
                    transition-all

                    ${
                      isDark

                        ? `
                        bg-[#111827]
                        border-white/10
                        text-white
                        `

                        : `
                        bg-white
                        border-slate-200
                        text-slate-800
                        shadow-sm
                        `
                    }
                    `}
                  >

                    {categoryExercises.map(
                      (
                        item,
                        i
                      ) => (

                        <option
                          key={i}
                          value={item.name}
                          className={
                            isDark
                              ? "bg-[#111827] text-white"
                              : "bg-white text-slate-800"
                          }
                        >
                          {item.name}
                        </option>
                      )
                    )}

                  </select>
                </div>

                {/* INPUTS */}
                {[
                  {
                    label: "Sets",
                    key: "sets",
                  },
                  {
                    label: "Reps",
                    key: "reps",
                  },
                  {
                    label: "Weight Lifted (kg)",
                    key: "weight",
                  },
                  {
                    label: "Duration (minutes)",
                    key: "duration",
                  },
                ].map((field, i) => (

                  <div key={i}>

                    <label
                      className={`
                      text-sm
                      mb-2
                      block
                      ${
                        isDark
                          ? "text-slate-400"
                          : "text-slate-500"
                      }
                      `}
                    >
                      {field.label}
                    </label>

                    <input
                      type="number"
                      value={
                        exercise[field.key]
                      }
                      onChange={(e) => {

                        const updated =
                          [...editWorkout.exercises];

                        updated[index][field.key] =
                          e.target.value;

                        setEditWorkout({
                          ...editWorkout,
                          exercises:
                            updated,
                        });
                      }}
                      className={`
                      h-14
                      rounded-2xl
                      border
                      px-4
                      outline-none
                      w-full
                      transition-all

                      ${
                        isDark

                          ? `
                          bg-white/5
                          border-white/10
                          text-white
                          `

                          : `
                          bg-white
                          border-slate-200
                          text-slate-800
                          shadow-sm
                          `
                      }
                      `}
                    />

                  </div>
                ))}

                {/* CALORIES */}
                <div className="md:col-span-2">

                  <div className="
                  h-20
                  rounded-2xl
                  bg-orange-500/10
                  border
                  border-orange-500/20
                  px-5
                  flex
                  items-center
                  justify-between
                  ">

                    <div>

                      <p className="text-orange-300 text-sm">
                        Updated Burned Calories
                      </p>

                      <h2 className="text-3xl font-black text-orange-400">
                        {
                          calculateCalories(
                            exercise.exercise,
                            Number(exercise.sets),
                            Number(exercise.reps),
                            Number(exercise.weight),
                            Number(exercise.duration)
                          )
                        } kcal
                      </h2>

                    </div>

                    <Flame className="
                    text-orange-400
                    w-10
                    h-10
                    " />

                  </div>

                </div>

              </div>

            </div>
          );
        }
      )}
    </div>

    {/* NOTES + RATING */}
    <div className="
    mt-8
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-6
    ">

      {/* NOTES */}
      <div
        className={`
        rounded-[30px]
        border
        p-6

        ${
          isDark

            ? `
            bg-white/[0.04]
            border-white/10
            `

            : `
            bg-white
            border-slate-200
            shadow-sm
            `
        }
        `}
      >

        <h2 className="text-2xl font-bold mb-5">
          Workout Notes
        </h2>

        <textarea
          value={
            editWorkout.notes || ""
          }
          onChange={(e) =>
            setEditWorkout({
              ...editWorkout,
              notes:
                e.target.value,
            })
          }
          placeholder="
          Write your workout experience,
          progress,
          strength improvements,
          energy levels,
          or gym notes...
          "
          className={`
          w-full
          h-48
          rounded-2xl
          border
          p-5
          outline-none
          resize-none
          transition-all

          ${
            isDark

              ? `
              bg-white/5
              border-white/10
              text-white
              placeholder:text-slate-500
              `

              : `
              bg-white
              border-slate-200
              text-slate-800
              placeholder:text-slate-400
              `
          }
          `}
        />

      </div>

      {/* RATING */}
      <div
        className={`
        rounded-[30px]
        p-6
        border

        ${
          isDark

            ? `
            bg-yellow-500/10
            border-yellow-500/20
            `

            : `
            bg-[#fff8e7]
            border-yellow-200
            `
        }
        `}
      >

        <div className="
        flex
        items-center
        justify-between
        mb-6
        ">

          <div>

            <p className="
            text-yellow-400
            text-sm
            ">
              Workout Rating
            </p>

            <h2 className="
            text-4xl
            font-black
            text-yellow-500
            mt-2
            ">
              {editWorkout.rating || 0}/10
            </h2>

          </div>

          <div className="
          w-20
          h-20
          rounded-[24px]
          bg-yellow-500/20
          flex
          items-center
          justify-center
          ">

            <Flame className="
            text-yellow-400
            w-10
            h-10
            " />

          </div>
        </div>

        {/* SLIDER */}
        <input
          type="range"
          min="1"
          max="10"
          value={
            editWorkout.rating || 1
          }
          onChange={(e) =>
            setEditWorkout({
              ...editWorkout,
              rating:
                Number(
                  e.target.value
                ),
            })
          }
          className="
          w-full
          accent-yellow-400
          cursor-pointer
          "
        />

        {/* NUMBERS */}
        <div className="
        flex
        justify-between
        mt-4
        text-sm
        text-yellow-400
        ">

          {[1,2,3,4,5,6,7,8,9,10].map(
            (num) => (
              <span key={num}>
                {num}
              </span>
            )
          )}

        </div>

        {/* STATUS */}
        <div
          className={`
          mt-6
          rounded-2xl
          p-4

          ${
            isDark
              ? "bg-black/20"
              : "bg-yellow-100"
          }
          `}
        >

          <p
            className={`
            text-sm

            ${
              isDark
                ? "text-slate-300"
                : "text-slate-700"
            }
            `}
          >

            {
              editWorkout.rating >= 9
                ? "🔥 Excellent workout session"
                : editWorkout.rating >= 7
                ? "💪 Strong performance today"
                : editWorkout.rating >= 5
                ? "⚡ Balanced workout session"
                : "🙂 Keep improving consistently"
            }

          </p>

        </div>

      </div>

    </div>

    {/* SAVE */}
    <button
      onClick={updateWorkout}
      className={`
      mt-8
      w-full
      h-16
      rounded-[24px]
      text-xl
      font-bold
      transition-all
      duration-300
      hover:scale-[1.01]

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
          from-pink-300
          to-orange-300
          text-slate-900
          shadow-lg
          `
      }
      `}
    >
      Save Updated Workout
    </button>

  </motion.div>

</div>
)}
    </div>
  );
};

export default WorkoutHistoryPage;