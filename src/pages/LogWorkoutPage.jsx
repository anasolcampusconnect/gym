import {
  ArrowLeft,
  Calendar,
  Dumbbell,
  Plus,
  Save,
  Trash2,
  Copy,
  Flame,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import { motion } from "framer-motion";

const exercisesList = [
  "Bench Press",
  "Squats",
  "Deadlift",
  "Lat Pulldown",
  "Shoulder Press",
  "Bicep Curl",
  "Plank",
];

const LogWorkoutPage = () => {

  const navigate =
    useNavigate();

  const [workoutDate,
    setWorkoutDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [notes,
    setNotes] =
    useState("");

  const [rating,
    setRating] =
    useState(5);

  const [success,
    setSuccess] =
    useState(false);

  const [workoutExercises,
    setWorkoutExercises] =
    useState([
      {
        id: Date.now(),
        exercise:
          "Bench Press",
        sets: [
          {
            weight: "",
            reps: "",
          },
        ],
      },
    ]);

  // ADD EXERCISE
  const addExercise =
    () => {

      setWorkoutExercises([
        ...workoutExercises,
        {
          id: Date.now(),
          exercise:
            "Bench Press",
          sets: [
            {
              weight: "",
              reps: "",
            },
          ],
        },
      ]);
    };

  // REMOVE EXERCISE
  const removeExercise =
    (id) => {

      setWorkoutExercises(
        workoutExercises.filter(
          (item) =>
            item.id !== id
        )
      );
    };

  // CHANGE EXERCISE
  const changeExercise =
    (
      index,
      value
    ) => {

      const updated =
        [...workoutExercises];

      updated[index]
        .exercise =
        value;

      setWorkoutExercises(
        updated
      );
    };

  // ADD SET
  const addSet =
    (exerciseIndex) => {

      const updated =
        [...workoutExercises];

      updated[
        exerciseIndex
      ].sets.push({
        weight: "",
        reps: "",
      });

      setWorkoutExercises(
        updated
      );
    };

  // REMOVE SET
  const removeSet =
    (
      exerciseIndex,
      setIndex
    ) => {

      const updated =
        [...workoutExercises];

      updated[
        exerciseIndex
      ].sets =
        updated[
          exerciseIndex
        ].sets.filter(
          (_, i) =>
            i !== setIndex
        );

      setWorkoutExercises(
        updated
      );
    };

  // CHANGE SET
  const changeSet =
    (
      exerciseIndex,
      setIndex,
      field,
      value
    ) => {

      const updated =
        [...workoutExercises];

      updated[
        exerciseIndex
      ].sets[
        setIndex
      ][field] = value;

      setWorkoutExercises(
        updated
      );
    };

  // COPY PREVIOUS
  const copyPreviousWorkout =
    () => {

      const previous =
        JSON.parse(
          localStorage.getItem(
         historyKey
          )
        ) || [];

      if (
        previous.length === 0
      ) {
        alert(
          "No previous workout found"
        );
        return;
      }

      const lastWorkout =
        previous[
          previous.length -
            1
        ];

      setWorkoutExercises(
        lastWorkout
          .exercises
      );

      setNotes(
        lastWorkout.notes
      );

      setRating(
        lastWorkout.rating
      );
    };

  // SAVE
  const saveWorkout =
    () => {

    const user =
  JSON.parse(
    localStorage.getItem(
      "gym_user"
    )
  );

    const historyKey =
    `workout_history_${user.email}`;

    const history =
    JSON.parse(
        localStorage.getItem(
        historyKey
        )
    ) || [];

      const newWorkout =
        {
          id: Date.now(),
          date:
            workoutDate,
          exercises:
            workoutExercises,
          notes,
          rating,
        };

      history.push(
        newWorkout
      );

    localStorage.setItem(
        historyKey,
        JSON.stringify(
          history
        )
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white p-6">

      {/* HIDE SCROLLBAR */}
      <style>
        {`
          ::-webkit-scrollbar{
            width:0px;
          }
        `}
      </style>

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
        className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl mb-8"
      >

        <button
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
          className="h-14 px-6 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3 font-bold mb-8"
        >
          <ArrowLeft />
          Dashboard
        </button>

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <h1 className="text-5xl font-black">
              Log Workout
            </h1>

            <p className="text-slate-400 mt-4 text-lg max-w-2xl leading-8">
              Track your exercises, sets, reps and workout intensity professionally.
            </p>
          </div>

          <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-2xl">
            <Dumbbell className="w-12 h-12" />
          </div>
        </div>
      </motion.div>

      {/* DATE */}
      <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 mb-8 backdrop-blur-xl">

        <label className="text-lg font-bold">
          Workout Date
        </label>

        <div className="mt-4 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-4 px-5">

          <Calendar className="text-pink-400" />

          <input
            type="date"
            value={
              workoutDate
            }
              max={
                new Date()
                    .toISOString()
                    .split("T")[0]
                }
            onChange={(e) =>
              setWorkoutDate(
                e.target.value
              )
            }
            className="bg-transparent outline-none text-white w-full"
          />
        </div>
      </div>

      {/* EXERCISES */}
      <div className="space-y-8">

        {workoutExercises.map(
          (
            exercise,
            exerciseIndex
          ) => (

            <motion.div
              key={
                exercise.id
              }
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl"
            >

              {/* TOP */}
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Flame />
                  </div>

                  <div>

                    <h2 className="text-3xl font-black">
                      Exercise
                    </h2>

                    <p className="text-slate-400 mt-2">
                      Track exercise performance
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    removeExercise(
                      exercise.id
                    )
                  }
                  className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/20 text-red-400 flex items-center justify-center"
                >
                  <Trash2 />
                </button>
              </div>

              {/* SELECT */}
              <select
                value={
                  exercise.exercise
                }
                onChange={(e) =>
                  changeExercise(
                    exerciseIndex,
                    e.target
                      .value
                  )
                }
                className="w-full h-16 rounded-2xl bg-white/10 border border-white/10 px-5 outline-none text-white"
              >
                {exercisesList.map(
                  (
                    item,
                    index
                  ) => (
                    <option
                      key={
                        index
                      }
                      value={
                        item
                      }
                      className="bg-[#111827]"
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              {/* SETS */}
              <div className="space-y-5 mt-8">

                {exercise.sets.map(
                  (
                    set,
                    setIndex
                  ) => (

                    <div
                      key={
                        setIndex
                      }
                      className="grid grid-cols-1 md:grid-cols-4 gap-4"
                    >

                      {/* WEIGHT */}
                      <div className="h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center px-5">

                        <input
                          type="number"
                          placeholder="Weight (kg)"
                          value={
                            set.weight
                          }
                          onChange={(
                            e
                          ) =>
                            changeSet(
                              exerciseIndex,
                              setIndex,
                              "weight",
                              e.target
                                .value
                            )
                          }
                          className="bg-transparent outline-none text-white w-full"
                        />
                      </div>

                      {/* REPS */}
                      <div className="h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center px-5">

                        <input
                          type="number"
                          placeholder="Reps"
                          value={
                            set.reps
                          }
                          onChange={(
                            e
                          ) =>
                            changeSet(
                              exerciseIndex,
                              setIndex,
                              "reps",
                              e.target
                                .value
                            )
                          }
                          className="bg-transparent outline-none text-white w-full"
                        />
                      </div>

                      {/* COPY */}
                      <button
                        onClick={() =>
                          changeSet(
                            exerciseIndex,
                            setIndex,
                            "weight",
                            setIndex >
                              0
                              ? exercise
                                  .sets[
                                  setIndex -
                                    1
                                ]
                                  .weight
                              : ""
                          )
                        }
                        className="h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center gap-3"
                      >
                        <Copy />
                        Copy Prev
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          removeSet(
                            exerciseIndex,
                            setIndex
                          )
                        }
                        className="h-16 rounded-2xl bg-red-500/20 border border-red-500/20 text-red-400 font-bold flex items-center justify-center"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  )
                )}
              </div>

              {/* ADD SET */}
              <button
                onClick={() =>
                  addSet(
                    exerciseIndex
                  )
                }
                className="mt-8 h-14 px-7 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 font-bold flex items-center gap-3"
              >
                <Plus />
                Add Set
              </button>
            </motion.div>
          )
        )}
      </div>

      {/* ADD EXERCISE */}
      <button
        onClick={
          addExercise
        }
        className="mt-8 h-16 px-8 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 font-black text-lg flex items-center gap-4 shadow-2xl"
      >
        <Plus />
        Add Exercise
      </button>

      {/* NOTES */}
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mt-8 backdrop-blur-xl">

        <h2 className="text-3xl font-black">
          Workout Notes
        </h2>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          placeholder="How did today's workout feel?"
          className="mt-6 w-full rounded-[28px] bg-white/10 border border-white/10 p-5 outline-none resize-none text-white"
        />
      </div>

      {/* RATING */}
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mt-8 backdrop-blur-xl">

        <h2 className="text-3xl font-black">
          Perceived Exertion
        </h2>

        <p className="text-slate-400 mt-3">
          Rate workout intensity
        </p>

        <div className="flex gap-4 flex-wrap mt-8">

          {[1,2,3,4,5,6,7,8,9,10].map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setRating(
                    item
                  )
                }
                className={`w-16 h-16 rounded-2xl font-black text-xl ${
                  rating ===
                  item
                    ? "bg-gradient-to-r from-pink-500 to-orange-500"
                    : "bg-white/10 border border-white/10"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={
          saveWorkout
        }
        className="w-full h-20 rounded-[32px] bg-gradient-to-r from-cyan-500 to-blue-500 font-black text-2xl mt-10 flex items-center justify-center gap-4 shadow-2xl"
      >
        <Save />
        Save Workout
      </button>

      {/* SUCCESS */}
      {success && (
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="fixed bottom-8 right-8 bg-green-500 text-black px-8 py-5 rounded-3xl font-black shadow-2xl"
        >
          Workout Saved Successfully
        </motion.div>
      )}
    </div>
  );
};

export default LogWorkoutPage;