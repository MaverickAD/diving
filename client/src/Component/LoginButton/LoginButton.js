import React from "react";
import { Link } from "react-router-dom";

function LoginButton(props) {
  return (
    <div>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default LoginButton;
