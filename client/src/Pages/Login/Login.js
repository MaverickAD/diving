import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";
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
    <div className={"login-wrapper"}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={"input-text"}>
          <label>
            <p>Email : </p>
            <input
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>
        </div>
        <div className={"input-text"}>
          <label>
            <p>Password : </p>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
