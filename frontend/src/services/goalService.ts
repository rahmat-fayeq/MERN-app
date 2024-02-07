import axios from "axios";
import { IGoal } from "../types";

const APP_URL = "/api/goals";

// create a goal
const createGoal = async (goalData: IGoal, token: string) => {
  return await axios.post(APP_URL, goalData, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const goalService = { createGoal };
export default goalService;
