import React, { useEffect } from "react";
import useToken from "../../Hook/useToken";
import { useNavigate } from "react-router-dom";

function Instructor(props) {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  return (
    <>
      <h1>Password</h1>
    </>
  );
}

export default Instructor;
