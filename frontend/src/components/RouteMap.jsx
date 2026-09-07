import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons in React/Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});

function MapUpdater({ pickup, destination }) {
    const map = useMap();

    useEffect(() => {
        if (!pickup || !destination) return;

        const bounds = L.latLngBounds([
            [pickup.latitude, pickup.longitude],
            [destination.latitude, destination.longitude]
        ]);

        map.fitBounds(bounds, {
            padding: [40, 40]
        });
    }, [pickup, destination, map]);

    return null;
}

function RouteMap({ pickup, destination }) {

    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!pickup || !destination) {
            setRoute([]);
            setDistance(null);
            setDuration(null);
            return;
        }

        const getRoute = async () => {

            try {
                setError("");

                const url =
                    `https://router.project-osrm.org/route/v1/driving/` +
                    `${pickup.longitude},${pickup.latitude};` +
                    `${destination.longitude},${destination.latitude}` +
                    `?overview=full&geometries=geojson`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Unable to calculate route");
                }

                const data = await response.json();

                if (data.code !== "Ok" || !data.routes?.length) {
                    throw new Error("No route found");
                }

                const selectedRoute = data.routes[0];

                const coordinates =
                    selectedRoute.geometry.coordinates.map(
                        ([longitude, latitude]) => [
                            latitude,
                            longitude
                        ]
                    );

                setRoute(coordinates);

                setDistance(
                    (selectedRoute.distance / 1000).toFixed(1)
                );

                setDuration(
                    Math.round(selectedRoute.duration / 60)
                );

            } catch (err) {

                console.error("Route calculation failed:", err);
                setError("Unable to calculate route.");

                setRoute([]);
                setDistance(null);
                setDuration(null);
            }
        };

        getRoute();

    }, [pickup, destination]);


    if (!pickup || !destination) {
        return (
            <div className="route-map-placeholder">
                Select both pickup and destination
                to see the route.
            </div>
        );
    }


    return (
        <div className="route-map-container">

            <MapContainer
                center={[
                    pickup.latitude,
                    pickup.longitude
                ]}
                zoom={10}
                style={{
                    height: "400px",
                    width: "100%"
                }}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater
                    pickup={pickup}
                    destination={destination}
                />

                <Marker
                    position={[
                        pickup.latitude,
                        pickup.longitude
                    ]}
                >
                    <Popup>
                        <strong>Pickup</strong>
                        <br />
                        {pickup.address || pickup.name}
                    </Popup>
                </Marker>


                <Marker
                    position={[
                        destination.latitude,
                        destination.longitude
                    ]}
                >
                    <Popup>
                        <strong>Destination</strong>
                        <br />
                        {destination.address || destination.name}
                    </Popup>
                </Marker>


                {route.length > 0 && (
                    <Polyline
                        positions={route}
                        pathOptions={{
                            color: "blue",
                            weight: 5
                        }}
                    />
                )}

            </MapContainer>


            {error && (
                <p className="route-error">
                    {error}
                </p>
            )}


            {distance && duration && (
                <div className="route-info">

                    <span>
                        📍 Distance: <strong>{distance} km</strong>
                    </span>

                    <span>
                        ⏱️ Estimated time:{" "}
                        <strong>{duration} min</strong>
                    </span>

                </div>
            )}

        </div>
    );
}

export default RouteMap;