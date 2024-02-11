import axios from "axios";
import { IGoal } from "../types";

const APP_URL = "/api/goals";

// create a goal
const createGoal = async (goalData: IGoal, token: string) => {
  const response = await axios.post(APP_URL, goalData, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get user goals

const getGoals = async (token: string) => {
  const response = await axios.get(APP_URL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const goalService = { createGoal, getGoals };
export default goalService;
