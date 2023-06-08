import React from "react";

const DiverDivingPlanned = () => {
    const events = [
        {
            title: 'Événement 1',
            location: 'Lieu 1',
            description: 'Description de l\'événement 1',
            startDate: '2023-06-01',
            endDate: '2023-06-05',
        },
        {
            title: 'Événement 2',
            location: 'Lieu 2',
            description: 'Description de l\'événement 2',
            startDate: '2023-06-10',
            endDate: '2023-06-15',
        },
        {
            title: 'Événement 3',
            location: 'Lieu 3',
            description: 'Description de l\'événement 3',
            startDate: '2023-06-20',
            endDate: '2023-06-25',
        },
    ];

    const currentDate = new Date();

    const futureEvents = events.filter(event => new Date(event.startDate) > currentDate);

    return (
        <div className="h-full w-full m-1 bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 p-5">Planned Dives</h2>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {futureEvents.map((event, index) => (
                            <div
                                className="bg-white rounded-lg shadow-lg p-6 max-w-md"
                                key={index}
                            >
                                <h2 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h2>
                                <p className="text-gray-700 mb-4">Location: {event.location}</p>
                                <p className="text-gray-700 mb-4">Comment: {event.description}</p>
                                <p className="text-gray-700 mb-4">Starting Date: {event.startDate}</p>
                                <p className="text-gray-700 mb-4">Ending Date: {event.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiverDivingPlanned;
