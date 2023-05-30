import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to={"/register"} className={"hover:text-gray-300"}>
              Register
            </Link>
          </li>
          <li>
            <Link to={"/diver"} className={"hover:text-gray-300"}>
              Diver
            </Link>
          </li>
          <li>
            <Link to={"/instructor"} className={"hover:text-gray-300"}>
              Instructor
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
