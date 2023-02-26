
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./register.css";

const Login = () => {
  const userDet = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    await login(dispatch,loginDetails);
    setTimeout(()=>{
      console.log(userDet);
      // localStorage.setItem("token",userDet.accessToken)
      // navigate("/main");
    },5000);
    // console.log(userDet.currentUser.accessToken)
  };
  return (
    <div className="form-container">
      <form className="form-wrapper">
        <h2 className="formTitle">Login</h2>
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
        <button className="btn btn-primary mt-3" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
