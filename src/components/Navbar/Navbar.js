import { Logout } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../redux/store";
import { logoutTrans } from "../../redux/transRedux";
import { logOut } from "../../redux/userRedux";

const Navbar = () => {
  const userName = useSelector((state) => state.user.currentUser.email);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutTrans());
    dispatch(logOut());
    persistor.purge();
  };
  return (
    <nav className="navbar navbar-dark bg-primary m-2 p-2">
      <a className="navbar-brand" href="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/69/69881.png"
          width="30"
          height="30"
          className="d-inline-block align-top text-light mx-3"
          alt=""
        />
        Money Manager
      </a>
      <div>
        <span style={{color : "white",marginRight : "10px"}}>{userName}</span>
        <button className="btn btn-primary" onClick={handleLogout}>
          Log out <Logout />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
