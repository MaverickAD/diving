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
  const [userId, setUserId] = useState(null);

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
            setUserId(response.data.decoded.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className={"bg-neutral-200 flex flex-col min-h-screen "}>
      <Header userId={userId} />
      <main className={"flex flex-grow"}>
        <Routes>
          <Route path={"/"} element={<Home />} />

          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />

          <Route exact path={"/diver"} element={<Diver userId={userId} />} />
          <Route path={"/diver/:page"} element={<Diver userId={userId} />} />
          <Route
            exact
            path={"/instructor"}
            element={<Instructor userId={userId} />}
          />
          <Route
            path={"/instructor/:page"}
            element={<Instructor userId={userId} />}
          />

          <Route path={"*"} element={<h1>404</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
