import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiveAvailable from "../Component/DiverComponent/DiveAvailable/DiveAvailable";
import DiveHistory from "../Component/DiverComponent/DiveHistory/DiveHistory";
import DiveRegister from "../Component/DiverComponent/DiveRegister/DiveRegister";
import Information from "../Component/DiverComponent/Information/Information";
import axios from "axios";

function Diver(props) {
    const [pageSelected, setPageSelected] = useState(Number);
    const { page } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
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

    return (
        <div className={"flex w-full m-5"}>
            <div className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}>
                <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
                <div>
                    <button
                        className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
                            pageSelected === 1 || page === "me" || page === undefined
                                ? "bg-primary"
                                : ""
                        }`}
                        onClick={() => {
                            setPageSelected(1);
                            navigate("/diver/me");
                        }}
                    >
                        My Informations
                    </button>
                </div>
                <div className="text-left">
                    <button
                        className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
                            pageSelected === 2 || page === "history" ? "bg-primary" : ""
                        }`}
                        onClick={() => {
                            setPageSelected(2);
                            navigate("/diver/history");
                        }}
                    >
                        History of my dives
                    </button>
                </div>
                <div className="text-left">
                    <button
                        className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
                            pageSelected === 3 || page === "registered" ? "bg-primary" : ""
                        }`}
                        onClick={() => {
                            setPageSelected(3);
                            navigate("/diver/registered");
                        }}
                    >
                        My planned dives
                    </button>
                </div>
                <div className="text-left">
                    <button
                        className={`w-full text-left mb-2 px-2 py-2 hover:shadow-[inset_20rem_0_0_0] hover:shadow-accent duration-[1000ms,1200ms] transition-[color,box-shadow] rounded-md ${
                            pageSelected === 4 || page === "available" ? "bg-primary" : ""
                        }`}
                        onClick={() => {
                            setPageSelected(4);
                            navigate("/diver/available");
                        }}
                    >
                        Dives available
                    </button>
                </div>
            </div>

            <div className={"w-full bg-white mx-2 p-4 rounded-md shadow-md"}>
                {pageSelected === 1 || page === "me" ? (
                    <Information token={props.token} />
                ) : pageSelected === 2 || page === "history" ? (
                    <DiveHistory token={props.token} />
                ) : pageSelected === 3 || page === "registered" ? (
                    <DiveRegister token={props.token} />
                ) : pageSelected === 4 || page === "available" ? (
                    <DiveAvailable token={props.token} />
                ) : (
                    <Information token={props.token} />
                )}
            </div>
        </div>
    );
}

export default Diver;
