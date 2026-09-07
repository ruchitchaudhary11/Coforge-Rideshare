import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRide } from "../services/rideApi";
import "./OfferRide.css";
import LocationInput from "../components/LocationInput";
import RouteMap from "../components/RouteMap";

function OfferRide() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
    source: "",
    sourceLatitude: "",
    sourceLongitude: "",

    destination: "",
    destinationLatitude: "",
    destinationLongitude: "",

    departureTime: "",
    availableSeats: "",
    price: ""
});
    const [pickupLocation, setPickupLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSourceSelect = (location) => {
    setPickupLocation(location);;
    setForm((prev) => ({
        ...prev,
        source: location.name,
        sourceLatitude: location.latitude,
        sourceLongitude: location.longitude
    }));
};

const handleDestinationSelect = (location) => {
    setDestinationLocation(location);
    setForm((prev) => ({
        ...prev,
        destination: location.name,
        destinationLatitude: location.latitude,
        destinationLongitude: location.longitude
    }));
};
     const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            setError("Please login before offering a ride.");
            setLoading(false);
            return;
        }

        const user = JSON.parse(savedUser);

        const rideData = {
            driverId: user.id,

            source: form.source,
            sourceLatitude: form.sourceLatitude,
            sourceLongitude: form.sourceLongitude,

            destination: form.destination,
            destinationLatitude: form.destinationLatitude,
            destinationLongitude: form.destinationLongitude,

            departureTime: form.departureTime,
            availableSeats: Number(form.availableSeats),
            price: Number(form.price)
        };

        await createRide(rideData);

        setSuccess("Your ride has been published successfully!");

        setTimeout(() => {
            navigate("/search-rides");
        }, 1500);

    } catch (err) {
        console.error("Create ride failed:", err);

        setError(
            err.response?.data?.message ||
            "Unable to create ride. Please try again."
        );

    } finally {
        setLoading(false);
    }
};

    return (
        <div className="offer-page">

            <div className="offer-wrapper">

                {/* LEFT INFORMATION PANEL */}

                <div className="offer-info">

                    <div className="offer-brand">
                        🚗
                    </div>

                    <p className="offer-label">
                        SHARE YOUR JOURNEY
                    </p>

                    <h1>
                        Turn your empty
                        <span> seats into a journey.</span>
                    </h1>

                    <p className="offer-description">
                        Offer a ride to people travelling your way,
                        share travel costs and make every journey
                        more meaningful.
                    </p>


                    <div className="offer-benefits">

                        <div className="benefit">
                            <div className="benefit-icon">
                                💰
                            </div>

                            <div>
                                <strong>Save on travel</strong>
                                <p>Share your travel expenses.</p>
                            </div>
                        </div>


                        <div className="benefit">
                            <div className="benefit-icon">
                                🤝
                            </div>

                            <div>
                                <strong>Meet people</strong>
                                <p>Connect with fellow travellers.</p>
                            </div>
                        </div>


                        <div className="benefit">
                            <div className="benefit-icon">
                                🌱
                            </div>

                            <div>
                                <strong>Travel sustainably</strong>
                                <p>Reduce the number of cars on the road.</p>
                            </div>
                        </div>

                    </div>

                </div>


                {/* FORM CARD */}

                <div className="offer-form-card">

                    <div className="offer-form-header">

                        <div>
                            <h2>Offer a Ride</h2>

                            <p>
                                Tell passengers about your journey.
                            </p>
                        </div>

                        <div className="form-car-icon">
                            🚘
                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        


                        {/* ROUTE */}

                        <div className="form-section">

                            <div className="section-title">
                                Your Route
                            </div>

                            <div className="route-fields">

                                <div className="form-field">

                                    <label>
                                        Pickup location
                                    </label>

                                   <LocationInput
                                        placeholder="Search pickup location"
                                        onLocationSelect={handleSourceSelect}
                                    /> 

                                </div>


                                <div className="route-connector">
                                    ↓
                                </div>


                                <div className="form-field">

                                    <label>
                                        Destination
                                    </label>

                                    <LocationInput
                                        placeholder="Search destination"
                                        onLocationSelect={handleDestinationSelect}
                                    />

                                </div>
                                <RouteMap
                                    pickup={pickupLocation}
                                    destination={destinationLocation}
                                />

                            </div>

                        </div>


                        {/* JOURNEY DETAILS */}

                        <div className="form-section">

                            <div className="section-title">
                                Journey Details
                            </div>

                            <div className="details-fields">

                                <div className="form-field">

                                    <label>
                                        Departure
                                    </label>

                                    <input
                                        type="datetime-local"
                                        name="departureTime"
                                        value={form.departureTime}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-field">

                                    <label>
                                        Available seats
                                    </label>

                                    <input
                                        type="number"
                                        name="availableSeats"
                                        value={form.availableSeats}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        placeholder="e.g. 3"
                                        required
                                    />

                                </div>


                                <div className="form-field">

                                    <label>
                                        Price per seat
                                    </label>

                                    <div className="price-field">

                                        <span>₹</span>

                                        <input
                                            type="number"
                                            name="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                            placeholder="150"
                                            required
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* MESSAGES */}

                        {error && (
                            <div className="offer-error">
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div className="offer-success">
                                ✓ {success}
                            </div>
                        )}


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="publish-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Publishing Ride..."
                                : "🚗 Publish My Ride"}
                        </button>


                        <p className="form-note">
                            By publishing this ride, you agree to
                            provide accurate journey information.
                        </p>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default OfferRide;