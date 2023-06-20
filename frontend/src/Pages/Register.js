import React, { useState } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import {useNavigate} from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    password: "",
    passwordConfirmation: "",
    diver_qualification: "",
    instructor_qualification: "",
    nitrox_qualification: "",
    license_number: "",
    license_expiration_date: "",
    medical_expiration_date: "",
  });

  function handleClick(event) {
    event.preventDefault(); // Empêche le rechargement de la page par défaut lors de la soumission du formulaire

    // Effectuez une requête POST vers votre API avec les données d'inscription
    axios.post("http://localhost:5000/api/users/signup", registerData)
        .then(response => {
          console.log("Inscription réussie !");
          localStorage.setItem("token", response.data.token);
          navigate("/");
          window.location.reload();
          // Gérez la réponse de l'API ou redirigez l'utilisateur vers une autre page
        })
        .catch(error => {
          console.error("Erreur lors de l'inscription :", error);
          alertify.error("Erreur lors de l'inscription");
          // Gérez l'erreur de l'API ou affichez un message d'erreur à l'utilisateur
        });
  }

  return (
    <div className={"w-full"}>
      <h1 className={"text-2xl font-bold mb-6 text-center"}>Register Form</h1>
      <form
        className={"w-full max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md"}
        onSubmit={handleClick}
      >
        {/*Personal Information section */}
        <h2 className={"text-xl font-bold mb-6"}>Personal Information</h2>
        <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
          {/*First Name*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  first_name: event.target.value,
                });
              }}
            />
          </div>

          {/*Last Name*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  last_name: event.target.value,
                });
              }}
            />
          </div>

          {/*Email*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  email: event.target.value,
                });
              }}
            />
          </div>

          {/*Birth Date*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Birth Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  birth_date: event.target.value,
                });
              }}
            />
          </div>

          {/*Password*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  password: event.target.value,
                });
              }}
            />
          </div>

          {/*Password Confirmation*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password Confirmation
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  passwordConfirmation: event.target.value,
                });
              }}
            />
          </div>
        </div>

        {/*Diving Information section*/}
        <h2 className={"text-xl font-bold mb-6"}>Diving Information</h2>
        <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
          {/*Diver Qualification*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Diver Qualification
            </label>
            <select
              name=""
              id=""
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  diver_qualification: event.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="1">Aucun</option>
              <option value="2">Etoiles de Mer 1</option>
              <option value="3">Etoiles de Mer 2</option>
              <option value="4">Etoiles de Mer 3</option>
              <option value="5">Bronze</option>
              <option value="6">Argent</option>
              <option value="7">Or</option>
              <option value="8">N1</option>
              <option value="9">N2</option>
              <option value="10">N3</option>
              <option value="11">N4</option>
            </select>
          </div>

          {/*Instructor Qualification*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Instructor Qualification
            </label>
            <select
              name=""
              id=""
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  instructor_qualification: event.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="1">Aucun</option>
              <option value="2">E1</option>
              <option value="3">E2</option>
              <option value="4">E3</option>
              <option value="5">E4</option>
            </select>
          </div>

          {/*Nitrox Qualification*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nitrox Qualification
            </label>
            <select
              name=""
              id=""
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  nitrox_qualification: event.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="1">Aucun</option>
              <option value="2">Nitrox</option>
              <option value="3">Nitrox Confirmé</option>
              <option value="4">Moniteur Nitrox</option>
            </select>
          </div>

          {/*License Number*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              License Number
            </label>
            <input
              type="text"
              pattern={"A-[0-9]{2}-[0-9]{6}"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  license_number: event.target.value,
                });
              }}
            />
          </div>

          {/*License Expiration Date*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              License Expiration Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  license_expiration_date: event.target.value,
                });
              }}
            />
          </div>

          {/*Medical Certificate Expiration Date*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Medical Certificate Expiration Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  medical_expiration_date: event.target.value,
                });
              }}
            />
          </div>
        </div>

        {/*Button submit*/}
        <div className={"flex justify-center"}>
          <button
            type={"submit"}
            className={
              "bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded"
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
