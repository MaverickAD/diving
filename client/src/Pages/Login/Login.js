import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    if (token.token) {
      navigate(-1);
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div className={""}>
      <h1 className={"text-2xl font-bold mb-6 text-center"}>Login</h1>
      <form
        className={"w-full max-w-lg mx-auto bg-white p-8 rounded-md shadow-md"}
        onSubmit={handleSubmit}
      >
        <div className={"mb-4"}>
          <label className={"block text-gray-700 text-sm font-bold mb-2"}>
            Email :
          </label>
          <input
            type={"email"}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            }
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className={"mb-4"}>
          <label className={"block text-gray-700 text-sm font-bold mb-2"}>
            Password :
          </label>
          <input
            type={"password"}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
