import React, { useEffect, useState } from "react";
import Axios from "axios";

function App(props) {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000").then((response) => {
      setBackendData(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Hello world</h1>
      {backendData.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        backendData.map((element, index) => (
          <table>
            <thead>
              <tr>
                <td>Id_Diver</td>
                <td>Lastname</td>
                <td>Firstname</td>
                <td>Diver_Qualifications</td>
                <td>Instructor_Qualification</td>
                <td>Nox_Level</td>
                <td>Additional_Qualifications</td>
                <td>License_Number</td>
                <td>License_Expiration_Date</td>
                <td>Medical_Certificate_Expiration_Date</td>
                <td>Birthdate</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{element.Id_Diver}</td>
                <td>{element.Lastname}</td>
                <td>{element.Firstname}</td>
                <td>{element.Diver_Qualifications}</td>
                <td>{element.Instructor_Qualification}</td>
                <td>{element.Nox_Level}</td>
                <td>{element.Additional_Qualifications}</td>
                <td>{element.License_Number}</td>
                <td>{element.License_Expiration_Date}</td>
                <td>{element.Medical_Certificate_Expiration_Date}</td>
                <td>{element.Birthdate}</td>
              </tr>
            </tbody>
          </table>
        ))
      )}
    </div>
  );
}

export default App;
