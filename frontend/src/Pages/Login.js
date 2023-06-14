import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
    try {
      const response = await axios.post(
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
      );

      if (response.status === 200) {
        const data = response.data;

        // Handle the data
        localStorage.setItem("token", data.token);
        window.location.reload();
      } else {
        // Handle the error
        alert("L'email ou le mot de passe est incorrect");
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      // Handle any other errors
      console.error(error);
    }
  };

  return (
    <div className={"w-full"}>
      <h1 className={"text-2xl font-bold mb-6 text-center text-light-text"}>
        Login
      </h1>
      <form
        className={"w-full max-w-lg mx-auto bg-white p-8 rounded-md shadow-md"}
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
              "bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded"
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
