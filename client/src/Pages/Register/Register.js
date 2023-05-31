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
    passwordConfirmation: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const canSubmit = () => {
    if (
      register.firstName !== "" &&
      register.lastName !== "" &&
      register.email !== "" &&
      register.birthDate !== "" &&
      register.diverQualification !== "" &&
      register.noxQualification !== "" &&
      register.licenseNumber !== "" &&
      register.licenseExpirationDate !== "" &&
      register.medicalCertificateExpirationDate !== "" &&
      register.password !== "" &&
      register.passwordConfirmation !== "" &&
      register.password === register.passwordConfirmation
    ) {
      setIsSubmit(true);
    }
    console.log(isSubmit);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(register);
  };

  //Display the current date minus 16 years in MM/DD/YYYY format
  const todayMinus16Year = new Date();
  todayMinus16Year.setFullYear(todayMinus16Year.getFullYear() - 16);

  return (
    <div className={""}>
      <h1 className={"text-2xl font-bold mb-6 text-center"}>Register Form</h1>
      <form
        className={"w-full max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md"}
        onSubmit={handleSubmit}
      >
        <h2 className={"text-xl font-bold mb-6"}>Personal Information</h2>
        <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({ ...register, firstName: event.target.value });
                canSubmit();
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({ ...register, lastName: event.target.value });
                canSubmit();
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({ ...register, email: event.target.value });
                canSubmit();
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Birth Date
            </label>
            <input
              type="date"
              max={todayMinus16Year.toISOString().split("T")[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({ ...register, birthDate: event.target.value });
                canSubmit();
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({ ...register, password: event.target.value });
                canSubmit();
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password Confirmation
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({
                  ...register,
                  passwordConfirmation: event.target.value,
                });
                canSubmit();
              }}
            />
          </div>
        </div>

        <h2 className={"text-xl font-bold my-6"}>Diver Information</h2>
        <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Diver Qualification
            </label>
            <select
              name=""
              id=""
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({
                  ...register,
                  diverQualification: event.target.value,
                });
                canSubmit();
              }}
            >
              <option value=""></option>
              <option value="aucun">Aucun</option>
              <option value="etoiles-de-mer-1">Etoiles de Mer 1</option>
              <option value="etoiles-de-mer-2">Etoiles de Mer 2</option>
              <option value="etoiles-de-mer-3">Etoiles de Mer 3</option>
              <option value="bronze">Bronze</option>
              <option value="argent">Argent</option>
              <option value="or">Or</option>
              <option value="n1">N1</option>
              <option value="n2">N2</option>
              <option value="n3">N3</option>
              <option value="n4">N4</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Instructor Qualification
            </label>
            <select
              name=""
              id=""
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({
                  ...register,
                  instructorQualification: event.target.value,
                });
                canSubmit();
              }}
            >
              <option value=""></option>
              <option value="aucun">Aucun</option>
              <option value="n1">N1</option>
              <option value="n2">N2</option>
              <option value="n3">N3</option>
              <option value="n4">N4</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nox Qualification
            </label>
            <select
              name=""
              id=""
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({
                  ...register,
                  noxQualification: event.target.value,
                });
                canSubmit();
              }}
            >
              <option value=""></option>
              <option value="aucun">Aucun</option>
              <option value="nitrox">Nitrox</option>
              <option value="nitrox-confirme">Nitrox Confirmé</option>
              <option value="moniteur-nitrox">Moniteur Nitrox</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              License Number
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({ ...register, licenseNumber: event.target.value });
                canSubmit();
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              License Expiration Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({
                  ...register,
                  licenseExpirationDate: event.target.value,
                });
                canSubmit();
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Medical Certificate Expiration Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(event) => {
                setRegister({
                  ...register,
                  medicalCertificateExpirationDate: event.target.value,
                });
                canSubmit();
              }}
            />
          </div>
        </div>

        <div className={"flex justify-center"}>
          <button
            type={"submit"}
            className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${
              isSubmit ? "hover:bg-blue-700" : "cursor-not-allowed opacity-50"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
