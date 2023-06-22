import React, { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import useVerifyToken from "../Hooks/useVerifyToken";

function Instructor(props) {
  const [pageSelected, setPageSelected] = useState(Number);
  const { page } = useParams();
  const navigate = useNavigate();

  useVerifyToken("admin");

  return (
    <div className={"flex w-full m-5"}>
      <div className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}>
        <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
        <div>
          <button
              className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
            pageSelected === 1 || page === "diver_management"
              ? "bg-primary" : ""
          }`}
          onClick={() => {
            setPageSelected(1);
            navigate("/instructor/diver_management");
          }}
        >Diver Management
          </button>
        </div>
        <div>
          <button
              className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
            pageSelected === 3 || page === "dive_management"
                ? "bg-primary" : ""
          }`}
          onClick={() => {
            setPageSelected(3);
            navigate("/instructor/dive_management");
          }}
        >Dive Management
          </button>
        </div>
        <div>
          <button
              className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
            pageSelected === 4 || page === "history"
                ? "bg-primary" : ""
          }`}
          onClick={() => {
            setPageSelected(4);
            navigate("/instructor/history");
          }}
        >History
          </button>
        </div>
        <div>
          <button
              className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
            pageSelected === 5 || page === "dive_site_management"
                ? "bg-primary" : ""
          }`}
          onClick={() => {
            setPageSelected(5);
            navigate("/instructor/dive_site_management");
          }}
        >Dive Site Management
          </button>
        </div>
        <div>
          <button
              className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
            pageSelected === 6 || page === "admin_management"
                ? "bg-primary" : ""
          }`}
          onClick={() => {
            setPageSelected(6);
            navigate("/instructor/admin_management");
          }}
          >Admin Management</button>
        </div>
      </div>

      <div className={"w-full bg-white mx-2 p-4 rounded-md shadow-md"}>
        <Outlet />
      </div>
    </div>
  );
}

export default Instructor;
