import React, { useEffect, useState } from "react";
import ModifyModal from "./ModalModify/ModifyModal";

async function getDiversDatas(setDivers) {
  try {
    const response = await fetch("http://localhost:5000/api/divers/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      // Handle the data
      setDivers(data);
      return data;
    } else {
      // Handle the error
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    // Handle any other errors
    console.error(error);
  }
}
function DiverManagement(props) {
  const [divers, setDivers] = useState([]);
  const [search, setSearch] = useState({
    firstname: "",
    lastname: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [pagesNumber, setPagesNumber] = useState(1);
  useEffect(() => {
    getDiversDatas(setDivers).then((data) => {
      setPagesNumber(Math.ceil(data.length / dataPerPage));
    });
  }, []);

  return (
    <div>
      <h2 className={"text-xl font-bold mb-6"}>Diver Management</h2>
      <div className="flex justify-between items-center mb-4">
        <div className={"h-full space-x-2"}>
          <label className={"text-gray-700 text-sm font-bold mb-2"}>
            First Name :{" "}
          </label>
          <input
            type="text"
            className={
              "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            }
            onChange={(event) => {
              setSearch({ ...search, firstname: event.target.value });
              setPagesNumber(
                Math.ceil(
                  divers.filter((diver) =>
                    diver.Firstname.toLowerCase().includes(
                      event.target.value.toLowerCase()
                    )
                  ).length / dataPerPage
                )
              );
            }}
          />
          <label className={"text-gray-700 text-sm font-bold mb-2"}>
            Last Name :{" "}
          </label>
          <input
            type="text"
            className={
              "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            }
            onChange={(event) => {
              setSearch({ ...search, lastname: event.target.value });
              setPagesNumber(
                Math.ceil(
                  divers.filter((diver) =>
                    diver.Lastname.toLowerCase().includes(
                      event.target.value.toLowerCase()
                    )
                  ).length / dataPerPage
                )
              );
            }}
          />
        </div>

        <div className={"px-3 py-2"}>
          <ul className={"flex justify-center"}>
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              className={
                "border rounded mx-1 px-3 py-1.5 text-gray-700 text-sm font-bold transition-all duration-300 hover:bg-neutral-100"
              }
            >
              Previous
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage > 2) {
                  setCurrentPage(currentPage - 2);
                }
              }}
            >
              {currentPage - 2 > 0 ? currentPage - 2 : null}
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              {currentPage - 1 > 0 ? currentPage - 1 : null}
            </button>
            <button className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100">
              {currentPage}
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage < pagesNumber) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              {currentPage + 1 < pagesNumber + 1 ? currentPage + 1 : null}
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage < pagesNumber - 1) {
                  setCurrentPage(currentPage + 2);
                }
              }}
            >
              {currentPage + 2 < pagesNumber + 1 ? currentPage + 2 : null}
            </button>
            <button
              disabled={currentPage === pagesNumber}
              onClick={() => {
                if (currentPage < pagesNumber) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              className={
                "border rounded mx-1 px-3 py-1.5 text-gray-700 text-sm font-bold transition-all duration-300 hover:bg-neutral-100"
              }
            >
              Next
            </button>
          </ul>
        </div>
      </div>

      {divers.length === 0 ? (
        <p>Loading</p>
      ) : (
        <table className={"min-w-full text-left text-sm font-light"}>
          <thead className={"border-b bg-white font-medium"}>
            <tr>
              <th className={"w-9 px-1 py-2 text-center"}>ID</th>
              <th className={"w-28 px-1 py-2 text-center"}>First Name</th>
              <th className={"w-28 px-1 py-2 text-center"}>Last Name</th>
              <th className={"w-28 px-1 py-2 text-center"}>
                Diver Qualification
              </th>
              <th className={"w-28 px-1 py-2 text-center"}>
                Instructor Qualification
              </th>
              <th className={"w-28 px-1 py-2 text-center"}>
                Nox Qualification
              </th>
              <th className={"w-28 px-1 py-2 text-center"}>License Number</th>
              <th className={"w-28 px-1 py-2 text-center"}>
                License Expiration Date
              </th>
              <th className={"w-32 px-1 py-2 text-center"}>
                Medical Certificate Expiration Date
              </th>
              <th className={"w-32 px-1 py-2 text-center"}>Modify</th>
            </tr>
          </thead>
          <tbody>
            {divers
              .filter(
                (diver) =>
                  diver.Firstname.toLowerCase().includes(
                    search.firstname.toLowerCase()
                  ) &&
                  diver.Lastname.toLowerCase().includes(
                    search.lastname.toLowerCase()
                  )
              )
              .filter((diver, index) => {
                if (currentPage === 1) {
                  return index < dataPerPage;
                } else if (currentPage === 2) {
                  return index >= dataPerPage && index < dataPerPage * 2;
                } else {
                  return (
                    index >= dataPerPage * (currentPage - 1) &&
                    index < dataPerPage * currentPage
                  );
                }
              })
              .map((diver) => (
                <tr
                  className={
                    "even:border-b even:bg-white odd:border-b odd:bg-neutral-100"
                  }
                  key={diver.Id_Diver}
                >
                  <td className={"whitespace-nowrap w-9 px-1 py-2 text-center"}>
                    {diver.Id_Diver}
                  </td>
                  <td
                    className={"whitespace-nowrap w-28 px-1 py-2 text-center"}
                  >
                    {diver.Firstname}
                  </td>
                  <td
                    className={"whitespace-nowrap w-28 px-1 py-2 text-center"}
                  >
                    {diver.Lastname}
                  </td>
                  <td
                    className={"whitespace-nowrap w-28 px-1 py-2 text-center"}
                  >
                    {diver.Diver_Qualifications}
                  </td>
                  <td
                    className={"whitespace-nowrap w-28 px-1 py-2 text-center"}
                  >
                    {diver.Instructor_Qualification}
                  </td>
                  <td
                    className={"whitespace-nowrap w-28 px-1 py-2 text-center"}
                  >
                    {diver.Nox_Level}
                  </td>
                  <td
                    className={"whitespace-nowrap w-28 px-1 py-2 text-center"}
                  >
                    {diver.License_Number}
                  </td>
                  <td
                    className={"whitespace-nowrap w-28 px-1 py-2 text-center"}
                  >
                    {new Date(diver.License_Expiration_Date).getUTCDate() +
                      "/" +
                      (new Date(diver.License_Expiration_Date).getUTCMonth() +
                        1) +
                      "/" +
                      new Date(diver.License_Expiration_Date).getUTCFullYear()}
                  </td>
                  <td
                    className={"whitespace-nowrap w-32 px-1 py-2 text-center"}
                  >
                    {new Date(
                      diver.Medical_Certificate_Expiration_Date
                    ).getUTCDate() +
                      "/" +
                      (new Date(
                        diver.Medical_Certificate_Expiration_Date
                      ).getUTCMonth() +
                        1) +
                      "/" +
                      new Date(
                        diver.Medical_Certificate_Expiration_Date
                      ).getUTCFullYear()}
                  </td>
                  <td
                    className={
                      "whitespace-nowrap px-1 py-2 flex flex-col items-center"
                    }
                  >
                    <ModifyModal info={diver} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DiverManagement;
