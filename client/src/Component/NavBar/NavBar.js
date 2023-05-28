import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <>
      <nav>
        <Link to={"/register"}>Register</Link>
        <Link to={"/diver"}>Diver</Link>
        <Link to={"/instructor"}>Instructor</Link>
      </nav>
    </>
  );
}

export default NavBar;
