import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterButton(props) {
  const navigate = useNavigate();
  return (
    <button
      className={
        "border-accent text-white text-center text-sm font-bold uppercase hover:bg-white hover:text-black hover:cursor-pointer rounded px-5 py-2.5 mx-1"
      }
      onClick={() => {
        navigate("/register");
      }}
    >
      Register
    </button>
  );
}

export default RegisterButton;
