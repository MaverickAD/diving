import React, { useEffect, useState } from "react";
import ModalDiveSiteManagement from "./ModalDiveSiteManagement";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";
import ModalDiveSiteAdd from "./ModalDiveSiteAdd";

function DiveSiteManagement(props) {
  const [sites, setSites] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [pagesNumber, setPagesNumber] = useState(1);

  useEffect(() => {
    axios
      .get("/api/sites/all")
      .then((response) => {
        setSites(response.data);
        setPagesNumber(Math.ceil(response.data.length / dataPerPage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("/api/sites/delete/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };

  return (
    <>
      <div className={"flex justify-between items-center mb-6"}>
        <h2 className={"text-light-text text-xl font-bold"}>
          Dive Site Management
        </h2>
        <ModalDiveSiteAdd />
      </div>

      <div className={"flex justify-between items-center mb-4"}>
        <div className={"h-full space-x-2 text-light-text text-sm"}>
          <label className={"font-bold mb-2"}>Name : </label>
          <input
            type="text"
            className={
              "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            }
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        <Pagination
          pagesNumber={pagesNumber}
          currentPageSetter={setCurrentPage}
        />
      </div>

      {sites.length === 0 ? (
        <p>Loading</p>
      ) : (
        <table className={"min-w-full text-light-text text-center text-sm"}>
          <thead className={"border-b bg-white font-medium"}>
            <tr>
              <th className={"w-9 px-1 py-2 "}>ID</th>
              <th className={"w-96 px-1 py-2 "}>Site Name</th>
              <th className={"w-32 px-1 py-2 "}>Latitude</th>
              <th className={"w-32 px-1 py-2 "}>Longitude</th>
              <th className={"w-28 px-1 py-2 "}>Zip Code</th>
              <th className={"w-40 px-1 py-2 "}>City</th>
              <th className={"w-32 px-1 py-2 "}>Country</th>
              <th className={"w-32 px-1 py-2 "}>Modify</th>
              <th className={"w-32 px-1 py-2 "}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sites
              .filter((site) =>
                site.name.toLowerCase().includes(search.toLowerCase())
              )
              .filter((site, index) => {
                return (
                  index < currentPage * dataPerPage &&
                  index >= (currentPage - 1) * dataPerPage
                );
              })
              .map((site, index) => (
                <tr
                  className={"border-b even:bg-white odd:bg-neutral-100"}
                  key={index}
                >
                  <td className="whitespace-nowrap w-9 px-1 py-2">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap w-96 px-1 py-2">
                    {site.name}
                  </td>
                  <td className="whitespace-nowrap w-32 px-1 py-2">
                    {site.latitude}
                  </td>
                  <td className="whitespace-nowrap w-32 px-1 py-2">
                    {site.longitude}
                  </td>
                  <td className="whitespace-nowrap w-28 px-1 py-2">
                    {site.zip_code}
                  </td>
                  <td className="whitespace-nowrap w-40 px-1 py-2">
                    {site.city}
                  </td>
                  <td className="whitespace-nowrap w-32 px-1 py-2">
                    {site.country}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2 "}>
                    <ModalDiveSiteManagement siteDiveInfo={site} />
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    <button
                      className={
                        "bg-red-600 hover:bg-red-700 text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5"
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        handleDelete(site.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default DiveSiteManagement;
