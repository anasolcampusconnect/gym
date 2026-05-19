import {
  Dumbbell,
  User,
  Mail,
  Lock,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [error, setError] =
    useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    if (
      formData.name.trim() ===
        "" ||
      formData.email.trim() ===
        "" ||
      formData.password.trim() ===
        "" ||
      formData.confirmPassword.trim() ===
        ""
    ) {
      setError(
        "All fields are required"
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.email
      )
    ) {
      setError(
        "Enter valid email"
      );
      return;
    }

    if (
      formData.password.length < 6
    ) {
      setError(
        "Password minimum 6 characters"
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password:
        formData.password,
      joinDate:
        new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "gym_registered_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "gym_user",
      JSON.stringify(userData)
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#3b0764] to-[#7c2d12] flex items-center justify-center px-4">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
      >
        {/* TOP */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 mx-auto flex items-center justify-center">
            <Dumbbell className="text-white w-10 h-10" />
          </div>

          <h1 className="text-4xl font-black text-white mt-5">
            Create Account
          </h1>

          <p className="text-slate-300 mt-2">
            Start your fitness journey
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister}>

          {[
            {
              label: "Full Name",
              key: "name",
              icon: <User />,
            },
            {
              label: "Email",
              key: "email",
              icon: <Mail />,
            },
            {
              label: "Password",
              key: "password",
              icon: <Lock />,
            },
            {
              label:
                "Confirm Password",
              key: "confirmPassword",
              icon: <Lock />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="mb-5"
            >
              <label className="text-slate-300 text-sm font-semibold">
                {item.label}
              </label>

              <div className="mt-2 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center px-4 gap-3">

                <div className="text-pink-400">
                  {item.icon}
                </div>

                <input
                  type={
                    item.key.includes(
                      "password"
                    )
                      ? "password"
                      : "text"
                  }
                  value={
                    formData[item.key]
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [item.key]:
                        e.target.value,
                    })
                  }
                  placeholder={`Enter ${item.label}`}
                  className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          ))}

          {/* ERROR */}
          {error && (
            <div className="mb-5 bg-red-500/20 border border-red-500/20 text-red-300 rounded-2xl p-4 text-sm">
              {error}
            </div>
          )}

          {/* REGISTER */}
          <button
            type="submit"
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg shadow-xl"
          >
            Register
          </button>
        </form>

        {/* LOGIN */}
        <div className="text-center mt-6">
          <span className="text-slate-400">
            Already have account?
          </span>

          <button
            onClick={() =>
              navigate("/")
            }
            className="ml-2 text-pink-400 font-bold"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;