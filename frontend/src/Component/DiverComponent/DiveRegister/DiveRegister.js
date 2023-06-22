import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Loader/Loader";

function DiveRegister(props) {
    const [diveRegister, setDiveRegister] = useState([]);

    useEffect(() => {
        if (props.token.id) {
            axios
                .get("/api/dives/register/" + props.token.id)
                .then((res) => {
                    setDiveRegister(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [props.token.id]);

    const Unregister = (event, diveId) => {
        event.preventDefault();
        axios
            .delete("/api/dives/unregister/" + props.token.id + "/" + diveId)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <h2 className={"text-light-text text-xl font-bold mb-6"}>
                Dive Register
            </h2>
            {diveRegister.length === 0 ? (
                <>
                    <Loader />
                </>
            ) : (
                <div className={"w-full grid grid-cols-3 gap-4"}>
                    {diveRegister.map((dive, index) => (
                        <div
                            key={index}
                            className={
                                "text-light-text border hover:border-accent rounded-md hover:shadow-md p-4"
                            }
                        >
                            <h3 className={"text-lg font-bold text-center mb-4"}>
                                {dive.name}
                            </h3>
                            <p className={"mb-4"}>Location : {dive.location}</p>
                            <p className={"mb-4"}>Comment : {dive.comment}</p>
                            <p className={"mb-4"}>
                                Date :{" "}
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                }).format(new Date(dive.date_begin))}
                            </p>
                            <p className={"mb-4"}>
                                Time :{" "}
                                {`${new Date(dive.date_begin).getHours()}:${new Date(
                                    dive.date_begin
                                ).getMinutes()}`}
                            </p>
                            <p className={"mb-4"}>Max Depth : {dive.max_depth}m</p>
                            <p className={"mb-4"}>Type : {dive.dive_type}</p>
                            <p className={"mb-4 underline"}>
                                <a href={dive.url} target={"_blank"}>
                                    Google Maps Link
                                </a>
                            </p>
                            <button
                                className={
                                    "bg-red-600 hover:bg-red-700 text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5"
                                }
                                onClick={(event) => Unregister(event, dive.id)}
                            >
                                Unregister
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default DiveRegister;
