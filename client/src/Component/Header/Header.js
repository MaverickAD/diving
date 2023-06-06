import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import alertify from "alertifyjs";


function Header(props) {
    const [estConnecte, setEstConnecte] = useState(false);

    useEffect(() => {
        setConnected(props.connected);
    }, [props.connected]);
  return (
    <header className="bg-primary text-header-footer-text p-4 mb-4">
      <div className="flex justify-between items-center">
        <Link to={"/"} className={"text-2xl font-bold"}>
          Sub Aquatic Group Wattignies
        </Link>
        <div className={"flex space-x-4"}>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link
                  to={"/diver"}
                  className={"hover:text-header-footer-text-hover"}
                >
                  Diver
                </Link>
              </li>
              <li>
                <Link
                  to={"/instructor"}
                  className={"hover:text-header-footer-text-hover"}
                >
                  Dive Director
                </Link>
              </li>
            </ul>
          </nav>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}

export default Header;
