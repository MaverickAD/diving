import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            navigate("/", {replace: true});
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                // Handle the data
                setToken(data.token);
                localStorage.setItem("token", data.token);
                console.log("token : " + data.token + " success: " + data.success );
                navigate("/", {replace: true});
            } else {
                // Handle the error
                alert("L'email ou le mot de passe est incorrect");
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (error) {
            // Handle any other errors
            console.error(error);
        }

    /*if(){
                setToken(data.token);
                localStorage.setItem("token", data.token);
                console.log("token : " + data.token + " success: " + data.success );
                navigate("/", {replace: true});
            }else{
                alert("Email or password incorrect");
            }*/
  };

    return (
        <div className={"w-full"}>
            <h1 className={"text-2xl font-bold mb-6 text-center"}>Login</h1>
            <form className={"w-full max-w-lg mx-auto bg-white p-8 rounded-md shadow-md"} onSubmit={handleSubmit}>
                <div className={"mb-4"}>
                    <label className={"block text-gray-700 text-sm font-bold mb-2"}>
                        Email :
                    </label>
                    <input
                        type={"email"}
                        className={
                            "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        }
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>

        <div className={"mb-4"}>
          <label className={"block text-gray-700 text-sm font-bold mb-2"}>
            Password :
          </label>
          <input
            type={"password"}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            }
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <div className={"flex justify-center"}>
          <button
            type={"submit"}
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
