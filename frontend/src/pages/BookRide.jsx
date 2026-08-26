import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRideById } from "../services/rideApi";
import { createBooking } from "../services/bookingApi";
import "./BookRide.css";

function BookRide() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ride, setRide] = useState(null);
    

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadRide();
    }, [id]);

    const loadRide = async () => {

        try {

            setLoading(true);

            const data = await getRideById(id);

            setRide(data);

        } catch (err) {

            console.error(err);

            setError("Unable to load ride details.");

        } finally {

            setLoading(false);

        }
    };

    const handleBooking = async (e) => {

    e.preventDefault();

    setBooking(true);
    setError("");
    setSuccess("");

    try {

        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            setError("Please login before booking a ride.");
            setBooking(false);
            return;
        }

        const user = JSON.parse(savedUser);

        if (!user.id) {
            setError("User information is missing. Please login again.");
            setBooking(false);
            return;
        }

        // Prevent driver from booking their own ride
        if (Number(ride.driverId) === Number(user.id)) {
            setError("You cannot book your own ride.");
            setBooking(false);
            return;
        }

        const bookingData = {
            rideId: Number(id),
            passengerId: Number(user.id)
        };

        console.log("Booking request:", bookingData);

        const response = await createBooking(bookingData);

        console.log("Booking response:", response);

        setSuccess("Ride booked successfully! 🎉");

        setTimeout(() => {
            navigate("/my-bookings");
        }, 1500);

    } catch (err) {

        console.error("Booking failed:", err);

        setError(
            err.response?.data?.message ||
            "Unable to book this ride. Please try again."
        );

    } finally {

        setBooking(false);
    }
};



    if (loading) {

        return (
            <div className="book-page">

                <div className="book-state">

                    <div className="book-spinner"></div>

                    <p>Loading ride details...</p>

                </div>

            </div>
        );
    }


    if (!ride) {

        return (
            <div className="book-page">

                <div className="book-state">

                    <div className="book-state-icon">
                        ⚠️
                    </div>

                    <h2>Ride not found</h2>

                    <button
                        onClick={() => navigate("/search-rides")}
                    >
                        Back to rides
                    </button>

                </div>

            </div>
        );
    }


    return (
        <div className="book-page">

            <div className="book-container">

                <button
                    className="book-back"
                    onClick={() => navigate(`/ride/${id}`)}
                >
                    ← Back to ride
                </button>


                <div className="book-layout">

                    {/* RIDE SUMMARY */}

                    <div className="booking-summary">

                        <p className="booking-label">
                            YOUR RIDE
                        </p>

                        <h1>
                            Confirm Your Booking
                        </h1>

                        <div className="booking-route">

                            <div className="booking-location">

                                <span>FROM</span>

                                <strong>
                                    {ride.source}
                                </strong>

                            </div>

                            <div className="booking-arrow">
                                →
                            </div>

                            <div className="booking-location">

                                <span>TO</span>

                                <strong>
                                    {ride.destination}
                                </strong>

                            </div>

                        </div>


                        <div className="summary-details">

                            <div>
                                <span>Departure</span>

                                <strong>
                                    {ride.departureTime
                                        ? new Date(
                                            ride.departureTime
                                        ).toLocaleString()
                                        : "N/A"}
                                </strong>
                            </div>


                            <div>
                                <span>Available seats</span>

                                <strong>
                                    {ride.availableSeats}
                                </strong>
                            </div>


                            <div>
                                <span>Price per seat</span>

                                <strong>
                                    ₹{ride.price}
                                </strong>
                            </div>


                            

                        </div>

                    </div>


                    {/* BOOKING FORM */}

                    <div className="booking-card">

                        <div className="booking-card-icon">
                            🎫
                        </div>

                        <h2>
                            Book this ride
                        </h2>

                        <p>
                           Your account will be used to confirm this booking.
                        </p>


                        <form onSubmit={handleBooking}>

                            


                            <div className="total-box">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{ride.price}
                                </strong>

                            </div>


                            {error && (
                                <div className="booking-error">
                                    ⚠️ {error}
                                </div>
                            )}


                            {success && (
                                <div className="booking-success">
                                    ✓ {success}
                                </div>
                            )}


                            <button
                                type="submit"
                                className="confirm-booking-button"
                                disabled={
                                    booking ||
                                    !ride.availableSeats ||
                                    ride.availableSeats <= 0
                                }
                            >
                                {booking
                                    ? "Confirming..."
                                    : "Confirm Booking"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BookRide;