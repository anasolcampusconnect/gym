import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CalendarPage from "./pages/CalendarPage";
import MainLayout from "./layouts/MainLayout";

import AddCustomExercisePage from "./pages/AddCustomExercisePage";
import LogWorkoutPage from "./pages/LogWorkoutPage";
import WorkoutHistoryPage from "./pages/WorkoutHistoryPage";
import ProgressAnalyticsPage from "./pages/ProgressAnalyticsPage";
import WorkoutPlansPage from "./pages/WorkoutPlansPage";
import ModesPage from "./pages/ModesPage";
import CategoriesPage from "./pages/CategoriesPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import WorkoutSessionPage from "./pages/WorkoutSessionPage";
import ExercisesLibraryPage from "./pages/ExercisesLibraryPage";
import FavoritesPage from "./pages/FavoritesPage";
import MoodWorkout from "./pages/MoodWorkoutPage";
import Workout from "./pages/WorkoutPage";
import TimerPage from "./pages/RestTimer";
import SettingsPage from "./pages/SettingsPage";
import WorkoutSuggestions from "./pages/WorkoutSuggestions";
import AIFitnessDashboard from "./pages/AIFitnessDashboard";
import WaterTrckerPage from "./pages/WaterTrckerPage";
import SleepTrackerPage from "./pages/SleepTrackerPage";
function App() {

  const user =
    localStorage.getItem(
      "gym_user"
    );

  return (
    <HashRouter>
     <MainLayout>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
  path="/workout-suggestions"
  element={<WorkoutSuggestions />}
/>

        {/* REGISTER */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />

         <Route
          path="/settings"
          element={<SettingsPage />}
        />
         <Route
          path="/water"
          element={<WaterTrckerPage />}
        />
         <Route
          path="/sleep"
          element={<SleepTrackerPage />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <AIFitnessDashboard />
              // <DashboardPage/>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* CALENDAR */}
        <Route
          path="/calendar"
          element={
            user ? (
              <CalendarPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
           {/* EXERCISES Library*/}
        <Route
          path="/exercises-library"
          element={
            user ? (
              <ExercisesLibraryPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* CUSTOM EXERCISE */}
        <Route
          path="/custom-exercises"
          element={
            user ? (
              <AddCustomExercisePage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

    
         {/* FAVORITES */}
        <Route
          path="/favorites-exercise"
          element={
            user ? (
              <FavoritesPage/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/*LogWorkoutPage */}
         <Route
          path="/log-workout"
          element={
            user ? (
              <LogWorkoutPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Workout History */}
        <Route
            path="/workout-history"
          element={
            user ? (
              <WorkoutHistoryPage />
            ) : (
              <Navigate to="/" />
            )
          }
     />
      <Route
          path="/moodworkout"
          element={<MoodWorkout/>}
        />
      <Route
          path="/modes"
          element={<ModesPage />}
        />
         <Route
          path="/workout"
          element={<Workout/>}
        />
          <Route
          path="/timer"
          element={<TimerPage/>}
        />


        <Route
          path="/categories/:slug"
          element={<CategoriesPage />}
        />

        <Route
          path="/subcategory/:slug/:categoryId"
          element={<SubCategoryPage />}
        />

        <Route
          path="/workout-session/:slug/:categoryId/:subId"
          element={<WorkoutSessionPage />}
        />
     <Route
  path="/analytics"
  element={
    user ? (
      <ProgressAnalyticsPage />
    ) : (
      <Navigate to="/" />
    )
  }
/>
<Route
  path="/workout-plans"
  element={
    user ? (
      <WorkoutPlansPage />
    ) : (
      <Navigate to="/" />
    )
  }
/>
<Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
</MainLayout>
    </HashRouter>
  );
}

export default App;
