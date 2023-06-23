import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiveAvailable from "../Component/DiverComponent/DiveAvailable/DiveAvailable";
import DiveHistory from "../Component/DiverComponent/DiveHistory/DiveHistory";
import DiveRegister from "../Component/DiverComponent/DiveRegister/DiveRegister";
import Information from "../Component/DiverComponent/Information/Information";
import axios from "axios";
import useVerifyToken from "../Hooks/useVerifyToken";

function Diver(props) {
  const [pageSelected, setPageSelected] = useState(Number);
  const { page } = useParams();
  const navigate = useNavigate();

  useVerifyToken("");

  return (
    <div className={"flex w-full"}>
      <div className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}>
        <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 1 || page === "me" || page === undefined
              ? "bg-cyan-200/75"
              : ""
          }`}
          onClick={() => {
            setPageSelected(1);
            navigate("/diver/me");
          }}
        >
          <p>Mes Informations</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 2 || page === "history" ? "bg-cyan-200/75" : ""
          }`}
          onClick={() => {
            setPageSelected(2);
            navigate("/diver/history");
          }}
        >
          <p>Historique de mes plongées</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 3 || page === "registered" ? "bg-cyan-200/75" : ""
          }`}
          onClick={() => {
            setPageSelected(3);
            navigate("/diver/registered");
          }}
        >
          <p>Mes plongées prévues</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 4 || page === "available" ? "bg-cyan-200/75" : ""
          }`}
          onClick={() => {
            setPageSelected(4);
            navigate("/diver/available");
          }}
        >
          <p>Plongées disponibles</p>
        </div>
      </div>

      <div className={"w-full bg-white mx-2 p-4 rounded-md shadow-md"}>
        {pageSelected === 1 || page === "me" ? (
          <Information token={props.token} />
        ) : pageSelected === 2 || page === "history" ? (
          <DiveHistory token={props.token} />
        ) : pageSelected === 3 || page === "registered" ? (
          <DiveRegister token={props.token} />
        ) : pageSelected === 4 || page === "available" ? (
          <DiveAvailable token={props.token} />
        ) : (
          <Information token={props.token} />
        )}
      </div>
    </div>
  );
}

export default Diver;
