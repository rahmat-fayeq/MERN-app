import { useDispatch } from "react-redux";
import { IGoals } from "../types";
import { AppDispatch } from "../features/store";
import { deleteGoal } from "../features/goals/goalSlice";
import { toast } from "react-toastify";

const GoalItem = ({ goal }: { goal: IGoals }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleGoalDelete = (id: String) => {
    dispatch(deleteGoal(id)).then((res) => {
      if (res.payload.id) {
        toast.success(`Goal ${id} deleted !`);
      }
    });
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => handleGoalDelete(goal._id)}>
        X
      </button>
    </div>
  );
};

export default GoalItem;
