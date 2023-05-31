import React, { useState } from "react";

function Register(props) {
  const [register, setRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    birthDate: "",
    diverQualification: "",
    instructorQualification: "",
    noxQualification: "",
    licenseNumber: "",
    licenseExpirationDate: "",
    medicalCertificateExpirationDate: "",
    password: "",
  });

  return (
    <div className={"register-wrapper"}>
      <form
        className={"register-form"}
        onSubmit={(event) => {
          event.preventDefault();
          fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(register),
            }).then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              })
        }}
      >
        <h1>Register</h1>
        <label>
          <p>First Name</p>
          <input
            type="text"
            value= {register.firstname}
            onChange={(event) => {
              setRegister({ ...register, firstname: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Last Name</p>
          <input
            type="text"
            value= {register.lastname}
            onChange={(event) => {
              setRegister({ ...register, lastname: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Email</p>
          <input
            type="email"
            value= {register.email}
            onChange={(event) => {
              setRegister({ ...register, email: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Birth Date</p>
          <input
            type="date"
            value= {register.birthDate}
            onChange={(event) => {
              setRegister({ ...register, birthDate: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Diver Qualification</p>
          <input
            type="text"
            value= {register.diverQualification}
            onChange={(event) => {
              setRegister({
                ...register,
                diverQualification: event.target.value,
              });
            }}
          />
        </label>

        <label>
          <p>Instructor Qualification</p>
          <input
            type="text"
            value= {register.instructorQualification}
            onChange={(event) => {
              setRegister({
                ...register,
                instructorQualification: event.target.value,
              });
            }}
          />
        </label>

        <label>
          <p>Nox Qualification</p>
          <input
            type="text"
            value= {register.noxQualification}
            onChange={(event) => {
              setRegister({
                ...register,
                noxQualification: event.target.value,
              });
            }}
          />
        </label>

        <label>
          <p>License Number</p>
          <input
            type="number"
            value= {register.licenseNumber}
            onChange={(event) => {
              setRegister({ ...register, licenseNumber: event.target.value });
            }}
          />
        </label>

        <label>
          <p>License Expiration Date</p>
          <input
            type="date"
            value= {register.licenseExpirationDate}
            onChange={(event) => {
              setRegister({
                ...register,
                licenseExpirationDate: event.target.value,
              });
            }}
          />
        </label>

        <label>
          <p>Medical Certificate Expiration Date</p>
          <input
            type="date"
            value= {register.medicalCertificateExpirationDate}
            onChange={(event) => {
              setRegister({
                ...register,
                medicalCertificateExpirationDate: event.target.value,
              });
            }}
          />
        </label>

        <label>
          <p>Password</p>
          <input
            type="password"
            value= {register.password}
            onChange={(event) => {
              setRegister({ ...register, password: event.target.value });
            }}
          />
        </label>
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
}

export default Register;
