import React, { useEffect } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function Diver(props) {
  const navigate = useNavigate();

  return (
    <>
      <h1>Diver</h1>
      <NavBar />
    </>
  );
}

export default Diver;
