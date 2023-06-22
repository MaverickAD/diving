import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PalanqueeDrop from "./PalanqueeDrop";
import axios from "axios";
import Loader from "../../../Loader/Loader";

function DiveCreator(props) {
  const [diveInfo, setDiveInfo] = useState({});
  const [divers, setDivers] = useState([]);
  const [palanquees, setPalanquees] = useState([]);
  const [canModify, setCanModify] = useState(true);
  const { dive } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <button
        className={" bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full px-5 py-2.5 mb-6"}
        onClick={() => navigate("/instructor/dive_management")}
      >
        Return
      </button>
      <h2 className={"text-light-text text-xl font-bold mb-6"}>Dive Creator</h2>
      {Object.keys(diveInfo).length === 0 &&
      Object.keys(palanquees).length === 0 &&
      Object.keys(divers).length === 0 &&
      dive !== "new" ? (
        <Loader />
      ) : (
        <form>
          <div className={"grid grid-cols-2 gap-4"}>
            <div className={"mb-4"}>
              <label className={"block mb-2 text-sm font-bold text-light-text"}>
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                defaultValue={dive === "new" ? "" : diveInfo.name}
              />
            </div>
            <div className={"mb-4"}>
              <label className="block mb-2 text-sm font-bold text-light-text">
                Dive Site
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                defaultValue={dive === "new" ? "" : diveInfo.dive_site}
              >
                <option value=""></option>
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
                <option value="BERGSEDIEPSLUIS">BERGSEDIEPSLUIS</option>
                <option value="EKEREN">EKEREN</option>
                <option value="BORMES LES MIMOSAS">BORMES LES MIMOSAS</option>
                <option value="FOSSE VILLENEUVE LA GARENNE">
                  FOSSE VILLENEUVE LA GARENNE
                </option>
                <option value="PISCINE DE SAINT-ANDRE-LEZ-LILLE">
                  PISCINE DE SAINT-ANDRE-LEZ-LILLE
                </option>
                <option value="DEN OSSE  DIVE SPOT">DEN OSSE DIVE SPOT</option>
                <option value="PORTO SAN PAOLO (SARDAIGNE)">
                  PORTO SAN PAOLO (SARDAIGNE)
                </option>
                <option value="CARRIERE DU FLATO">CARRIERE DU FLATO</option>
                <option value="LA CROISETTE">LA CROISETTE</option>
                <option value="ROCHEFONTAINE">ROCHEFONTAINE</option>
                <option value="FOSSE GEORGES GUYNEMER">
                  FOSSE GEORGES GUYNEMER
                </option>
                <option value="VODELÉE">VODELÉE</option>
                <option value="LAC BLEU">LAC BLEU</option>
                <option value="CARRIÈRE DE TRÉLON">CARRIÈRE DE TRÉLON</option>
                <option value="FOSSE EMERAUDE">FOSSE EMERAUDE</option>
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
              ></input>
            </div>
            <div className={"mb-4"}>
              <label className="block mb-2 text-sm font-bold text-light-text">
                Comment
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                defaultValue={dive === "new" ? "" : diveInfo.comment}
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
              />
            </div>
            {dive === "new" ? (
              ""
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
            {dive === "new" ? (
              ""
            ) : (
              <div className={"mb-4 col-span-2"}>
                <label className="block mb-2 text-sm font-bold text-light-text">
                  List of Team
                </label>
                <div className={"grid grid-cols-2 gap-4"}>
                  <DndProvider backend={HTML5Backend}>
                    {palanquees.map((palanquee, index) => (
                      <div key={index} className={`border rounded-md p-4`}>
                        <div className={"flex justify-around mb-2"}>
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
                          setModify={setCanModify}
                        />
                        {(divers.filter(
                          (diver) => diver.palanquee === palanquee.id
                        ).length === 1 ||
                          divers.filter(
                            (diver) => diver.palanquee === palanquee.id
                          ).length > 4) && (
                          <div>
                            <p className={"text-center text-white bg-red-700"}>
                              {divers.filter(
                                (diver) => diver.palanquee === palanquee.id
                              ).length === 1
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
                canModify ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
              }`}
              disabled={canModify}
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
