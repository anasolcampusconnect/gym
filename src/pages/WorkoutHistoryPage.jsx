import {
  ArrowLeft,
  Calendar,
  Search,
  Trash2,
  Pencil,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Flame,
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

const WorkoutHistoryPage = () => {

    const [editWorkout,
    setEditWorkout] =
    useState(null);

    const [editOpen,
    setEditOpen] =
    useState(false);
    
  const navigate =
    useNavigate();

  const [workouts,
    setWorkouts] =
    useState([]);

  const [expanded,
    setExpanded] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  const [exerciseFilter,
    setExerciseFilter] =
    useState("");

  const [startDate,
    setStartDate] =
    useState("");

  const [endDate,
    setEndDate] =
    useState("");

  const [page,
    setPage] =
    useState(1);

  const itemsPerPage = 5;

  // LOAD
 useEffect(() => {

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    );

  if (!currentUser) return;

  const historyKey =
    `workout_history_${currentUser.email}`;

  const history =
    JSON.parse(
      localStorage.getItem(
        historyKey
      )
    ) || [];

  const sorted =
    history.sort(
      (a, b) =>
        new Date(
          b.date
        ) -
        new Date(
          a.date
        )
    );

  setWorkouts(
    sorted
  );

}, []);
  // DELETE
  const deleteWorkout =
    (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this workout?"
        );

      if (
        !confirmDelete
      )
        return;

      const updated =
        workouts.filter(
          (item) =>
            item.id !== id
        );

      setWorkouts(
        updated
      );

     const currentUser =
  JSON.parse(
    localStorage.getItem(
      "gym_user"
    )
  );

const historyKey =
  `workout_history_${currentUser.email}`;

localStorage.setItem(
  historyKey,
  JSON.stringify(
    updated
  )
);
    };

  // FILTER
  const filtered =
    workouts.filter(
      (workout) => {

        const matchesSearch =
          workout.notes
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesExercise =
          exerciseFilter ===
          ""
            ? true
            : workout.exercises.some(
                (
                  ex
                ) =>
                  ex.exercise
                    .toLowerCase()
                    .includes(
                      exerciseFilter.toLowerCase()
                    )
              );

        const workoutDate =
          new Date(
            workout.date
          );

        const matchesStart =
          startDate
            ? workoutDate >=
              new Date(
                startDate
              )
            : true;

        const matchesEnd =
          endDate
            ? workoutDate <=
              new Date(
                endDate
              )
            : true;

        return (
          matchesSearch &&
          matchesExercise &&
          matchesStart &&
          matchesEnd
        );
      }
    );

  // PAGINATION
  const start =
    (page - 1) *
    itemsPerPage;

  const paginated =
    filtered.slice(
      start,
      start +
        itemsPerPage
    );
    const updateWorkout =
  () => {

    const updated =
      workouts.map(
        (item) => {

          if (
            item.id ===
            editWorkout.id
          ) {
            return editWorkout;
          }

          return item;
        }
      );

    setWorkouts(
      updated
    );

   const currentUser =
  JSON.parse(
    localStorage.getItem(
      "gym_user"
    )
  );

const historyKey =
  `workout_history_${currentUser.email}`;

localStorage.setItem(
  historyKey,
  JSON.stringify(
    updated
  )
);

    setEditOpen(false);

    alert(
      "Workout Updated Successfully"
    );
  };

  // STATS
  const calculateStats =
    (workout) => {

      let totalSets = 0;
      let totalVolume = 0;

      workout.exercises.forEach(
        (exercise) => {

          totalSets +=
            exercise.sets.length;

          exercise.sets.forEach(
            (set) => {

              totalVolume +=
                Number(
                  set.weight ||
                    0
                ) *
                Number(
                  set.reps ||
                    0
                );
            }
          );
        }
      );

      return {
        totalSets,
        totalVolume,
      };
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
              Workout History
            </h1>

            <p className="text-slate-400 mt-4 text-lg leading-8 max-w-2xl">
              Review previous workouts, analyze progress and manage your fitness journey.
            </p>
          </div>

          <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-2xl">
            <Flame className="w-12 h-12" />
          </div>
        </div>
      </motion.div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">

        {/* SEARCH */}
        <div className="h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center px-5 gap-4">

          <Search className="text-pink-400" />

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        {/* EXERCISE */}
        <div className="h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center px-5">

          <input
            type="text"
            placeholder="Filter exercise..."
            value={
              exerciseFilter
            }
            onChange={(e) =>
              setExerciseFilter(
                e.target.value
              )
            }
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        {/* START */}
        <div className="h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center px-5 gap-4">

          <Calendar className="text-cyan-400" />

          <input
            type="date"
            value={
              startDate
            }
            max={
                new Date()
                    .toISOString()
                    .split("T")[0]
                }
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="bg-transparent outline-none text-white w-full"
          />
        </div>
        {/* EDIT MODAL */}
{editOpen &&
  editWorkout && (

  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">

    <div className="w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-[#111827] border border-white/10 rounded-[36px] p-8">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-5xl font-black">
            Edit Workout
          </h1>

          <p className="text-slate-400 mt-3">
            Update workout exercises and sets
          </p>
        </div>

        <button
          onClick={() =>
            setEditOpen(
              false
            )
          }
          className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/20 text-red-400"
        >
          ✕
        </button>
      </div>

      {/* NOTES */}
      <div className="mb-8">

        <label className="text-lg font-bold">
          Workout Notes
        </label>

        <textarea
          value={
            editWorkout.notes
          }
          onChange={(e) =>
            setEditWorkout({
              ...editWorkout,
              notes:
                e.target.value,
            })
          }
          rows={4}
          className="mt-4 w-full rounded-[28px] bg-white/10 border border-white/10 p-5 outline-none text-white"
        />
      </div>

      {/* EXERCISES */}
      <div className="space-y-8">

        {editWorkout.exercises.map(
          (
            exercise,
            exIndex
          ) => (

            <div
              key={exIndex}
              className="bg-white/5 border border-white/10 rounded-[30px] p-6"
            >

              {/* EX NAME */}
              <input
                type="text"
                value={
                  exercise.exercise
                }
                onChange={(e) => {

                  const updated =
                    {
                      ...editWorkout,
                    };

                  updated
                    .exercises[
                    exIndex
                  ].exercise =
                    e.target.value;

                  setEditWorkout(
                    updated
                  );
                }}
                className="w-full h-16 rounded-2xl bg-white/10 border border-white/10 px-5 outline-none text-2xl font-black text-white"
              />

              {/* SETS */}
              <div className="space-y-4 mt-6">

                {exercise.sets.map(
                  (
                    set,
                    setIndex
                  ) => (

                    <div
                      key={
                        setIndex
                      }
                      className="grid grid-cols-2 gap-4"
                    >

                      {/* WEIGHT */}
                      <input
                        type="number"
                        value={
                          set.weight
                        }
                        onChange={(e) => {

                          const updated =
                            {
                              ...editWorkout,
                            };

                          updated
                            .exercises[
                            exIndex
                          ]
                            .sets[
                            setIndex
                          ]
                            .weight =
                            e.target.value;

                          setEditWorkout(
                            updated
                          );
                        }}
                        placeholder="Weight"
                        className="h-16 rounded-2xl bg-white/10 border border-white/10 px-5 outline-none text-white"
                      />

                      {/* REPS */}
                      <input
                        type="number"
                        value={
                          set.reps
                        }
                        onChange={(e) => {

                          const updated =
                            {
                              ...editWorkout,
                            };

                          updated
                            .exercises[
                            exIndex
                          ]
                            .sets[
                            setIndex
                          ]
                            .reps =
                            e.target.value;

                          setEditWorkout(
                            updated
                          );
                        }}
                        placeholder="Reps"
                        className="h-16 rounded-2xl bg-white/10 border border-white/10 px-5 outline-none text-white"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* SAVE */}
      <button
        onClick={
          updateWorkout
        }
        className="w-full h-20 rounded-[32px] bg-gradient-to-r from-pink-500 to-orange-500 text-2xl font-black mt-10"
      >
        Save Changes
      </button>
    </div>
  </div>
)}

        {/* END */}
        <div className="h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center px-5 gap-4">

          <Calendar className="text-orange-400" />

          <input
            type="date"
            value={
              endDate
            }
             max={
                new Date()
                    .toISOString()
                    .split("T")[0]
                }
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="bg-transparent outline-none text-white w-full"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-8">

        {paginated.map(
          (
            workout,
            index
          ) => {

            const stats =
              calculateStats(
                workout
              );

            return (
              <motion.div
                key={
                  workout.id
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
                <div className="flex flex-col xl:flex-row justify-between gap-6">

                  <div>

                    <div className="flex items-center gap-4 flex-wrap">

                      <div className="px-5 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center font-bold">
                        {workout.date}
                      </div>

                      <div className="px-5 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center font-bold">
                        {
                          workout
                            .exercises
                            .length
                        } Exercises
                      </div>

                      <div className="px-5 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 flex items-center font-bold">
                        {
                          stats.totalSets
                        } Sets
                      </div>

                      <div className="px-5 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/20 text-orange-400 flex items-center font-bold">
                        {
                          stats.totalVolume
                        } kg Volume
                      </div>
                    </div>

                    <p className="text-slate-400 mt-6 leading-8">
                      {
                        workout.notes
                      }
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-4">

                <button
                onClick={() => {

                    setEditWorkout(
                    JSON.parse(
                        JSON.stringify(
                        workout
                        )
                    )
                    );

                    setEditOpen(true);
                }}
                className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 flex items-center justify-center"
                >
                <Pencil />
                </button>
                    <button
                      onClick={() =>
                        deleteWorkout(
                          workout.id
                        )
                      }
                      className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/20 text-red-400 flex items-center justify-center"
                    >
                      <Trash2 />
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
                      className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"
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
                {expanded ===
                  workout.id && (

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {workout.exercises.map(
                      (
                        exercise,
                        exIndex
                      ) => (

                        <div
                          key={
                            exIndex
                          }
                          className="bg-white/5 border border-white/10 rounded-[28px] p-6"
                        >

                          <div className="flex items-center gap-4 mb-6">

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                              <Dumbbell />
                            </div>

                            <div>

                              <h2 className="text-2xl font-black">
                                {
                                  exercise.exercise
                                }
                              </h2>

                              <p className="text-slate-400 mt-1">
                                {
                                  exercise
                                    .sets
                                    .length
                                } sets
                              </p>
                            </div>
                          </div>

                          {/* SETS */}
                          <div className="space-y-4">

                            {exercise.sets.map(
                              (
                                set,
                                setIndex
                              ) => (

                                <div
                                  key={
                                    setIndex
                                  }
                                  className="grid grid-cols-3 gap-4 bg-white/5 rounded-2xl p-4"
                                >

                                  <div>

                                    <p className="text-slate-400 text-sm">
                                      Set
                                    </p>

                                    <h3 className="text-2xl font-black mt-2">
                                      {setIndex + 1}
                                    </h3>
                                  </div>

                                  <div>

                                    <p className="text-slate-400 text-sm">
                                      Weight
                                    </p>

                                    <h3 className="text-2xl font-black mt-2 text-cyan-400">
                                      {
                                        set.weight
                                      } kg
                                    </h3>
                                  </div>

                                  <div>

                                    <p className="text-slate-400 text-sm">
                                      Reps
                                    </p>

                                    <h3 className="text-2xl font-black mt-2 text-pink-400">
                                      {
                                        set.reps
                                      }
                                    </h3>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            );
          }
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-10">

        <button
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              page - 1
            )
          }
          className="h-14 px-8 rounded-2xl bg-white/10 border border-white/10 font-bold disabled:opacity-30"
        >
          Previous
        </button>

        <button
          disabled={
            start +
              itemsPerPage >=
            filtered.length
          }
          onClick={() =>
            setPage(
              page + 1
            )
          }
          className="h-14 px-8 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 font-bold disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkoutHistoryPage;