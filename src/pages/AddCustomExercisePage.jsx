import {
  ArrowLeft,
  Dumbbell,
  Save,
  ImagePlus,
  FileText,
  Flame,
  Layers3,
  Activity,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import { motion } from "framer-motion";

const categories = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Cardio",
  "Core",
];

const AddCustomExercisePage = () => {
  const navigate = useNavigate();

  const [exerciseData,
    setExerciseData] =
    useState({
      name: "",
      category: "Chest",
      description: "",
      tips: "",
      sets: "",
      reps: "",
    image: "",
imageName: "",
    });

  const [success,
    setSuccess] =
    useState(false);

  const handleChange = (e) => {
    setExerciseData({
      ...exerciseData,
      [e.target.name]:
        e.target.value,
    });
  };

const handleImage = (e) => {

  const file =
    e.target.files[0];

  if (!file) return;

  const reader =
    new FileReader();

  reader.onloadend = () => {

    setExerciseData({
      ...exerciseData,
      image:
        reader.result,
      imageName:
        file.name,
    });

  };

  reader.readAsDataURL(
    file
  );
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !exerciseData.name ||
      !exerciseData.description ||
      !exerciseData.tips ||
      !exerciseData.sets ||
      !exerciseData.reps
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    const existingExercises =
      JSON.parse(
        localStorage.getItem(
          "custom_exercises"
        )
      ) || [];

    const newExercise = {
      id: Date.now(),
      ...exerciseData,
    };

    existingExercises.push(
      newExercise
    );

    localStorage.setItem(
      "custom_exercises",
      JSON.stringify(
        existingExercises
      )
    );

    setSuccess(true);

    setTimeout(() => {
      navigate(
        "/exercises"
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white p-6">

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
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[36px] p-8 mb-8 shadow-2xl"
      >
        <button
          onClick={() =>
            navigate(
              "/exercises"
            )
          }
          className="h-14 px-6 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3 font-bold mb-8 hover:bg-white/20 transition-all"
        >
          <ArrowLeft size={20} />
          Back To Library
        </button>

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>
            <h1 className="text-5xl font-black">
              Add Custom Exercise
            </h1>

            <p className="text-slate-400 mt-4 text-lg leading-8 max-w-2xl">
              Create your own exercise library with custom workouts, tips and training details.
            </p>
          </div>

          <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center shadow-2xl">
            <Dumbbell className="w-12 h-12 text-white" />
          </div>
        </div>
      </motion.div>

      {/* FORM */}
      <motion.form
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
      >
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* BASIC INFO */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                <Flame />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Exercise Information
                </h2>

                <p className="text-slate-400 mt-2">
                  Add exercise details
                </p>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>
                <label className="text-slate-300 font-semibold">
                  Exercise Name
                </label>

                <div className="mt-3 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center px-4 gap-3">

                  <Dumbbell className="text-pink-400 w-5 h-5" />

                  <input
                    type="text"
                    name="name"
                    value={
                      exerciseData.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Bench Press"
                    className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-slate-300 font-semibold">
                  Category
                </label>

                <div className="mt-3 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center px-4 gap-3">

                  <Layers3 className="text-pink-400 w-5 h-5" />

                  <select
                    name="category"
                    value={
                      exerciseData.category
                    }
                    onChange={
                      handleChange
                    }
                    className="bg-transparent outline-none w-full text-white"
                  >
                    {categories.map(
                      (
                        category,
                        index
                      ) => (
                        <option
                          key={index}
                          value={
                            category
                          }
                          className="bg-[#111827]"
                        >
                          {
                            category
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* SETS */}
              <div>
                <label className="text-slate-300 font-semibold">
                  Default Sets
                </label>

                <div className="mt-3 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center px-4 gap-3">

                  <Activity className="text-pink-400 w-5 h-5" />

                  <input
                    type="number"
                    name="sets"
                    value={
                      exerciseData.sets
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="3"
                    className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* REPS */}
              <div>
                <label className="text-slate-300 font-semibold">
                  Default Reps
                </label>

                <div className="mt-3 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center px-4 gap-3">

                  <Activity className="text-pink-400 w-5 h-5" />

                  <input
                    type="number"
                    name="reps"
                    value={
                      exerciseData.reps
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="10"
                    className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <label className="text-slate-300 font-semibold">
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={
                  exerciseData.description
                }
                onChange={
                  handleChange
                }
                placeholder="Describe how to perform the exercise..."
                className="mt-3 w-full rounded-[28px] bg-white/10 border border-white/10 p-5 outline-none resize-none text-white placeholder:text-slate-400"
              />
            </div>

            {/* TIPS */}
            <div className="mt-6">
              <label className="text-slate-300 font-semibold">
                Exercise Tips
              </label>

              <textarea
                rows={4}
                name="tips"
                value={
                  exerciseData.tips
                }
                onChange={
                  handleChange
                }
                placeholder="Add useful workout tips..."
                className="mt-3 w-full rounded-[28px] bg-white/10 border border-white/10 p-5 outline-none resize-none text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* IMAGE */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <ImagePlus />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Exercise Image
                </h2>

                <p className="text-slate-400 mt-2">
                  Upload exercise photo
                </p>
              </div>
            </div>

            {/* UPLOAD */}
            <label className="border-2 border-dashed border-white/10 rounded-[28px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition-all">

              <ImagePlus className="w-14 h-14 text-pink-400" />

              <h3 className="text-2xl font-black mt-5">
                Upload Image
              </h3>

              <p className="text-slate-400 mt-3 text-center">
                JPG, PNG supported
              </p>

              <div className="mt-6 h-12 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center font-bold">
                Browse Files
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImage
                }
              />
            </label>

            {/* FILE NAME */}
          {exerciseData.image && (
  <div className="mt-5 bg-white/10 rounded-2xl p-4 border border-white/10">

    <div className="flex items-center gap-3">

      <FileText className="text-pink-400" />

      <p className="text-sm truncate">
        {
          exerciseData
            .imageName
        }
      </p>
    </div>
  </div>
)}
          </div>

          {/* SAVE */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-[32px] p-8 shadow-2xl">

            <h2 className="text-3xl font-black">
              Save Exercise
            </h2>

            <p className="text-white/80 mt-3 leading-7">
              Save this exercise to your custom workout library.
            </p>

            <button
              type="submit"
              className="w-full h-16 rounded-3xl bg-white text-black font-black text-lg mt-8 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
            >
              <Save size={22} />
              Save Exercise
            </button>

            {success && (
              <div className="mt-5 bg-white/20 rounded-2xl p-4 text-center font-semibold">
                Exercise Added Successfully
              </div>
            )}
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default AddCustomExercisePage;