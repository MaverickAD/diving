import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Loader/Loader";

function Information(props) {
  const [personalInformation, setPersonalInformation] = useState({});
  const [modifyInfo, setModifyInfo] = useState(false);
  const [valuesModified, setValuesModified] = useState({});

  useEffect(() => {
    if (props.token.id) {
      axios
        .get("/api/users/personal/" + props.token.id)
        .then((response) => {
          setPersonalInformation(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.token.id]);

  const handleSubmit = () => {
    axios
      .put("/api/users/personal/" + props.token.id, valuesModified)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setModifyInfo(false);
    setValuesModified({});
  };

  return (
    <>
      {Object.keys(personalInformation).length === 0 ? (
        <Loader />
      ) : (
        <form>
          <h2 className={"text-light-text text-xl font-bold mb-6"}>
            Personal Information
          </h2>
          <div className={"w-full grid grid-cols-2 gap-4"}>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                First Name
              </label>
              <input
                type={"text"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.first_name}
                disabled={!modifyInfo}
                onChange={(event) => {
                  setValuesModified({
                    ...valuesModified,
                    first_name: event.target.value,
                  });
                }}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Last Name
              </label>
              <input
                type={"text"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.last_name}
                disabled={!modifyInfo}
                onChange={(event) => {
                  setValuesModified({
                    ...valuesModified,
                    last_name: event.target.value,
                  });
                }}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Email
              </label>
              <input
                type={"email"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.email}
                disabled={!modifyInfo}
                onChange={(event) => {
                  setValuesModified({
                    ...valuesModified,
                    email: event.target.value,
                  });
                }}
              />
            </div>
            <div className={"mb-4"}>
              <label htmlFor="birthDate">Birth Date:</label>
              <input
                type={"date"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.birth_date.slice(0, 10)}
                disabled={!modifyInfo}
                onChange={(event) => {
                  setValuesModified({
                    ...valuesModified,
                    birth_date: event.target.value,
                  });
                }}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Password
              </label>
              <input
                type={"password"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                placeholder={"********"}
                disabled={!modifyInfo}
                onChange={(event) => {
                  setValuesModified({
                    ...valuesModified,
                    password: event.target.value,
                  });
                }}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Theme
              </label>
              <select
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.theme}
                disabled={!modifyInfo}
                onChange={(event) => {
                  setValuesModified({
                    ...valuesModified,
                    theme: event.target.value,
                  });
                }}
              >
                <option value="">test</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <h2 className={"text-light-text text-xl font-bold mb-6"}>
            Diving Information
          </h2>
          <div className={"w-full grid grid-cols-2 gap-4"}>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Diver Qualification
              </label>
              <input
                type={"text"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.diver_qualification}
                disabled={true}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Instructor Qualification
              </label>
              <input
                type={"text"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.instructor_qualification}
                disabled={true}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Nitrox Qualification
              </label>
              <input
                type={"text"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.nitrox_qualification}
                disabled={true}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Additional Qualification
              </label>
              <input
                type={"text"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.additional_qualification}
                disabled={true}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                License Number
              </label>
              <input
                type={"text"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.license_number}
                disabled={true}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                License Expiration Date
              </label>
              <input
                type={"date"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.license_expiration_date.slice(
                  0,
                  10
                )}
                disabled={true}
              />
            </div>
            <div className={"mb-4"}>
              <label className={"text-light-text text-sm font-bold"}>
                Medical Certificate Expiration Date
              </label>
              <input
                type={"date"}
                className={
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                }
                defaultValue={personalInformation.medical_expiration_date.slice(
                  0,
                  10
                )}
                disabled={true}
              />
            </div>
          </div>

          <div className={"h-full flex justify-center"}>
            <button
              className={
                "bg-primary hover:bg-accent text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5"
              }
              type={modifyInfo ? "submit" : "button"}
              onClick={(event) => {
                event.preventDefault();
                if (modifyInfo) {
                  handleSubmit();
                } else {
                  setModifyInfo(!modifyInfo);
                }
              }}
            >
              Modify
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Information;
