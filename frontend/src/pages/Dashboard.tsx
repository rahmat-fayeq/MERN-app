import { AppDispatch, RootState } from "../features/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { useDispatch } from "react-redux";
import { getGoals, reset } from "../features/goals/goalSlice";
import Loader from "../components/Loader";
import GoalItem from "../components/GoalItem";
import { toast } from "react-toastify";
import { IGoals } from "../types";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { goals, isError, isLoading, message } = useSelector(
    (state: RootState) => state.goals
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isError) {
      toast.error(message);
      console.log(message);
    }

    dispatch(getGoals());
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user?.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal: IGoals, index) => (
              <GoalItem goal={goal} key={index} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals yet!</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
