// src/pages/CalendarPage.jsx

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

  // ============================================
  // USER + THEME
  // ============================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    ) || {};

  const userId =
    currentUser?.email ||
    "guest";

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

  // ============================================
  // THEME CLASSES
  // ============================================

  const bgClass =
    isDark

      ? `
      bg-gradient-to-br
      from-[#070B1A]
      via-[#0B1120]
      to-[#111827]
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
      backdrop-blur-2xl
      `

      : `
      bg-white/70
      border-white/70
      backdrop-blur-2xl
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ============================================
  // LOAD HISTORY
  // ============================================

  useEffect(() => {

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "gym_user"
        )
      );

    if (!currentUser)
      return;

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

  // ============================================
  // FORMAT DATE
  // ============================================

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

  // ============================================
  // HIGHLIGHT WORKOUT DAYS
  // ============================================

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

  // ============================================
  // HANDLE DATE
  // ============================================

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
            color:${isDark ? "white" : "#0f172a"};
            font-family:inherit;
          }

          .react-calendar__navigation{
            margin-bottom:18px;
          }

          .react-calendar__navigation button{
            color:${isDark ? "white" : "#0f172a"};
            font-size:15px;
            background:${
              isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.7)"
            };
            border:none;
            border-radius:14px;
            margin:0 3px;
            height:42px;
            min-width:42px;
            font-weight:700;
          }

          .react-calendar__navigation button:hover{
            background:${
              isDark
                ? "rgba(255,255,255,0.14)"
                : "rgba(255,255,255,1)"
            };
          }

          .react-calendar__month-view__weekdays{
            text-transform:uppercase;
            font-size:11px;
            color:${isDark ? "#94a3b8" : "#64748b"};
            margin-bottom:6px;
            font-weight:700;
          }

          .react-calendar__tile{
            height:68px;
            border-radius:18px;
            color:${isDark ? "white" : "#0f172a"};
            background:transparent;
            transition:0.3s;
            font-weight:700;
            font-size:14px;
          }

          .react-calendar__tile:hover{
            background:${
              isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.8)"
            };
          }

          .react-calendar__tile--active{
            background:linear-gradient(135deg,#ec4899,#f97316)!important;
            color:white !important;
          }

          .highlight{
            background:rgba(236,72,153,0.16)!important;
            border:2px solid #ec4899 !important;
            color:${
              isDark
                ? "white"
                : "#0f172a"
            } !important;
          }

          .react-calendar__month-view__days__day--neighboringMonth{
            color:${isDark ? "#475569" : "#94a3b8"};
          }

        `}
      </style>

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">

        <div>

          <div className="flex items-center gap-4 mb-4">

            <div
              className={`
              w-16
              h-16
              rounded-[24px]
              flex
              items-center
              justify-center
              shadow-2xl

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

              <CalendarDays
                className={`
                w-8
                h-8

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-800"
                }
                `}
              />

            </div>

            <div>

              <h1 className="text-4xl font-black">
                Workout Calendar
              </h1>

              <p className={`${subText} mt-2 text-base`}>
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
          className={`
          h-14
          px-7
          rounded-2xl
          font-bold
          transition-all
          duration-300
          hover:scale-[1.02]

          ${
            isDark

              ? `
              bg-gradient-to-r
              from-pink-500
              to-orange-500
              text-white
              shadow-2xl
              `

              : `
              bg-gradient-to-r
              from-pink-200
              to-orange-200
              text-slate-900
              shadow-lg
              `
          }
          `}
        >

          Back Dashboard

        </button>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.8fr] gap-6 items-start">

        {/* CALENDAR */}

        <div
          className={`
          ${cardClass}
          border
          rounded-[30px]
          p-5
          h-fit
          `}
        >

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

          <div
            className={`
            ${cardClass}
            border
            rounded-[28px]
            p-6
            `}
          >

            <div className="flex items-center gap-4 mb-5">

              <div
                className={`
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center

                ${
                  isDark

                    ? `
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-500
                    `

                    : `
                    bg-gradient-to-r
                    from-cyan-200
                    to-blue-200
                    `
                }
                `}
              >

                <Flame
                  className={
                    isDark
                      ? "text-white"
                      : "text-slate-800"
                  }
                />

              </div>

              <div>

                <h2 className="text-3xl font-black">
                  Summary
                </h2>

                <p className={`${subText} mt-1`}>
                  Workout stats
                </p>

              </div>
            </div>

            <div className="space-y-4">

              <div
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
                    bg-white/70
                    border-white/70
                    `
                }
                `}
              >

                <p className={`${subText} text-sm`}>
                  Total Workouts
                </p>

                <h2 className="text-4xl font-black mt-2 text-pink-400">
                  {
                    workouts.length
                  }
                </h2>

              </div>

              <div
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
                    bg-white/70
                    border-white/70
                    `
                }
                `}
              >

                <p className={`${subText} text-sm`}>
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

          <div
            className={`
            ${cardClass}
            border
            rounded-[28px]
            p-6
            `}
          >

            <h2 className="text-3xl font-black mb-5">
              Day Workouts
            </h2>

            {selectedWorkouts.length ===
            0 ? (

              <div
                className={`
                rounded-[24px]
                p-5
                text-center
                border

                ${
                  isDark

                    ? `
                    bg-white/5
                    border-white/10
                    `

                    : `
                    bg-white/70
                    border-white/70
                    `
                }
                `}
              >

                <p className={subText}>
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
                      className={`
                      rounded-[24px]
                      p-5
                      border

                      ${
                        isDark

                          ? `
                          bg-white/5
                          border-white/10
                          `

                          : `
                          bg-white/70
                          border-white/70
                          `
                      }
                      `}
                    >

                      {/* TOP */}

                      <div className="flex items-center gap-4 mb-5">

                        <div
                          className={`
                          w-12
                          h-12
                          rounded-2xl
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
                            size={20}
                            className={
                              isDark
                                ? "text-white"
                                : "text-slate-800"
                            }
                          />

                        </div>

                        <div>

                          <h3 className="text-2xl font-black">
                            {
                              workout
                                .exercises
                                .length
                            } Exercises
                          </h3>

                          <p className={`${subText} text-sm mt-1`}>
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
                                  bg-white/70
                                  border-white/70
                                  `
                              }
                              `}
                            >

                              <p className="font-bold text-lg">
                                {
                                  exercise.exercise
                                }
                              </p>

                              <p className={`${subText} text-sm mt-1`}>
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

                      <div
                        className={`
                        mt-4
                        rounded-2xl
                        p-4

                        ${
                          isDark

                            ? `
                            bg-cyan-500/10
                            border border-cyan-500/20
                            `

                            : `
                            bg-cyan-100
                            border border-cyan-200
                            `
                        }
                        `}
                      >

                        <p
                          className={`
                          text-sm
                          leading-7

                          ${
                            isDark
                              ? "text-slate-300"
                              : "text-slate-700"
                          }
                          `}
                        >

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