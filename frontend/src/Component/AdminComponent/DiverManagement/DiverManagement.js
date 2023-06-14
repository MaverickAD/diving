import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalDiverManagement from "./ModalDiverManagement";
import Pagination from "../../Pagination/Pagination";

function DiverManagement(props) {
  const [divers, setDivers] = useState([]);
  const [search, setSearch] = useState({ firstname: "", lastname: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [pagesNumber, setPagesNumber] = useState(1);

  useEffect(() => {
    axios
      .get("/api/divers/all")
      .then((response) => {
        setDivers(response.data);
        setPagesNumber(Math.ceil(response.data.length / dataPerPage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2 className={"text-light-text text-xl font-bold mb-6"}>
        Diver Management
      </h2>
      <div className={"flex justify-between items-center mb-4"}>
        <div className={"h-full space-x-2 text-light-text text-sm"}>
          <label className={"font-bold mb-2"}>First Name : </label>
          <input
            type="text"
            className={
              "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
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
          <label className={"font-bold mb-2"}>Last Name : </label>
          <input
            type="text"
            className={
              "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
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

        <Pagination
          pagesNumber={pagesNumber}
          currentPageSetter={setCurrentPage}
        />
      </div>

      {divers.length === 0 ? (
        <p>Loading ...</p>
      ) : (
        <table className={"min-w-full text-light-text text-center text-sm"}>
          <thead className={"bg-white border-b font-medium"}>
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
                  className={"border-b even:bg-white odd:bg-neutral-100"}
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
                    <ModalDiverManagement diverInfo={diver} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default DiverManagement;
