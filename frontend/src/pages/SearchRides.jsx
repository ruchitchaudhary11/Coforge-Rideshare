import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRides } from "../services/rideApi";
import "./SearchRides.css";

function SearchRides() {

    const navigate = useNavigate();

    const [rides, setRides] = useState([]);
    const [filteredRides, setFilteredRides] = useState([]);

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRides();
    }, []);

    const loadRides = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllRides();

            setRides(data);
            setFilteredRides(data);

        } catch (err) {

            console.error("Failed to load rides:", err);

            setError(
                "Unable to load rides. Please make sure Ride Service is running."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleSearch = (e) => {

        e.preventDefault();

        let results = [...rides];

        if (source.trim()) {

            results = results.filter((ride) =>
                ride.source
                    ?.toLowerCase()
                    .includes(source.trim().toLowerCase())
            );
        }

        if (destination.trim()) {

            results = results.filter((ride) =>
                ride.destination
                    ?.toLowerCase()
                    .includes(destination.trim().toLowerCase())
            );
        }

        if (date) {

            results = results.filter((ride) => {

                if (!ride.departureTime) {
                    return false;
                }

                return ride.departureTime.startsWith(date);

            });
        }

        setFilteredRides(results);
    };

    const clearSearch = () => {

        setSource("");
        setDestination("");
        setDate("");

        setFilteredRides(rides);
    };

    return (
        <div className="search-page">

            {/* HEADER */}

            <div className="search-header">

                <div>
                    <p className="search-eyebrow">
                        RIDE SEARCH
                    </p>

                    <h1>Find Your Perfect Ride</h1>

                    <p className="search-subtitle">
                        Search available rides and choose the
                        journey that works best for you.
                    </p>
                </div>

                <button
                    className="offer-small-button"
                    onClick={() => navigate("/offer-ride")}
                >
                    + Offer a Ride
                </button>

            </div>


            {/* SEARCH BOX */}

            <form
                className="ride-search-box"
                onSubmit={handleSearch}
            >

                <div className="search-field">

                    <label>From</label>

                    <input
                        type="text"
                        value={source}
                        onChange={(e) =>
                            setSource(e.target.value)
                        }
                        placeholder="Pickup location"
                    />

                </div>


                <div className="search-field">

                    <label>To</label>

                    <input
                        type="text"
                        value={destination}
                        onChange={(e) =>
                            setDestination(e.target.value)
                        }
                        placeholder="Destination"
                    />

                </div>


                <div className="search-field">

                    <label>Date</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                    />

                </div>


                <button
                    type="submit"
                    className="search-main-button"
                >
                    🔍 Search
                </button>

                {(source || destination || date) && (
                    <button
                        type="button"
                        className="clear-button"
                        onClick={clearSearch}
                    >
                        Clear
                    </button>
                )}

            </form>


            {/* CONTENT */}

            <div className="rides-content">

                {loading && (
                    <div className="search-state">
                        <div className="loading-spinner"></div>
                        <p>Finding available rides...</p>
                    </div>
                )}


                {error && !loading && (
                    <div className="search-state error-state">

                        <div className="state-icon">
                            ⚠️
                        </div>

                        <h3>Unable to load rides</h3>

                        <p>{error}</p>

                        <button
                            onClick={loadRides}
                            className="retry-button"
                        >
                            Try Again
                        </button>

                    </div>
                )}


                {!loading && !error && (
                    <>
                        <div className="results-header">

                            <h2>
                                Available Rides
                            </h2>

                            <span>
                                {filteredRides.length} ride
                                {filteredRides.length !== 1
                                    ? "s"
                                    : ""}
                            </span>

                        </div>


                        {filteredRides.length === 0 ? (

                            <div className="search-state">

                                <div className="state-icon">
                                    🚗
                                </div>

                                <h3>
                                    No rides found
                                </h3>

                                <p>
                                    Try a different source,
                                    destination or date.
                                </p>

                            </div>

                        ) : (

                            <div className="rides-grid">

                                {filteredRides.map((ride) => (

                                    <div
                                        className="ride-card"
                                        key={ride.id}
                                    >

                                        <div className="ride-route">

                                            <div>
                                                <span>
                                                    FROM
                                                </span>

                                                <strong>
                                                    {ride.source}
                                                </strong>
                                            </div>


                                            <div className="route-line">
                                                →
                                            </div>


                                            <div>
                                                <span>
                                                    TO
                                                </span>

                                                <strong>
                                                    {ride.destination}
                                                </strong>
                                            </div>

                                        </div>


                                        <div className="ride-details">

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
                                                    💺 Seats
                                                </span>

                                                <strong>
                                                    {ride.availableSeats}
                                                </strong>
                                            </div>


                                            <div>
                                                <span>
                                                    💰 Price
                                                </span>

                                                <strong>
                                                    ₹{ride.price}
                                                </strong>
                                            </div>

                                        </div>


                                        <button
                                            className="view-ride-button"
                                            onClick={() =>
                                                navigate(
                                                    `/ride/${ride.id}`
                                                )
                                            }
                                        >
                                            View Ride →
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                    </>
                )}

            </div>

        </div>
    );
}

export default SearchRides;