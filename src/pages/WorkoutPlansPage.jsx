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

import { motion } from "framer-motion";

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

    <div className="
    min-h-screen
    bg-gradient-to-br
    from-[#0f172a]
    via-[#111827]
    to-[#1e1b4b]
    text-white
    p-5
    pb-32
    overflow-x-hidden
    ">

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
        `}
      </style>

      {/* HEADER */}
      <div className="
      flex
      flex-col
      lg:flex-row
      justify-between
      lg:items-center
      gap-5
      mb-8
      ">

        <div>

          <h1 className="
          text-4xl
          lg:text-5xl
          font-black
          ">
            Workout Plans
          </h1>

          <p className="
          text-slate-400
          mt-2
          ">
            Create personalized workout routines
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/workout")
          }
          className="
          h-14
          px-6
          rounded-2xl
          bg-gradient-to-r
          from-pink-500
          to-orange-500
          font-bold
          flex
          items-center
          gap-3
          "
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
        <div className="
        xl:col-span-1
        bg-white/5
        border
        border-white/10
        rounded-[32px]
        p-6
        ">

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
            className="
            w-full
            h-14
            rounded-2xl
            bg-white/10
            border
            border-white/10
            px-4
            outline-none
            mb-4
            "
          />

          {/* DAY */}
          <select
            value={selectedDay}
            onChange={(e) =>
              setSelectedDay(
                e.target.value
              )
            }
            className="
            w-full
            h-14
            rounded-2xl
            bg-white/10
            border
            border-white/10
            px-4
            outline-none
            mb-4
            "
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
                className="bg-[#111827]"
              >
                {day}
              </option>
            ))}
          </select>

          {/* CATEGORY */}
          <select
            value={selectedCategory}
            onChange={(e) => {

              setSelectedCategory(
                e.target.value
              );

              setExerciseName("");
            }}
            className="
            w-full
            h-14
            rounded-2xl
            bg-white/10
            border
            border-white/10
            px-4
            outline-none
            mb-4
            "
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
                  className="bg-[#111827]"
                >
                  {category}
                </option>
              )
            )}
          </select>

          {/* EXERCISE */}
          <select
            value={exerciseName}
            onChange={(e) =>
              setExerciseName(
                e.target.value
              )
            }
            className="
            w-full
            h-14
            rounded-2xl
            bg-white/10
            border
            border-white/10
            px-4
            outline-none
            mb-4
            "
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
                  className="bg-[#111827]"
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

            <input
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) =>
                setSets(
                  e.target.value
                )
              }
              className="
              h-14
              rounded-2xl
              bg-white/10
              border
              border-white/10
              px-4
              outline-none
              "
            />

            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) =>
                setReps(
                  e.target.value
                )
              }
              className="
              h-14
              rounded-2xl
              bg-white/10
              border
              border-white/10
              px-4
              outline-none
              "
            />

            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) =>
                setWeight(
                  e.target.value
                )
              }
              className="
              h-14
              rounded-2xl
              bg-white/10
              border
              border-white/10
              px-4
              outline-none
              "
            />

            <input
              type="number"
              placeholder="Duration (min)"
              value={duration}
              onChange={(e) =>
                setDuration(
                  e.target.value
                )
              }
              className="
              h-14
              rounded-2xl
              bg-white/10
              border
              border-white/10
              px-4
              outline-none
              "
            />
          </div>

          {/* ADD */}
          <button
            onClick={addExercise}
            className="
            w-full
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            font-bold
            mt-6
            flex
            items-center
            justify-center
            gap-2
            "
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
                  className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                  "
                >

                  <h3 className="
                  text-lg
                  font-bold
                  ">
                    {exercise.name}
                  </h3>

                  <p className="
                  text-cyan-400
                  mt-1
                  ">
                    {exercise.category}
                  </p>

                  <div className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-4
                  text-sm
                  text-slate-300
                  ">

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
            className="
            w-full
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-orange-500
            font-bold
            mt-6
            flex
            items-center
            justify-center
            gap-2
            "
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

          <div className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          p-6
          ">

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
                    className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-[28px]
                    p-6
                    "
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

                        <p className="
                        text-cyan-400
                        mt-2
                        flex
                        items-center
                        gap-2
                        ">

                          <CalendarDays size={18} />

                          {routine.day}
                        </p>
                      </div>

                      <div className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-r
                      from-pink-500
                      to-orange-500
                      flex
                      items-center
                      justify-center
                      ">

                        <Dumbbell />

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
                            className="
                            bg-white/5
                            rounded-2xl
                            p-4
                            "
                          >

                            <h4 className="
                            font-bold
                            ">
                              {exercise.name}
                            </h4>

                            <p className="
                            text-cyan-400
                            text-sm
                            mt-1
                            ">
                              {exercise.category}
                            </p>

                            <div className="
                            grid
                            grid-cols-2
                            gap-2
                            mt-3
                            text-sm
                            text-slate-300
                            ">

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
                        className="
                        h-12
                        rounded-2xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-500
                        font-bold
                        "
                      >
                        Load
                      </button>

                      <button
                        onClick={() =>
                          deleteRoutine(
                            routine.id
                          )
                        }
                        className="
                        h-12
                        rounded-2xl
                        bg-gradient-to-r
                        from-red-500
                        to-pink-500
                        flex
                        items-center
                        justify-center
                        "
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