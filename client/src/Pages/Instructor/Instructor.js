import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../Component/Calendar/Calendar";

function Instructor(props) {
  const navigate = useNavigate();

<<<<<<<

=======
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const [pageSelected, setPageSelected] = React.useState(6);

>>>>>>>
  return (
    <>
      <div className={"flex w-full"}>
        <div
          className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}
        >
          <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 1 ? "bg-cyan-200/75" : ""
            }`}
            onClick={() => setPageSelected(1)}
          >
            <p>Gestion des plongeurs</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 2 ? "bg-cyan-200/75" : ""
            }`}
            onClick={() => setPageSelected(2)}
          >
            <p>Gestion des plannings</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 3 ? "bg-cyan-200/75" : ""
            }`}
            onClick={() => setPageSelected(3)}
          >
            <p>Gestion des plongées</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 4 ? "bg-cyan-200/75" : ""
            }`}
            onClick={() => setPageSelected(4)}
          >
            <p>Historique</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 5 ? "bg-cyan-200/75" : ""
            }`}
            onClick={() => setPageSelected(5)}
          >
            <p>Gestion des sites de plongée</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 6 ? "bg-cyan-200/75" : ""
            }`}
            onClick={() => setPageSelected(6)}
          >
            <p>Gestion admin</p>
          </div>
        </div>

        <div className={"w-full bg-white mx-2 p-4 rounded-md shadow-md"}>
          {<Calendar />}
        </div>
      </div>
    </>
  );
}

export default Instructor;
