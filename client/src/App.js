import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Diver from "./Pages/Diver/Diver";
import Instructor from "./Pages/Instructor/Instructor";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import alertify from "alertifyjs";


function App() {
  const [estConnecte, setEstConnecte] = useState(false);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (localStorage.getItem("token") !== null) {
        try {
          const response = await fetch("http://localhost:5000/api/users/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ token: localStorage.getItem("token") }),
          });

          if (response.ok) {
            const data = await response.json();
            const tokenTimestamp = data.decoded.timestamp;
            if (tokenTimestamp < Date.now()) {
              alertify.error("Session expirée");
              localStorage.removeItem("token");
              setEstConnecte(false);
            } else {
              setEstConnecte(true);
            }
            setChargement(false);
          }
        } catch (error) {
          console.log(error);
          setChargement(false);
        }
      } else {
        setEstConnecte(false);
        setChargement(false);
      }
    };

    verifySession();
    setChargement(false);
  }, []);

  if (chargement) {
    return <div>Chargement...</div>;
  }

  return (
      <div className={"bg-neutral-200 flex flex-col min-h-screen"}>
        <Header connected={estConnecte}/>
        <main className={"flex flex-grow"}>
          <Routes>
            <Route path={"/"} element={<Home />} />

            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/register"} element={<Register />} />
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
