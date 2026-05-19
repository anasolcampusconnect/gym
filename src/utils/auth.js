export const registerUser = (userData) => {
  localStorage.setItem("gym_user", JSON.stringify(userData));
};

export const loginUser = (email, password) => {
  const user = JSON.parse(localStorage.getItem("gym_user"));

  if (!user) return false;

  return (
    user.email === email &&
    user.password === password
  );
};

export const isAuthenticated = () => {
  return localStorage.getItem("gym_logged_in");
};

export const logoutUser = () => {
  localStorage.removeItem("gym_logged_in");
};