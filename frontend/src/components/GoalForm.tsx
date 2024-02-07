import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { createGoal, reset } from "../features/goals/goalSlice";

const GoalForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");

  const handleGoalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createGoal({ text })).then(() => {
      dispatch(reset());
    });
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={handleGoalSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
