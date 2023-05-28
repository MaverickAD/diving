import React from "react";
import NavBar from "../../Component/NavBar/NavBar";
import useToken from "../../Hook/useToken";
import ProfilButton from "../../Component/ProfilButton/ProfilButton";
import LoginButton from "../../Component/LoginButton/LoginButton";

function Home(props) {
  const { token } = useToken();

  return (
    <>
      <h1>Home</h1>
      <NavBar />
      {token ? <ProfilButton /> : <LoginButton />}
    </>
  );
}

export default Home;
