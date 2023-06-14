import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminManagement from "../Component/SuperAdminComponent/AdminManagement/AdminManagement";
import Calendar from "../Component/AdminComponent/Calendar/Calendar";
import DiveManagement from "../Component/AdminComponent/DiveManagement/DiveManagement";
import DiverManagement from "../Component/AdminComponent/DiverManagement/DiverManagement";
import DiveSiteManagement from "../Component/SuperAdminComponent/DiveSiteManagement/DiveSiteManagement";
import History from "../Component/AdminComponent/History/History";
import axios from "axios";
import useVerifyToken from "../Hooks/useVerifyToken";

function Instructor(props) {
  const [pageSelected, setPageSelected] = useState(Number);
  const { page } = useParams();
  const navigate = useNavigate();

  useVerifyToken();

  return (
    <div className={"flex w-full"}>
      <div className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}>
        <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 1 ||
            page === "diver_management" ||
            page === undefined
              ? "bg-cyan-200/75"
              : ""
          }`}
          onClick={() => {
            setPageSelected(1);
            navigate("/instructor/diver_management");
          }}
        >
          <p>Gestion des plongeurs</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 2 || page === "calendar" ? "bg-cyan-200/75" : ""
          }`}
          onClick={() => {
            setPageSelected(2);
            navigate("/instructor/calendar");
          }}
        >
          <p>Gestion des plannings</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 3 || page === "dive_management"
              ? "bg-cyan-200/75"
              : ""
          }`}
          onClick={() => {
            setPageSelected(3);
            navigate("/instructor/dive_management");
          }}
        >
          <p>Gestion des plongées</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 4 || page === "history" ? "bg-cyan-200/75" : ""
          }`}
          onClick={() => {
            setPageSelected(4);
            navigate("/instructor/history");
          }}
        >
          <p>Historique</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 5 || page === "dive_site_management"
              ? "bg-cyan-200/75"
              : ""
          }`}
          onClick={() => {
            setPageSelected(5);
            navigate("/instructor/dive_site_management");
          }}
        >
          <p>Gestion des sites de plongée</p>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded-md ${
            pageSelected === 6 || page === "admin_management"
              ? "bg-cyan-200/75"
              : ""
          }`}
          onClick={() => {
            setPageSelected(6);
            navigate("/instructor/admin_management");
          }}
        >
          <p>Gestion admin</p>
        </div>
      </div>
      <div className={"w-full bg-white mx-2 p-4 rounded shadow-md"}>
        {pageSelected === 1 || page === "diver_management" ? (
          <DiverManagement />
        ) : pageSelected === 2 || page === "calendar" ? (
          <Calendar />
        ) : pageSelected === 3 || page === "dive_management" ? (
          <DiveManagement />
        ) : pageSelected === 4 || page === "history" ? (
          <History />
        ) : pageSelected === 5 || page === "dive_site_management" ? (
          <DiveSiteManagement />
        ) : pageSelected === 6 || page === "admin_management" ? (
          <AdminManagement />
        ) : (
          <DiverManagement />
        )}
      </div>
    </div>
  );
}

export default Instructor;
