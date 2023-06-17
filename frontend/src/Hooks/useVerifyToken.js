import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useVerifyToken(type) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          "http://localhost:5000/api/users/verify",
          {
            token: localStorage.getItem("token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (
              !(
                (response.data.decoded.rank === 2 && type === "admin") ||
                (response.data.decoded.rank === 1 && type === "admin")
              )
            ) {
              navigate("/");
            }
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);
}

export default useVerifyToken;
