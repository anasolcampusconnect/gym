import {
  ArrowLeft,
  Trophy,
  Camera,
  Flame,
  Calendar,
  Target,
  TrendingUp,
  Dumbbell,
  Trash2,
    Activity,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#ec4899",
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f97316",
];

const ProgressAnalyticsPage = () => {

  const navigate = useNavigate();

  // ============================================
  // USER
  // ============================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "gym_user"
      )
    );

  const userId =
    currentUser?.email ||
    "guest";

  // ============================================
  // SETTINGS
  // ============================================

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
  // THEME
  // ============================================

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
      border-white/60
      backdrop-blur-2xl
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  const inputClass =
    isDark

      ? `
      bg-white/10
      border-white/10
      text-white
      `

      : `
      bg-white/70
      border-pink-100
      text-slate-800
      shadow-sm
      `;

  const historyKey =
    `workout_history_${userId}`;

  // ============================================
  // STORAGE
  // ============================================

  const workoutHistory =
    JSON.parse(
      localStorage.getItem(
        historyKey
      )
    ) || [];
    

  const [
    photos,
    setPhotos
  ] = useState(
    JSON.parse(
      localStorage.getItem(
        `progress_photos_${userId}`
      )
    ) || []
  );

  const [
    measurements,
    setMeasurements
  ] = useState(
    JSON.parse(
      localStorage.getItem(
        `measurements_${userId}`
      )
    ) || []
  );

  // ============================================
  // TOTAL STATS
  // ============================================

  const totalWorkouts =
    workoutHistory.length;

  const totalCalories =
    workoutHistory.reduce(
      (acc, item) =>
        acc +
        Number(
          item.totalCalories || 0
        ),
      0
    );
    // ============================================
  // TODAY + MONTHLY CALORIES
  // ============================================

  const todayDate =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayCalories =
    workoutHistory
      .filter(
        (item) =>
          item.date === todayDate
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(
            item.totalCalories || 0
          ),
        0
      );

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const monthlyCalories =
    workoutHistory
      .filter(
        (item) => {

          const workoutDate =
            new Date(item.date);

          return (
            workoutDate.getMonth() === currentMonth &&
            workoutDate.getFullYear() === currentYear
          );
        }
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(
            item.totalCalories || 0
          ),
        0
      );

  const averageRating =
    workoutHistory.length > 0
      ? (
          workoutHistory.reduce(
            (acc, item) =>
              acc +
              Number(
                item.rating || 0
              ),
            0
          ) /
          workoutHistory.length
        ).toFixed(1)
      : 0;
    

  // ============================================
  // CHART DATA
  // ============================================

  const caloriesData =
    workoutHistory.map(
      (item) => ({
        date:
          item.date,
        calories:
          item.totalCalories || 0,
      })
    );

  // ============================================
  // PIE DATA
  // ============================================

  const exerciseMap = {};

  workoutHistory.forEach(
    (workout) => {

      workout.exercises.forEach(
        (exercise) => {

          exerciseMap[
            exercise.category
          ] =
            (
              exerciseMap[
                exercise.category
              ] || 0
            ) + 1;
        }
      );
    }
  );

  const pieData =
    Object.keys(
      exerciseMap
    ).map(
      (key) => ({
        name: key,
        value:
          exerciseMap[key],
      })
    );

  // ============================================
  // BEST WORKOUT
  // ============================================

  const bestWorkout =
    workoutHistory.reduce(
      (max, item) => {

        if (
          Number(
            item.totalCalories || 0
          ) >

          Number(
            max.totalCalories || 0
          )
        ) {
          return item;
        }

        return max;
      },
      {}
    );

  // ============================================
  // PHOTO UPLOAD
  // ============================================

  const uploadPhoto =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend =
        () => {

          const newPhoto = {

            id: Date.now(),

            image:
              reader.result,

            date:
              new Date()
                .toLocaleDateString(),
          };

          const updated = [
            ...photos,
            newPhoto,
          ];

          setPhotos(updated);

          localStorage.setItem(
            `progress_photos_${userId}`,
            JSON.stringify(
              updated
            )
          );
        };

      reader.readAsDataURL(file);
    };

  // ============================================
  // DELETE PHOTO
  // ============================================

  const deletePhoto =
    (id) => {

      const updated =
        photos.filter(
          (photo) =>
            photo.id !== id
        );

      setPhotos(updated);

      localStorage.setItem(
        `progress_photos_${userId}`,
        JSON.stringify(
          updated
        )
      );
    };

  // ============================================
  // SAVE MEASUREMENTS
  // ============================================

  const saveMeasurement =
    (e) => {

      e.preventDefault();

      const form =
        new FormData(
          e.target
        );

      const data = {

        id: Date.now(),

        date:
          new Date()
            .toLocaleDateString(),

        weight:
          form.get("weight"),

        height:
          form.get("height"),

        chest:
          form.get("chest"),

        waist:
          form.get("waist"),

        arms:
          form.get("arms"),
      };

      const updated = [
        ...measurements,
        data,
      ];

      setMeasurements(updated);

      localStorage.setItem(
        `measurements_${userId}`,
        JSON.stringify(updated)
      );

      e.target.reset();
    };

  // ============================================
  // DELETE MEASUREMENT
  // ============================================

  const deleteMeasurement =
    (id) => {

      const updated =
        measurements.filter(
          (item) =>
            item.id !== id
        );

      setMeasurements(updated);

      localStorage.setItem(
        `measurements_${userId}`,
        JSON.stringify(updated)
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
        rounded-[34px]
        p-6
        mb-6
        `}
      >

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className={`
          h-12
          px-5
          rounded-2xl
          flex
          items-center
          gap-2
          mb-6

          ${
            isDark

              ? `
              bg-white/10
              text-white
              `

              : `
              bg-white
              text-slate-700
              shadow-md
              `
          }
          `}
        >

          <ArrowLeft size={18} />

          Back

        </button>

        <div className="flex justify-between items-center flex-wrap gap-5">

          <div>

            <h1 className="text-5xl font-black">
              Progress Analytics
            </h1>

            <p className={`${subText} mt-3 text-lg`}>
              Track your transformation journey
            </p>
          </div>

          <div
            className={`
            w-24
            h-24
            rounded-[30px]
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

            <TrendingUp className="w-12 h-12" />

          </div>
        </div>
      </motion.div>

      {/* STATS */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        {[
          {
            title: "Total Workouts",
            value: totalWorkouts,
            icon: <Dumbbell />,
            color: "from-pink-500 to-rose-500",
          },

          {
            title: "Calories Burned",
            value: totalCalories,
            icon: <Flame />,
            color: "from-orange-500 to-red-500",
          },

          {
            title: "Workout Days",
            value: totalWorkouts,
            icon: <Calendar />,
            color: "from-cyan-500 to-blue-500",
          },

          {
            title: "Avg Rating",
            value: `${averageRating}/10`,
            icon: <Trophy />,
            color: "from-yellow-500 to-orange-500",
          },

        ].map(
          (
            item,
            index
          ) => (

            <motion.div

              key={index}

              whileHover={{
                y: -4,
              }}

              className={`
              ${cardClass}
              border
              rounded-[30px]
              p-5
              `}
            >

              <div className="flex items-center gap-4">

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
                      ${item.color}
                      text-white
                      `

                      : `
                      bg-gradient-to-r
                      from-pink-100
                      to-orange-100
                      text-slate-700
                      `
                  }
                  `}
                >

                  {item.icon}

                </div>

                <div>

                  <p className={`${subText} text-sm`}>
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-black mt-1">
                    {item.value}
                  </h2>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div> */}
            {/* STATS */}

     <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-6">

        {[
          {
            title: "Total Workouts",
            value: totalWorkouts,
            icon: <Dumbbell />,
            color: "from-pink-500 to-rose-500",
          },

          {
            title: "Total Calories",
            value: `${totalCalories} kcal`,
            icon: <Flame />,
            color: "from-blue-500 to-pink-500",
          },
          {
            title: "Monthly Calories",
            value: `${monthlyCalories} kcal`,
            icon: <TrendingUp />,
            color: "from-orange-500 to-red-500",
          },
          {
            title: "Workout Days",
            value: totalWorkouts,
            icon: <Calendar />,
            color: "from-cyan-500 to-blue-500",
          },

          {
            title: "Avg Rating",
            value: `${averageRating}/10`,
            icon: <Trophy />,
            color: "from-yellow-500 to-orange-500",
          },

        ].map(
          (
            item,
            index
          ) => (

            <motion.div

              key={index}

              whileHover={{
                y: -4,
              }}

             className={`
  ${cardClass}
  border
  rounded-[26px]
  px-4
  py-4
  min-w-0
`}
            >

            <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`
                  w-12
                  h-12
                  shrink-0
                  rounded-2xl
                  flex
                  items-center
                  justify-center

                  ${
                    isDark

                      ? `
                      bg-gradient-to-r
                      ${item.color}
                      text-white
                      `

                      : `
                      bg-gradient-to-r
                      from-pink-100
                      to-orange-100
                      text-slate-700
                      `
                  }
                  `}
                >

                  {item.icon}

                </div>

                <div>

                  <p className={`${subText} text-sm`}>
                    {item.title}
                  </p>

             <h2 className="text-2xl font-black mt-1 truncate">
                    {item.value}
                  </h2>

                </div>
              </div>
            </motion.div>
          )
        )}
      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* LINE */}

        <div
          className={`
          ${cardClass}
          border
          rounded-[32px]
          p-6
          `}
        >

          <h2 className="text-3xl font-black mb-6">
            Calories Progress
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={caloriesData}>

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="calories"
                stroke="#ec4899"
                strokeWidth={4}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}

        <div
          className={`
          ${cardClass}
          border
          rounded-[32px]
          p-6
          `}
        >

          <h2 className="text-3xl font-black mb-6">
            Workout Categories
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
              >

                {pieData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BEST WORKOUT */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        mt-6
        `}
      >

        <div className="flex items-center gap-4 mb-6">

          <div
            className={`
            w-16
            h-16
            rounded-3xl
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

            <Target className="w-8 h-8" />

          </div>

          <div>

            <h2 className="text-3xl font-black">
              Best Workout
            </h2>

            <p className={subText}>
              Highest calories burned
            </p>
          </div>
        </div>

        {bestWorkout?.date ? (

          <div
            className={`
            rounded-[28px]
            p-5

            ${
              isDark
                ? "bg-white/5 border border-white/10"
                : "bg-white/60 border border-white/50"
            }
            `}
          >

            <div className="flex flex-wrap gap-4">

              <div className="px-5 py-3 rounded-2xl bg-pink-500/20 text-pink-500 font-bold">
                {bestWorkout.date}
              </div>

              <div className="px-5 py-3 rounded-2xl bg-orange-500/20 text-orange-500 font-bold">
                {bestWorkout.totalCalories} kcal
              </div>

              <div className="px-5 py-3 rounded-2xl bg-cyan-500/20 text-cyan-500 font-bold">
                {bestWorkout.rating}/10
              </div>
            </div>
          </div>

        ) : (

          <div className={subText}>
            No workout data found
          </div>
        )}
      </div>
            {/* ====================================== */}
      {/* PROGRESS PHOTOS */}
      {/* ====================================== */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        mt-6
        `}
      >

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div>

            <h2 className="text-3xl font-black">
              Progress Photos
            </h2>

            <p className={`${subText} mt-2`}>
              Track your body transformation visually
            </p>

          </div>

          <label
            className={`
            h-14
            px-6
            rounded-2xl
            font-bold
            flex
            items-center
            gap-3
            cursor-pointer
            transition-all
            duration-300

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
                text-slate-800
                shadow-md
                `
            }
            `}
          >

            <Camera />

            Upload Photo

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={uploadPhoto}
            />

          </label>
        </div>

        {photos.length === 0 ? (

          <div
            className={`
            mt-10
            text-center
            py-16
            rounded-[28px]

            ${
              isDark
                ? "bg-white/5"
                : "bg-white/40"
            }
            `}
          >

            <Camera
              className={`
              w-14
              h-14
              mx-auto
              mb-4

              ${
                isDark
                  ? "text-slate-500"
                  : "text-slate-400"
              }
              `}
            />

            <p className={subText}>
              No progress photos uploaded
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

            {photos.map(
              (
                photo,
                index
              ) => (

                <motion.div

                  key={index}

                  whileHover={{
                    y: -5,
                  }}

                  className={`
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  group

                  ${
                    isDark
                      ? "border-white/10"
                      : "border-white/60"
                  }
                  `}
                >

                  <img
                    src={photo.image}
                    alt=""
                    className="
                    w-full
                    h-72
                    object-cover
                    "
                  />

                  <div
                    className="
                    absolute
                    inset-0
                    bg-black/50
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                    flex
                    flex-col
                    justify-between
                    p-4
                    "
                  >

                    <div className="flex justify-end">

                      <button
                        onClick={() =>
                          deletePhoto(
                            photo.id
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

                        <Trash2 />

                      </button>
                    </div>

                    <div
                      className="
                      bg-white/20
                      backdrop-blur-xl
                      rounded-2xl
                      px-4
                      py-3
                      text-white
                      text-sm
                      font-semibold
                      "
                    >

                      Uploaded:
                      {" "}
                      {photo.date}

                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>

      {/* ====================================== */}
      {/* BODY MEASUREMENTS */}
      {/* ====================================== */}

      <div
        className={`
        ${cardClass}
        border
        rounded-[32px]
        p-6
        mt-6
        `}
      >

        <div className="mb-8">

          <h2 className="text-3xl font-black">
            Body Measurements
          </h2>

          <p className={`${subText} mt-2`}>
            Track your physical progress professionally
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={saveMeasurement}
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-5
          "
        >

          {[
            "weight",
            "height",
            "chest",
            "waist",
            "arms",
          ].map(
            (
              field,
              index
            ) => (

              <input
                key={index}
                type="number"
                name={field}
                required
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1)
                }
                className={`
                h-14
                rounded-2xl
                border
                px-5
                outline-none
                transition-all
                duration-300

                ${inputClass}
                `}
              />
            )
          )}

          <button
            className={`
            h-14
            rounded-2xl
            font-bold
            md:col-span-2
            xl:col-span-5
            transition-all
            duration-300

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
                text-slate-800
                shadow-md
                `
            }
            `}
          >

            Save Measurements

          </button>
        </form>

        {/* SAVED DATA */}

        <div className="mt-8 space-y-5">

          {measurements.length === 0 ? (

            <div
              className={`
              text-center
              py-14
              rounded-[28px]

              ${
                isDark
                  ? "bg-white/5"
                  : "bg-white/40"
              }
              `}
            >

              <p className={subText}>
                No measurements added
              </p>

            </div>

          ) : (

            measurements
              .slice()
              .reverse()
              .map(
                (
                  item,
                  index
                ) => (

                  <motion.div

                    key={index}

                    whileHover={{
                      y: -3,
                    }}

                    className={`
                    rounded-[30px]
                    p-5
                    border

                    ${
                      isDark

                        ? `
                        bg-white/5
                        border-white/10
                        `

                        : `
                        bg-white/60
                        border-white/60
                        `
                    }
                    `}
                  >

                    <div className="flex justify-between items-start gap-5">

                      <div
                        className="
                        grid
                        grid-cols-2
                        md:grid-cols-5
                        gap-5
                        w-full
                        "
                      >

                        {[
                          {
                            label: "Weight",
                            value: `${item.weight} kg`,
                          },

                          {
                            label: "Height",
                            value: `${item.height} cm`,
                          },

                          {
                            label: "Chest",
                            value: `${item.chest} cm`,
                          },

                          {
                            label: "Waist",
                            value: `${item.waist} cm`,
                          },

                          {
                            label: "Arms",
                            value: `${item.arms} cm`,
                          },

                        ].map(
                          (
                            data,
                            idx
                          ) => (

                            <div key={idx}>

                             <p className={`${subText} text-xs truncate`}>
                                {data.label}
                              </p>

                              <h3 className="text-xl font-black mt-2">
                                {data.value}
                              </h3>

                            </div>
                          )
                        )}
                      </div>

                      <button
                        onClick={() =>
                          deleteMeasurement(
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
                        shrink-0
                        "
                      >

                        <Trash2 />

                      </button>
                    </div>

                    <div className={`${subText} text-sm mt-5`}>
                      Saved on:
                      {" "}
                      {item.date}
                    </div>

                  </motion.div>
                )
              )
          )}
        </div>
      </div>
    </div>
    
  );
};

export default ProgressAnalyticsPage;