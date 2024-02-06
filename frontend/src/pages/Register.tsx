import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../features/store";
import { toast } from "react-toastify";
import { IRegister } from "../types";
import { register, reset } from "../features/auth/authSlice";
import { ThreeDots } from "react-loader-spinner";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { email, name, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isError, isLoading, isSuccess, message, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, user, dispatch, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }
    const userData: IRegister = { name, email, password };
    dispatch(register(userData));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an Account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmitForm}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password2"
              id="password2"
              value={password2}
              onChange={handleInputChange}
              placeholder="Enter confirm password"
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? (
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
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
