import React from "react";
import logo from "./loading.svg";

function Loader(props) {
  return (
    <div
      className={"flex flex-col justify-center items-center w-full h-full m-4"}
    >
      <div className={"w-20 h-20 m-2"}>
        <img src={logo} alt="loading" className={"animate-spin"} />
      </div>

      <p className={"uppercase font-bold text-sm"}>Loading ...</p>
    </div>
  );
}

export default Loader;
