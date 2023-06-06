import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function Header(props) {
  const [estConnecte, setEstConnecte] = useState(false);


  return (
      <header className="bg-gray-800 text-white p-4 mb-4">
        <div className="flex justify-between items-center">
          <Link to={"/"} className={"text-2xl font-bold"}>
            Sub Aquatic Group Wattignies
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link to={"/diver"} className={"hover:text-gray-300"}>
                  Diver
                </Link>
              </li>
              <li>
                <Link to={"/instructor"} className={"hover:text-gray-300"}>
                  Dive Director
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  );
}

export default Header;
