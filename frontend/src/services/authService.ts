import axios from "axios";
import { IRegister } from "../types";

const APP_URL = "/api/users";

//Register user
const register = async (userData: IRegister) => {
  const response = await axios.post(APP_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = { register };

export default authService;
