import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { createGoal } from "../features/goals/goalSlice";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const GoalForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isError, message } = useSelector((state: RootState) => state.goals);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message, dispatch]);

  const handleGoalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(createGoal({ text })).then(() => {
      setIsLoading(false);
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
            {isLoading ? (
              <>
                <ThreeDots
                  visible={true}
                  height="20"
                  width="20"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </>
            ) : (
              "Add Goal"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
