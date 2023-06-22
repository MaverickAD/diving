import React, { useState } from "react";
import axios from "axios";

function ModalDiveSiteManagement(props) {
  const [showModal, setShowModal] = useState(false);
  const [modifyInfo, setModifyInfo] = useState(false);
  const [valuesModified, setValuesModified] = useState({});

  const handleSubmit = () => {
    if (Object.keys(valuesModified).length !== 0) {
      axios
        .put("/api/sites/update/" + props.siteDiveInfo.id, valuesModified)
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
        className={
          "uppercase bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full px-5 py-2.5"
        }
        onClick={() => {
          setShowModal(true);
          console.log(valuesModified);
        }}
      >
        Modify
      </button>
      {showModal ? (
        <>
          <div
            className={"flex justify-center items-center fixed inset-0 z-50"}
          >
            <div className={"relative w-full max-w-4xl"}>
              <div
                className={
                  "flex flex-col rounded-lg shadow-lg relative bg-white"
                }
              >
                <div className={"p-5 w-full"}>
                  <h3 className={"text-3xl font-semibold"}>Modify</h3>
                </div>
                <div className={"p-5 w-full"}>
                  <form>
                    <div className={"grid grid-cols-2 gap-4"}>
                      <div className={"mb-4"}>
                        <label
                          className={
                            "block mb-2 text-sm font-bold text-light-text"
                          }
                        >
                          Site Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.name}
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
                                name: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Latitude
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.latitude}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d+(\.\d+)?$/.test(event.target.value)
                            ) {
                              console.log("Number of place is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                latitude: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Longitude
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.longitude}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d+(\.\d+)?$/.test(event.target.value)
                            ) {
                              console.log("Number of place is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                longitude: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.address}
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
                                address: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.zip_code}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d{4,5}$/.test(event.target.value)
                            ) {
                              console.log("Number of place is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                zip_code: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.city}
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
                                city: event.target.value.toUpperCase(),
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Country
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.country}
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
                                country: event.target.value.toUpperCase(),
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Additional Address
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.additional_address}
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
                                additional_address: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Tel
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.tel}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              tel: event.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          URL
                        </label>
                        <input
                          type="url"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          required={true}
                          defaultValue={props.siteDiveInfo.url}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              url: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-5 w-full flex justify-end">
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

export default ModalDiveSiteManagement;
