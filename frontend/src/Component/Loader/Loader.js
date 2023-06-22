import React, { useEffect, useState } from "react";
import logo from "./loading.svg";

function Loader(props) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
      <div className={"flex flex-col justify-center items-center w-full h-full m-4"}>
        {showLoader && (
            <div>
              <div className={"w-20 h-20 m-2"}>
                <img src={logo} alt="loading" className={"animate-spin"} />
              </div>
              <p className={"uppercase font-bold text-sm"}>Loading ...</p>
            </div>
        )}

        {!showLoader && <p className={"font-bold text-sm"}>No dive here !</p>}
      </div>
  );
}

export default Loader;
