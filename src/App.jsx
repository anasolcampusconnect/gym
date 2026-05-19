import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";

import ExerciseLibraryPage from "./pages/ExerciseLibraryPage";

import AddCustomExercisePage from "./pages/AddCustomExercisePage";

import FavoriteExercisesPage from "./pages/FavoriteExercisesPage";
import LogWorkoutPage from "./pages/LogWorkoutPage";
import WorkoutHistoryPage from "./pages/WorkoutHistoryPage";

function App() {

  const user =
    localStorage.getItem(
      "gym_user"
    );

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <DashboardPage />
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

        {/* EXERCISES */}
        <Route
          path="/exercises"
          element={
            user ? (
              <ExerciseLibraryPage />
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
          path="/favorites"
          element={
            user ? (
              <FavoriteExercisesPage />
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

      </Routes>

    </BrowserRouter>
  );
}

export default App;