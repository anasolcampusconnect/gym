// src/pages/LogWorkoutPage.jsx

import {
  ArrowLeft,
  Calendar,
  Dumbbell,
  Plus,
  Save,
  Trash2,
  Flame,
  Activity,
  Bell,
  AlertTriangle,
  CheckCircle2,
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

const LogWorkoutPage = () => {

  const navigate =
    useNavigate();

  // =====================================================
  // USER
  // =====================================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    );

  const userId =
    currentUser?.email ||
    "guest";

  const historyKey =
    `workout_history_${userId}`;

  // =====================================================
  // THEME
  // =====================================================

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
  

  // =====================================================
  // THEME CLASSES
  // =====================================================

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

  const inputClass =
    isDark

      ? `
      bg-white/10
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

  // =====================================================
  // EXERCISES
  // =====================================================

  const allExercises =
    workoutModes.flatMap(
      (mode) =>
        mode.categories.flatMap(
          (category) =>
            category.subcategories.flatMap(
              (sub) =>
                sub.exercises.map(
                  (exercise) => ({
                    ...exercise,
                    category:
                      category.name,
                    level:
                      sub.level,
                    mode:
                      mode.title,
                  })
                )
            )
        )
    );

  const categories =
    [
      ...new Set(
        allExercises.map(
          (item) =>
            item.category
        )
      ),
    ];

  // =====================================================
  // STATES
  // =====================================================

  const [
    workoutDate,
    setWorkoutDate,
  ] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  const [
    notes,
    setNotes,
  ] = useState("");

  const [
    rating,
    setRating,
  ] = useState(5);

  const [
    success,
    setSuccess,
  ] = useState(false);

  const [
    notification,
    setNotification,
  ] = useState(null);

  const [
    totalCalories,
    setTotalCalories,
  ] = useState(null);

  const [
    workoutStatus,
    setWorkoutStatus,
  ] = useState(null);

  const [
    workoutExercises,
    setWorkoutExercises,
  ] = useState([]);

  // =====================================================
  // LOAD ROUTINE
  // =====================================================

  useEffect(() => {

    const loadedRoutine =
      JSON.parse(
        localStorage.getItem(
          "loaded_routine"
        )
      );

    if (!loadedRoutine) {
      return;
    }

    const formattedExercises =
      loadedRoutine.exercises.map(
        (exercise) => ({

          id:
            Date.now() +
            Math.random(),

          category:
            exercise.category || "",

          exercise:
            exercise.name || "",

          sets:
            exercise.sets || "",

          reps:
            exercise.reps || "",

          weight:
            exercise.weight || "",

          duration:
            exercise.duration || "",
        })
      );

    setWorkoutExercises(
      formattedExercises
    );

    localStorage.removeItem(
      "loaded_routine"
    );

  }, []);

  // =====================================================
  // CALCULATE
  // =====================================================

  useEffect(() => {

    if (
      workoutExercises.length === 0
    ) {

      setTotalCalories(null);

      setWorkoutStatus(null);

      setNotification(null);

      return;
    }

    let burned = 0;

    let required = 0;

    workoutExercises.forEach(
      (item) => {

        if (
          !item.exercise
        ) {
          return;
        }

        const found =
          allExercises.find(
            (exercise) =>
              exercise.name ===
              item.exercise
          );

        const actual =
          found
            ? parseInt(
                found.calories
              )
            : 0;

        required += actual;

        const calculated =
          (
            Number(
              item.sets || 0
            ) *
            Number(
              item.reps || 0
            ) *
            0.6
          ) +

          (
            Number(
              item.weight || 0
            ) * 0.25
          ) +

          (
            Number(
              item.duration || 0
            ) * 4
          );

        burned +=
          Math.round(
            calculated
          );
      }
    );

    setTotalCalories(
      burned
    );

    if (
      burned >
      required + 80
    ) {

      setWorkoutStatus(
        "Overtrained"
      );

      setNotification({
        type: "danger",

        message:
          "Workout intensity is too high. Take recovery and hydration.",
      });

    } else if (
      burned >=
        required - 40 &&
      burned <=
        required + 80
    ) {

      setWorkoutStatus(
        "Balanced"
      );

      setNotification({
        type: "success",

        message:
          "Perfect training intensity maintained.",
      });

    } else {

      setWorkoutStatus(
        "Undergym"
      );

      setNotification({
        type: "warning",

        message:
          "Workout intensity is low. Increase reps or duration.",
      });
    }

  }, [workoutExercises]);

  // =====================================================
  // ADD EXERCISE
  // =====================================================

  const addExercise =
    () => {

      const firstCategory =
        categories[0];

      const firstExercise =
        allExercises.find(
          (item) =>
            item.category ===
            firstCategory
        );

      setWorkoutExercises([
        ...workoutExercises,

        {
          id: Date.now(),

          category:
            firstCategory || "",

          exercise:
            firstExercise?.name ||
            "",

          sets: "",

          reps: "",

          weight: "",

          duration: "",
        },
      ]);
    };

  // =====================================================
  // REMOVE
  // =====================================================

  const removeExercise =
    (id) => {

      setWorkoutExercises(
        workoutExercises.filter(
          (item) =>
            item.id !== id
        )
      );
    };

  // =====================================================
  // CHANGE
  // =====================================================

  const changeExercise =
    (
      index,
      field,
      value
    ) => {

      const updated =
        [...workoutExercises];

      updated[index][field] =
        value;

      if (
        field ===
        "category"
      ) {

        const firstExercise =
          allExercises.find(
            (item) =>
              item.category ===
              value
          );

        updated[index]
          .exercise =
          firstExercise?.name ||
          "";
      }

      setWorkoutExercises(
        updated
      );
    };

  // =====================================================
  // SAVE
  // =====================================================

const saveWorkout = () => {

  if (workoutExercises.length === 0) {

    setNotification({
      type: "warning",
      message: "Please add at least one exercise.",
    });

    return;
  }

  const history =
    JSON.parse(
      localStorage.getItem(historyKey)
    ) || [];

  const workoutData = {

    id: Date.now(),

    user:
      currentUser?.email,

    date:
      workoutDate,

    exercises:
      workoutExercises,

    calories:
      totalCalories,

    status:
      workoutStatus,

    notes,

    rating,
  };

  history.push(workoutData);

  localStorage.setItem(
    historyKey,
    JSON.stringify(history)
  );

  // ===================================
  // SHOW POPUP
  // ===================================

  setSuccess(true);

  // ===================================
  // RESET FORM
  // ===================================

  setTimeout(() => {

    setWorkoutExercises([]);

    setNotes("");

    setRating(5);

    setTotalCalories(null);

    setWorkoutStatus(null);

    setNotification(null);

  }, 1200);

  // ===================================
  // HIDE POPUP
  // ===================================

  setTimeout(() => {

    setSuccess(false);

  }, 3000);
};

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
        rounded-[32px]
        p-6
        mb-6
        `}
      >

        <button
          onClick={() =>
            navigate(
              "/workout"
            )
          }
          className={`
          h-12
          px-5
          rounded-2xl
          border
          flex
          items-center
          gap-2
          mb-6

          ${
            isDark

              ? `
              bg-white/10
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

          <ArrowLeft
            size={18}
          />

          Back

        </button>

        <div className="flex justify-between items-center flex-wrap gap-5">

          <div>

            <h1 className="text-4xl font-black">
              Log Workout
            </h1>

            <p className={`${subText} mt-2`}>
              Professional workout tracking dashboard
            </p>
          </div>

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
              className={`
              w-10
              h-10

              ${
                isDark
                  ? "text-white"
                  : "text-slate-800"
              }
              `}
            />

          </div>
        </div>
      </motion.div>
            {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* CALORIES */}

        <div
          className={`
          ${cardClass}
          border
          rounded-[28px]
          p-5
          `}
        >

          <div className="flex items-center gap-4">

            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-orange-500/20
              flex
              items-center
              justify-center
              "
            >

              <Flame className="text-orange-400" />

            </div>

            <div>

              <p className={`${subText} text-sm`}>
                Burned Calories
              </p>

              <h2 className="text-3xl font-black">

                {totalCalories !== null
                  ? totalCalories
                  : "--"}

              </h2>
            </div>
          </div>
        </div>

        {/* STATUS */}

        <div
          className={`
          ${cardClass}
          border
          rounded-[28px]
          p-5
          `}
        >

          <div className="flex items-center gap-4">

            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-cyan-500/20
              flex
              items-center
              justify-center
              "
            >

              <Activity />

            </div>

            <div>

              <p className={`${subText} text-sm`}>
                Workout Status
              </p>

              <h2 className="text-2xl font-black">
                {workoutStatus || "--"}
              </h2>
            </div>
          </div>
        </div>

        {/* DATE */}

        <div
          className={`
          ${cardClass}
          border
          rounded-[28px]
          p-5
          `}
        >

          <div className="flex items-center gap-4">

            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-pink-500/20
              flex
              items-center
              justify-center
              "
            >

              <Calendar />

            </div>

            <div className="w-full">

              <p className={`${subText} text-sm`}>
                Workout Date
              </p>

              <input
                type="date"

                value={
                  workoutDate
                }

                onChange={(e) =>
                  setWorkoutDate(
                    e.target.value
                  )
                }

                className={`
                bg-transparent
                mt-1
                outline-none
                w-full

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-800"
                }
                `}
              />
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATION */}

    {notification &&
workoutExercises.length > 0 && (

  <div
    className={`
    mb-6
    rounded-[28px]
    p-5
    border
    flex
    items-center
    gap-4
    transition-all
    duration-300

    ${
      notification.type === "danger"

        ? isDark

          ? `
            bg-red-500/10
            border-red-500/20
            text-red-300
            `

          : `
            bg-red-50
            border-red-200
            text-red-700
            `

        : notification.type === "success"

        ? isDark

          ? `
            bg-green-500/10
            border-green-500/20
            text-green-300
            `

          : `
            bg-emerald-50
            border-emerald-200
            text-emerald-700
            `

        : isDark

          ? `
            bg-yellow-500/10
            border-yellow-500/20
            text-yellow-300
            `

          : `
            bg-amber-50
            border-amber-200
            text-amber-700
            `
    }
    `}
  >

          {notification.type ===
          "danger" ? (

            <AlertTriangle />

          ) : notification.type ===
            "success" ? (

            <CheckCircle2 />

          ) : (

            <Bell />

          )}

          <p className="font-semibold">
            {notification.message}
          </p>
        </div>
      )}

      {/* EXERCISES */}

      <div className="space-y-6">

        {workoutExercises.map(
          (
            item,
            index
          ) => {

            const filteredExercises =
              allExercises.filter(
                (exercise) =>
                  exercise.category ===
                  item.category
              );

            return (

              <motion.div

                key={item.id}

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
                rounded-[32px]
                p-6
                `}
              >

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-black">
                    Exercise #{index + 1}
                  </h2>

                  <button
                    onClick={() =>
                      removeExercise(
                        item.id
                      )
                    }
                    className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-red-500/20
                    text-red-400
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Trash2 size={18} />

                  </button>
                </div>

                {/* FORM */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                  {/* CATEGORY */}

                  <div>

                    <label className={`text-sm ${subText}`}>
                      Category
                    </label>

                    <select

                      value={
                        item.category
                      }

                      onChange={(e) =>
                        changeExercise(
                          index,
                          "category",
                          e.target.value
                        )
                      }

                      className={`
                      mt-2
                      w-full
                      h-14
                      rounded-2xl
                      border
                      px-4
                      outline-none
                      appearance-none
                      transition-all
                      duration-300
                      cursor-pointer
                      ${inputClass}
                      `}
                    >

                      {categories.map(
                        (
                          category,
                          idx
                        ) => (

                          <option
                            key={idx}
                            value={category}

                            className={
                              isDark
                                ? "bg-[#111827] text-white"
                                : "bg-white text-slate-800"
                            }
                          >

                            {category}

                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* EXERCISE */}

                  <div>

                    <label className={`text-sm ${subText}`}>
                      Exercise
                    </label>

                    <select

                      value={
                        item.exercise
                      }

                      onChange={(e) =>
                        changeExercise(
                          index,
                          "exercise",
                          e.target.value
                        )
                      }

                      className={`
                      mt-2
                      w-full
                      h-14
                      rounded-2xl
                      border
                      px-4
                      outline-none
                      appearance-none
                      transition-all
                      duration-300
                      cursor-pointer
                      ${inputClass}
                      `}
                    >

                      {filteredExercises.map(
                        (
                          exercise,
                          idx
                        ) => (

                          <option
                            key={idx}
                            value={exercise.name}

                            className={
                              isDark
                                ? "bg-[#111827] text-white"
                                : "bg-white text-slate-800"
                            }
                          >

                            {exercise.name}

                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* SETS */}

                  <div>

                    <label className={`text-sm ${subText}`}>
                      Sets
                    </label>

                    <input
                      type="number"

                      value={
                        item.sets
                      }

                      onChange={(e) =>
                        changeExercise(
                          index,
                          "sets",
                          e.target.value
                        )
                      }

                      className={`
                      mt-2
                      w-full
                      h-14
                      rounded-2xl
                      border
                      px-4
                      outline-none
                      transition-all
                      duration-300
                      ${inputClass}
                      `}
                    />
                  </div>

                  {/* REPS */}

                  <div>

                    <label className={`text-sm ${subText}`}>
                      Reps
                    </label>

                    <input
                      type="number"

                      value={
                        item.reps
                      }

                      onChange={(e) =>
                        changeExercise(
                          index,
                          "reps",
                          e.target.value
                        )
                      }

                      className={`
                      mt-2
                      w-full
                      h-14
                      rounded-2xl
                      border
                      px-4
                      outline-none
                      transition-all
                      duration-300
                      ${inputClass}
                      `}
                    />
                  </div>

                  {/* WEIGHT */}

                  <div>

                    <label className={`text-sm ${subText}`}>
                      Weight (kg)
                    </label>

                    <input
                      type="number"

                      value={
                        item.weight
                      }

                      onChange={(e) =>
                        changeExercise(
                          index,
                          "weight",
                          e.target.value
                        )
                      }

                      className={`
                      mt-2
                      w-full
                      h-14
                      rounded-2xl
                      border
                      px-4
                      outline-none
                      transition-all
                      duration-300
                      ${inputClass}
                      `}
                    />
                  </div>

                  {/* DURATION */}

                  <div>

                    <label className={`text-sm ${subText}`}>
                      Duration (mins)
                    </label>

                    <input
                      type="number"

                      value={
                        item.duration
                      }

                      onChange={(e) =>
                        changeExercise(
                          index,
                          "duration",
                          e.target.value
                        )
                      }

                      className={`
                      mt-2
                      w-full
                      h-14
                      rounded-2xl
                      border
                      px-4
                      outline-none
                      transition-all
                      duration-300
                      ${inputClass}
                      `}
                    />
                  </div>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

      {/* ADD BUTTON */}

      <button
        onClick={addExercise}

        className={`
        mt-6
        w-full
        h-16
        rounded-[28px]
        border-2
        border-dashed
        font-bold
        flex
        items-center
        justify-center
        gap-3
        transition-all
        duration-300

        ${
          isDark

            ? `
            border-white/10
            bg-white/[0.03]
            text-white
            hover:bg-white/[0.05]
            `

            : `
            border-slate-200
            bg-white/70
            text-slate-800
            hover:bg-white
            `
        }
        `}
      >

        <Plus size={20} />

        Add Exercise

      </button>

      {/* NOTES */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        mt-6
        `}
      >

        <h2 className="text-2xl font-black">
          Workout Notes
        </h2>

        <textarea

          rows={6}

          value={notes}

          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }

          placeholder="Write workout experience, improvements, soreness, energy level..."

          className={`
          mt-5
          w-full
          rounded-[26px]
          border
          p-5
          outline-none
          resize-none
          transition-all
          duration-300
          ${inputClass}
          `}
        />

        {/* RATING */}

        <div className="mt-8">

          <h3 className="text-xl font-black mb-4">
            Workout Rating
          </h3>

          <div className="flex flex-wrap gap-3">

            {[1,2,3,4,5,6,7,8,9,10].map(
              (item) => (

                <button

                  key={item}

                  onClick={() =>
                    setRating(item)
                  }

                  className={`
                  w-12
                  h-12
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300

                  ${
                    rating === item

                      ? `
                      bg-gradient-to-r
                      from-pink-500
                      to-orange-500
                      text-white
                      scale-110
                      `

                      : isDark

                      ? `
                        bg-white/10
                        border
                        border-white/10
                        text-slate-300
                        `

                      : `
                        bg-white
                        border
                        border-slate-200
                        text-slate-800
                        shadow-sm
                        `
                  }
                  `}
                >

                  {item}

                </button>
              )
            )}
          </div>
        </div>

        {/* SAVE */}

        <button

          onClick={saveWorkout}

          className={`
          w-full
          h-20
          rounded-[32px]
          font-black
          text-2xl
          mt-8
          flex
          items-center
          justify-center
          gap-4
          shadow-2xl

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
              `
          }
          `}
        >

          <Save size={26} />

          Save Workout

        </button>
      </div>
{/* SUCCESS */}
{/* SUCCESS POPUP */}

{success && (

  <motion.div

    initial={{
      opacity: 0,
      y: 40,
      scale: 0.9,
    }}

    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}

    exit={{
      opacity: 0,
    }}

    transition={{
      duration: 0.35,
    }}

    className={`
    fixed
    bottom-28
    right-6
    z-[99999]
    px-6
    py-4
    rounded-2xl
    border
    backdrop-blur-xl
    flex
    items-center
    gap-3
    font-bold
    shadow-2xl

    ${
      isDark

        ? `
        bg-emerald-500
        border-emerald-400
        text-white
        `

        : `
        bg-white
        border-emerald-200
        text-emerald-700
        shadow-[0_10px_40px_rgba(16,185,129,0.18)]
        `
    }
    `}
  >

    <CheckCircle2 size={22} />

    Workout Saved Successfully

  </motion.div>
)}
    </div>
  );
};

export default LogWorkoutPage;