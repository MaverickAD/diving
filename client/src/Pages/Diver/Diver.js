import React, { useEffect } from "react";
import useToken from "../../Hook/useToken";
import { useNavigate } from "react-router-dom";
import Calendar from "../../Component/Calendar/Calendar";



function Diver(props) {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);
  return (

    <>

      <h1>Diver</h1>
      <Calendar/>

    </>
  );
}

export default Diver;
