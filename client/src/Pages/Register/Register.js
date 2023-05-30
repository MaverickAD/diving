import React, { useState } from "react";

function Register(props) {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
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
          console.log(register);
        }}
      >
        <h1>Register</h1>
        <label>
          <p>First Name</p>
          <input
            type="text"
            onChange={(event) => {
              setRegister({ ...register, firstName: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Last Name</p>
          <input
            type="text"
            onChange={(event) => {
              setRegister({ ...register, lastName: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Email</p>
          <input
            type="email"
            onChange={(event) => {
              setRegister({ ...register, email: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Birth Date</p>
          <input
            type="date"
            onChange={(event) => {
              setRegister({ ...register, birthDate: event.target.value });
            }}
          />
        </label>

        <label>
          <p>Diver Qualification</p>
          <input
            type="text"
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
            onChange={(event) => {
              setRegister({ ...register, licenseNumber: event.target.value });
            }}
          />
        </label>

        <label>
          <p>License Expiration Date</p>
          <input
            type="date"
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
