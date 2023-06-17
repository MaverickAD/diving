import React, { useState } from "react";
import axios from "axios";

function Card(props) {
  const [clickedButton, setClickedButton] = useState("");

  const HandleRegister = (event, diveId) => {
    event.preventDefault();
    const type_dive =
      clickedButton.slice(0, 2) === "PA" ? "autonome" : "encadré";
    const max_depth = clickedButton.slice(3, 5);
    axios
      .post(
        "/api/dives/register/" +
          props.diver.id +
          "/" +
          diveId +
          "/" +
          type_dive +
          "/" +
          max_depth
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={
        "text-light-text border hover:border-accent rounded-md hover:shadow-md p-4"
      }
    >
      <h3 className={"text-lg font-bold text-center mb-4"}>
        {props.dive.name}
      </h3>
      <p className={"mb-4"}>Location : {props.dive.location}</p>
      <p className={"mb-4"}>Comment : {props.dive.comment}</p>
      <p className={"mb-4"}>
        Date :{" "}
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(new Date(props.dive.date_begin))}
      </p>
      <p className={"mb-4"}>
        Time :{" "}
        {`${new Date(props.dive.date_begin).getHours()}:${new Date(
          props.dive.date_begin
        ).getMinutes()}`}
      </p>
      <p className={"mb-4"}>Price : {props.dive.diver_price}€</p>
      <p className={"mb-4"}>
        Places Available :{" "}
        {props.dive.place_number - props.dive.registered_place}
      </p>
      <p className={"mb-4 underline"}>
        <a href={props.dive.url} target={"_blank"}>
          Google Maps Link
        </a>
      </p>

      <div className={"flex mb-4"}>
        <div className={"w-1/2"}>
          <h3>Autonomous</h3>
          <ul className={"grid grid-cols-2"}>
            <li className={"w-full p-1"}>
              <button
                type={"button"}
                className={`w-full text-white text-center text-lg font-bold rounded-full ${
                  !(
                    8 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : clickedButton === "PA-12"
                    ? "bg-accent"
                    : "bg-primary hover:bg-accent"
                }`}
                disabled={
                  !(
                    8 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                }
                onClick={() => setClickedButton("PA-12")}
              >
                12m
              </button>
            </li>
            <li className={"w-full p-1"}>
              <button
                type={"button"}
                className={`w-full text-white text-center text-lg font-bold rounded-full ${
                  !(
                    9 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : clickedButton === "PA-20"
                    ? "bg-accent"
                    : "bg-primary hover:bg-accent"
                }`}
                disabled={
                  !(
                    9 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                }
                onClick={() => setClickedButton("PA-20")}
              >
                20m
              </button>
            </li>
            <li className={"w-full p-1"}>
              <button
                type={"button"}
                className={`w-full text-white text-center text-lg font-bold rounded-full ${
                  !(
                    10 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : clickedButton === "PA-60"
                    ? "bg-accent"
                    : "bg-primary hover:bg-accent"
                }`}
                disabled={
                  !(
                    10 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                }
                onClick={() => setClickedButton("PA-60")}
              >
                60m
              </button>
            </li>
          </ul>
        </div>
        <div className={"w-1/2"}>
          <h3>Supervised</h3>
          <ul className={"grid grid-cols-2"}>
            <li className={"w-full p-1"}>
              <button
                type={"button"}
                className={`w-full text-white text-center text-lg font-bold rounded-full ${
                  !(
                    7 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : clickedButton === "PE-6"
                    ? "bg-accent"
                    : "bg-primary hover:bg-accent"
                }`}
                disabled={
                  !(
                    7 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                }
                onClick={() => setClickedButton("PE-6")}
              >
                6m
              </button>
            </li>
            <li className={"w-full p-1"}>
              <button
                type={"button"}
                className={`w-full text-white text-center text-lg font-bold rounded-full ${
                  !(
                    8 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : clickedButton === "PE-20"
                    ? "bg-accent"
                    : "bg-primary hover:bg-accent"
                }`}
                disabled={
                  !(
                    8 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                }
                onClick={() => setClickedButton("PE-20")}
              >
                20m
              </button>
            </li>
            <li className={"w-full p-1"}>
              <button
                type={"button"}
                className={`w-full text-white text-center text-lg font-bold rounded-full ${
                  !(
                    9 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : clickedButton === "PE-40"
                    ? "bg-accent"
                    : "bg-primary hover:bg-accent"
                }`}
                disabled={
                  !(
                    9 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                }
                onClick={() => setClickedButton("PE-40")}
              >
                40m
              </button>
            </li>
            <li className={"w-full p-1"}>
              <button
                type={"button"}
                className={`w-full text-white text-center text-lg font-bold rounded-full ${
                  !(
                    10 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : clickedButton === "PE-60"
                    ? "bg-accent"
                    : "bg-primary hover:bg-accent"
                }`}
                disabled={
                  !(
                    10 <= props.diver.diver_qualification &&
                    props.diver.diver_qualification <= 12
                  )
                }
                onClick={() => setClickedButton("PE-60")}
              >
                60m
              </button>
            </li>
          </ul>
        </div>
      </div>
      <button
        className={
          "bg-primary border hover:border-accent hover:text-accent hover:bg-white hover:cursor-pointer text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5"
        }
        onClick={(event) => HandleRegister(event, props.dive.id)}
      >
        Register Now
      </button>
    </div>
  );
}

export default Card;
