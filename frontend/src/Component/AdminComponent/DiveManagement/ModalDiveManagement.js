import React, { useState } from "react";
import axios from "axios";

function ModalDiveManagement(props) {
  const [showModal, setShowModal] = useState(false);
  const [modifyInfo, setModifyInfo] = useState(false);
  const [valuesModified, setValuesModified] = useState({});
  const handleSubmit = () => {
    console.log(Object.keys(valuesModified).length !== 0);
    if (Object.keys(valuesModified).length !== 0) {
      axios
        .put("/api/dives/update/" + props.diveInfo.id, valuesModified)
        .then((response) => {
          console.log(response.data);
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
          "bg-primary hover:bg-accent text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5"
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
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.name}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s*.,'-]*$/.test(
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
                          Status
                        </label>
                        <select
                          name=""
                          id=""
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.status}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            setValuesModified({
                              ...valuesModified,
                              status: event.target.value,
                            });
                          }}
                        >
                          <option value="3">En cours</option>
                          <option value="1">Ouvert</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Dive Site
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.dive_site}
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
                                dive_site: event.target.value,
                              });
                            }
                          }}
                        >
                          <option value="BARGES">BARGES</option>
                          <option value="ADEPS">ADEPS</option>
                          <option value="BARRAGE DE L'EAU D'HEURE">
                            BARRAGE DE L'EAU D'HEURE
                          </option>
                          <option value="NEMO 33">NEMO 33</option>
                          <option value="LE NAUTILUS">LE NAUTILUS</option>
                          <option value="DOUR">DOUR</option>
                          <option value="TODI">TODI</option>
                          <option value="DUIKTANK">DUIKTANK</option>
                          <option value="FORME 4">FORME 4</option>
                          <option value="LA GOMBE">LA GOMBE</option>
                          <option value="LILLÉ">LILLÉ</option>
                          <option value="BERGSEDIEPSLUIS">
                            BERGSEDIEPSLUIS
                          </option>
                          <option value="EKEREN">EKEREN</option>
                          <option value="BORMES LES MIMOSAS">
                            BORMES LES MIMOSAS
                          </option>
                          <option value="FOSSE VILLENEUVE LA GARENNE">
                            FOSSE VILLENEUVE LA GARENNE
                          </option>
                          <option value="PISCINE DE SAINT-ANDRE-LEZ-LILLE">
                            PISCINE DE SAINT-ANDRE-LEZ-LILLE
                          </option>
                          <option value="DEN OSSE  DIVE SPOT">
                            DEN OSSE DIVE SPOT
                          </option>
                          <option value="PORTO SAN PAOLO (SARDAIGNE)">
                            PORTO SAN PAOLO (SARDAIGNE)
                          </option>
                          <option value="CARRIERE DU FLATO">
                            CARRIERE DU FLATO
                          </option>
                          <option value="LA CROISETTE">LA CROISETTE</option>
                          <option value="ROCHEFONTAINE">ROCHEFONTAINE</option>
                          <option value="FOSSE GEORGES GUYNEMER">
                            FOSSE GEORGES GUYNEMER
                          </option>
                          <option value="VODELÉE">VODELÉE</option>
                          <option value="LAC BLEU">LAC BLEU</option>
                          <option value="CARRIÈRE DE TRÉLON">
                            CARRIÈRE DE TRÉLON
                          </option>
                          <option value="FOSSE EMERAUDE">FOSSE EMERAUDE</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Comment
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.comment}
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
                                comment: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Begin Date
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={new Date(props.diveInfo.date_begin)
                            .toISOString()
                            .slice(0, 19)
                            .replace("T", "T")}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              event.target.value <
                                new Date().toISOString().slice(0, 10)
                            ) {
                              console.log("First name is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                date_begin: event.target.value,
                              });
                            }
                          }}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          End Date
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={new Date(props.diveInfo.date_end)
                            .toISOString()
                            .slice(0, 19)
                            .replace("T", "T")}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              event.target.value <
                                new Date().toISOString().slice(0, 10)
                            ) {
                              console.log("First name is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                date_end: event.target.value,
                              });
                            }
                          }}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Number of Place
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.place_number}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d{2}$/.test(event.target.value)
                            ) {
                              console.log("Number of place is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                place_number: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Place Registered
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.registered_place}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^\d{2}$/.test(event.target.value)
                            ) {
                              console.log("Number of place is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                registered_place: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Diver Price
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.diver_price}
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
                                diver_price: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Instructor Price
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.instructor_price}
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
                                instructor_price: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Surface Security
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.surface_security}
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
                                surface_security: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-light-text">
                          Max PP02
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                          defaultValue={props.diveInfo.max_ppo2}
                          disabled={!modifyInfo}
                          onChange={(event) => {
                            if (
                              event.target.value === "" ||
                              !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s².,'-]*$/.test(
                                event.target.value
                              )
                            ) {
                              console.log("First name is not valid");
                            } else {
                              setValuesModified({
                                ...valuesModified,
                                max_ppo2: event.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className={"p-5 w-full flex justify-end"}>
                      <button
                        className="background-transparent text-red-500 text-sm font-bold uppercase px-6 py-2 outline-none focus:outline-none"
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setModifyInfo(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className={`text-white text-sm font-bold uppercase px-6 py-3 rounded outline-none focus:outline-none ${
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

export default ModalDiveManagement;
