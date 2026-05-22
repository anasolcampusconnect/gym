// src/components/BottomNavbar.jsx

import {
  Home,
  LayoutDashboard,
  Dumbbell,
  BarChart3,
  User,
} from "lucide-react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";


const BottomNavbar = () => {

  const location =
    useLocation();

  // ============================================
  // USER + THEME
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

    const hideNavbar =
  document.body.classList.contains(
    "modal-open"
  );

if (hideNavbar)
  return null;
  // ============================================
  // HIDE NAVBAR PAGES
  // ============================================

  const hiddenRoutes = [
    "/",
    "/login",
    "/register",
    // "/workout-session",
  ];

  if (
    hiddenRoutes.includes(
      location.pathname
    )
  ) {
    return null;
  }

  // ============================================
  // NAVIGATION ITEMS
  // ============================================

  const navItems = [

    {
      label: "Home",
      icon: Home,
      path: "/modes",
    },

    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      label: "Workout",
      icon: Dumbbell,
      path: "/workout",
    },

    {
      label: "Progress",
      icon: BarChart3,
      path: "/analytics",
    },

    {
      label: "Profile",
      icon: User,
      path: "/settings",
    },
  ];

  return (

    <>
      {/* ============================================ */}
      {/* SAFE AREA FIX */}
      {/* ============================================ */}

      <div
  className={`
  fixed
  bottom-0
  left-0
  right-0
  h-[90px]
  z-[9998]
  pointer-events-none

  ${
    isDark
      ? "bg-[#070B1A]"
      : "bg-gradient-to-r from-[#fdf2f8] via-[#eef2ff] to-[#ecfeff]"
  }
  `}
/>

      {/* ============================================ */}
      {/* NAVBAR */}
      {/* ============================================ */}

     <div
  className="
  fixed
  bottom-0
  left-0
  right-0
  z-[9999]
  pb-[env(safe-area-inset-bottom)]
  "
>

        <div
          className={`
          relative
          border-t
          backdrop-blur-3xl
          transition-all
          duration-500

          ${
            isDark

              ? `
              bg-[#070B1A]/95
              border-white/10
              shadow-[0_-10px_40px_rgba(0,0,0,0.45)]
              `

              : `
              bg-[#f7f4fb]/95
              border-pink-100/70
              shadow-[0_-5px_25px_rgba(236,72,153,0.08)]
              `
          }
          `}
        >

          {/* TOP LINE */}

          <div
            className={`
            absolute
            top-0
            left-0
            right-0
            h-[1px]

            ${
              isDark

                ? `
                bg-gradient-to-r
                from-transparent
                via-pink-500/50
                to-transparent
                `

                : `
                bg-gradient-to-r
                from-transparent
                via-pink-300
                to-transparent
                `
            }
            `}
          />

          {/* NAV ITEMS */}

          <div
            className="
            max-w-6xl
            mx-auto
            grid
            grid-cols-5
            items-center
         h-[78px]
            px-3
            "
          >

            {navItems.map(
              (
                item,
                index
              ) => {

                const Icon =
                  item.icon;

                return (

                  <NavLink
                    key={index}
                    to={item.path}
                  >

                    {({
                      isActive,
                    }) => (

                      <motion.div

                        whileTap={{
                          scale: 0.95,
                        }}

                        className={`
                        relative
                        h-[58px]
                        rounded-2xl
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-1
                        transition-all
                        duration-300

                        ${
                          isActive

                            ? isDark

                              ? `
                              bg-gradient-to-r
                              from-pink-500
                              via-purple-500
                              to-orange-500
                              text-white
                              shadow-[0_8px_24px_rgba(236,72,153,0.35)]
                              `

                              : `
                              bg-gradient-to-r
                              from-pink-200
                              to-orange-200
                              text-slate-900
                              border
                              border-pink-200
                              shadow-[0_5px_18px_rgba(236,72,153,0.12)]
                              `

                            : isDark

                              ? `
                              text-slate-400
                              hover:text-white
                              hover:bg-white/[0.04]
                              `

                              : `
                              text-slate-500
                              hover:text-slate-800
                              hover:bg-white/60
                              `
                        }
                        `}
                      >

                        {/* ACTIVE BORDER */}

                        {isActive && (

                          <motion.div

                            layoutId="nav-pill"

                            className={`
                            absolute
                            inset-0
                            rounded-2xl

                            ${
                              isDark
                                ? "border border-white/10"
                                : "border border-pink-100"
                            }
                            `}
                          />
                        )}

                        <Icon
                          size={20}
                          strokeWidth={2.3}
                        />

                        <span
                          className="
                          text-[11px]
                          font-semibold
                          tracking-wide
                          "
                        >
                          {item.label}
                        </span>

                      </motion.div>
                    )}
                  </NavLink>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavbar;