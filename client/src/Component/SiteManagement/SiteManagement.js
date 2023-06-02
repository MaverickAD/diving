import React, { useEffect, useState } from "react";
import ModalModifyInfo from "./ModalModifyInfo/ModalModifyInfo";

async function getSitesDatas(setSites) {
  try {
    const response = await fetch("http://localhost:5000/api/sites/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      // Handle the data
      setSites(data);
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

function SiteManagement(props) {
  const [sites, setSites] = useState([]);
  useEffect(() => {
    getSitesDatas(setSites).then((r) => console.log(r));
  }, []);

  const [search, setSearch] = useState("");

  return (
    <div>
      <h2 className={"text-xl font-bold mb-6"}>Site Management</h2>
      <div className="h-full space-x-2">
        <label htmlFor="" className="text-gray-700 text-sm font-bold mb-2">
          First Name :{" "}
        </label>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <table className={"min-w-full text-left text-sm font-light"}>
        <thead className={"border-b bg-white font-medium"}>
          <tr>
            <th className={"px-6 py-4"}>ID</th>
            <th className={"px-6 py-4"}>Site Name</th>
            <th className={"px-6 py-4"}>Lattitude</th>
            <th className={"px-6 py-4"}>Longitude</th>
            <th className={"px-6 py-4"}>Zip Code</th>
            <th className={"px-6 py-4"}>City</th>
            <th className={"px-6 py-4"}>Country</th>
            <th className={"px-6 py-4"}>More Info</th>
          </tr>
        </thead>
        <tbody>
          {sites.length === 0 ? (
            <p>Loading</p>
          ) : (
            sites
              .filter((site) =>
                site.Site_Name.toLowerCase().includes(search.toLowerCase())
              )
              .map((site) => (
                <tr
                  className={
                    "even:border-b even:bg-white odd:border-b odd:bg-neutral-100"
                  }
                  key={site.Id_Dive_Site}
                >
                  <td className="whitespace-nowrap py-4 px-6">
                    {site.Id_Dive_Site}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {site.Site_Name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {site.Gps_Latitude}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {site.Gps_Longitude}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {site.Zip_Code}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {site.City_Name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {site.Country_Name}
                  </td>
                  <td className={"whitespace-nowrap py-4 px-6"}>
                    <ModalModifyInfo info={site} />
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SiteManagement;
