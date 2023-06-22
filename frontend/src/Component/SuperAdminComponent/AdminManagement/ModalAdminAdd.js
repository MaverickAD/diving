import React, { useState } from "react";
import axios from "axios";

function ModalAdminAdd(props) {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState({ firstname: "", lastname: "" });
  const [clickedId, setClickedId] = useState([]);

  const handleSubmit = (id) => {
    setClickedId([...clickedId, id]);
    axios
      .put("/api/users/not_admin/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button
          className={"uppercase px-4 py-2 bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full"}
          onClick={() => setShowModal(true)}
      >
        Add an admin
      </button>
      {showModal ? (
        <>
          <div
            className={"flex justify-center items-center fixed inset-0 z-50"}
          >
            <div className={"relative w-full max-w-4xl"}>
              <div
                className={
                  "flex flex-col rounded-lg shadow-lg relative bg-white"
                }
              >
                <div className={"p-5 w-full"}>
                  <h3 className={"text-3xl font-semibold"}>Add an Admin</h3>
                </div>
                <div className={"p-5 w-full grid grid-cols-2 gap-4"}>
                  <div className={"space-x-2"}>
                    <label className={"font-bold"}>First Name : </label>
                    <input
                      type="text"
                      className={
                        "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      }
                      onChange={(event) => {
                        setSearch({
                          ...search,
                          firstname: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className={"space-x-2"}>
                    <label className={"font-bold"}>Last Name : </label>
                    <input
                      type="text"
                      className={
                        "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent"
                      }
                      onChange={(event) => {
                        setSearch({
                          ...search,
                          lastname: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className={"p-5 w-full h-96"}>
                  {!(
                    search.firstname.length >= 3 && search.lastname.length >= 3
                  ) ? (
                    <div
                      className={
                        "w-full h-full border border-gray-300 rounded-md p-4"
                      }
                    >
                      <p>Loading ...</p>
                    </div>
                  ) : (
                    <div
                      className={
                        "w-full h-full overflow-x-hidden overflow-y-auto border border-gray-300 hover:border-accent rounded-md px-4"
                      }
                    >
                      {props.notAdmins
                        .filter(
                          (notAdmin) =>
                            notAdmin.first_name
                              .toLowerCase()
                              .includes(search.firstname.toLowerCase()) &&
                            notAdmin.last_name
                              .toLowerCase()
                              .includes(search.lastname.toLowerCase())
                        )
                        .map((notAdmin, index) => {
                          const isClicked = clickedId.includes(notAdmin.id);

                          return (
                            <div
                              key={index}
                              className={
                                "flex justify-between items-center border-b border-gray-300 m-2 p-1"
                              }
                            >
                              <p>{notAdmin.last_name}</p>
                              <p>{notAdmin.first_name}</p>
                              <button
                                className={`text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5 ${
                                  isClicked
                                    ? "bg-accent cursor-not-allowed"
                                    : "bg-primary border hover:border-accent hover:text-accent hover:bg-white hover:cursor-pointer"
                                }`}
                                onClick={() => handleSubmit(notAdmin.id)}
                                disabled={isClicked}
                              >
                                {isClicked ? "✓" : "Add"}
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
                <div className={"p-5 w-full flex justify-end"}>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="checkbox"
                    onClick={() => {
                      setSearch({ firstname: "", lastname: "" });
                      setShowModal(false);
                      window.location.reload();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ModalAdminAdd;
