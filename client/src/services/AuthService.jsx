import axios from "axios";

export const login = async (token) => {
  console.log(token);
  /*
  if (token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
*/
  return true;
};

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return {};
  }
  return JSON.parse(user);
};
