import React, { useEffect } from "react";
import useToken from "../../Hook/useToken";
import { useNavigate } from "react-router-dom";

function Instructor(props) {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const [pageSelected, setPageSelected] = React.useState(6);

  return (
    <>
      <div className={"flex h-max"}>
        <div
          className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}
        >
          <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 1 && "bg-cyan-200/75"
            }`}
            onClick={() => setPageSelected(1)}
          >
            <p>Page 1</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 2 && "bg-cyan-200/75"
            }`}
            onClick={() => setPageSelected(2)}
          >
            <p>Page 2</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 3 && "bg-cyan-200/75"
            }`}
            onClick={() => setPageSelected(3)}
          >
            <p>Page 3</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 4 && "bg-cyan-200/75"
            }`}
            onClick={() => setPageSelected(4)}
          >
            <p>Page 4</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 5 && "bg-cyan-200/75"
            }`}
            onClick={() => setPageSelected(5)}
          >
            <p>Page 5</p>
          </div>
          <div
            className={`mb-2 px-2 py-2 rounded-md ${
              pageSelected === 6 && "bg-cyan-200/75"
            }`}
            onClick={() => setPageSelected(6)}
          >
            <p>Page 6</p>
          </div>
        </div>

        <div className={"w-full bg-white mx-2 p-4 rounded-md shadow-md"}>
          <p>Page {pageSelected}</p>
        </div>
      </div>
    </>
  );
}

export default Instructor;
