import React from "react";
import ModifyModal from "./ModalModify/ModifyModal";

function DiverManagement(props) {
  const [divers, setDivers] = React.useState([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "2",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "3",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "4",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "5",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "6",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "7",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "8",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "9",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
    {
      id: "10",
      firstName: "John",
      lastName: "Doe",
      diverQualification: "2",
      instructorQualification: "1",
      noxQualification: "1",
      licenseNumber: "A-22-981658",
      licenseExpirationDate: "2022-12-31",
      medicalCertificateExpirationDate: "2022-10-10",
    },
  ]);

  return (
    <div>
      <h2 className={"text-xl font-bold mb-6"}>Diver Management</h2>
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
          {divers.map((diver) => (
            <tr
              className={
                diver.id % 2 === 0
                  ? "border-b bg-white"
                  : "border-b bg-neutral-100"
              }
              key={diver.id}
            >
              <td className={"whitespace-nowrap px-6 py-4 font-medium"}>
                {diver.id}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.firstName}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.lastName}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.diverQualification}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.instructorQualification}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.noxQualification}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.licenseNumber}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.licenseExpirationDate}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                {diver.medicalCertificateExpirationDate}
              </td>
              <td className={"whitespace-nowrap px-6 py-4"}>
                <ModifyModal info={diver} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DiverManagement;
