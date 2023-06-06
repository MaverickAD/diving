import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import alertify from "alertifyjs";


function Header(props) {
    const [connected, setConnected] = useState(props.connected);

    useEffect(() => {
        setConnected(props.connected);
    }, [props.connected]);
  return (
      <header className="bg-gray-800 text-white p-4 mb-4">
        <div className="flex justify-between items-center">
          <Link to={"/"} className={"text-2xl font-bold"}>
            Sub Aquatic Group Wattignies
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              {connected ? (
                  <React.Fragment>
                    <li>
                      <Link to={"/diver"} className={"hover:text-gray-300"}>
                        Diver
                      </Link>
                    </li>
                    <li>
                      <Link to={"/instructor"} className={"hover:text-gray-300"}>
                        Panel Admin
                      </Link>
                    </li>
                  </React.Fragment>
              ) : (
                  <React.Fragment>
                    <li>
                      <Link to={"/login"} className={"hover:text-gray-300"}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to={"/register"} className={"hover:text-gray-300"}>
                        Register
                      </Link>
                    </li>
                  </React.Fragment>
              )}
            </ul>
          </nav>
        </div>
      </header>
  );
}

export default Header;
