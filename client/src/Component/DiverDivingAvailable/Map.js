import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap(({ address }) => {
    const geocoder = new window.google.maps.Geocoder();

    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);

    React.useEffect(() => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
                const location = results[0].geometry.location;
                setLatitude(location.lat());
                setLongitude(location.lng());
            }
        });
    }, [address, geocoder]);

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: latitude, lng: longitude }}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            >
                {latitude !== null && longitude !== null && (
                    <Marker position={{ lat: latitude, lng: longitude }} />
                )}
            </GoogleMap>
        </div>
    );
});

export default Map;
