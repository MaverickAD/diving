import React, { useState } from "react";
import axios from "axios";

function ModalDiveSiteAdd(props) {
  const [showModal, setShowModal] = useState(false);
  const [valuesAdded, setValuesAdded] = useState({});

  const handleSubmit = () => {
    if (Object.keys(valuesAdded).length !== 0) {
      axios
        .post("/api/sites/add", valuesAdded)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setShowModal(false);
    console.log(valuesAdded);
    setValuesAdded({});
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
          console.log(valuesAdded);
        }}
      >
        Add a dive site
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s.,'-]*$/.test(
                                event.target.value
                              )
                            ) {
                              console.log("First name is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d+(\.\d+)?$/.test(event.target.value)
                            ) {
                              console.log("Latitude is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
                                latitude: event.target.value,
                                url:
                                  "https://www.google.com/maps/place/" +
                                  event.target.value +
                                  "," +
                                  valuesAdded.longitude,
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d+(\.\d+)?$/.test(event.target.value)
                            ) {
                              console.log("Longitude is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
                                longitude: event.target.value,
                                url:
                                  "https://www.google.com/maps/place/" +
                                  valuesAdded.latitude +
                                  "," +
                                  event.target.value,
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s.,'-]*$/.test(
                                event.target.value
                              )
                            ) {
                              console.log("Address is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d{4,5}$/.test(event.target.value)
                            ) {
                              console.log("Zip code is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s.,'-]*$/.test(
                                event.target.value
                              )
                            ) {
                              console.log("City is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s.,'-]*$/.test(
                                event.target.value
                              )
                            ) {
                              console.log("Country is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
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
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s.,'-]*$/.test(
                                event.target.value
                              )
                            ) {
                              console.log("Additional Address is not valid");
                            } else {
                              setValuesAdded({
                                ...valuesAdded,
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
                          onChange={(event) => {
                            setValuesAdded({
                              ...valuesAdded,
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
                          disabled={true}
                          defaultValue={
                            valuesAdded.latitude === undefined ||
                            valuesAdded.longitude === undefined
                              ? ""
                              : "https://www.google.com/maps/place/" +
                                valuesAdded.latitude +
                                "," +
                                valuesAdded.longitude
                          }
                        />
                      </div>
                    </div>

                    <div className="p-5 w-full flex justify-end">
                      <button
                          className={"background-transparent text-red-500 text-sm font-bold uppercase px-6 py-2 hover:shadow-[inset_13rem_0_0_0] hover:shadow-red-500 hover:text-white rounded-full mr-4 duration-[1000ms,1000ms] transition-[color,box-shadow]"}
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                          className={"uppercase px-6 py-3 bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full"}
                        type={"submit"}
                        onClick={(event) => {
                          event.preventDefault();
                          handleSubmit();
                        }}
                      >
                        Add Site
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

export default ModalDiveSiteAdd;
