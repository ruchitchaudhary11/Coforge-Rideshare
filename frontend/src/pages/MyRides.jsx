import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getRidesByDriver,
    deleteRide
} from "../services/rideApi";
import "./MyRides.css";

function MyRides() {

    const navigate = useNavigate();

    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadMyRides();
    }, []);

    const loadMyRides = async () => {

        try {

            setLoading(true);
            setError("");

            const savedUser = localStorage.getItem("user");

            if (!savedUser) {
                navigate("/login");
                return;
            }

            const user = JSON.parse(savedUser);

            if (!user.id) {
                setError("Logged-in user ID not found.");
                return;
            }

            console.log("Logged-in user:", user);

            const data = await getRidesByDriver(user.id);

            console.log("My rides:", data);

            setRides(Array.isArray(data) ? data : []);

        } catch (err) {

            console.error("Failed to load my rides:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load your rides."
            );

        } finally {

            setLoading(false);
        }
    };

    const handleDelete = async (rideId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this ride?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deleteRide(rideId);

            setRides((currentRides) =>
                currentRides.filter(
                    (ride) => ride.id !== rideId
                )
            );

        } catch (err) {

            console.error("Failed to delete ride:", err);

            setError(
                err.response?.data?.message ||
                "Unable to delete this ride."
            );
        }
    };

    if (loading) {
        return (
            <div className="my-rides-page">

                <div className="my-rides-state">

                    <div className="my-rides-spinner"></div>

                    <p>
                        Loading your rides...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="my-rides-page">

            <div className="my-rides-container">

                {/* HEADER */}

                <div className="my-rides-header">

                    <div>

                        <p className="my-rides-label">
                            YOUR RIDES
                        </p>

                        <h1>
                            My Rides
                        </h1>

                        <p>
                            Manage the rides you have offered.
                        </p>

                    </div>

                    <button
                        className="my-rides-offer-button"
                        onClick={() => navigate("/offer-ride")}
                    >
                        + Offer a Ride
                    </button>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="my-rides-error">
                        ⚠️ {error}
                    </div>
                )}


                {/* EMPTY */}

                {!error && rides.length === 0 && (

                    <div className="empty-rides">

                        <div className="empty-rides-icon">
                            🚗
                        </div>

                        <h2>
                            You haven't offered any rides yet
                        </h2>

                        <p>
                            Create your first ride and
                            start sharing your journey.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/offer-ride")
                            }
                        >
                            Offer Your First Ride
                        </button>

                    </div>
                )}


                {/* RIDES */}

                {!error && rides.length > 0 && (

                    <div className="my-rides-list">

                        {rides.map((ride) => (

                            <div
                                className="my-ride-card"
                                key={ride.id}
                            >

                                {/* CARD HEADER */}

                                <div className="my-ride-top">

                                    <div>

                                        <p className="ride-booking-label">
                                            RIDE #{ride.id}
                                        </p>

                                        <h2>
                                            {ride.source}

                                            <span>
                                                {" → "}
                                            </span>

                                            {ride.destination}
                                        </h2>

                                    </div>

                                    <div className="ride-status">
                                        ACTIVE
                                    </div>

                                </div>


                                {/* DETAILS */}

                                <div className="my-ride-details">

                                    <div>

                                        <span>
                                            🕐 Departure
                                        </span>

                                        <strong>
                                            {ride.departureTime
                                                ? new Date(
                                                    ride.departureTime
                                                ).toLocaleString()
                                                : "N/A"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            💺 Available Seats
                                        </span>

                                        <strong>
                                            {ride.availableSeats}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            💰 Price per Seat
                                        </span>

                                        <strong>
                                            ₹{ride.price}
                                        </strong>

                                    </div>

                                </div>


                                {/* ACTIONS */}

                                <div className="my-ride-actions">

                                    <button
                                        className="view-my-ride"
                                        onClick={() =>
                                            navigate(
                                                `/ride/${ride.id}`
                                            )
                                        }
                                    >
                                        View Ride
                                    </button>


                                    <button
                                        className="edit-my-ride"
                                        onClick={() =>
                                            navigate(
                                                `/edit-ride/${ride.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-my-ride"
                                        onClick={() =>
                                            handleDelete(ride.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default MyRides;