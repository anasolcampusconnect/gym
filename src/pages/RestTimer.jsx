// src/pages/RestTimerPage.jsx

import {
  TimerReset,
  Play,
  Pause,
  X,
  Clock3,
  BellRing,
  Square,
  Timer,
  RotateCcw,
  CheckCircle2,
  Dumbbell,
  Sparkles,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const RestTimerPage = () => {

  // =========================================
  // USER + THEME
  // =========================================

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
      from-[#fff7fb]
      via-[#f5f7ff]
      to-[#eefcff]
      text-slate-900
      `;

  const cardClass =
    isDark

      ? `
      bg-white/[0.04]
      border-white/10
      backdrop-blur-xl
      `

      : `
      bg-white/75
      border-white/70
      backdrop-blur-2xl
      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
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

  // =========================================
  // STATES
  // =========================================

  const [
    selectedTime,
    setSelectedTime,
  ] = useState(60);

  const [
    customTime,
    setCustomTime,
  ] = useState("");

  const [
    timeLeft,
    setTimeLeft,
  ] = useState(60);

  const [
    isRunning,
    setIsRunning,
  ] = useState(false);

  const [
    showTimer,
    setShowTimer,
  ] = useState(false);

  const [
    workoutStarted,
    setWorkoutStarted,
  ] = useState(false);

  const [
    totalWorkoutTime,
    setTotalWorkoutTime,
  ] = useState(0);

  const [
    liveWorkoutSeconds,
    setLiveWorkoutSeconds,
  ] = useState(0);

  const [
    showWorkoutPopup,
    setShowWorkoutPopup,
  ] = useState(false);

  const intervalRef =
    useRef(null);

  const workoutIntervalRef =
    useRef(null);

  // =========================================
  // FORMAT TIME
  // =========================================

  const formatTime = (
    seconds
  ) => {

    const hrs =
      Math.floor(
        seconds / 3600
      );

    const mins =
      Math.floor(
        (seconds % 3600) / 60
      );

    const secs =
      seconds % 60;

    if (hrs > 0) {

      return `${String(
        hrs
      ).padStart(
        2,
        "0"
      )}:${String(
        mins
      ).padStart(
        2,
        "0"
      )}:${String(
        secs
      ).padStart(
        2,
        "0"
      )}`;
    }

    return `${String(
      mins
    ).padStart(
      2,
      "0"
    )}:${String(
      secs
    ).padStart(
      2,
      "0"
    )}`;
  };

  // =========================================
  // TIMER
  // =========================================

  useEffect(() => {

    if (
      isRunning &&
      timeLeft > 0
    ) {

      intervalRef.current =
        setInterval(() => {

          setTimeLeft(
            (prev) =>
              prev - 1
          );

        }, 1000);

    } else if (
      timeLeft === 0
    ) {

      setIsRunning(false);

      playBeep();
    }

    return () =>
      clearInterval(
        intervalRef.current
      );

  }, [isRunning, timeLeft]);

  // =========================================
  // WORKOUT TIMER
  // =========================================

  useEffect(() => {

    if (
      workoutStarted
    ) {

      workoutIntervalRef.current =
        setInterval(() => {

          setLiveWorkoutSeconds(
            (prev) =>
              prev + 1
          );

        }, 1000);
    }

    return () =>
      clearInterval(
        workoutIntervalRef.current
      );

  }, [workoutStarted]);

  // =========================================
  // BEEP
  // =========================================

  const playBeep = () => {

    const audio =
      new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
      );

    audio.play();
  };

  // =========================================
  // START TIMER
  // =========================================

  const startTimer =
    (seconds) => {

      setSelectedTime(
        seconds
      );

      setTimeLeft(
        seconds
      );

      setShowTimer(true);

      setIsRunning(true);
    };

  // =========================================
  // CONTROLS
  // =========================================

  const pauseTimer =
    () => {

      setIsRunning(false);
    };

  const resumeTimer =
    () => {

      if (
        timeLeft > 0
      ) {

        setIsRunning(true);
      }
    };

  const resetTimer =
    () => {

      setIsRunning(false);

      setTimeLeft(
        selectedTime
      );
    };

  // =========================================
  // WORKOUT SESSION
  // =========================================

  const startWorkout =
    () => {

      setWorkoutStarted(
        true
      );

      setLiveWorkoutSeconds(
        0
      );

      setTotalWorkoutTime(
        0
      );
    };

  const stopWorkout =
    () => {

      setWorkoutStarted(
        false
      );

      clearInterval(
        workoutIntervalRef.current
      );

      setTotalWorkoutTime(
        liveWorkoutSeconds
      );

      setShowWorkoutPopup(
        true
      );

      playBeep();
    };

  const refreshWorkout =
    () => {

      clearInterval(
        workoutIntervalRef.current
      );

      setWorkoutStarted(
        false
      );

      setLiveWorkoutSeconds(
        0
      );

      setTotalWorkoutTime(
        0
      );
    };

  // =========================================
  // PRESETS
  // =========================================

  const presets = [
    30,
    60,
    90,
    120,
  ];

  return (

    <div
      className={`
      min-h-screen
      ${bgClass}
      p-5
      pb-32
      overflow-hidden
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

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div
                className={`
                w-14
                h-14
                rounded-[18px]
                flex
                items-center
                justify-center

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
                    `
                }
                `}
              >

                <Clock3 className="w-7 h-7" />

              </div>

              <div>

                <h1 className="text-4xl font-black">
                  Rest Timer
                </h1>

                <p className={`${subText} text-sm mt-1`}>
                  Smart workout recovery tracker
                </p>

              </div>
            </div>
          </div>

          <div
            className={`
            px-5
            py-3
            rounded-2xl
            flex
            items-center
            gap-2
            font-semibold

            ${
              isDark

                ? `
                bg-cyan-500/10
                text-cyan-400
                border border-cyan-500/20
                `

                : `
                bg-cyan-50
                text-cyan-700
                border border-cyan-200
                `
            }
            `}
          >

            <Sparkles size={18} />

            Recovery Mode

          </div>
        </div>
      </motion.div>

      {/* WORKOUT SESSION */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        mb-6
        `}
      >

        <div className="flex items-center justify-between flex-wrap gap-5">

          <div>

            <div className="flex items-center gap-3">

              <div
                className={`
                w-14
                h-14
                rounded-[18px]
                flex
                items-center
                justify-center

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
                    from-cyan-100
                    to-blue-100
                    text-cyan-700
                    `
                }
                `}
              >

                <Dumbbell className="w-7 h-7" />

              </div>

              <div>

                <h2 className="text-3xl font-black">
                  Workout Session
                </h2>

                <p className={`${subText} mt-1`}>
                  Live workout duration tracker
                </p>

              </div>
            </div>
          </div>

          <div
            className={`
            px-6
            py-5
            rounded-[26px]
            text-center

            ${
              isDark

                ? `
                bg-cyan-500/10
                border border-cyan-500/20
                `

                : `
                bg-cyan-50
                border border-cyan-200
                `
            }
            `}
          >

            <p className={`${subText} text-sm`}>
              Workout Duration
            </p>

            <h1 className="text-5xl font-black text-cyan-400 mt-2">

              {formatTime(
                liveWorkoutSeconds
              )}

            </h1>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">

          {!workoutStarted ? (

            <button
              onClick={
                startWorkout
              }
              className="
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-emerald-500
              text-white
              font-bold
              flex
              items-center
              justify-center
              gap-3
              shadow-lg
              "
            >

              <Play size={20} />

              Start Workout

            </button>

          ) : (

            <button
              onClick={
                stopWorkout
              }
              className="
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-pink-500
              text-white
              font-bold
              flex
              items-center
              justify-center
              gap-3
              shadow-lg
              "
            >

              <Square size={20} />

              Stop Workout

            </button>
          )}

          {/* REFRESH */}

          <button
            onClick={
              refreshWorkout
            }
            className={`
            h-14
            rounded-2xl
            font-bold
            flex
            items-center
            justify-center
            gap-3
            transition-all

            ${
              isDark

                ? `
                bg-white/5
                border border-white/10
                hover:bg-white/10
                `

                : `
                bg-white
                border border-slate-200
                hover:bg-slate-50
                shadow-sm
                `
            }
            `}
          >

            <RotateCcw
              size={20}
              className="text-cyan-400"
            />

            Refresh

          </button>

          {/* TOTAL */}

          <div
            className={`
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            gap-3

            ${
              isDark

                ? `
                bg-cyan-500/10
                border border-cyan-500/20
                `

                : `
                bg-cyan-50
                border border-cyan-200
                `
            }
            `}
          >

            <Timer className="text-cyan-400" />

            <span className="text-xl font-black text-cyan-400">

              {formatTime(
                totalWorkoutTime
              )}

            </span>
          </div>
        </div>
      </div>

      {/* PRESETS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        {presets.map(
          (
            item,
            index
          ) => (

            <motion.button

              key={index}

              whileHover={{
                y: -5,
              }}

              whileTap={{
                scale: 0.96,
              }}

              onClick={() =>
                startTimer(
                  item
                )
              }

              className={`
              rounded-[28px]
              p-6
              border
              transition-all

              ${
                isDark

                  ? `
                  bg-white/[0.04]
                  border-white/10
                  hover:border-pink-500/40
                  `

                  : `
                  bg-white/80
                  border-white
                  hover:border-pink-300
                  shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                  `
              }
              `}
            >

              <h2 className="text-4xl font-black text-pink-400">
                {item}s
              </h2>

              <p className={`${subText} mt-2`}>
                Quick Start
              </p>

            </motion.button>
          )
        )}
      </div>

      {/* CUSTOM */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        `}
      >

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="number"
            placeholder="Enter custom seconds..."
            value={customTime}
            onChange={(e) =>
              setCustomTime(
                e.target.value
              )
            }
            className={`
            flex-1
            h-14
            rounded-2xl
            border
            px-5
            outline-none
            transition-all

            ${inputClass}
            `}
          />

          <button
            onClick={() => {

              if (
                customTime &&
                Number(
                  customTime
                ) > 0
              ) {

                startTimer(
                  Number(
                    customTime
                  )
                );
              }
            }}
            className="
            h-14
            px-8
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-orange-500
            text-white
            font-bold
            shadow-lg
            "
          >
            Start Timer
          </button>
        </div>
      </div>

      {/* TIMER MODAL */}

      <AnimatePresence>

        {showTimer && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
            fixed
            inset-0
            z-[9999]
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
            "
          >

            <motion.div

              initial={{
                scale: 0.8,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              exit={{
                scale: 0.8,
                opacity: 0,
              }}

              className={`
              w-full
              max-w-md
              rounded-[34px]
              p-7
              relative
              border

              ${
                isDark

                  ? `
                  bg-[#111827]
                  border-white/10
                  `

                  : `
                  bg-white
                  border-slate-200
                  shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                  `
              }
              `}
            >

              {/* CLOSE */}

              <button
                onClick={() =>
                  setShowTimer(
                    false
                  )
                }
                className="
                absolute
                top-5
                right-5
                w-11
                h-11
                rounded-2xl
                bg-red-500/10
                text-red-400
                flex
                items-center
                justify-center
                "
              >

                <X />

              </button>

              {/* ICON */}

              <div
                className="
                w-20
                h-20
                rounded-[24px]
                bg-gradient-to-r
                from-pink-500
                to-orange-500
                flex
                items-center
                justify-center
                mx-auto
                mb-5
                text-white
                "
              >

                <BellRing className="w-10 h-10" />

              </div>

              {/* TIME */}

              <div className="text-center">

                <p className={subText}>
                  Rest Countdown
                </p>

                <h1 className="text-6xl font-black mt-3 mb-6">

                  {formatTime(
                    timeLeft
                  )}

                </h1>

                {/* PROGRESS */}

                <div
                  className={`
                  w-full
                  h-3
                  rounded-full
                  overflow-hidden
                  mb-8

                  ${
                    isDark
                      ? "bg-white/10"
                      : "bg-slate-100"
                  }
                  `}
                >

                  <motion.div

                    animate={{
                      width:
                        `${
                          (
                            timeLeft /
                            selectedTime
                          ) *
                          100
                        }%`,
                    }}

                    className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-pink-500
                    to-orange-500
                    "
                  />
                </div>

                {/* CONTROLS */}

                <div className="grid grid-cols-3 gap-3">

                  {!isRunning ? (

                    <button
                      onClick={
                        resumeTimer
                      }
                      className="
                      h-14
                      rounded-2xl
                      bg-green-500/15
                      text-green-400
                      flex
                      items-center
                      justify-center
                      "
                    >

                      <Play />

                    </button>

                  ) : (

                    <button
                      onClick={
                        pauseTimer
                      }
                      className="
                      h-14
                      rounded-2xl
                      bg-yellow-500/15
                      text-yellow-400
                      flex
                      items-center
                      justify-center
                      "
                    >

                      <Pause />

                    </button>
                  )}

                  <button
                    onClick={
                      resetTimer
                    }
                    className="
                    h-14
                    rounded-2xl
                    bg-cyan-500/15
                    text-cyan-400
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <TimerReset />

                  </button>

                  <button
                    onClick={() => {

                      setShowTimer(
                        false
                      );

                      setIsRunning(
                        false
                      );
                    }}
                    className="
                    h-14
                    rounded-2xl
                    bg-red-500/15
                    text-red-400
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <X />

                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WORKOUT COMPLETE */}

      <AnimatePresence>

        {showWorkoutPopup && (

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="
            fixed
            inset-0
            z-[99999]
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
            "
          >

            <motion.div

              initial={{
                scale: 0.8,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              exit={{
                scale: 0.8,
                opacity: 0,
              }}

              className={`
              w-full
              max-w-md
              rounded-[34px]
              p-7
              text-center
              border

              ${
                isDark

                  ? `
                  bg-[#111827]
                  border-white/10
                  `

                  : `
                  bg-white
                  border-slate-200
                  shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                  `
              }
              `}
            >

              <div
                className="
                w-24
                h-24
                rounded-[30px]
                bg-gradient-to-r
                from-green-500
                to-emerald-500
                flex
                items-center
                justify-center
                mx-auto
                mb-6
                "
              >

                <CheckCircle2 className="w-12 h-12 text-white" />

              </div>

              <h1 className="text-3xl font-black">
                Great Job 🔥
              </h1>

              <p className={`${subText} mt-3 text-lg`}>
                You worked out for
              </p>

              <h2 className="text-5xl font-black text-cyan-400 mt-4">

                {formatTime(
                  totalWorkoutTime
                )}

              </h2>

              <button
                onClick={() =>
                  setShowWorkoutPopup(
                    false
                  )
                }
                className="
                mt-8
                w-full
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-pink-500
                to-orange-500
                text-white
                font-bold
                shadow-lg
                "
              >
                Awesome
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestTimerPage;