import React, { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import useVerifyToken from "../Hooks/useVerifyToken";

function Instructor(props) {
  const [pageSelected, setPageSelected] = useState(Number);
  const { page } = useParams();
  const navigate = useNavigate();

  useVerifyToken("admin");

  return (
    <div className={"flex w-full"}>
      <div className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}>
        <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
        <div
          className={`mb-2 px-2 py-2 rounded border ${
            pageSelected === 1 || page === "diver_management"
              ? "bg-accent border-accent shadow-md"
              : "border-white hover:border-accent hover:shadow-md"
          }`}
          onClick={() => {
            setPageSelected(1);
            navigate("/instructor/diver_management");
          }}
        >
          <Link to={"/instructor/diver_management"}>Diver Management</Link>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded border ${
            pageSelected === 3 || page === "dive_management"
              ? "bg-accent border-accent shadow-md"
              : "border-white hover:border-accent hover:shadow-md"
          }`}
          onClick={() => {
            setPageSelected(3);
            navigate("/instructor/dive_management");
          }}
        >
          <Link to={"/instructor/dive_management"}>Dive Management</Link>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded border ${
            pageSelected === 4 || page === "history"
              ? "bg-accent border-accent shadow-md"
              : "border-white hover:border-accent hover:shadow-md"
          }`}
          onClick={() => {
            setPageSelected(4);
            navigate("/instructor/history");
          }}
        >
          <Link to={"/instructor/history"}>History</Link>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded border  ${
            pageSelected === 5 || page === "dive_site_management"
              ? "bg-accent border-accent shadow-md"
              : "border-white hover:border-accent hover:shadow-md"
          }`}
          onClick={() => {
            setPageSelected(5);
            navigate("/instructor/dive_site_management");
          }}
        >
          <Link to={"/instructor/dive_site_management"}>
            Dive Site Management
          </Link>
        </div>
        <div
          className={`mb-2 px-2 py-2 rounded border ${
            pageSelected === 6 || page === "admin_management"
              ? "bg-accent border-accent shadow-md"
              : "border-white hover:border-accent hover:shadow-md"
          }`}
          onClick={() => {
            setPageSelected(6);
            navigate("/instructor/admin_management");
          }}
        >
          <Link to={"/instructor/admin_management"}>Admin Management</Link>
        </div>
      </div>

      <div className={"w-full bg-white mx-2 p-4 rounded-md shadow-md"}>
        <Outlet />
      </div>
    </div>
  );
}

export default Instructor;
