import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import {
  CalendarDays,
  Dumbbell,
  Flame,
} from "lucide-react";

const CalendarPage = () => {

  const navigate =
    useNavigate();

  const [value,
    setValue] =
    useState(
      new Date()
    );

  const [workouts,
    setWorkouts] =
    useState([]);

  const [selectedWorkouts,
    setSelectedWorkouts] =
    useState([]);


   // LOAD USER WORKOUT HISTORY
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

  setWorkouts(
    history
  );

}, []);

  // FIX DATE FORMAT
  const formatDate =
    (date) => {

      const year =
        date.getFullYear();

      const month =
        String(
          date.getMonth() + 1
        ).padStart(2, "0");

      const day =
        String(
          date.getDate()
        ).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

  // HIGHLIGHT WORKOUT DAYS
  const tileClassName =
    ({
      date,
      view,
    }) => {

      if (
        view === "month"
      ) {

        const formatted =
          formatDate(
            date
          );

        const hasWorkout =
          workouts.some(
            (
              workout
            ) =>
              workout.date ===
              formatted
          );

        if (
          hasWorkout
        ) {
          return "highlight";
        }
      }
    };

  // SELECT DATE
  const handleDateChange =
    (date) => {

      setValue(date);

      const formatted =
        formatDate(
          date
        );

      const filtered =
        workouts.filter(
          (
            workout
          ) =>
            workout.date ===
            formatted
        );

      setSelectedWorkouts(
        filtered
      );
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white p-5 overflow-hidden">

      {/* CUSTOM CSS */}
      <style>
        {`

          ::-webkit-scrollbar{
            width:0px;
          }

          .react-calendar{
            width:100%;
            border:none;
            background:transparent;
            color:white;
            font-family:inherit;
          }

          .react-calendar__navigation{
            margin-bottom:18px;
          }

          .react-calendar__navigation button{
            color:white;
            font-size:15px;
            background:rgba(255,255,255,0.08);
            border:none;
            border-radius:14px;
            margin:0 3px;
            height:42px;
            min-width:42px;
            font-weight:700;
          }

          .react-calendar__month-view__weekdays{
            text-transform:uppercase;
            font-size:11px;
            color:#94a3b8;
            margin-bottom:6px;
            font-weight:700;
          }

          .react-calendar__tile{
            height:68px;
            border-radius:18px;
            color:white;
            background:transparent;
            transition:0.3s;
            font-weight:700;
            font-size:14px;
          }

          .react-calendar__tile:hover{
            background:rgba(255,255,255,0.08);
          }

          .react-calendar__tile--active{
            background:linear-gradient(135deg,#ec4899,#f97316)!important;
          }

          .highlight{
            background:rgba(236,72,153,0.16)!important;
            border:2px solid #ec4899 !important;
            color:white !important;
          }

          .react-calendar__month-view__days__day--neighboringMonth{
            color:#475569;
          }

        `}
      </style>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">

        <div>

          <div className="flex items-center gap-4 mb-4">

            <div className="w-16 h-16 rounded-[24px] bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-2xl">

              <CalendarDays className="w-8 h-8" />

            </div>

            <div>

              <h1 className="text-4xl font-black">
                Workout Calendar
              </h1>

              <p className="text-slate-400 mt-2 text-base">
                Track your workouts and consistency
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
          className="h-14 px-7 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 font-bold shadow-2xl hover:scale-[1.02] transition-all"
        >
          Back Dashboard
        </button>
      </div>

      {/* MAIN GRID */}
     <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.8fr] gap-6 items-start">

  {/* CALENDAR */}
  <div className="bg-white/5 border border-white/10 rounded-[30px] p-5 backdrop-blur-xl shadow-2xl h-fit">

    <Calendar
      onChange={
        handleDateChange
      }
      value={value}
      tileClassName={
        tileClassName
      }
    />
  </div>

  {/* RIGHT PANEL */}
  <div className="space-y-6">

    {/* SUMMARY */}
    <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 backdrop-blur-xl">

      <div className="flex items-center gap-4 mb-5">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">

          <Flame />

        </div>

        <div>

          <h2 className="text-3xl font-black">
            Summary
          </h2>

          <p className="text-slate-400 mt-1">
            Workout stats
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

          <p className="text-slate-400 text-sm">
            Total Workouts
          </p>

          <h2 className="text-4xl font-black mt-2 text-pink-400">
            {
              workouts.length
            }
          </h2>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

          <p className="text-slate-400 text-sm">
            Selected Date
          </p>

          <h2 className="text-2xl font-black mt-2 text-cyan-400">
            {
              formatDate(
                value
              )
            }
          </h2>
        </div>
      </div>
    </div>

    {/* WORKOUTS */}
    <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 backdrop-blur-xl">

      <h2 className="text-3xl font-black mb-5">
        Day Workouts
      </h2>

      {selectedWorkouts.length ===
      0 ? (

        <div className="bg-white/5 border border-white/10 rounded-[24px] p-5 text-center">

          <p className="text-slate-400">
            No workouts logged
          </p>
        </div>

      ) : (

        <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">

          {selectedWorkouts.map(
            (
              workout,
              index
            ) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-[24px] p-5"
              >

                {/* TOP */}
                <div className="flex items-center gap-4 mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">

                    <Dumbbell size={20} />

                  </div>

                  <div>

                    <h3 className="text-2xl font-black">
                      {
                        workout
                          .exercises
                          .length
                      } Exercises
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      Workout Session
                    </p>
                  </div>
                </div>

                {/* EXERCISES */}
                <div className="space-y-3">

                  {workout.exercises.map(
                    (
                      exercise,
                      exIndex
                    ) => (

                      <div
                        key={
                          exIndex
                        }
                        className="bg-white/5 rounded-2xl p-4 border border-white/10"
                      >

                        <p className="font-bold text-lg">
                          {
                            exercise.exercise
                          }
                        </p>

                        <p className="text-slate-400 text-sm mt-1">
                          {
                            exercise
                              .sets
                              .length
                          } sets
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* NOTES */}
                <div className="mt-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">

                  <p className="text-slate-300 text-sm leading-7">
                    {
                      workout.notes
                    }
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default CalendarPage;