import React, {useState} from "react";
import {Route, Routes} from 'react-router-dom';
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profil from "./Pages/Profil/Profil";
import Register from "./Pages/Register/Register";
import Diver from "./Pages/Diver/Diver";
import Instructor from "./Pages/Instructor/Instructor";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

function App() {
  return (
    <div className={"bg-neutral-200 flex flex-col min-h-screen"}>
      <Header />
      <main className={"flex-grow overflow-y-auto"}>
          <Routes>
              <Route exact path={"/"} element={<Home />} />

              <Route exact path={"/login"} element={<Login />} />
              <Route exact path={"/register"} element={<Register />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/diver" element={<Diver />} />
              <Route path="/instructor" element={<Instructor />} />
              <Route path="/*" element={<h1>404</h1>} />
          </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
