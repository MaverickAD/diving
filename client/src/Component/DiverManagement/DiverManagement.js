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
  useEffect(() => {
    getDiversDatas(setDivers).then((r) => console.log(r));
  }, []);

  const [search, setSearch] = useState({
    firstname: "",
    lastname: "",
  });

  return (
    <div>
      <h2 className={"text-xl font-bold mb-6"}>Diver Management</h2>
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
          }}
        />
      </div>

      <table className={"min-w-full text-left text-sm font-light"}>
        <thead className={"border-b bg-white font-medium"}>
          <tr>
            <th className={"px-6 py-4"}>ID</th>
            <th className={"px-6 py-4"}>First Name</th>
            <th className={"px-6 py-4"}>Last Name</th>
            <th className={"px-6 py-4"}>Diver Qualification</th>
            <th className={"px-6 py-4"}>Instructor Qualification</th>
            <th className={"px-6 py-4"}>Nox Qualification</th>
            <th className={"px-6 py-4"}>License Number</th>
            <th className={"px-6 py-4"}>License Expiration Date</th>
            <th className={"px-6 py-4"}>Medical Certificate Expiration Date</th>
            <th className={"px-6 py-4"}>Modify</th>
          </tr>
        </thead>
        <tbody>
          {divers.length === 0 ? (
            <p>Loading</p>
          ) : (
            divers
              .filter(
                (diver) =>
                  diver.Firstname.toLowerCase().includes(
                    search.firstname.toLowerCase()
                  ) &&
                  diver.Lastname.toLowerCase().includes(
                    search.lastname.toLowerCase()
                  )
              )
              .map((diver) => (
                <tr
                  className={
                    "even:border-b even:bg-white odd:border-b odd:bg-neutral-100"
                  }
                  key={diver.Id_Diver}
                >
                  <td className={"whitespace-nowrap px-6 py-4 font-medium"}>
                    {diver.Id_Diver}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    {diver.Firstname}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    {diver.Lastname}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    {diver.Diver_Qualifications}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    {diver.Instructor_Qualification}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    {diver.Nox_Level}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    {diver.License_Number}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    {new Date(diver.License_Expiration_Date).getUTCDate() +
                      "/" +
                      (new Date(diver.License_Expiration_Date).getUTCMonth() +
                        1) +
                      "/" +
                      new Date(diver.License_Expiration_Date).getUTCFullYear()}
                  </td>
                  <td className={"whitespace-nowrap px-6 py-4"}>
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
                  <td className={"whitespace-nowrap px-6 py-4"}>
                    <ModifyModal info={diver} />
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DiverManagement;
