import React, { useEffect, useState } from "react";
import Footer from "./Component/Footer/Footer";
import Home from "./Pages/Home";
import Header from "./Component/Header/Header";
import Instructor from "./Pages/Instructor";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Diver from "./Pages/Diver";
import axios from "axios";
import DiveCreator from "./Component/AdminComponent/DiveManagement/DiveCreator";
import DiverManagement from "./Component/AdminComponent/DiverManagement/DiverManagement";
import DiveManagement from "./Component/AdminComponent/DiveManagement/DiveManagement";
import History from "./Component/AdminComponent/History/History";
import DiveSiteManagement from "./Component/SuperAdminComponent/DiveSiteManagement/DiveSiteManagement";
import AdminManagement from "./Component/SuperAdminComponent/AdminManagement/AdminManagement";
import { Route, Routes } from "react-router-dom";

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
    <div className={"bg-neutral-100 flex flex-col min-h-screen "}>
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

          <Route path={"instructor"} element={<Instructor />}>
            <Route path={"diver_management"} element={<DiverManagement />} />
            <Route path={"dive_management"} element={<DiveManagement />} />
            <Route path={"dive_management/:dive"} element={<DiveCreator />} />
            <Route path={"history"} element={<History />} />
            <Route
              path={"dive_site_management"}
              element={<DiveSiteManagement />}
            />
            <Route path={"admin_management"} element={<AdminManagement />} />
          </Route>

          <Route path={"*"} element={<h1>404</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
