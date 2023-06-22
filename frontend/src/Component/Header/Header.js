import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../AccessButton/LogoutButton";
import LoginButton from "../AccessButton/LoginButton";
import RegisterButton from "../AccessButton/RegisterButton";

function Header(props) {
  return (
    <header
      className={
        "top-0 left-0 right-0 bg-gradient-to-r from-secondary via-primary to-accent text-header-footer-text p-4 shadow-[35px_0px_60px_-15px_rgba(0,0,0,1)]"
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
                className={
                  "border-accent text-white text-center text-sm font-bold uppercase hover:bg-white hover:text-black hover:cursor-pointer rounded px-5 py-2.5 mx-1"
              }
              >
                Diver
              </Link>
            </li>
            <li className={"mx-1"}>
              <Link
                to={"/instructor"}
                className={
                  "border-accent text-white text-center text-sm font-bold uppercase hover:bg-white hover:text-black hover:cursor-pointer rounded px-5 py-2.5 mx-1"
              }
              >
                Dive Director
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
