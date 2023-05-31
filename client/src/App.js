import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import useToken from "./Hook/useToken";
import Profil from "./Pages/Profil/Profil";
import Register from "./Pages/Register/Register";
import Diver from "./Pages/Diver/Diver";
import Instructor from "./Pages/Instructor/Instructor";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

function App(props) {
  const { setToken } = useToken();
  return (
    <div className={"bg-neutral-200 flex flex-col min-h-screen"}>
      <Header />
      <main className={"flex flex-grow"}>
        <Routes>
          <Route path={"/"} element={<Home />} />

          <Route path={"/login"} element={<Login setToken={setToken} />} />
          <Route path={"/register"} element={<Register />} />

          <Route path={"/profil"} element={<Profil />} />
          <Route path={"/diver"} element={<Diver />} />
          <Route path={"/instructor"} element={<Instructor />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
