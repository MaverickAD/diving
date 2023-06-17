import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Loader/Loader";
import Card from "./Card";

function DiveAvailable(props) {
  const [diveAvailable, setDiveAvailable] = useState([]);

  useEffect(() => {
    if (props.token.id) {
      axios
        .get("/api/dives/available/" + props.token.id)
        .then((res) => {
          setDiveAvailable(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.token.id]);

  return (
    <>
      <h2 className={"text-light-text text-xl font-bold mb-6"}>
        Dive Available
      </h2>
      {diveAvailable.length === 0 ? (
        <Loader />
      ) : (
        <div className={"w-full grid grid-cols-3 gap-4"}>
          {diveAvailable.map((dive, index) => (
            <Card key={index} diver={props.token} dive={dive} />
          ))}
        </div>
      )}
    </>
  );
}

export default DiveAvailable;
