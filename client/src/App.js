import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Diver from "./Pages/Diver/Diver";
import Instructor from "./Pages/Instructor/Instructor";
import useToken from "./Hook/useToken";

function App(props) {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className={"wrapper"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/diver"} element={<Diver />} />
        <Route path={"/instructor"} element={<Instructor />} />
      </Routes>
    </div>
  );
}

export default App;
