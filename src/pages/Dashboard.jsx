import {
  Flame,
  Trophy,
  CalendarDays,
  Dumbbell,
  LogOut,
  User,
  Activity,
  ChevronRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

const quotes = [
  "Push harder than yesterday.",
  "Discipline beats motivation.",
  "Consistency creates champions.",
  "Train insane or remain the same.",
  "Small progress is still progress.",
];

const DashboardPage = () => {

  const navigate =
    useNavigate();

  // USER
  const storedUser =
    localStorage.getItem(
      "gym_user"
    );

  const user =
    storedUser
      ? JSON.parse(
          storedUser
        )
      : null;

  // QUOTE
  const quote =
    quotes[
      Math.floor(
        Math.random() *
          quotes.length
      )
    ];

  // WORKOUT HISTORY
 const currentUser =
  JSON.parse(
    localStorage.getItem(
      "gym_user"
    )
  );

const historyKey =
  `workout_history_${currentUser.email}`;

const workoutHistory =
  JSON.parse(
    localStorage.getItem(
      historyKey
    )
  ) || [];

  // TOTAL WORKOUTS
  const totalWorkouts =
    workoutHistory.length;

  // TODAY
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // TODAY STATUS
  const todayWorkout =
    workoutHistory.find(
      (workout) =>
        workout.date ===
        today
    );

  // MONTHLY PROGRESS
  const currentMonth =
    new Date().getMonth();

  const monthlyWorkouts =
    workoutHistory.filter(
      (workout) => {

        const workoutMonth =
          new Date(
            workout.date
          ).getMonth();

        return (
          workoutMonth ===
          currentMonth
        );
      }
    );

  const monthlyProgress =
    Math.min(
      Math.floor(
        (monthlyWorkouts.length /
          20) *
          100
      ),
      100
    );

  // PERSONAL BESTS
  let personalBests = 0;

  workoutHistory.forEach(
    (workout) => {

      workout.exercises.forEach(
        (exercise) => {

          exercise.sets.forEach(
            (set) => {

              if (
                Number(
                  set.weight
                ) >= 100
              ) {

                personalBests++;
              }
            }
          );
        }
      );
    }
  );

  // STREAK
  const sortedDates =
    workoutHistory
      .map(
        (workout) =>
          workout.date
      )
      .sort(
        (a, b) =>
          new Date(
            b
          ) -
          new Date(a)
      );

  let streak = 0;

  let currentDate =
    new Date();

  for (
    let i = 0;
    i <
    sortedDates.length;
    i++
  ) {

    const formatted =
      currentDate
        .toISOString()
        .split("T")[0];

    if (
      sortedDates.includes(
        formatted
      )
    ) {

      streak++;

      currentDate.setDate(
        currentDate.getDate() -
          1
      );

    } else {

      break;
    }
  }

  // WEEKLY
  const weeklyCompleted =
    workoutHistory.filter(
      (workout) => {

        const workoutDate =
          new Date(
            workout.date
          );

        const now =
          new Date();

        const diff =
          Math.floor(
            (
              now -
              workoutDate
            ) /
              (
                1000 *
                60 *
                60 *
                24
              )
          );

        return diff <= 6;
      }
    ).length;

  const weeklyProgress =
    Math.min(
      Math.floor(
        (weeklyCompleted /
          7) *
          100
      ),
      100
    );

  // LOGOUT
  const logout =
    () => {

      localStorage.removeItem(
        "gym_user"
      );

      navigate("/");
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white p-6 overflow-hidden">

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
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10"
      >

        {/* LEFT */}
        <div>

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-2xl">

              <User className="w-8 h-8 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-black">
                Welcome{" "}
                {user?.name ||
                  "Athlete"}
              </h1>

              <p className="text-slate-400 mt-2">
                Joined on{" "}
                {user?.joinDate ||
                  "Today"}
              </p>
            </div>
          </div>

          {/* QUOTE */}
          <p className="text-slate-300 mt-6 text-lg max-w-2xl leading-8">
            {quote}
          </p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="h-14 px-6 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition-all"
        >

          <LogOut size={20} />

          Logout
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {[
          {
            title:
              "Workout Streak",
            value: `${streak} Days`,
            icon: <Flame />,
            gradient:
              "from-orange-500 to-pink-500",
          },

          {
            title:
              "Total Workouts",
            value:
              totalWorkouts,
            icon: <Dumbbell />,
            gradient:
              "from-cyan-500 to-blue-500",
          },

          {
            title:
              "Monthly Progress",
            value: `${monthlyProgress}%`,
            icon:
              <CalendarDays />,
            gradient:
              "from-purple-500 to-indigo-500",
          },

          {
            title:
              "Personal Bests",
            value:
              personalBests,
            icon: <Trophy />,
            gradient:
              "from-green-500 to-emerald-500",
          },
        ].map(
          (
            item,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 shadow-2xl"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-xl`}
              >
                {item.icon}
              </div>

              <h2 className="text-4xl font-black mt-6">
                {item.value}
              </h2>

              <p className="text-slate-400 mt-2">
                {item.title}
              </p>
            </motion.div>
          )
        )}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* TODAY */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-[32px] p-8 shadow-2xl">

            <div className="flex justify-between items-start">

          <div>

  <h2 className="text-4xl font-black">
    Today's Workout
  </h2>

  <p className="text-white/80 mt-3 text-lg">

    {todayWorkout
      ? "Workout completed for today."
      : "You haven't logged today's workout yet."}

  </p>

  {/* BUTTONS */}
  <div className="flex flex-wrap gap-4 mt-8">

    {/* QUICK ADD */}
    <button
      onClick={() =>
        navigate(
          "/log-workout"
        )
      }
      className="h-14 px-8 rounded-2xl bg-white text-black font-bold shadow-xl hover:scale-105 transition-all"
    >
      Quick Add Workout
    </button>

    {/* EXERCISE LIBRARY */}
    <button
      onClick={() =>
        navigate(
          "/exercises"
        )
      }
      className="h-14 px-8 rounded-2xl bg-white text-black font-bold shadow-xl hover:scale-105 transition-all"
    >
      Exercise Library
    </button>

  </div>
</div>

              <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">

                <Activity className="w-10 h-10 text-white" />

              </div>
            </div>
          </div>

          {/* WEEKLY */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-black">
                  Weekly Progress
                </h2>

                <p className="text-slate-400 mt-2">

                  {weeklyCompleted} of 7 workouts completed

                </p>
              </div>

              <div className="text-4xl font-black text-cyan-400">

                {weeklyProgress}%

              </div>
            </div>

            {/* BAR */}
            <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

              <div
                style={{
                  width: `${weeklyProgress}%`,
                }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              />
            </div>

            {/* DAYS */}
            <div className="grid grid-cols-7 gap-3 mt-8">

              {[
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
              ].map(
                (
                  day,
                  index
                ) => (

                  <div
                    key={index}
                    className={`h-14 rounded-2xl flex items-center justify-center font-bold ${
                      index <
                      weeklyCompleted
                        ? "bg-gradient-to-r from-pink-500 to-orange-500"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {day}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* CALENDAR */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-black">
              Workout Calendar
            </h2>

            <p className="text-slate-400 mt-3 leading-7">
              View all completed workout sessions and training history.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/calendar"
                )
              }
              className="mt-8 w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >

              View Calendar

              <ChevronRight size={18} />

            </button>
          </div>

          {/* MOTIVATION */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[32px] p-8 shadow-2xl">

            <h2 className="text-3xl font-black">
              Stay Motivated
            </h2>

            <p className="mt-4 text-white/90 leading-8 text-lg">
              "Success starts with self discipline. Stay consistent and trust your journey."
            </p>

            <div className="mt-8 text-6xl">
              💪
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;