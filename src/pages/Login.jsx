import {
  Dumbbell,
  Mail,
  Lock,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (
      formData.email.trim() ===
        "" ||
      formData.password.trim() ===
        ""
    ) {
      setError(
        "Please fill all fields"
      );
      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem(
        "gym_registered_user"
      )
    );

    if (!storedUser) {
      setError(
        "No account found"
      );
      return;
    }

    if (
      storedUser.email !==
        formData.email ||
      storedUser.password !==
        formData.password
    ) {
      setError(
        "Invalid credentials"
      );
      return;
    }

    localStorage.setItem(
      "gym_user",
      JSON.stringify(storedUser)
    );

    navigate("/modes");
  };

  const guestLogin = () => {
    const guestUser = {
      name: "Guest User",
      joinDate:
        new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "gym_user",
      JSON.stringify(guestUser)
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] flex items-center justify-center px-4">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
      >
        {/* TOP */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mx-auto">
            <Dumbbell className="text-white w-10 h-10" />
          </div>

          <h1 className="text-4xl font-black text-white mt-5">
            Gym Tracker
          </h1>

          <p className="text-slate-300 mt-2">
            Welcome back athlete
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="text-slate-300 text-sm font-semibold">
              Email
            </label>

            <div className="mt-2 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center px-4 gap-3">

              <Mail className="text-pink-400 w-5 h-5" />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                placeholder="Enter email"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label className="text-slate-300 text-sm font-semibold">
              Password
            </label>

            <div className="mt-2 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center px-4 gap-3">

              <Lock className="text-pink-400 w-5 h-5" />

              <input
                type="password"
                value={
                  formData.password
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                placeholder="Enter password"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 bg-red-500/20 border border-red-500/20 text-red-300 rounded-2xl p-4 text-sm">
              {error}
            </div>
          )}

          {/* LOGIN */}
          <button
            type="submit"
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg shadow-xl"
          >
            Login
          </button>
        </form>

        {/* GUEST */}
        <button
          onClick={guestLogin}
          className="w-full h-14 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold mt-4"
        >
          Continue as Guest
        </button>

        {/* REGISTER */}
        <div className="text-center mt-6">
          <span className="text-slate-400">
            Don't have account?
          </span>

          <button
            onClick={() =>
              navigate("/register")
            }
            className="ml-2 text-pink-400 font-bold"
          >
            Register
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;