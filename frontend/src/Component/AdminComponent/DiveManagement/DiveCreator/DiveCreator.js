import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PalanqueeDrop from "./PalanqueeDrop";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../../Loader/Loader";
import alertify from "alertifyjs";

function DiveCreator(props) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [diveInstructor, setDiveInstructor] = useState([]);
  const [diveSite, setDiveSite] = useState([]);
  const [diveInfo, setDiveInfo] = useState({});
  const [divers, setDivers] = useState([]);
  const [palanquees, setPalanquees] = useState([]);
  const [canModify, setCanModify] = useState(true);
  const [canAddTeam, setCanAddTeam] = useState(false);
  const [addTeam, setAddTeam] = useState({ type: "autonome", depth: "12" });
  const [modifiedData, setModifiedData] = useState({});
  const { dive } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
        .get("/api/users/dive_director")
        .then((response) => {
          setDiveInstructor(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    axios
        .get("/api/sites/all")
        .then((response) => {
          setDiveSite(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    if (!isNaN(Number(dive))) {
      axios
          .get("/api/dives/modifier/dive/" + dive)
          .then((response) => {
            setDiveInfo(response.data[0]);
          })
          .catch((error) => {
            console.log(error);
          });

      axios
          .get("/api/dives/modifier/diveteam/" + dive)
          .then((response) => {
            setPalanquees(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

      axios
          .get("/api/dives/modifier/divers/" + dive)
          .then((response) => {
            setDivers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [dive]);

  const handleDeletePalanquee = (index) => {
    const updatedPalanquees = [...palanquees];
    let indexElem = updatedPalanquees.findIndex((palanquee) => palanquee.id === index);
    let skip = false;
    divers.forEach((diver) => {
      if(skip) return;
      if (diver.palanquee === updatedPalanquees[indexElem].id) {
        skip = true;
        return alertify.error("You can't delete a palanquee with divers in it");
      }
    })
    if(!skip) {
      axios
          .delete("/api/dives/supprimer/diveteam/" + updatedPalanquees[indexElem].id)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      updatedPalanquees.splice(indexElem, 1);
      setPalanquees(updatedPalanquees);
      setShowDeleteIcon(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let dateBegin;
    if(modifiedData.date_begin){
      dateBegin = new Date(modifiedData.date_begin);
    }else{
      dateBegin = new Date(diveInfo.date_begin);
    }
    let date24hBefore = new Date(dateBegin - 86400000);

    let palanqueeMap = {};
    if(Date.now() > date24hBefore.getTime()){
      for(let i = 0; i < divers.length; i++){
        if(palanqueeMap[divers[i].palanquee]){
          palanqueeMap[divers[i].palanquee].push(divers[i].id);
        }else{
          palanqueeMap[divers[i].palanquee] = [divers[i].id];
        }
      }

      for (let id in palanqueeMap) {
          if(palanqueeMap[id].length <= 1){
            return alertify.error("You can't have a palanquee with less than 2 divers");
          }
      }
    }

    if (dive === "new") {
        console.log("new")
      axios
        .post("/api/dives/modifier/dive", modifiedData)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
        console.log("not new")
      axios
        .put("/api/dives/modifier/dive/" + dive, modifiedData)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    let boolPalanquees = false;
    palanquees.map((palanquee) => {
      if (Object.keys(palanquee).includes("new")) {
        boolPalanquees = true;
      }
    });

    if (boolPalanquees) {
      axios
          .post("/api/dives/modifier/diveteam/" + dive, palanquees)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }


    let boolDivers = false;
    divers.map((diver) => {
      if (diver.palanquee !== diver.initial) {
        boolDivers = true;
      }
    });

    if (boolDivers) {
      axios
          .put("/api/dives/modifier/divers/" + dive, divers)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    //window.location.reload();
  };

  return (
      <div>
        <button
            className={" bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full px-5 py-2.5 mb-6"}
            onClick={() => navigate("/instructor/dive_management")}
        >
          Return
        </button>
        <h2 className={"text-light-text text-xl font-bold mb-6"}>Dive Creator</h2>
        {(diveInstructor.length === 0 ||
            diveSite.length === 0 ||
            Object.keys(diveInfo).length === 0) /*||
        palanquees.length === 0 ||
        divers.length === 0*/ &&
        dive !== "new" ? (
            <Loader />
        ) : (
            <form onSubmit={handleSubmit}>
              <div className={"grid grid-cols-2 gap-4"}>
                <div className={"mb-4"}>
                  <label className={"block mb-2 text-sm font-bold text-light-text"}>
                    Name
                  </label>
                  <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.name}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            name: event.target.value,
                          })
                      }
                  />
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Dive Site
                  </label>
                  <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.dive_site}
                      onChange={(event) => {
                        setModifiedData({
                          ...modifiedData,
                          dive_site: event.target.value,
                        });

                        diveSite.map((site) => {
                          if (site.name === event.target.value) {
                            setModifiedData({
                              ...modifiedData,
                              dive_site: site.id,
                            });
                          }
                        });
                      }}
                  >
                    {diveSite.map((site, index) => (
                        <option key={index} value={site.name}>
                          {site.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Begin Date
                  </label>
                  <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={
                        dive === "new"
                            ? new Date().toISOString().slice(0, 16)
                            : new Date(diveInfo.date_begin).toISOString().slice(0, 16)
                      }
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            date_begin: event.target.value,
                          })
                      }
                  ></input>
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    End Date
                  </label>
                  <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={
                        dive === "new"
                            ? new Date().toISOString().slice(0, 16)
                            : new Date(diveInfo.date_end).toISOString().slice(0, 16)
                      }
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            date_end: event.target.value,
                          })
                      }
                  ></input>
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Dive Instructor
                  </label>
                  <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={
                        dive === "new"
                            ? ""
                            : diveInfo.director_first_name +
                            " " +
                            diveInfo.director_last_name
                      }
                      onChange={(event) => {
                        diveInstructor.map((instructor) => {
                          if (
                              instructor.first_name + " " + instructor.last_name ===
                              event.target.value
                          ) {
                            setModifiedData({
                              ...modifiedData,
                              director: instructor.id,
                            });
                          }
                        });
                      }}
                  >
                    {diveInstructor.map((instructor, index) => (
                        <option
                            key={index}
                            value={instructor.first_name + " " + instructor.last_name}
                            className={`${
                                instructor.diver_qualification === 12
                                    ? "bg-orange-300 opacity-75"
                                    : instructor.instructor_qualification === 4
                                        ? "bg-green-300 opacity-75"
                                        : instructor.instructor_qualification === 5
                                            ? "bg-blue-300 opacity-75"
                                            : "bg-gray-300 opacity-75"
                            }`}
                        >
                          {instructor.first_name +
                              " " +
                              instructor.last_name +
                              " " +
                              (instructor.diver_qualification === 12
                                  ? "N5"
                                  : instructor.instructor_qualification === 4
                                      ? "E4"
                                      : instructor.instructor_qualification === 5
                                          ? "E5"
                                          : "")}
                        </option>
                    ))}
                  </select>
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Comment
                  </label>
                  <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.comment}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            comment: event.target.value,
                          })
                      }
                  />
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Number of Place
                  </label>
                  <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.place_number}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            place_number: event.target.value,
                          })
                      }
                  />
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Place Registered
                  </label>
                  <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.registered_place}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            registered_place: event.target.value,
                          })
                      }
                      disabled={true}
                  />
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Diver Price
                  </label>
                  <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.diver_price}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            diver_price: event.target.value,
                          })
                      }
                  />
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Instructor Price
                  </label>
                  <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.instructor_price}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            instructor_price: event.target.value,
                          })
                      }
                  />
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Surface Security
                  </label>
                  <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.surface_security}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            surface_security: event.target.value,
                          })
                      }
                  />
                </div>
                <div className={"mb-4"}>
                  <label className="block mb-2 text-sm font-bold text-light-text">
                    Max PP02
                  </label>
                  <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      defaultValue={dive === "new" ? "" : diveInfo.max_ppo2}
                      onChange={(event) =>
                          setModifiedData({
                            ...modifiedData,
                            max_ppo2: event.target.value,
                          })
                      }
                  />
                </div>
                {divers.length === 0 || dive === "new" ? (
                    <div className={"mb-4 col-span-2"}>
                      <label className="block mb-2 text-sm font-bold text-light-text">
                        List of Diver
                      </label>
                      <div
                          className={
                            "w-full h-56 overflow-x-hidden overflow-y-auto border border-gray-300 rounded-md p-2"
                          }
                      >
                        <p>No divers yet</p>
                      </div>
                    </div>
                ) : (
                    <div className={"mb-4 col-span-2"}>
                      <label className="block mb-2 text-sm font-bold text-light-text">
                        List of Diver
                      </label>
                      <div
                          className={
                            "w-full h-56 overflow-x-hidden overflow-y-auto border border-gray-300 rounded-md p-2"
                          }
                      >
                        {divers.map((diver, index) => (
                            <div
                                key={index}
                                className={"px-1 py-2 grid grid-cols-4 border-b"}
                            >
                              <p className={"text-center"}>{diver.first_name}</p>
                              <p className={"text-center"}>{diver.last_name}</p>
                              <p className={"text-center"}>PA-{diver.pa}</p>
                              <p className={"text-center"}>PE-{diver.pe}</p>
                            </div>
                        ))}
                      </div>
                    </div>
                )}
                {palanquees.length === 0 || dive === "new" ? (
                    <div className={"mb-4 col-span-2"}>
                      <label className="block text-sm font-bold text-light-text">
                        List of Team
                      </label>
                      <div className={"border border-gray-300 rounded-md p-2"}>
                        <p>No teams yet</p>
                      </div>
                    </div>
                ) : (
                    <div className={"mb-4 col-span-2"}>
                      <div className={"flex justify-between items-end mb-2"}>
                        <label className="block text-sm font-bold text-light-text">
                          List of Team
                        </label>

                        {!canAddTeam ? (
                            <button
                                type={"button"}
                                className={
                                  "bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded-full"
                                }
                                onClick={() => {
                                  setCanAddTeam(true);
                                }}
                            >
                              Add a Team
                            </button>
                        ) : (
                            <div className={"grid grid-cols-3 gap-2"}>
                              <label
                                  className={`w-max text-sm font-bold text-light-text flex justify-center items-end`}
                              >
                                Type of Team :
                              </label>
                              <select
                                  className={`w-full border border-gray-300 rounded-md focus:outline-none focus:border-accent`}
                                  onChange={(event) => {
                                    setAddTeam({
                                      type:
                                          event.target.value.slice(0, 2) === "PA"
                                              ? "autonome"
                                              : "encadré",
                                      depth: event.target.value.slice(3),
                                    });
                                  }}
                              >
                                <option value="PA-12">PA-12</option>
                                <option value="PA-20">PA-20</option>
                                <option value="PA-60">PA-60</option>
                                <option value="PE-6">PE-6</option>
                                <option value="PE-20">PE-20</option>
                                <option value="PE-40">PE-40</option>
                                <option value="PE-60">PE-60</option>
                              </select>
                              <button
                                  className={
                                    "bg-primary hover:bg-accent text-white font-bold py-1 rounded-full"
                                  }
                                  onClick={() => {
                                    setCanAddTeam(false);
                                    setPalanquees([
                                      ...palanquees,
                                      {
                                        dive_type: addTeam.type,
                                        max_depth: addTeam.depth,
                                        id: uuidv4(),
                                        new: true,
                                      },
                                    ]);
                                    setCanModify(true);
                                  }}
                              >
                                Ok
                              </button>
                            </div>
                        )}
                        <button
                            type={"button"}
                            className={
                              "bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded-full"
                            }
                            onClick={() => {
                              setShowDeleteIcon(!showDeleteIcon);
                            }}
                        >
                          {showDeleteIcon ? "Cancel" : "Remove Team"}
                        </button>


                      </div>
                      <div className={"grid grid-cols-2 gap-4"}>
                        <DndProvider backend={HTML5Backend}>
                          {palanquees.map((palanquee, index) => (
                              <div key={index} className={`border rounded-md p-4`}>
                                <div className={"flex justify-around mb-2"}>
                                  {showDeleteIcon && (
                                      <button
                                          type="button"
                                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                          onClick={() => {
                                            handleDeletePalanquee(palanquee.id);
                                          }}
                                      >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                          <path
                                              fillRule="evenodd"
                                              d="M4.028 3.001A2 2 0 0 1 6 3h8a2 2 0 0 1 1.972 2.001L16 5h2v2l-.223 10.452A2 2 0 0 1 15.762 19H4.238a2 2 0 0 1-1.995-1.548L2 7V5h2.028zm1.945 2.084L5.52 6h8.96l-.453-.915A1 1 0 0 0 13.05 4H6.95a1 1 0 0 0-.977 1.084zM4 7l-.001 10h12L16 7H4zm5 2a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1zm-3 0a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1zm6 0a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1z"
                                              clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                  )}



                                  <p>Palanquee {index + 1}</p>
                                  <p>
                                    {palanquee.dive_type === "autonome" ? "PA-" : "PE-"}
                                    {palanquee.max_depth}
                                  </p>
                                </div>
                                <PalanqueeDrop
                                    divers={divers}
                                    update={setDivers}
                                    palanquee={palanquee.id}
                                    palanqueeDate={palanquee.date_begin}
                                    setModify={setCanModify}
                                />
                                {(divers.filter(
                                        (diver) => diver.palanquee === palanquee.id
                                    ).length <= 1 ||
                                    divers.filter(
                                        (diver) => diver.palanquee === palanquee.id
                                    ).length > 4) && (
                                    <div>
                                      <p className={"text-center text-white bg-red-700"}>
                                        {divers.filter(
                                            (diver) => diver.palanquee === palanquee.id
                                        ).length <= 1
                                            ? "At least 2 divers"
                                            : "Maximum 4 divers"}
                                      </p>
                                    </div>
                                )}
                              </div>
                          ))}
                        </DndProvider>
                      </div>
                    </div>
                )}
              </div>
              <div className={"flex justify-center"}>
                <button
                    type={"submit"}
                    className={`bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full py-2 px-4 ${
                        canModify ? "hover:bg-accent" : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!canModify}
                >
                  Submit
                </button>
              </div>
            </form>
        )}
      </div>
  );
}

export default DiveCreator;
