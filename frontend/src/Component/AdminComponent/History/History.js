import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";
import useVerifyToken from "../../../Hooks/useVerifyToken";
import DownloadButton from "../DownloadButton/DownloadButton";

function History(props) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [pagesNumber, setPagesNumber] = useState(1);

  console.log(history);

  useVerifyToken("admin");

  useEffect(() => {
    axios
      .get("/api/dives/finished")
      .then((response) => {
        setHistory(response.data);
        setPagesNumber(Math.ceil(response.data.length / dataPerPage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2 className={"text-light-text text-xl font-bold mb-6"}>History</h2>
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

      {history.length === 0 ? (
        <p>Loading ...</p>
      ) : (
        <table className={"min-w-full text-light-text text-center text-sm"}>
          <thead className={"bg-white border-b font-medium"}>
            <tr>
              <th className={"px-1 py-2"}>ID</th>
              <th className={"px-1 py-2"}>Status</th>
              <th className={"px-1 py-2"}>Name</th>
              <th className={"px-1 py-2"}>Begin Date</th>
              <th className={"px-1 py-2"}>End Date</th>
              <th className={"px-1 py-2"}>Comment</th>
              <th className={"px-1 py-2"}>Surface Security</th>
              <th className={"px-1 py-2"}>Number of place</th>
              <th className={"px-1 py-2"}>Registered place</th>
              <th className={"px-1 py-2"}>Dive Site</th>
              <th className={"px-1 py-2"}>Download</th>
            </tr>
          </thead>
          <tbody>
            {history
              .filter((dive) =>
                dive.name.toLowerCase().includes(search.toLowerCase())
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
              .map((dive, index) => (
                <tr
                  className={"border-b even:bg-white odd:bg-neutral-100"}
                  key={index}
                >
                  <td className={"whitespace-nowrap px-1 py-2"}>{index + 1}</td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {dive.status}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>{dive.name}</td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {new Date(dive.date_begin)
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {new Date(dive.date_end)
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {dive.comment}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {dive.surface_security}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {dive.place_number}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {dive.registered_place}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    {dive.dive_site}
                  </td>
                  <td className={"whitespace-nowrap px-1 py-2"}>
                    <DownloadButton dive={dive.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
