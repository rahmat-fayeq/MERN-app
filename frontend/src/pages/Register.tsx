import { useState } from "react";
import { FaUser } from "react-icons/fa";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { email, name, password, password2 } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <button type="submit" className="btn btn-block">
              Create Account
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
