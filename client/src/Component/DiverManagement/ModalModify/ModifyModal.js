import React, { useState } from "react";

function ModifyModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [valueModified, setValueModified] = useState(props.info);

  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-bold uppercase rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Open
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
                  <form className={"grid grid-cols-2 gap-4"}>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={props.info.Firstname}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            firstname: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={props.info.Lastname}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            lastname: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Diver Qualification
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={props.info.Diver_Qualifications}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            diverQualification: event.target.value,
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
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Instructor Qualification
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={props.info.Instructor_Qualification}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            instructorQualification: event.target.value,
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={props.info.Nox_Level}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            noxQualification: event.target.value,
                          });
                        }}
                      >
                        <option value="Aucun">Aucun</option>
                        <option value="NITROX">Nitrox</option>
                        <option value="NITROX Confirmé">Nitrox Confirmé</option>
                        <option value="Moniteur NITROX">Moniteur Nitrox</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        License Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={props.info.License_Number}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            licenseNumber: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        License Expiration Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={new Date(
                          props.info.License_Expiration_Date
                        )
                          .toISOString()
                          .slice(0, 10)}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            licenseExpirationDate: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Medical Certificate Expiration Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        defaultValue={new Date(
                          props.info.Medical_Certificate_Expiration_Date
                        )
                          .toISOString()
                          .slice(0, 10)}
                        onChange={(event) => {
                          setValueModified({
                            ...valueModified,
                            medicalCertificateExpirationDate:
                              event.target.value,
                          });
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div className={"p-5 w-full flex justify-end"}>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => console.log(valueModified)}
                  >
                    Save Changes
                  </button>
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

export default ModifyModal;
