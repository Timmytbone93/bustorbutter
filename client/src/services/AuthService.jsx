import axios from "axios";
import dayjs from "dayjs";

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
  let user = localStorage.getItem("user");

  if (!user) return {};

  user = JSON.parse(user);

  if (dayjs(user.expires_at).format() < dayjs().format()) {
    console.log("AUTH EXPIRED");
    return null;
  }
  return user;
};
