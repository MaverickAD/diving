import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";
import ModalDiveManagement from "./ModalDiveManagement";
import useVerifyToken from "../../../Hooks/useVerifyToken";
import DownloadButton from "../DownloadButton/DownloadButton";
import { useNavigate } from "react-router-dom";

function DiveManagement(props) {
  const [openDives, setOpenDives] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [pagesNumber, setPagesNumber] = useState(1);
  const navigate = useNavigate();

  useVerifyToken("admin");

  useEffect(() => {
    axios
        .get("/api/dives/open")
        .then((response) => {
          setOpenDives(response.data);
          setPagesNumber(Math.ceil(response.data.length / dataPerPage));
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
      <>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-light-text text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-0">
            Dive Management
          </h2>
          <button
              className="bg-primary hover:bg-accent text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5 mb-4 md:mb-0"
              onClick={() => {
                navigate("/instructor/dive_management/new");
              }}
          >
            Add a dive
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex flex-col md:flex-row items-center mb-2 md:mb-0">
            <label className="font-bold mr-2 mb-2 md:mb-0">Name:</label>
            <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
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
        {openDives.length === 0 ? (
            <p>Loading ...</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full text-light-text text-center text-sm">
              <thead className="bg-white border-b font-medium">
              <tr>
                <th className="w-6 px-1 py-2">ID</th>
                <th className="w-16 px-1 py-2">Status</th>
                <th className="w-32 px-1 py-2">Name</th>
                <th className="w-24 px-1 py-2">Begin Date</th>
                <th className="w-24 px-1 py-2">End Date</th>
                <th className="w-32 px-1 py-2">Comment</th>
                <th className="w-24 px-1 py-2">Surface Security</th>
                <th className="w-24 px-1 py-2">Number of place</th>
                <th className="w-24 px-1 py-2">Registered place</th>
                <th className="w-32 px-1 py-2">Dive Site</th>
                <th className="w-32 px-1 py-2">Modify</th>
                <th className="w-32 px-1 py-2">Security</th>
              </tr>
              </thead>
              <tbody>
              {openDives
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
                          className="border-b even:bg-white odd:bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
                          key={index}
                          onClick={() => {
                            navigate("/instructor/dive_management/" + dive.id);
                          }}
                      >
                        <td className="whitespace-nowrap w-6 px-1 py-2">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap w-16 px-1 py-2">
                          {dive.status}
                        </td>
                        <td className="whitespace-nowrap w-32 px-1 py-2">
                          {dive.name}
                        </td>
                        <td className="whitespace-nowrap w-24 px-1 py-2">
                          {new Date(dive.date_begin).toISOString().slice(0, 10)}
                        </td>
                        <td className="whitespace-nowrap w-24 px-1 py-2">
                          {new Date(dive.date_end).toISOString().slice(0, 10)}
                        </td>
                        <td className="whitespace-nowrap w-32 px-1 py-2">
                          {dive.comment}
                        </td>
                        <td className="whitespace-nowrap w-24 px-1 py-2">
                          {dive.surface_security}
                        </td>
                        <td className="whitespace-nowrap w-24 px-1 py-2">
                          {dive.place_number}
                        </td>
                        <td className="whitespace-nowrap w-24 px-1 py-2">
                          {dive.registered_place}
                        </td>
                        <td className="whitespace-nowrap w-32 px-1 py-2">
                          {dive.dive_site}
                        </td>
                        <td className="whitespace-nowrap px-1 py-2">
                          <ModalDiveManagement diveInfo={dive} />
                        </td>
                        <td className="whitespace-nowrap px-1 py-2">
                          <DownloadButton dive={dive.id} />
                        </td>
                      </tr>
                  ))}
              </tbody>
            </table>
            </div>
        )}
      </>
  );
}

export default DiveManagement;
