import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import CryptoJS from "crypto-js";
import "./register.css";

const Login = () => {
  const loading = useSelector((state) => state.user.isFetching);
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const hashed_password = CryptoJS.AES.encrypt(
      JSON.stringify(loginDetails.password),
      "prathipan24p"
    ).toString();
    loginDetails.password = hashed_password;
    login(dispatch, loginDetails);
  };
  return (
    <div className="form-container">
      <form className="form-wrapper">
        <h2 className="formTitle">Login</h2>
        <div className="credentials">
        <span>Email : testUser@gmail.com</span>
        <span>Password : 123456</span>
        </div>
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          name="email"
          type="text"
          id="email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
        />
        <Link to="/register" className="link">Don't have an account?</Link>
        {loading ? (
          <div className="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        ) : (
          <button className="btn btn-primary mt-3" onClick={handleClick}>
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
