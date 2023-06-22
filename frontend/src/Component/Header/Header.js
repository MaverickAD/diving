import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../AccessButton/LogoutButton";
import LoginButton from "../AccessButton/LoginButton";
import RegisterButton from "../AccessButton/RegisterButton";
import axios from "axios";

function Header(props) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const [rank, setRank] = useState();
  async function getRank(){
    if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) return
    await axios.post("http://93.104.215.68:5000/api/users/verify", { token: localStorage.getItem("token") })
        .then((res) => {
          setRank(res.data.decoded.rank)
        }).catch((err) => {
          console.log(err)
        })
  }
  getRank()

  return (
      <header className="bg-gradient-to-r from-secondary via-primary to-accent text-header-footer-text p-4 mb-4 shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={"/"} className="text-2xl font-bold">
            Sub Aquatic Group Wattignies
          </Link>
          <nav className="md:hidden">
            <button
                className="text-white focus:outline-none"
                onClick={toggleMobileMenu}
            >
              <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {isMobileMenuOpen && (
                <ul className="mt-2 bg-gradient-to-r from-secondary via-primary to-accent rounded-md shadow-md">
                  <li>
                    <Link
                        to={"/diver"}
                        className="block py-2 px-4 font-bold text-center hover:text-header-footer-text-hover"
                        onClick={toggleMobileMenu}
                    >
                      Diver
                    </Link>
                  </li>
                  <li>
                    <Link
                        to={"/instructor"}
                        className="block py-2 px-4 font-bold text-center hover:text-header-footer-text-hover"
                        onClick={toggleMobileMenu}
                    >
                      Instructor
                    </Link>
                  </li>
                  <li>
                    {props.tokenId === null || props.tokenId === undefined ? (
                        <div className="flex flex-col items-center mt-2">
                          <LoginButton />
                          <span className="my-2 text-gray-600">or</span>
                          <RegisterButton />
                        </div>
                    ) : (
                        <LogoutButton />
                    )}
                  </li>
                </ul>
            )}
          </nav>
          <nav className="hidden md:block">
            <ul className="flex items-center">
              <li className="mx-1">
                <Link
                    to={"/diver"}
                    className="border-accent text-white text-center text-sm font-bold uppercase hover:bg-white hover:text-black hover:cursor-pointer rounded px-5 py-2.5 mx-1"
                >
                  Diver
                </Link>
              </li>
              <li className="mx-1">
                <Link
                    to={"/instructor"}
                    className="border-accent text-white text-center text-sm font-bold uppercase hover:bg-white hover:text-black hover:cursor-pointer rounded px-5 py-2.5 mx-1"
                >
                  Instructor
                </Link>
              </li>
              <li>
                {props.tokenId === null || props.tokenId === undefined ? (
                    <div className="flex justify-between">
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
