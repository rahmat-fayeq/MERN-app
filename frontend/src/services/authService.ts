import axios from "axios";
import { ILogin, IRegister } from "../types";

const APP_URL = "/api/users";

//Register user
const register = async (userData: IRegister) => {
  const response = await axios.post(APP_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Login user
const login = async (userData: ILogin) => {
  const response = await axios.post(`${APP_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = { register, logout, login };
export default authService;
