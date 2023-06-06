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
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h2 className={"text-light-text text-xl dark:text-white font-bold mb-6"}>
        Diver Management
      </h2>
      <div className="flex justify-between items-center mb-4">
        <div className={"h-full space-x-2"}>
          <label
            className={"text-light-text text-sm dark:text-white font-bold mb-2"}
          >
            First Name :{" "}
          </label>
          <input
            type="text"
            className={
              "px-3 py-2 border border-gray-300 rounded-md dark:bg-neutral-600 dark:text-white focus:outline-none focus:border-accent"
            }
            onChange={(event) => {
              setSearch({ ...search, firstname: event.target.value });
              setPagesNumber(
                Math.ceil(
                  divers.filter((diver) =>
                    diver.first_name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  ).length / dataPerPage
                )
              );
            }}
          />
          <label
            className={"text-light-text text-sm dark:text-white font-bold mb-2"}
          >
            Last Name :{" "}
          </label>
          <input
            type="text"
            className={
              "px-3 py-2 border border-gray-300 rounded-md dark:bg-neutral-600 dark:text-white focus:outline-none focus:border-accent"
            }
            onChange={(event) => {
              setSearch({ ...search, lastname: event.target.value });
              setPagesNumber(
                Math.ceil(
                  divers.filter((diver) =>
                    diver.last_name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
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
                "border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white font-bold transition-all duration-300 hover:border-accent"
              }
            >
              Previous
            </button>
            <button
              className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
              onClick={() => {
                if (currentPage > 2) {
                  setCurrentPage(currentPage - 2);
                }
              }}
            >
              {currentPage - 2 > 0 ? currentPage - 2 : null}
            </button>
            <button
              className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              {currentPage - 1 > 0 ? currentPage - 1 : null}
            </button>
            <button className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent">
              {currentPage}
            </button>
            <button
              className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
              onClick={() => {
                if (currentPage < pagesNumber) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              {currentPage + 1 < pagesNumber + 1 ? currentPage + 1 : null}
            </button>
            <button
              className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
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
                "border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white font-bold transition-all duration-300 hover:border-accent"
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
        <table
          className={
            "min-w-full text-light-text text-center dark:text-white text-sm"
          }
        >
          <thead
            className={
              "border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
            }
          >
            <tr>
              <th className={"w-9 px-1 py-2"}>ID</th>
              <th className={"w-28 px-1 py-2"}>First Name</th>
              <th className={"w-28 px-1 py-2"}>Last Name</th>
              <th className={"w-28 px-1 py-2"}>Diver Qualification</th>
              <th className={"w-28 px-1 py-2"}>Instructor Qualification</th>
              <th className={"w-28 px-1 py-2"}>Nox Qualification</th>
              <th className={"w-28 px-1 py-2"}>License Number</th>
              <th className={"w-28 px-1 py-2"}>License Expiration Date</th>
              <th className={"w-32 px-1 py-2"}>
                Medical Certificate Expiration Date
              </th>
              <th className={"w-32 px-1 py-2"}>Modify</th>
            </tr>
          </thead>
          <tbody>
            {divers
              .filter(
                (diver) =>
                  diver.first_name
                    .toLowerCase()
                    .includes(search.firstname.toLowerCase()) &&
                  diver.last_name
                    .toLowerCase()
                    .includes(search.lastname.toLowerCase())
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
              .map((diver, index) => (
                <tr
                  className={
                    "border-b even:bg-white even:dark:border-neutral-500 even:dark:bg-neutral-600 odd:bg-neutral-100 dark:odd:border-neutral-500 odd:dark:bg-neutral-700"
                  }
                  key={index}
                >
                  <td className={"whitespace-nowrap w-9 px-1 py-2"}>
                    {index + 1}
                  </td>
                  <td className={"whitespace-nowrap w-28 px-1 py-2"}>
                    {diver.first_name}
                  </td>
                  <td className={"whitespace-nowrap w-28 px-1 py-2"}>
                    {diver.last_name}
                  </td>
                  <td className={"whitespace-nowrap w-28 px-1 py-2"}>
                    {diver.diver_qualification}
                  </td>
                  <td className={"whitespace-nowrap w-28 px-1 py-2"}>
                    {diver.instructor_qualification}
                  </td>
                  <td className={"whitespace-nowrap w-28 px-1 py-2"}>
                    {diver.nitrox_qualification}
                  </td>
                  <td className={"whitespace-nowrap w-28 px-1 py-2"}>
                    {diver.license_number}
                  </td>
                  <td className={"whitespace-nowrap w-28 px-1 py-2"}>
                    {new Date(diver.license_expiration_date).getUTCDate() +
                      "/" +
                      (new Date(diver.license_expiration_date).getUTCMonth() +
                        1) +
                      "/" +
                      new Date(diver.license_expiration_date).getUTCFullYear()}
                  </td>
                  <td className={"whitespace-nowrap w-32 px-1 py-2"}>
                    {new Date(diver.medical_expiration_date).getUTCDate() +
                      "/" +
                      (new Date(diver.medical_expiration_date).getUTCMonth() +
                        1) +
                      "/" +
                      new Date(diver.medical_expiration_date).getUTCFullYear()}
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
