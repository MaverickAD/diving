import React from "react";
import { Link } from "react-router-dom";

function ProfilButton(props) {
  return (
    <div>
      <Link to={"/profil"}>Profil</Link>
    </div>
  );
}

export default ProfilButton;
