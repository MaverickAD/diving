import React, { useState } from "react";
import axios from "axios";

function ModalAdminManagement(props) {
  const [showModal, setShowModal] = useState(false);
  const [modifyInfo, setModifyInfo] = useState(false);
  const [valuesModified, setValuesModified] = useState({});

  const handleSubmit = () => {
    if (Object.keys(valuesModified).length !== 0) {
      axios
        .put("/api/users/admin/update/" + props.adminInfo.id, valuesModified)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
          className={"uppercase px-4 py-2 bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full"}
          onClick={() => {
          setShowModal(true);
          console.log(valuesModified);
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
                          defaultValue={props.adminInfo.first_name}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s.,'-]*$/.test(
                                event.target.value
                              )
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
                          defaultValue={props.adminInfo.last_name}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s.,'-]*$/.test(
                                event.target.value
                              )
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
                          defaultValue={props.adminInfo.diver_qualification}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              diver_qualification: event.target.value,
                            });
                          }}
                        >
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
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Instructor Qualification
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={
                            props.adminInfo.instructor_qualification
                          }
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              instructor_qualification: event.target.value,
                            });
                          }}
                        >
                          <option value="1">Aucun</option>
                          <option value="2">E1</option>
                          <option value="3">E2</option>
                          <option value="4">E3</option>
                          <option value="5">E4</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Nox Qualification
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.adminInfo.nitrox_qualification}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              nitrox_qualification: event.target.value,
                            });
                          }}
                        >
                          <option value="1">Aucun</option>
                          <option value="2">Nitrox</option>
                          <option value="3">Nitrox Confirmé</option>
                          <option value="4">Moniteur Nitrox</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Rank
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.adminInfo.rank}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              rank: event.target.value,
                            });
                          }}
                        >
                          <option value="0">No right</option>
                          <option value="1">Admin</option>
                          <option value="2">Super Admin</option>
                        </select>
                      </div>
                    </div>

                    <div className={"p-5 w-full flex justify-end"}>
                      <button
                          className={"background-transparent text-red-500 text-sm font-bold uppercase px-6 py-2 hover:shadow-[inset_13rem_0_0_0] hover:shadow-red-500 hover:text-white rounded-full mr-4 duration-[1000ms,1000ms] transition-[color,box-shadow]"}
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setModifyInfo(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                          className={
                              `uppercase px-6 py-3 bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full ${
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

export default ModalAdminManagement;
