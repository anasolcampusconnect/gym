// ======================================================
// src/pages/WellnessTrackerPage.jsx
// PROFESSIONAL WELLNESS TRACKER
// COMPACT PREMIUM UI
// ======================================================

import {
  useState,
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Droplets,
  Moon,
  UtensilsCrossed,
  Plus,
  Minus,
  Heart,
  Flame,
} from "lucide-react";

const WellnessTrackerPage = () => {

  // ============================================
  // USER
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

  // ============================================
  // THEME
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
  // STATES
  // ============================================

  const [
    water,
    setWater,
  ] = useState(3);

  const [
    sleep,
    setSleep,
  ] = useState(7);

  const [
    selectedMeal,
    setSelectedMeal,
  ] = useState("Breakfast");

  // ============================================
  // LOAD DATA
  // ============================================

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem(
          `wellness_${userId}`
        )
      ) || {};

    setWater(
      data.water || 3
    );

    setSleep(
      data.sleep || 7
    );

  }, []);

  // ============================================
  // SAVE
  // ============================================

  useEffect(() => {

    localStorage.setItem(
      `wellness_${userId}`,

      JSON.stringify({

        water,
        sleep,
      })
    );

  }, [
    water,
    sleep,
  ]);

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
      `

      : `
      bg-white/80
      border-white/70
      backdrop-blur-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      `;

  const subText =
    isDark
      ? "text-slate-400"
      : "text-slate-500";

  // ============================================
  // MEALS
  // ============================================

// ============================================
// MEALS WITH IMAGES
// ============================================

// ============================================
// DYNAMIC MEALS
// ============================================

const getMealPlans = () => {

  // ============================================
  // LOW WATER + LOW SLEEP
  // ============================================

  if (
    water < 3 &&
    sleep < 7
  ) {

    return {

      Breakfast: [

        {
          name: "Hydration Smoothie",
          image:
            "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Banana",
          image:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Oats",
          image:
            "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Milk",
          image:
            "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      Lunch: [

        {
          name: "Vegetable Soup",
          image:
            "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Salad",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Watermelon",
          image:
            "https://images.unsplash.com/photo-1563114773-84221bd62daa?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Coconut Water",
          image:
            "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      Dinner: [

        {
          name: "Fruit Bowl",
          image:
            "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Soup",
          image:
            "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Yogurt",
          image:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Dry Fruits",
          image:
            "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    };
  }

  // ============================================
  // GOOD WATER + LOW SLEEP
  // ============================================

  if (
    water >= 3 &&
    sleep < 7
  ) {

    return {

      Breakfast: [

        {
          name: "Protein Milk",
          image:
            "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Eggs",
          image:
            "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Banana",
          image:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Oats",
          image:
            "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      Lunch: [

        {
          name: "Rice",
          image:
            "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Chicken",
          image:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Veggies",
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Juice",
          image:
            "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      Dinner: [

        {
          name: "Soup",
          image:
            "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Salad",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Yogurt",
          image:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Fruits",
          image:
            "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    };
  }

  // ============================================
  // GOOD RECOVERY
  // ============================================

  return {

    Breakfast: [

      {
        name: "Healthy Toast",
        image:
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Milk",
        image:
          "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Eggs",
        image:
          "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Banana",
        image:
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1200&auto=format&fit=crop",
      },
    ],

    Lunch: [

      {
        name: "Rice",
        image:
          "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Chicken",
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Salad",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Veggies",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
      },
    ],

    Dinner: [

      {
        name: "Soup",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Healthy Salad",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Protein Meal",
        image:
          "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Fruits",
        image:
          "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  };
};

// ============================================
// ACTIVE MEALS
// ============================================

const mealPlans =
  getMealPlans();
  return (

    <div
      className={`
      min-h-screen
      ${bgClass}
      p-4
      pb-28
      transition-all
      duration-500
      `}
    >

      {/* HEADER */}

      <motion.div

        initial={{
          opacity: 0,
          y: 10,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className={`
        ${cardClass}
        border
        rounded-[28px]
        p-5
        mb-5
        relative
        overflow-hidden
        `}
      >

        {/* GLOW */}

        <div
          className="
          absolute
          top-[-80px]
          right-[-80px]
          w-[180px]
          h-[180px]
          rounded-full
          bg-cyan-500/20
          blur-3xl
          "
        />

        <div className="
        relative
        z-10
        flex
        items-center
        justify-between
        ">

          <div>

            <h1 className="
            text-3xl
            font-black
            ">
              Wellness Tracker
            </h1>

            <p className={`
            mt-1
            text-sm
            ${subText}
            `}>
              Water, sleep & meal tracking
            </p>

          </div>

          <div
            className="
            w-16
            h-16
            rounded-[20px]
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            flex
            items-center
            justify-center
            "
          >

            <Heart className="
            w-8
            h-8
            text-white
            " />

          </div>
        </div>
      </motion.div>

      {/* TRACKERS */}

      <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-5
      mb-5
      ">

        {/* WATER */}

        <motion.div

          whileHover={{
            y: -3,
          }}

          className={`
          ${cardClass}
          border
          rounded-[26px]
          p-5
          `}
        >

          <div className="
          flex
          items-center
          justify-between
          mb-5
          ">

            <div>

              <p className={subText}>
                Water Intake
              </p>

              <h2 className="
              text-4xl
              font-black
              mt-1
              ">
                {water}L
              </h2>

            </div>

            <div
              className="
              w-14
              h-14
              rounded-[18px]
              bg-cyan-500/10
              flex
              items-center
              justify-center
              "
            >

              <Droplets className="
              text-cyan-400
              w-7
              h-7
              " />

            </div>
          </div>

          <div className="
          flex
          gap-3
          ">

            <button
              onClick={() =>
                setWater(
                  Math.max(
                    0,
                    water - 1
                  )
                )
              }
              className="
              flex-1
              h-11
              rounded-xl
              bg-red-500/10
              text-red-400
              flex
              items-center
              justify-center
              "
            >

              <Minus size={18} />

            </button>

            <button
              onClick={() =>
                setWater(
                  water + 1
                )
              }
              className="
              flex-1
              h-11
              rounded-xl
              bg-cyan-500/10
              text-cyan-400
              flex
              items-center
              justify-center
              "
            >

              <Plus size={18} />

            </button>
          </div>
        </motion.div>

        {/* SLEEP */}

        <motion.div

          whileHover={{
            y: -3,
          }}

          className={`
          ${cardClass}
          border
          rounded-[26px]
          p-5
          `}
        >

          <div className="
          flex
          items-center
          justify-between
          mb-5
          ">

            <div>

              <p className={subText}>
                Sleep Hours
              </p>

              <h2 className="
              text-4xl
              font-black
              mt-1
              ">
                {sleep}h
              </h2>

            </div>

            <div
              className="
              w-14
              h-14
              rounded-[18px]
              bg-violet-500/10
              flex
              items-center
              justify-center
              "
            >

              <Moon className="
              text-violet-400
              w-7
              h-7
              " />

            </div>
          </div>

          <input
            type="range"
            min="1"
            max="12"
            value={sleep}
            onChange={(e) =>
              setSleep(
                Number(
                  e.target.value
                )
              )
            }
            className="
            w-full
            accent-violet-500
            "
          />

          <div className="
          flex
          justify-between
          mt-2
          text-xs
          text-slate-400
          ">

            <span>1h</span>
            <span>12h</span>

          </div>
        </motion.div>
      </div>

      {/* MEAL PLANNER */}

      <motion.div

        initial={{
          opacity: 0,
          y: 10,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className={`
        ${cardClass}
        border
        rounded-[28px]
        p-5
        `}
      >

        {/* TOP */}

        <div className="
        flex
        items-center
        justify-between
        mb-5
        ">

          <div>

            <h2 className="
            text-2xl
            font-black
            ">
              Meal Planner
            </h2>

            <p className={`
            text-sm
            mt-1
            ${subText}
            `}>
              Healthy meal recommendations
            </p>

          </div>

          <div
            className="
            w-14
            h-14
            rounded-[18px]
            bg-orange-500/10
            flex
            items-center
            justify-center
            "
          >

            <UtensilsCrossed className="
            text-orange-400
            w-7
            h-7
            " />

          </div>
        </div>

        {/* TABS */}

        <div className="
        flex
        gap-3
        flex-wrap
        mb-5
        ">

          {[
            "Breakfast",
            "Lunch",
            "Dinner",
          ].map(
            (meal) => (

              <button
                key={meal}

                onClick={() =>
                  setSelectedMeal(
                    meal
                  )
                }

                className={`
                px-5
                h-11
                rounded-xl
                text-sm
                font-bold
                transition-all
                duration-300

                ${
                  selectedMeal ===
                  meal

                    ? `
                    bg-gradient-to-r
                    from-pink-500
                    to-orange-500
                    text-white
                    `

                    : isDark

                    ? `
                    bg-white/5
                    border border-white/10
                    text-white
                    `

                    : `
                    bg-slate-100
                    border border-slate-200
                    text-slate-700
                    `
                }
                `}
              >

                {meal}

              </button>
            )
          )}
        </div>

        {/* FOODS */}

       {/* FOODS */}

<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-4
">

  {mealPlans[selectedMeal].map(
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
        rounded-[24px]
        overflow-hidden
        border

        ${
          isDark

            ? `
            bg-white/5
            border-white/10
            `

            : `
            bg-white
            border-slate-200
            shadow-sm
            `
        }
        `}
      >

        {/* IMAGE */}

        <img
          src={item.image}
          alt={item.name}
          className="
          w-full
          h-40
          object-cover
          "
        />

        {/* CONTENT */}

        <div className="p-4">

          <div className="
          flex
          items-center
          justify-between
          ">

            <h3 className="
            text-lg
            font-bold
            ">
              {item.name}
            </h3>

            <Heart className="
            text-pink-400
            w-5
            h-5
            " />
          </div>

          <p className={`
          text-sm
          mt-2
          leading-6
          ${subText}
          `}>

            Healthy nutrition meal for
            better energy and recovery.

          </p>
        </div>
      </motion.div>
    )
  )}
</div>
      </motion.div>

      {/* HEALTH MESSAGE */}

      <motion.div

        initial={{
          opacity: 0,
          y: 10,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className={`
        ${cardClass}
        border
        rounded-[28px]
        p-5
        mt-5
        `}
      >

        <div className="
        flex
        items-center
        gap-4
        mb-4
        ">

          <div
            className="
            w-14
            h-14
            rounded-[18px]
            bg-gradient-to-r
            from-violet-500
            to-fuchsia-500
            flex
            items-center
            justify-center
            "
          >

            <Heart className="
            text-white
            w-7
            h-7
            " />

          </div>

          <div>

            <h2 className="
            text-2xl
            font-black
            ">
              Wellness Insights
            </h2>

            <p className={subText}>
              Daily recovery suggestions
            </p>

          </div>
        </div>

        <div
          className={`
          rounded-[22px]
          p-4

          ${
            isDark

              ? `
              bg-white/5
              border border-white/10
              `

              : `
              bg-violet-50
              border border-violet-100
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
  // ============================================
  // BOTH LOW
  // ============================================

  water < 3 && sleep < 5

    ? `
    Your hydration and sleep levels
    are both critically low.
    Increase water intake and improve
    sleep recovery immediately for
    better energy and body performance.
    `

    // ============================================
    // BOTH HIGH
    // ============================================

    : water > 6 && sleep > 10

      ? `
      Your water intake and sleep hours
      are both higher than recommended.
      Maintain a balanced routine and
      avoid overhydration or oversleeping.
      `

      // ============================================
      // HIGH WATER + LOW SLEEP
      // ============================================

      : water > 6 && sleep < 7

        ? `
        Your water intake is high but
        your sleep recovery is poor.
        Focus on improving sleep quality
        and maintaining a balanced routine.
        `

        // ============================================
        // LOW WATER + HIGH SLEEP
        // ============================================

        : water < 3 && sleep > 10

          ? `
          Your hydration level is low
          despite long sleep hours.
          Drink more water to maintain
          proper body recovery and balance.
          `

          // ============================================
          // LOW WATER
          // ============================================

          : water < 3

            ? `
            Your hydration level is low.
            Increase your daily water intake
            for better recovery and energy.
            `

            // ============================================
            // HIGH WATER
            // ============================================

            : water > 6

              ? `
              Your water intake is very high.
              Reduce excess water consumption
              and maintain healthy hydration.
              `

              // ============================================
              // LOW SLEEP
              // ============================================

              : sleep < 7

                ? `
                Your sleep duration is low.
                Try sleeping at least 7-8 hours
                for proper muscle recovery.
                `

                // ============================================
                // HIGH SLEEP
                // ============================================

                : sleep > 10

                  ? `
                  You're sleeping longer than usual.
                  Maintain an active lifestyle and
                  balanced daily schedule.
                  `

                  // ============================================
                  // PERFECT BALANCE
                  // ============================================

                  : `
                  Great wellness balance.
                  Keep maintaining healthy
                  hydration, sleep, and nutrition habits.
                  `
}

          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WellnessTrackerPage;