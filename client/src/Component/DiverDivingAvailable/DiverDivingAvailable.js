import React, { useEffect, useState } from "react";
import Map from "./Map";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const DiverDivingAvailable = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

    useEffect(() => {
        fetchEvents();
        getLocations().then((data) => {
            let locationsMap = {};
            data.forEach((location) => {
                locationsMap[location.id] = location;
            });
            setLocations(locationsMap);
        });
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/dives/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
                setLoading(false);
                console.log('Events:', data);
            } else {
                console.log('Error getting events:', response.status);
            }
        } catch (error) {
            console.log('Error getting events:', error);
        }
    };

    const getLocations = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sites/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.log('Error getting locations:', response.status);
                return [];
            }
        } catch (error) {
            console.log('Error getting locations:', error);
            return [];
        }
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    const currentDate = new Date();

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleString('en-US', options);
    };

    const getLocation = (locationId) => {
        return locations[locationId] || {};
    };

    const futureEvents = events.filter((event) => {
        const eventStartDate = new Date(event.date_begin);
        return eventStartDate > currentDate;
    });

    const openPopup = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closePopup = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="h-full w-full m-1 bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 p-5">Available Dives</h2>

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {futureEvents.map((event, index) => {
                                const location = getLocation(event.dive_site);
                                const address = `${location.address}, ${location.zip_code} ${location.city}, ${location.country}`;
                                return (
                                    <div
                                        className="bg-white rounded-lg shadow-lg p-6 max-w-md"
                                        key={index}
                                    >
                                        <h2 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h2>
                                        <p className="text-gray-700 mb-4">Location: {location.name}</p>
                                        <p className="text-gray-700 mb-4">Address: {location.address}</p>
                                        <p className="text-gray-700 mb-4">City: {location.city}</p>
                                        <p className="text-gray-700 mb-4">Zip Code: {location.zip_code}</p>
                                        <p className="text-gray-700 mb-4">Comment: {event.comment}</p>
                                        <p className="text-gray-700 mb-4">Starting Date: {formatDateTime(event.date_begin)}</p>
                                        <p className="text-gray-700 mb-4">Ending Date: {formatDateTime(event.date_end)}</p>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => openPopup(event)}
                                        >
                                            More Information
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">{selectedEvent?.name}</h2>
                        <p className="text-gray-700 mb-4">Location: {getLocation(selectedEvent?.dive_site).name}</p>
                        <p className="text-gray-700 mb-4">Address: {getLocation(selectedEvent?.dive_site).address}</p>
                        <p className="text-gray-700 mb-4">City: {getLocation(selectedEvent?.dive_site).city}</p>
                        <p className="text-gray-700 mb-4">Zip Code: {getLocation(selectedEvent?.dive_site).zip_code}</p>
                        <p className="text-gray-700 mb-4">Comment: {selectedEvent?.comment}</p>
                        <p className="text-gray-700 mb-4">Starting Date: {formatDateTime(selectedEvent?.date_begin)}</p>
                        <p className="text-gray-700 mb-4">Ending Date: {formatDateTime(selectedEvent?.date_end)}</p>
                        <div className="flex justify-around">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Inscription
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={closePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DiverDivingAvailable;
