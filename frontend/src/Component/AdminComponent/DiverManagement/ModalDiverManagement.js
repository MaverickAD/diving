import React, { useState } from "react";
import axios from "axios";

function ModalDiverManagement(props) {
  const [showModal, setShowModal] = useState(false);
  const [modifyInfo, setModifyInfo] = useState(false);
  const [valuesModified, setValuesModified] = useState({});

  const handleSubmit = () => {
    console.log(Object.keys(valuesModified).length !== 0);
    if (Object.keys(valuesModified).length !== 0) {
      axios
        .put("/api/divers/update/" + props.diverInfo.id, valuesModified)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }

    setModifyInfo(false);
    setShowModal(false);
    console.log(valuesModified);
    setValuesModified({});
    window.location.reload();
  };

  return (
    <>
      <button
        className={
          "bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full uppercase px-5 py-2.5"
        }
        onClick={() => {
          setShowModal(true);
        }}
      >
        Modify
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center fixed inset-0 z-50">
            <div className="relative w-full max-w-4xl">
              <div className="flex flex-col rounded-lg shadow-lg relative bg-white">
                <div className="p-5 w-full">
                  <h3 className="text-3xl font-semibold">Modify</h3>
                </div>
                <div className={"p-5 w-full"}>
                  <form>
                    <div className={"grid grid-cols-2 gap-4"}>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diverInfo.first_name}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              /^[a-zA-Z]*$/.test(event.target.value)
                            ) {
                              console.log("First name is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                first_name: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diverInfo.last_name}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              /^[a-zA-Z]*$/.test(event.target.value)
                            ) {
                              console.log("First name is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                last_name: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Diver Qualification
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diverInfo.diver_qualification}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              diver_qualification: event.target.value,
                            });
                          }}
                        >
                          <option value="Aucun">Aucun</option>
                          <option value="Etoiles de Mer 1">
                            Etoiles de Mer 1
                          </option>
                          <option value="Etoiles de Mer 2">
                            Etoiles de Mer 2
                          </option>
                          <option value="Etoiles de Mer 3">
                            Etoiles de Mer 3
                          </option>
                          <option value="Bronze">Bronze</option>
                          <option value="Argent">Argent</option>
                          <option value="Or">Or</option>
                          <option value="N1">N1</option>
                          <option value="N2">N2</option>
                          <option value="N3">N3</option>
                          <option value="N4">N4</option>
                          <option value="N4">N5</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Instructor Qualification
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={
                            props.diverInfo.instructor_qualification
                          }
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              instructor_qualification: event.target.value,
                            });
                          }}
                        >
                          <option value="Aucun">Aucun</option>
                          <option value="E1">E1</option>
                          <option value="E2">E2</option>
                          <option value="E3">E3</option>
                          <option value="E4">E4</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Nox Qualification
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diverInfo.nitrox_qualification}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              nitrox_qualification: event.target.value,
                            });
                          }}
                        >
                          <option value="Aucun">Aucun</option>
                          <option value="NITROX">Nitrox</option>
                          <option value="NITROX Confirmé">
                            Nitrox Confirmé
                          </option>
                          <option value="Moniteur NITROX">
                            Moniteur Nitrox
                          </option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          License Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diverInfo.license_number}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^A-\d{2}-\d{6}$/.test(event.target.value)
                            ) {
                              console.log("License number is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                license_number: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          License Expiration Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diverInfo.license_expiration_date.slice(
                            0,
                            10
                          )}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              event.target.value <
                                new Date().toISOString().slice(0, 10)
                            ) {
                              console.log(
                                "License expiration date is not valid"
                              );
                              delete valuesModified.license_expiration_date;
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                license_expiration_date: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Medical Certificate Expiration Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diverInfo.medical_expiration_date.slice(
                            0,
                            10
                          )}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              event.target.value <
                                new Date().toISOString().slice(0, 10)
                            ) {
                              console.log(
                                "Medical certificate expiration date is not valid"
                              );
                              delete valuesModified.medical_expiration_date;
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                medical_expiration_date: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className={"p-5 w-full flex justify-end"}>
                      <button
                        className="background-transparent text-red-500 text-sm font-bold uppercase px-6 py-2 hover:shadow-[inset_13rem_0_0_0] hover:shadow-red-500 hover:text-white rounded-full mr-4 duration-[1000ms,1000ms] transition-[color,box-shadow] "
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setModifyInfo(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className={`uppercase px-6 py-3 bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full ${
                          modifyInfo ? "bg-accent" : "bg-primary"
                        }`}
                        type={modifyInfo ? "submit" : "button"}
                        onClick={(event) => {
                          event.preventDefault();
                          if (modifyInfo) {
                            handleSubmit();
                          } else {
                            setModifyInfo(true);
                          }
                        }}
                      >
                        {modifyInfo ? "Save Changes" : "Modify"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ModalDiverManagement;
