import React from "react";

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
