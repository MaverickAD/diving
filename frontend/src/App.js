import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer/Footer";
import Home from "./Pages/Home";
import Header from "./Component/Header/Header";
import Instructor from "./Pages/Instructor";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Diver from "./Pages/Diver";
import axios from "axios";

function App(props) {
  const [tokenDecoded, setTokenDecoded] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      axios
        .post(
          "http://localhost:5000/api/users/verify",
          {
            token: localStorage.getItem("token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setTokenDecoded(response.data.decoded);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className={"bg-neutral-200 flex-col min-h-screen "}>
      <Header tokenId={tokenDecoded.id} />
      <main className={"flex flex-grow"}>
        <Routes>
          <Route path={"/"} element={<Home />} />

          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />

          <Route
            exact
            path={"/diver"}
            element={<Diver token={tokenDecoded} />}
          />
          <Route
            path={"/diver/:page"}
            element={<Diver token={tokenDecoded} />}
          />
          <Route
            exact
            path={"/instructor"}
            element={<Instructor token={tokenDecoded} />}
          />
          <Route
            path={"/instructor/:page"}
            element={<Instructor token={tokenDecoded} />}
          />

          <Route path={"*"} element={<h1>404</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
