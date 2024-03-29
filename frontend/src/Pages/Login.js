import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css'

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
            if (location.pathname === "/login") {
              navigate("/");
            } else {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location.pathname, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
        "http://localhost:5000/api/users/signin",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {

      if (response.status === 200) {
        const data = response.data;

        // Handle the data
        localStorage.setItem("token", data.token);
        window.location.reload();
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        alertify.error("Email ou mot de passe incorrect")
      }else {
        alertify.error("Une erreur est survenue")
      }

    });
  };

  return (
    <div className={"w-full"}>
      <h1 className={"text-2xl font-bold mb-6 mt-20 text-center text-light-text"}>
        Login
      </h1>
      <form
        className={"w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl"}
        onSubmit={handleSubmit}
      >
        <div className={"mb-4"}>
          <label className={"block text-light-text text-sm font-bold mb-2"}>
            Email :
          </label>
          <input
            type={"email"}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            }
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className={"mb-4"}>
          <label className={"block text-light-text text-sm font-bold mb-2"}>
            Password :
          </label>
          <input
            type={"password"}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            }
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className={"flex justify-center"}>
          <button
            type={"submit"}
            className={
              "px-4 py-2 bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full"
            }
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
