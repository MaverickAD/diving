import React, { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useVerifyToken from "../Hooks/useVerifyToken";
import axios from "axios";

function Instructor(props) {
  const [pageSelected, setPageSelected] = useState(Number);
  const { page } = useParams();
  const navigate = useNavigate();
  const [rank, setRank] = useState();

  async function getRank() {
    await axios
      .post("http://93.104.215.68:5000/api/users/verify", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setRank(res.data.decoded.rank);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRank();
  useVerifyToken("admin");

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Vérifie si l'écran est un téléphone (largeur maximale de 767px)

  return (
    <div className="flex flex-col lg:flex-row w-full m-5">
      {isMobile ? (
        // Afficher le menu déroulant pour les téléphones
        <select
          id="menu"
          value={pageSelected}
          onChange={(event) => {
            const selectedPage = parseInt(event.target.value);
            setPageSelected(selectedPage);
            // Naviguer vers la page sélectionnée
            switch (selectedPage) {
              case 1:
                navigate("/instructor/diver_management");
                break;
              case 3:
                navigate("/instructor/dive_management");
                break;
              case 4:
                navigate("/instructor/history");
                break;
              case 5:
                navigate("/instructor/dive_site_management");
                break;
              case 6:
                navigate("/instructor/admin_management");
                break;
              default:
                break;
            }
          }}
          className="block lg:hidden p-2 bg-white border border-gray-300 rounded shadow-md"
        >
          <option value={0}>Menu</option>
          <option value={1}>Diver Management</option>
          <option value={3}>Dive Management</option>
          <option value={4}>History</option>
          <option value={5}>Dive Site Management</option>
          <option value={6}>Admin Management</option>
        </select>
      ) : (
        // Afficher le menu complet pour les autres appareils
        <div className="w-full max-w-xs bg-white mx-2 my-2 lg:my-0 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <MenuItem
                pageSelected={pageSelected}
                page={page}
                setPageSelected={setPageSelected}
                navigate={navigate}
                link="/instructor/diver_management"
                label="Diver Management"
              />
              <MenuItem
                pageSelected={pageSelected}
                page={page}
                setPageSelected={setPageSelected}
                navigate={navigate}
                link="/instructor/dive_management"
                label="Dive Management"
              />
              <MenuItem
                pageSelected={pageSelected}
                page={page}
                setPageSelected={setPageSelected}
                navigate={navigate}
                link="/instructor/history"
                label="History"
              />
              <MenuItem
                pageSelected={pageSelected}
                page={page}
                setPageSelected={setPageSelected}
                navigate={navigate}
                link="/instructor/dive_site_management"
                label="Dive Site Management"
              />
              <MenuItem
                pageSelected={pageSelected}
                page={page}
                setPageSelected={setPageSelected}
                navigate={navigate}
                link="/instructor/admin_management"
                label="Admin Management"
              />
            </ul>
          </nav>
        </div>
      )}

      <div className="w-full bg-white mx-2 my-2 lg:my-0 p-4 rounded-md shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

function MenuItem({
  pageSelected,
  page,
  setPageSelected,
  navigate,
  link,
  label,
}) {
  return (
    <li
      className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
        (pageSelected && pageSelected === link) || page === link
          ? "bg-primary"
          : ""
      }`}
      onClick={() => {
        setPageSelected(link);
        navigate(link);
      }}
    >
      <Link to={link}>{label}</Link>
    </li>
  );
}

export default Instructor;
