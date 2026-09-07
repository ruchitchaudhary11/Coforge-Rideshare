import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRideById } from "../services/rideApi";
import "./RideDetails.css";
import RouteMap from "../components/RouteMap";

function RideDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ride, setRide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRide();
    }, [id]);

    const loadRide = async () => {

        try {

            setLoading(true);

            const data = await getRideById(id);

            setRide(data);

        } catch (err) {

            console.error("Failed to load ride:", err);

            setError("Unable to load ride details.");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="ride-details-page">
                <div className="details-state">
                    <div className="details-spinner"></div>
                    <p>Loading ride details...</p>
                </div>
            </div>
        );
    }

    if (error || !ride) {
        return (
            <div className="ride-details-page">
                <div className="details-state">
                    <div className="details-state-icon">⚠️</div>

                    <h2>Ride Not Found</h2>

                    <p>{error || "This ride does not exist."}</p>

                    <button
                        onClick={() => navigate("/search-rides")}
                    >
                        Back to Rides
                    </button>
                </div>
            </div>
        );
    }
    const pickupLocation = {
    name: ride.source,
    address: ride.source,
    latitude: ride.sourceLatitude,
    longitude: ride.sourceLongitude
};

const destinationLocation = {
    name: ride.destination,
    address: ride.destination,
    latitude: ride.destinationLatitude,
    longitude: ride.destinationLongitude
};

    return (
        <div className="ride-details-page">

            <div className="details-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/search-rides")}
                >
                    ← Back to rides
                </button>


                <div className="details-card">

                    <div className="details-header">

                        <div>
                            <p className="details-label">
                                RIDE DETAILS
                            </p>

                            <h1>
                                {ride.source}
                                <span> → </span>
                                {ride.destination}
                            </h1>
                        </div>

                        <div className="car-icon">
                            🚗
                        </div>

                    </div>


                    <div className="route-box">

                        <div className="route-location">

                            <div className="route-dot start">
                                ●
                            </div>

                            <div>
                                <span>Pickup</span>

                                <strong>
                                    {ride.source}
                                </strong>
                            </div>

                        </div>



                        <div className="vertical-line"></div>


                        <div className="route-location">

                            <div className="route-dot end">
                                ●
                            </div>

                            <div>
                                <span>Destination</span>

                                <strong>
                                    {ride.destination}
                                </strong>
                            </div>

                        </div>

                    </div>
                        <div className="details-map-section">

                         <h2>Route</h2>

                         <RouteMap
                            pickup={pickupLocation}
                            destination={destinationLocation}
                        />

                        </div>


                    



                    <div className="ride-info-grid">

                        <div className="info-item">

                            <span>🕐 Departure</span>

                            <strong>
                                {ride.departureTime
                                    ? new Date(
                                        ride.departureTime
                                    ).toLocaleString()
                                    : "N/A"}
                            </strong>

                        </div>


                        <div className="info-item">

                            <span>💺 Available Seats</span>

                            <strong>
                                {ride.availableSeats}
                            </strong>

                        </div>


                        <div className="info-item">

                            <span>💰 Price per Seat</span>

                            <strong>
                                ₹{ride.price}
                            </strong>

                        </div>


                        <div className="info-item">

                            <span>👤 Driver ID</span>

                            <strong>
                                {ride.driverId}
                            </strong>

                        </div>

                    </div>


                    <div className="booking-section">

                        <div>
                            <span className="price-label">
                                Price per passenger
                            </span>

                            <strong className="big-price">
                                ₹{ride.price}
                            </strong>
                        </div>

                        <button
                            className="book-button"
                            disabled={
                                !ride.availableSeats ||
                                ride.availableSeats <= 0
                            }
                            onClick={() =>
                                navigate(`/book/${ride.id}`)
                            }
                        >
                            {ride.availableSeats > 0
                                ? "Book This Ride →"
                                : "No Seats Available"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RideDetails;