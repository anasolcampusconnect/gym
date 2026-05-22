// src/pages/WorkoutPlansPage.jsx

import {
  ArrowLeft,
  Plus,
  Trash2,
  CalendarDays,
  Dumbbell,
  Save,
} from "lucide-react";

import {
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

const WorkoutPlansPage = () => {

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

  const storageKey =
    `workout_routines_${currentUser?.email || "guest"}`;

  // =========================================
  // THEME
  // =========================================

  const settings =
    JSON.parse(
      localStorage.getItem(
        `gym_settings_${currentUser?.email || "guest"}`
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
      bg-white/[0.05]
      border-white/10
      `

      : `
      bg-white/80
      border-white/70
      backdrop-blur-xl
      shadow-[0_8px_30px_rgba(15,23,42,0.06)]
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
  // STATES
  // =========================================

  const [
    routines,
    setRoutines,
  ] = useState([]);

  const [
    routineName,
    setRoutineName,
  ] = useState("");

  const [
    selectedDay,
    setSelectedDay,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [
    exerciseName,
    setExerciseName,
  ] = useState("");

  const [
    sets,
    setSets,
  ] = useState("");

  const [
    reps,
    setReps,
  ] = useState("");

  const [
    weight,
    setWeight,
  ] = useState("");

  const [
    duration,
    setDuration,
  ] = useState("");

  const [
    exercises,
    setExercises,
  ] = useState([]);

  // =========================================
  // LOAD ROUTINES
  // =========================================

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(
          storageKey
        )
      ) || [];

    setRoutines(
      stored
    );

  }, []);

  // =========================================
  // FILTER EXERCISES
  // =========================================

  const filteredExercises =
    allExercises.filter(
      (item) =>
        selectedCategory === ""
          ? true
          : item.category ===
            selectedCategory
    );

  // =========================================
  // ADD EXERCISE
  // =========================================

  const addExercise =
    () => {

      if (
        !selectedCategory ||
        !exerciseName ||
        !sets ||
        !reps ||
        !weight ||
        !duration
      ) {

        alert(
          "Fill all exercise details"
        );

        return;
      }

      setExercises([
        ...exercises,
        {
          category:
            selectedCategory,
          name:
            exerciseName,
          sets,
          reps,
          weight,
          duration,
        },
      ]);

      setSelectedCategory("");
      setExerciseName("");
      setSets("");
      setReps("");
      setWeight("");
      setDuration("");
    };

  // =========================================
  // SAVE ROUTINE
  // =========================================

  const saveRoutine =
    () => {

      if (
        !routineName ||
        !selectedDay ||
        exercises.length === 0
      ) {

        alert(
          "Fill all details"
        );

        return;
      }

      const newRoutine = {
        id: Date.now(),
        name:
          routineName,
        day:
          selectedDay,
        exercises,
      };

      const updated = [
        ...routines,
        newRoutine,
      ];

      setRoutines(
        updated
      );

      localStorage.setItem(
        storageKey,
        JSON.stringify(
          updated
        )
      );

      setRoutineName("");
      setSelectedDay("");
      setExercises([]);

      alert(
        "Routine Saved Successfully"
      );
    };

  // =========================================
  // DELETE
  // =========================================

  const deleteRoutine =
    (id) => {

      const updated =
        routines.filter(
          (item) =>
            item.id !== id
        );

      setRoutines(
        updated
      );

      localStorage.setItem(
        storageKey,
        JSON.stringify(
          updated
        )
      );
    };

  // =========================================
  // LOAD ROUTINE
  // =========================================

  const loadRoutine =
    (routine) => {

      localStorage.setItem(
        "loaded_routine",
        JSON.stringify(
          routine
        )
      );

      navigate(
        "/log-workout"
      );
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

      {/* SCROLLBAR */}
      <style>
        {`
          ::-webkit-scrollbar{
            width:0px;
            height:0px;
          }

          *{
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
        mb-8

        flex
        flex-col
        lg:flex-row
        justify-between
        lg:items-center
        gap-5
        `}
      >

        <div>

          <h1 className="
          text-4xl
          lg:text-5xl
          font-black
          ">
            Workout Plans
          </h1>

          <p className={`${subText} mt-2`}>
            Create personalized workout routines
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/workout")
          }
          className={`
          h-14
          px-6
          rounded-2xl
          font-bold
          flex
          items-center
          gap-3
          transition-all

          ${
            isDark

              ? `
              bg-gradient-to-r
              from-pink-500
              to-orange-500
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

          <ArrowLeft />

          Back
        </button>
      </div>

      {/* MAIN */}

      <div className="
      grid
      grid-cols-1
      xl:grid-cols-3
      gap-6
      ">

        {/* CREATE */}

        <div
          className={`
          xl:col-span-1
          ${cardClass}
          border
          rounded-[32px]
          p-6
          `}
        >

          <h2 className="
          text-3xl
          font-black
          mb-6
          ">
            Create Routine
          </h2>

          {/* ROUTINE NAME */}

          <input
            type="text"
            placeholder="Routine Name"
            value={routineName}
            onChange={(e) =>
              setRoutineName(
                e.target.value
              )
            }
            className={`
            w-full
            h-14
            rounded-2xl
            border
            px-4
            outline-none
            mb-4
            transition-all

            ${inputClass}
            `}
          />

          {/* DAY */}

          <select
            style={{
              colorScheme:
                isDark
                  ? "dark"
                  : "light",
            }}
            value={selectedDay}
            onChange={(e) =>
              setSelectedDay(
                e.target.value
              )
            }
            className={`
            w-full
            h-14
            rounded-2xl
            border
            px-4
            outline-none
            mb-4
            transition-all
            cursor-pointer

            ${dropdownClass}
            `}
          >

            <option value="">
              Select Day
            </option>

            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (

              <option
                key={day}
                value={day}
                className={
                  isDark
                    ? "bg-[#111827]"
                    : "bg-white"
                }
              >
                {day}
              </option>
            ))}
          </select>

          {/* CATEGORY */}

          <select
            style={{
              colorScheme:
                isDark
                  ? "dark"
                  : "light",
            }}
            value={selectedCategory}
            onChange={(e) => {

              setSelectedCategory(
                e.target.value
              );

              setExerciseName("");
            }}
            className={`
            w-full
            h-14
            rounded-2xl
            border
            px-4
            outline-none
            mb-4
            transition-all
            cursor-pointer

            ${dropdownClass}
            `}
          >

            <option value="">
              Select Category
            </option>

            {categories.map(
              (
                category,
                index
              ) => (

                <option
                  key={index}
                  value={category}
                  className={
                    isDark
                      ? "bg-[#111827]"
                      : "bg-white"
                  }
                >
                  {category}
                </option>
              )
            )}
          </select>

          {/* EXERCISE */}

          <select
            style={{
              colorScheme:
                isDark
                  ? "dark"
                  : "light",
            }}
            value={exerciseName}
            onChange={(e) =>
              setExerciseName(
                e.target.value
              )
            }
            className={`
            w-full
            h-14
            rounded-2xl
            border
            px-4
            outline-none
            mb-4
            transition-all
            cursor-pointer

            ${dropdownClass}
            `}
          >

            <option value="">
              Select Exercise
            </option>

            {filteredExercises.map(
              (
                item,
                index
              ) => (

                <option
                  key={index}
                  value={item.name}
                  className={
                    isDark
                      ? "bg-[#111827]"
                      : "bg-white"
                  }
                >
                  {item.name}
                </option>
              )
            )}
          </select>

          {/* INPUTS */}

          <div className="
          grid
          grid-cols-2
          gap-4
          ">

            {[
              {
                placeholder: "Sets",
                value: sets,
                setter: setSets,
              },
              {
                placeholder: "Reps",
                value: reps,
                setter: setReps,
              },
              {
                placeholder: "Weight (kg)",
                value: weight,
                setter: setWeight,
              },
              {
                placeholder: "Duration (min)",
                value: duration,
                setter: setDuration,
              },
            ].map((item, index) => (

              <input
                key={index}
                type="number"
                placeholder={
                  item.placeholder
                }
                value={item.value}
                onChange={(e) =>
                  item.setter(
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

                ${inputClass}
                `}
              />
            ))}
          </div>

          {/* ADD BUTTON */}

          <button
            onClick={addExercise}
            className={`
            w-full
            h-14
            rounded-2xl
            font-bold
            mt-6
            flex
            items-center
            justify-center
            gap-2
            transition-all

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

            <Plus />

            Add Exercise
          </button>

          {/* EXERCISE LIST */}

          <div className="
          space-y-4
          mt-6
          ">

            {exercises.map(
              (
                exercise,
                index
              ) => (

                <div
                  key={index}
                  className={`
                  border
                  rounded-2xl
                  p-4

                  ${
                    isDark

                      ? `
                      bg-white/5
                      border-white/10
                      `

                      : `
                      bg-slate-50
                      border-slate-200
                      `
                  }
                  `}
                >

                  <h3 className="
                  text-lg
                  font-bold
                  ">
                    {exercise.name}
                  </h3>

                  <p
                    className={`
                    mt-1

                    ${
                      isDark
                        ? "text-cyan-400"
                        : "text-cyan-600"
                    }
                    `}
                  >
                    {exercise.category}
                  </p>

                  <div
                    className={`
                    grid
                    grid-cols-2
                    gap-3
                    mt-4
                    text-sm

                    ${
                      isDark
                        ? "text-slate-300"
                        : "text-slate-600"
                    }
                    `}
                  >

                    <p>
                      Sets: {exercise.sets}
                    </p>

                    <p>
                      Reps: {exercise.reps}
                    </p>

                    <p>
                      Weight: {exercise.weight}kg
                    </p>

                    <p>
                      Duration: {exercise.duration}min
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* SAVE */}

          <button
            onClick={saveRoutine}
            className={`
            w-full
            h-14
            rounded-2xl
            font-bold
            mt-6
            flex
            items-center
            justify-center
            gap-2
            transition-all

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

            <Save />

            Save Routine
          </button>
        </div>

        {/* SAVED ROUTINES */}

        <div className="
        xl:col-span-2
        space-y-6
        ">

          <div
            className={`
            ${cardClass}
            border
            rounded-[32px]
            p-6
            `}
          >

            <h2 className="
            text-3xl
            font-black
            mb-6
            ">
              Saved Routines
            </h2>

            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            ">

              {routines.map(
                (routine) => (

                  <motion.div
                    key={routine.id}
                    whileHover={{
                      y: -5,
                    }}
                    className={`
                    border
                    rounded-[28px]
                    p-6

                    ${
                      isDark

                        ? `
                        bg-white/5
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

                    <div className="
                    flex
                    justify-between
                    items-start
                    ">

                      <div>

                        <h3 className="
                        text-2xl
                        font-black
                        ">
                          {routine.name}
                        </h3>

                        <p
                          className={`
                          mt-2
                          flex
                          items-center
                          gap-2

                          ${
                            isDark
                              ? "text-cyan-400"
                              : "text-cyan-600"
                          }
                          `}
                        >

                          <CalendarDays size={18} />

                          {routine.day}
                        </p>
                      </div>
<div
  className={`
  w-14
  h-14
  rounded-2xl
  flex
  items-center
  justify-center
  shadow-md

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
      from-pink-100
      to-orange-100
      text-orange-500
      border border-orange-200
      `
  }
  `}
>

  <Dumbbell className="w-6 h-6" />

</div>
                    </div>

                    {/* EXERCISES */}

                    <div className="
                    space-y-3
                    mt-6
                    ">

                      {routine.exercises.map(
                        (
                          exercise,
                          index
                        ) => (

                          <div
                            key={index}
                            className={`
                            rounded-2xl
                            p-4
                            border

                            ${
                              isDark

                                ? `
                                bg-white/5
                                border-white/10
                                `

                                : `
                                bg-slate-50
                                border-slate-200
                                `
                            }
                            `}
                          >

                            <h4 className="
                            font-bold
                            ">
                              {exercise.name}
                            </h4>

                            <p
                              className={`
                              text-sm
                              mt-1

                              ${
                                isDark
                                  ? "text-cyan-400"
                                  : "text-cyan-600"
                              }
                              `}
                            >
                              {exercise.category}
                            </p>

                            <div
                              className={`
                              grid
                              grid-cols-2
                              gap-2
                              mt-3
                              text-sm

                              ${
                                isDark
                                  ? "text-slate-300"
                                  : "text-slate-600"
                              }
                              `}
                            >

                              <p>
                                Sets: {exercise.sets}
                              </p>

                              <p>
                                Reps: {exercise.reps}
                              </p>

                              <p>
                                Weight: {exercise.weight}kg
                              </p>

                              <p>
                                Duration: {exercise.duration}min
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* ACTIONS */}

                    <div className="
                    grid
                    grid-cols-2
                    gap-3
                    mt-6
                    ">

                      <button
                        onClick={() =>
                          loadRoutine(
                            routine
                          )
                        }
                        className={`
                        h-12
                        rounded-2xl
                        font-bold
                        transition-all

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
                        Load
                      </button>

                      <button
                        onClick={() =>
                          deleteRoutine(
                            routine.id
                          )
                        }
                        className={`
                        h-12
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        transition-all

                        ${
                          isDark

                            ? `
                            bg-gradient-to-r
                            from-red-500
                            to-pink-500
                            text-white
                            `

                            : `
                            bg-gradient-to-r
                            from-red-200
                            to-pink-200
                            text-slate-900
                            shadow-md
                            `
                        }
                        `}
                      >

                        <Trash2 size={18} />

                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlansPage;