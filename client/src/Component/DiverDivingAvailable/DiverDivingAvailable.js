import React, { useEffect, useState } from "react";

const DiverDivingAvailable = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Nouvel état pour gérer le chargement
    const [locations, setLocations] = useState({}); // Nouvel état pour stocker les informations de location

    useEffect(() => {
        fetchEvents();
        getLocations().then((data) => {
            let locationsMap = {};
            data.forEach((location) => {
                locationsMap[location.id] = location.name;
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
                setLoading(false); // Fin du chargement des événements
                console.log('Events:', data); // Afficher les événements dans la console
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
        return <p>Loading events...</p>; // Afficher un message de chargement pendant le chargement des événements
    }

    const currentDate = new Date();

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleString('en-US', options);
    };

    const getLocationName = (locationId) => {
        return locations[locationId] || ''; // Retourner le nom de la location ou une chaîne vide si le nom n'est pas trouvé
    };

    const futureEvents = events.filter(event => {
        const eventStartDate = new Date(event.date_begin);
        return eventStartDate > currentDate;
    });

    return (
        <div className="h-full w-full m-1 bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 p-5">Available Dives</h2>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {futureEvents.map((event, index) => (
                            <div
                                className="bg-white rounded-lg shadow-lg p-6 max-w-md"
                                key={index}
                            >
                                <h2 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h2>
                                <p className="text-gray-700 mb-4">Location: {getLocationName(event.dive_site)}</p>
                                <p className="text-gray-700 mb-4">Comment: {event.comment}</p>
                                <p className="text-gray-700 mb-4">Starting Date: {formatDateTime(event.date_begin)}</p>
                                <p className="text-gray-700 mb-4">Ending Date: {formatDateTime(event.date_end)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiverDivingAvailable;
