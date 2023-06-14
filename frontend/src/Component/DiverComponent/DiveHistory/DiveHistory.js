import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Loader/Loader";

function DiveHistory(props) {
  const [diveHistory, setDiveHistory] = useState([]);

  useEffect(() => {
    if (props.userId) {
      axios
        .get("/api/dives/history/" + props.userId)
        .then((response) => {
          setDiveHistory(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.userId]);

  return (
    <>
      <h2 className={"text-light-text text-xl font-bold mb-6"}>My History</h2>
      {diveHistory.length === 0 ? (
        <Loader />
      ) : (
        <div className={"w-full grid grid-cols-3 gap-4"}>
          {diveHistory.map((dive, index) => (
            <div
              key={index}
              className={
                "text-light-text border hover:border-accent rounded-md hover:shadow-md p-4"
              }
            >
              <h3 className={"text-lg font-bold text-center mb-4"}>
                {dive.name}
              </h3>
              <p className={"mb-4"}>Location : {dive.location}</p>
              <p className={"mb-4"}>Comment : {dive.comment}</p>
              <p className={"mb-4"}>
                Date :{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(new Date(dive.date_begin))}
              </p>
              <p className={"mb-4"}>
                Time :{" "}
                {`${new Date(dive.date_begin).getHours()}:${new Date(
                  dive.date_begin
                ).getMinutes()}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DiveHistory;
