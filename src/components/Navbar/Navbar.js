import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutTrans } from "../../redux/transRedux";
import { logOut } from "../../redux/userRedux";

const Navbar = () => {
 const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut);
    dispatch(logoutTrans);
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <nav class="navbar navbar-dark bg-primary m-2 p-2">
      <a class="navbar-brand" href="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/69/69881.png"
          width="30"
          height="30"
          className="d-inline-block align-top text-light mx-3"
          alt=""
        />
        Money Manager
      </a>
      <button onClick={handleLogout}>Log out</button>
    </nav>
  );
};

export default Navbar;
