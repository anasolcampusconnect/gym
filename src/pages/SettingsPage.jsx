// src/pages/SettingsPage.jsx

import {
  User,
  Moon,
  Sun,
  Monitor,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Shield,
  Activity,
  Weight,
  Ruler,
  HeartPulse,
  AlertTriangle,
  Target,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import { useEffect, useState } from "react";

const SettingsPage = () => {

  // ======================================================
  // USER
  // ======================================================
const navigate = useNavigate();
  const currentUser =
    JSON.parse(localStorage.getItem("gym_user")) || {};

  const userId =
    currentUser?.email || "guest";

  const settingsKey =
    `gym_settings_${userId}`;

  // ======================================================
  // STATES
  // ======================================================

  const [theme, setTheme] =
    useState("system");

  const [profile, setProfile] =
    useState({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: "",
      location: "",
      gender: "",
      dob: "",
      bio: "",
      image: "",
      targetWeight: "",

      // NEW HEALTH FIELDS
    heightFt: "",
heightInch: "",
      weight: "",
      healthStatus: "healthy",
      disease: "",
    });

  const [savedPopup, setSavedPopup] =
    useState(false);

  // ======================================================
  // LOAD SETTINGS
  // ======================================================

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(settingsKey)
      );

    if (stored) {

      setTheme(
        stored.theme || "system"
      );

      setProfile(
        stored.profile || profile
      );
    }

  }, []);

  // ======================================================
  // THEME APPLY
  // ======================================================

  useEffect(() => {

    const root =
      document.documentElement;

    root.classList.remove(
      "light",
      "dark"
    );

    let activeTheme = theme;

    if (theme === "system") {

      activeTheme =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";
    }

    root.classList.add(activeTheme);

    // GLOBAL PROJECT THEME STORAGE
    localStorage.setItem(
      "global_theme",
      activeTheme
    );

    if (activeTheme === "dark") {

      document.body.style.background =
        "#040814";

      document.body.style.color =
        "white";
    }

    else {

      document.body.style.background =
        "#F4F7FB";

      document.body.style.color =
        "#111827";
    }

  }, [theme]);

  // ======================================================
  // SAVE SETTINGS
  // ======================================================

  const saveSettings = () => {

    const data = {
      theme,
      profile,
    };
      const logout = () => {

    localStorage.removeItem(
      "gym_user"
    );

    navigate("/");
  };

    localStorage.setItem(
      settingsKey,
      JSON.stringify(data)
    );

    setSavedPopup(true);

    setTimeout(() => {
      setSavedPopup(false);
    }, 2500);
  };

  // ======================================================
  // IMAGE
  // ======================================================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setProfile({
        ...profile,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
// ======================================================
// BMI CALCULATION
// ======================================================

// FEET + INCHES TO METERS

const totalInches =
  (
    Number(profile.heightFt || 0) * 12
  ) +
  Number(profile.heightInch || 0);

const heightInMeters =
  totalInches * 0.0254;

// BMI

const bmi =
  heightInMeters > 0 &&
  profile.weight
    ? (
        Number(profile.weight) /
        (
          heightInMeters *
          heightInMeters
        )
      ).toFixed(1)
    : null;

// BMI STATUS

let bmiStatus = "";

if (bmi) {

  if (bmi < 18.5)
    bmiStatus = "Underweight";

  else if (bmi < 25)
    bmiStatus = "Healthy";

  else if (bmi < 30)
    bmiStatus = "Overweight";

  else
    bmiStatus = "Obese";
}


  // ======================================================
  // THEME COLORS
  // ======================================================

  const isDark =
    theme === "dark" ||
    (
      theme === "system" &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    );

  const bg =
    isDark
      ? "bg-[#040814]"
      : "bg-[#F4F7FB]";

  const card =
    isDark
      ? `
      bg-white/[0.05]
      border-white/10
      backdrop-blur-xl
      `
      : `
      bg-white
      border-gray-200
      shadow-lg
      `;

  const text =
    isDark
      ? "text-white"
      : "text-gray-900";

  const subText =
    isDark
      ? "text-slate-400"
      : "text-gray-500";

  const input =
    isDark
      ? `
      bg-white/5
      border-white/10
      text-white
      `
      : `
      bg-gray-100
      border-gray-200
      text-gray-900
      `;

  // ======================================================
  // JSX
  // ======================================================

  return (

    <div
      className={`
      min-h-screen
      ${bg}
      p-5
      pb-32
      transition-all
      duration-500
      `}
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
        fixed
        top-[-150px]
        right-[-150px]
        w-[400px]
        h-[400px]
        bg-pink-500/20
        blur-[120px]
        rounded-full
        pointer-events-none
        "
      />

      <div
        className="
        fixed
        bottom-[-120px]
        left-[-120px]
        w-[350px]
        h-[350px]
        bg-cyan-500/20
        blur-[120px]
        rounded-full
        pointer-events-none
        "
      />



{/* <motion.div

  initial={{
    opacity: 0,
    y: 20,
  }}

  animate={{
    opacity: 1,
    y: 0,
  }}

  className={`
  ${card}
  border
  rounded-[32px]
  p-7
  mb-6
  relative
  overflow-hidden
  `}
>

  <div
    className="
    absolute
    inset-0
    bg-gradient-to-r
    from-pink-500/10
    to-cyan-500/10
    "
  />

  <div className="relative z-10 flex items-center justify-between">



    <div className="flex items-center gap-5">

   

      <button
        onClick={() =>
          navigate("/dashboard")
        }
        className={`
        w-14
        h-14
        rounded-2xl
        flex
        items-center
        justify-center
        transition-all
        duration-300

        ${
          isDark

            ? `
            bg-white/5
            border
            border-white/10
            hover:bg-white/10
            text-white
            `

            : `
            bg-white/70
            border
            border-gray-200
            hover:bg-white
            text-slate-700
            shadow-md
            `
        }
        `}
      >

        <ArrowLeft size={24} />

      </button>



      <div>

        <h1
          className={`
          text-4xl
          font-black
          ${text}
          `}
        >
          Settings
        </h1>

        <p className={`${subText} mt-2`}>
          Personalize your fitness experience
        </p>

      </div>
    </div>

  

    <div
      className="
      w-24
      h-24
      rounded-[30px]
      bg-gradient-to-r
      from-pink-500
      via-orange-500
      to-cyan-500
      flex
      items-center
      justify-center
      shadow-2xl
      "
    >

      <Shield
        className="text-white"
        size={42}
      />

    </div>
  </div>
</motion.div> */}

      {/* PROFILE */}

     {/* PROFILE */}

<div
  className={`
  ${card}
  border
  rounded-[32px]
  p-6
  mb-6
  `}
>

  <div className="flex items-start justify-between gap-5 flex-wrap">

    {/* LEFT SIDE */}

    <div className="flex items-center gap-5 flex-wrap">

      {/* IMAGE */}

      <div className="relative">

        <div
          className="
          w-32
          h-32
          rounded-[34px]
          overflow-hidden
          border-[5px]
          border-pink-500/30
          shadow-2xl
          "
        >

          {profile.image ? (

            <img
              src={profile.image}
              alt="profile"
              className="
              w-full
              h-full
              object-cover
              "
            />

          ) : (

            <div
              className="
              w-full
              h-full
              bg-gradient-to-r
              from-pink-500
              via-orange-500
              to-cyan-500
              flex
              items-center
              justify-center
              "
            >

              <User
                className="text-white"
                size={50}
              />

            </div>
          )}
        </div>

        {/* CAMERA */}

        <label
          className="
          absolute
          bottom-1
          right-1
          w-12
          h-12
          rounded-2xl
          bg-cyan-500
          flex
          items-center
          justify-center
          cursor-pointer
          shadow-xl
          "
        >

          <Camera
            size={20}
            className="text-white"
          />

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImage}
          />
        </label>
      </div>

      {/* USER INFO */}

      <div>

        <h2
          className={`
          text-3xl
          font-black
          ${text}
          `}
        >
          {profile.name || "Fitness User"}
        </h2>

        <p className={`${subText} mt-2`}>
          Manage profile, health & themes
        </p>

        {/* BMI */}

        {bmi && (

          <div
            className="
            mt-4
            flex
            items-center
            gap-3
            flex-wrap
            "
          >

            <div
              className="
              px-4
              py-2
              rounded-xl
              bg-pink-500/20
              text-pink-400
              font-bold
              "
            >
              BMI : {bmi}
            </div>

            <div
              className="
              px-4
              py-2
              rounded-xl
              bg-cyan-500/20
              text-cyan-400
              font-bold
              "
            >
              {bmiStatus}
            </div>

          </div>
        )}
      </div>
    </div>

    {/* RIGHT SIDE LOGOUT */}

    <div className="ml-auto">

      <button
        onClick={() => {

          localStorage.removeItem(
            "gym_user"
          );

          navigate("/");
        }}

        className={`
        h-14
        px-7
        rounded-2xl
        font-bold
        transition-all
        duration-300
        hover:scale-105

        ${
          isDark

            ? `
            bg-red-500/15
            border
            border-red-500/20
            text-red-400
            hover:bg-red-500/25
            `

            : `
            bg-red-50
            border
            border-red-200
            text-red-500
            hover:bg-red-100
            shadow-md
            `
        }
        `}
      >

        Logout

      </button>

    </div>
  </div>
</div>

      {/* PERSONAL */}

      <div
        className={`
        ${card}
        border
        rounded-[32px]
        p-6
        mb-6
        `}
      >

        <h2
          className={`
          text-2xl
          font-black
          mb-6
          ${text}
          `}
        >
          Personal Information
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          "
        >

          {[
            {
              label: "Full Name",
              icon: <User size={18} className="text-pink-400" />,
              key: "name",
              type: "text",
            },

            {
              label: "Email",
              icon: <Mail size={18} className="text-cyan-400" />,
              key: "email",
              type: "email",
            },

            {
              label: "Phone",
              icon: <Phone size={18} className="text-green-400" />,
              key: "phone",
              type: "text",
            },

            {
              label: "Location",
              icon: <MapPin size={18} className="text-orange-400" />,
              key: "location",
              type: "text",
            },

          ].map((item, index) => (

            <div key={index}>

              <label
                className={`
                ${subText}
                text-sm
                mb-2
                block
                `}
              >
                {item.label}
              </label>

              <div
                className={`
                h-14
                rounded-2xl
                border
                px-4
                flex
                items-center
                gap-3
                ${input}
                `}
              >

                {item.icon}

                <input
                  type={item.type}
                  value={profile[item.key]}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      [item.key]:
                        e.target.value,
                    })
                  }
                  className="
                  bg-transparent
                  outline-none
                  w-full
                  "
                />
              </div>
            </div>
          ))}

          {/* DOB */}

          <div>

            <label
              className={`
              ${subText}
              text-sm
              mb-2
              block
              `}
            >
              Date of Birth
            </label>

            <div
              className={`
              h-14
              rounded-2xl
              border
              px-4
              flex
              items-center
              gap-3
              ${input}
              `}
            >

              <CalendarDays
                size={18}
                className="text-yellow-400"
              />

              <input
                type="date"
                value={profile.dob}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    dob: e.target.value,
                  })
                }
                className="
                bg-transparent
                outline-none
                w-full
                "
              />
            </div>
          </div>

          {/* GENDER */}

          <div>

            <label
              className={`
              ${subText}
              text-sm
              mb-2
              block
              `}
            >
              Gender
            </label>

            <select
              value={profile.gender}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  gender:
                    e.target.value,
                })
              }
              className={`
              h-14
              rounded-2xl
              border
              px-4
              outline-none
              w-full
              ${input}
              `}
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>
{/* HEIGHT */}

<div>

  <label
    className={`
    ${subText}
    text-sm
    mb-2
    block
    `}
  >
    Height
  </label>

  <div
    className="
    grid
    grid-cols-2
    gap-4
    "
  >

    {/* FEET */}

    <div
      className={`
      h-14
      rounded-2xl
      border
      px-4
      flex
      items-center
      gap-3
      transition-all
      duration-300

      ${
        isDark
          ? `
            bg-[#151B2E]
            border-white/10
            text-white
            `
          : `
            bg-gray-100
            border-gray-300
            text-gray-900
            `
      }
      `}
    >

      <Ruler
        size={18}
        className="text-violet-400"
      />

      <input
        type="number"
        placeholder="Feet"
        value={profile.heightFt}
        onChange={(e) =>
          setProfile({
            ...profile,
            heightFt:
              e.target.value,
          })
        }
        className="
        bg-transparent
        outline-none
        w-full
        placeholder:text-gray-400
        "
      />

      <span
        className={`
        text-sm
        font-bold
        ${
          isDark
            ? "text-slate-400"
            : "text-gray-500"
        }
        `}
      >
        ft
      </span>

    </div>

    {/* INCHES */}

    <div
      className={`
      h-14
      rounded-2xl
      border
      px-4
      flex
      items-center
      gap-3
      transition-all
      duration-300

      ${
        isDark
          ? `
            bg-[#151B2E]
            border-white/10
            text-white
            `
          : `
            bg-gray-100
            border-gray-300
            text-gray-900
            `
      }
      `}
    >

      <Ruler
        size={18}
        className="text-pink-400"
      />

      <input
        type="number"
        placeholder="Inches"
        value={profile.heightInch}
        onChange={(e) =>
          setProfile({
            ...profile,
            heightInch:
              e.target.value,
          })
        }
        className="
        bg-transparent
        outline-none
        w-full
        placeholder:text-gray-400
        "
      />

      <span
        className={`
        text-sm
        font-bold
        ${
          isDark
            ? "text-slate-400"
            : "text-gray-500"
        }
        `}
      >
        in
      </span>

    </div>

  </div>
</div>
          {/* WEIGHT */}

          <div>

            <label
              className={`
              ${subText}
              text-sm
              mb-2
              block
              `}
            >
              Weight (kg)
            </label>

            <div
              className={`
              h-14
              rounded-2xl
              border
              px-4
              flex
              items-center
              gap-3
              ${input}
              `}
            >

              <Weight
                size={18}
                className="text-rose-400"
              />

              <input
                type="number"
                value={profile.weight}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    weight:
                      e.target.value,
                  })
                }
                className="
                bg-transparent
                outline-none
                w-full
                "
              />
            </div>
          </div>

          {/* HEALTH */}
          {/* TARGET WEIGHT */}

<div>

  <label
    className={`
    ${subText}
    text-sm
    mb-2
    block
    `}
  >
    Target Weight (kg)
  </label>

  <div
    className={`
    h-14
    rounded-2xl
    border
    px-4
    flex
    items-center
    gap-3
    ${input}
    `}
  >

    <Target
      size={18}
      className="text-cyan-400"
    />

    <input
      type="number"
      placeholder="Target weight"
      value={profile.targetWeight}
      onChange={(e) =>
        setProfile({
          ...profile,
          targetWeight:
            e.target.value,
        })
      }
      className="
      bg-transparent
      outline-none
      w-full
      "
    />

  </div>

</div>

        {/* HEALTH STATUS */}

<div>

  <label
    className={`
    ${subText}
    text-sm
    mb-2
    block
    `}
  >
    Health Status
  </label>

  <div className="relative">

    <select
      value={profile.healthStatus}
      onChange={(e) =>
        setProfile({
          ...profile,
          healthStatus:
            e.target.value,
        })
      }
      className={`
      h-14
      rounded-2xl
      border
      px-4
      outline-none
      w-full
      appearance-none
      transition-all
      duration-300

      ${
        isDark
          ? `
            bg-[#151B2E]
            border-white/10
            text-white
            `
          : `
            bg-gray-100
            border-gray-300
            text-gray-900
            `
      }
      `}
    >

      <option
        value="healthy"
        className="
        bg-[#151B2E]
        text-white
        "
      >
        Healthy
      </option>

      <option
        value="unhealthy"
        className="
        bg-[#151B2E]
        text-white
        "
      >
        Unhealthy
      </option>

    </select>

    {/* CUSTOM ICON */}

    <div
      className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      pointer-events-none
      "
    >

      <HeartPulse
        size={18}
        className="
        text-pink-400
        "
      />

    </div>
  </div>
</div>

          {/* DISEASE */}

          {profile.healthStatus ===
            "unhealthy" && (

            <div>

              <label
                className={`
                ${subText}
                text-sm
                mb-2
                block
                `}
              >
                Disease / Condition
              </label>

              <div
                className={`
                h-14
                rounded-2xl
                border
                px-4
                flex
                items-center
                gap-3
                ${input}
                `}
              >

                <AlertTriangle
                  size={18}
                  className="text-red-400"
                />

                <input
                  type="text"
                  placeholder="Ex: Diabetes"
                  value={profile.disease}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      disease:
                        e.target.value,
                    })
                  }
                  className="
                  bg-transparent
                  outline-none
                  w-full
                  "
                />
              </div>
            </div>
          )}

        </div>

        {/* BIO */}

        <div className="mt-5">

          <label
            className={`
            ${subText}
            text-sm
            mb-2
            block
            `}
          >
            Bio
          </label>

          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) =>
              setProfile({
                ...profile,
                bio:
                  e.target.value,
              })
            }
            placeholder="Tell about yourself..."
            className={`
            w-full
            rounded-2xl
            border
            p-4
            outline-none
            resize-none
            ${input}
            `}
          />
        </div>
      </div>

      {/* HEALTH CARD */}

      <div
        className={`
        ${card}
        border
        rounded-[32px]
        p-6
        mb-6
        `}
      >

        <div className="flex items-center gap-3 mb-5">

          <HeartPulse
            className="text-pink-500"
            size={28}
          />

          <h2
            className={`
            text-2xl
            font-black
            ${text}
            `}
          >
            Health Summary
          </h2>
        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          "
        >

          <div
            className="
            rounded-3xl
            p-5
            bg-gradient-to-r
            from-pink-500
            to-rose-500
            text-white
            "
          >

            <Activity size={28} />

            <h3 className="mt-4 text-lg font-bold">
              BMI Score
            </h3>

            <p className="text-3xl font-black mt-2">
              {bmi || "--"}
            </p>
          </div>

          <div
            className="
            rounded-3xl
            p-5
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            text-white
            "
          >

            <HeartPulse size={28} />

            <h3 className="mt-4 text-lg font-bold">
              Fitness State
            </h3>

            <p className="text-2xl font-black mt-2">
              {bmiStatus || "--"}
            </p>
          </div>

          <div
            className="
            rounded-3xl
            p-5
            bg-gradient-to-r
            from-orange-500
            to-yellow-500
            text-white
            "
          >

            <Shield size={28} />

            <h3 className="mt-4 text-lg font-bold">
              Health Type
            </h3>

            <p className="text-2xl font-black mt-2 capitalize">
              {profile.healthStatus}
            </p>
          </div>
        </div>
      </div>

      {/* THEME */}
{/* THEME */}

<div
  className={`
  ${card}
  border
  rounded-[32px]
  p-6
  mb-6
  `}
>

  <h2
    className={`
    text-2xl
    font-black
    mb-6
    ${text}
    `}
  >
    Theme Preferences
  </h2>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-5
    "
  >

    {[
      {
        type: "dark",
        icon: <Moon size={32} />,
        title: "Dark",
        active:
          "border-pink-500 bg-pink-500/15 shadow-lg shadow-pink-500/20",
        iconColor: "text-pink-500",
      },

      {
        type: "light",
        icon: <Sun size={32} />,
        title: "Light",
        active:
          "border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20",
        iconColor: "text-yellow-500",
      },

      {
        type: "system",
        icon: <Monitor size={32} />,
        title: "System",
        active:
          "border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/20",
        iconColor: "text-cyan-500",
      },

    ].map((item, index) => (

      <button
        key={index}
        onClick={() =>
          setTheme(item.type)
        }
        className={`
        h-36
        rounded-[30px]
        border
        flex
        flex-col
        items-center
        justify-center
        gap-4
        transition-all
        duration-300
        hover:scale-[1.03]

        ${
          theme === item.type
            ? item.active
            : isDark
              ? `
                border-white/10
                bg-white/[0.03]
                hover:bg-white/[0.06]
                `
              : `
                border-gray-300
                bg-gray-50
                hover:bg-gray-100
                shadow-sm
                `
        }
        `}
      >

        <div
          className={`
          ${
            theme === item.type
              ? item.iconColor
              : isDark
                ? "text-white"
                : "text-gray-700"
          }
          `}
        >
          {item.icon}
        </div>

        <span
          className={`
          text-lg
          font-black
          ${
            isDark
              ? "text-white"
              : "text-gray-800"
          }
          `}
        >
          {item.title}
        </span>

        <p
          className={`
          text-sm
          ${
            isDark
              ? "text-slate-400"
              : "text-gray-500"
          }
          `}
        >
          {
            item.type === "dark"
              ? "Dark appearance"
              : item.type === "light"
              ? "Bright appearance"
              : "Follow device theme"
          }
        </p>

      </button>
    ))}
  </div>
</div>

      {/* SAVE */}

      <button
        onClick={saveSettings}
        className="
        w-full
        h-16
        rounded-[28px]
        bg-gradient-to-r
        from-pink-500
        via-orange-500
        to-cyan-500
        text-white
        text-xl
        font-black
        flex
        items-center
        justify-center
        gap-3
        shadow-2xl
        hover:scale-[1.01]
        transition-all
        "
      >

        <Save size={22} />

        Save Settings

      </button>

      {/* POPUP */}

      {savedPopup && (

        <motion.div

          initial={{
            opacity: 0,
            y: 50,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
          fixed
          bottom-28
          right-5
          bg-green-500
          text-white
          px-6
          py-4
          rounded-2xl
          shadow-2xl
          font-bold
          z-[9999]
          "
        >

          ✅ Settings Saved Successfully

        </motion.div>
      )}
    </div>
  );
};

export default SettingsPage;