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
  // TIMER CONTROLS
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
  // START WORKOUT
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

  // =========================================
  // STOP WORKOUT
  // =========================================

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

  // =========================================
  // REFRESH WORKOUT
  // =========================================

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

    <div className="min-h-screen bg-[#070B1A] text-white p-5 pb-32 overflow-hidden">

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

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="
        bg-white/[0.04]
        border
        border-white/10
        rounded-[28px]
        p-5
        mb-5
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-black">
              Rest Timer
            </h1>

            <p className="text-slate-400 mt-1 text-sm">
              Smart workout recovery tracker
            </p>
          </div>

          <div
            className="
            w-16
            h-16
            rounded-[20px]
            bg-gradient-to-r
            from-pink-500
            to-orange-500
            flex
            items-center
            justify-center
            "
          >

            <Clock3 className="w-8 h-8" />

          </div>
        </div>
      </motion.div>

      {/* WORKOUT SESSION */}

      <div
        className="
        bg-white/[0.04]
        border
        border-white/10
        rounded-[28px]
        p-5
        mb-5
        "
      >

        <div className="flex items-center justify-between gap-5 flex-wrap">

          <div>

            <h2 className="text-2xl font-black">
              Workout Session
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Live workout duration tracker
            </p>
          </div>

          <div className="text-right">

            <p className="text-slate-400 text-xs">
              Workout Duration
            </p>

            <h1 className="text-4xl font-black text-cyan-400 mt-1">

              {formatTime(
                liveWorkoutSeconds
              )}

            </h1>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

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
              font-bold
              flex
              items-center
              justify-center
              gap-3
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
              font-bold
              flex
              items-center
              justify-center
              gap-3
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
            className="
            h-14
            rounded-2xl
            bg-white/10
            border
            border-white/10
            font-bold
            flex
            items-center
            justify-center
            gap-3
            hover:bg-white/15
            transition-all
            "
          >

            <RotateCcw
              size={20}
              className="text-cyan-400"
            />

            Refresh

          </button>

          {/* TOTAL */}

          <div
            className="
            h-14
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            flex
            items-center
            justify-center
            gap-3
            "
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">

        {presets.map(
          (
            item,
            index
          ) => (

            <motion.button

              key={index}

              whileHover={{
                y: -4,
              }}

              whileTap={{
                scale: 0.95,
              }}

              onClick={() =>
                startTimer(
                  item
                )
              }

              className="
              h-24
              rounded-[24px]
              bg-white/[0.04]
              border
              border-white/10
              flex
              flex-col
              items-center
              justify-center
              hover:border-pink-500/40
              transition-all
              "
            >

              <h2 className="text-3xl font-black text-pink-400">
                {item}s
              </h2>

              <p className="text-slate-400 text-sm">
                Quick Start
              </p>

            </motion.button>
          )
        )}
      </div>

      {/* CUSTOM */}

      <div
        className="
        bg-white/[0.04]
        border
        border-white/10
        rounded-[28px]
        p-5
        "
      >

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="number"
            placeholder="Custom seconds"
            value={customTime}
            onChange={(e) =>
              setCustomTime(
                e.target.value
              )
            }
            className="
            flex-1
            h-14
            rounded-2xl
            bg-white/10
            border
            border-white/10
            px-5
            outline-none
            "
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
            font-bold
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

              className="
              w-full
              max-w-md
              bg-[#111827]
              border
              border-white/10
              rounded-[34px]
              p-7
              relative
              "
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
                "
              >

                <BellRing className="w-10 h-10" />

              </div>

              {/* TIME */}

              <div className="text-center">

                <p className="text-slate-400">
                  Rest Countdown
                </p>

                <h1 className="text-6xl font-black mt-3 mb-6">

                  {formatTime(
                    timeLeft
                  )}

                </h1>

                {/* PROGRESS */}

                <div
                  className="
                  w-full
                  h-3
                  rounded-full
                  bg-white/10
                  overflow-hidden
                  mb-8
                  "
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
                      bg-green-500/20
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
                      bg-yellow-500/20
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
                    bg-cyan-500/20
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
                    bg-red-500/20
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

      {/* WORKOUT COMPLETE POPUP */}

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

              className="
              w-full
              max-w-md
              rounded-[34px]
              bg-[#111827]
              border
              border-white/10
              p-7
              text-center
              "
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

              <p className="text-slate-400 mt-3 text-lg">
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
                font-bold
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