import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../AccessButton/LogoutButton";
import LoginButton from "../AccessButton/LoginButton";
import RegisterButton from "../AccessButton/RegisterButton";

function Header(props) {
  return (
    <header
      className={
        "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-header-footer-text p-4 mb-4 shadow-xl"
      }
    >
      <div className={"flex justify-between items-center"}>
        <Link to={"/"} className={"text-2xl font-bold"}>
          Sub Aquatic Group Wattignies
        </Link>
        <nav>
          <ul className={"flex items-center"}>
            <li className={"mx-1"}>
              <Link
                to={"/diver"}
                className={"font-bold hover:text-header-footer-text-hover"}
              >
                Diver
              </Link>
            </li>
            <li className={"mx-1"}>
              <Link
                to={"/instructor"}
                className={"font-bold hover:text-header-footer-text-hover"}
              >
                Instructor
              </Link>
            </li>
            <li>
              {props.tokenId === null || props.tokenId === undefined ? (
                <div className={"w-48 flex justify-between"}>
                  <LoginButton />
                  <RegisterButton />
                </div>
              ) : (
                <LogoutButton />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
