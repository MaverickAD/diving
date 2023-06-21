import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function DiveCreator(props) {
  const divers = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      pa: "PA-60",
      pe: "PE-60",
    },
    {
      id: 2,
      first_name: "John",
      last_name: "Doe",
      pa: "PA-60",
      pe: "PE-60",
    },
    {
      id: 3,
      first_name: "John",
      last_name: "Doe",
      pa: "PA-60",
      pe: "PE-60",
    },
    {
      id: 4,
      first_name: "John",
      last_name: "Doe",
      pa: "PA-60",
      pe: "PE-60",
    },
    {
      id: 5,
      first_name: "John",
      last_name: "Doe",
      pa: "PA-60",
      pe: "PE-60",
    },
    {
      id: 6,
      first_name: "John",
      last_name: "Doe",
      pa: "PA-60",
      pe: "PE-60",
    },
  ];
  const palanquees = [
    {
      id: 1,
      name: "Palanquee 1",
      type: "PA-60",
      divers: [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
        {
          id: 3,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
        {
          id: 4,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
      ],
    },
    {
      id: 2,
      name: "Palanquee 2",
      type: "PA-60",
      divers: [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
        {
          id: 3,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
        {
          id: 4,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
      ],
    },

    {
      id: 3,
      name: "Palanquee 3",
      type: "PA-60",
      divers: [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          pa: "PA-60",
          pe: "PE-60",
        },
      ],
    },
  ];
  const { dive } = useParams();
  const navigate = useNavigate();

  console.log(dive);
  return (
    <div>
      <button
        className={"underline text-sm"}
        onClick={() => navigate("/instructor/dive_management")}
      >
        Return
      </button>
      <h2 className={"text-light-text text-xl font-bold mb-6"}>Dive Creator</h2>
      <form>
        <div className={"grid grid-cols-2 gap-4"}>
          <div className={"mb-4"}>
            <label className={"block mb-2 text-sm font-bold text-light-text"}>
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Dive Site
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent">
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
            ></input>
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Comment
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Number of Place
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Place Registered
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Diver Price
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Instructor Price
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Surface Security
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              Max PP02
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <div className={"mb-4 col-span-2"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              List of Diver
            </label>
            <div
              className={
                "w-full h-56 overflow-x-hidden overflow-y-auto border border-gray-300 rounded-md p-2"
              }
            >
              {divers.map((diver) => (
                <div
                  key={diver.id}
                  className={"px-1 py-2 grid grid-cols-4 border-b"}
                >
                  <p className={"text-center"}>{diver.first_name}</p>
                  <p className={"text-center"}>{diver.last_name}</p>
                  <p className={"text-center"}>{diver.pa}</p>
                  <p className={"text-center"}>{diver.pe}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={"mb-4 col-span-2"}>
            <label className="block mb-2 text-sm font-bold text-light-text">
              List of Team
            </label>
            <div className={"grid grid-cols-2 gap-4"}>
              {palanquees.map((palanquee) => (
                <div
                  key={palanquee.id}
                  className={`border rounded-md p-4 ${
                    palanquee.divers.length === 1
                      ? "border-red-700"
                      : "border-gray-300"
                  }`}
                >
                  <div className={"flex justify-around mb-2"}>
                    <p>{palanquee.name}</p>
                    <p>{palanquee.type}</p>
                  </div>
                  {palanquee.divers.map((diver) => (
                    <div
                      key={diver.id}
                      className={"px-1 py-2 grid grid-cols-4 border-b"}
                      draggable
                    >
                      <p className={"text-center"}>{diver.first_name}</p>
                      <p className={"text-center"}>{diver.last_name}</p>
                      <p className={"text-center"}>{diver.pa}</p>
                      <p className={"text-center"}>{diver.pe}</p>
                    </div>
                  ))}
                  {palanquee.divers.length === 1 && (
                    <div>
                      <p className={"text-center text-white bg-red-700"}>
                        At least two divers
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DiveCreator;
