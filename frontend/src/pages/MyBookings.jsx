import { useEffect, useState } from "react";
import { getBookingsByPassenger } from "../services/bookingApi";
import { getRideById } from "../services/rideApi";
import { getUserById } from "../services/userApi";
import "./MyBookings.css";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            setLoading(true);
            setError("");

            const savedUser = localStorage.getItem("user");

            if (!savedUser) {
                setError("Please login to view your bookings.");
                return;
            }

            const user = JSON.parse(savedUser);

            const bookingData =
                await getBookingsByPassenger(user.id);

            const enrichedBookings = await Promise.all(
                bookingData.map(async (booking) => {

                    try {

                        const ride =
                            await getRideById(booking.rideId);

                        let driverName = "Unknown Driver";

                        if (ride?.driverId) {

                            const driver =
                                await getUserById(ride.driverId);

                            driverName =
                                driver?.name || "Unknown Driver";
                        }

                        return {
                            ...booking,
                            ride,
                            driverName
                        };

                    } catch (err) {

                        console.error(
                            "Failed to load ride/driver:",
                            err
                        );

                        return {
                            ...booking,
                            ride: null,
                            driverName: "Unknown Driver"
                        };
                    }
                })
            );

            setBookings(enrichedBookings);

            console.log(
                "Enriched bookings:",
                enrichedBookings
            );

        } catch (err) {

            console.error(
                "Failed to load bookings:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load your bookings."
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="bookings-page">

                <div className="bookings-state">

                    <div className="bookings-spinner"></div>

                    <p>
                        Loading your bookings...
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="bookings-page">

            <div className="bookings-container">

                <div className="bookings-header">

                    <div>

                        <p className="bookings-label">
                            YOUR JOURNEYS
                        </p>

                        <h1>
                            My Bookings
                        </h1>

                        <p>
                            View your confirmed rides.
                        </p>

                    </div>

                </div>


                {error && (
                    <div className="bookings-error">
                        ⚠️ {error}
                    </div>
                )}


                {!error && bookings.length === 0 && (

                    <div className="empty-bookings">

                        <div className="empty-icon">
                            🎫
                        </div>

                        <h2>
                            No bookings yet
                        </h2>

                        <p>
                            Your confirmed rides will appear here.
                        </p>

                    </div>
                )}


                {!error && bookings.length > 0 && (

                    <div className="bookings-list">

                        {bookings.map((booking) => (

                            <div
                                className="booking-card"
                                key={booking.id}
                            >

                                <div className="booking-card-left">

                                    <div className="booking-ticket">
                                        🎫
                                    </div>

                                    <div>

                                        <p>
                                            Booking #{booking.id}
                                        </p>

                                        <h2>
                                            {booking.ride
                                                ? `${booking.ride.source} → ${booking.ride.destination}`
                                                : `Ride #${booking.rideId}`
                                            }
                                        </h2>

                                    </div>

                                </div>


                                <div className="booking-card-middle">

                                    <span>
                                        Driver
                                    </span>

                                    <strong>
                                        👤 {booking.driverName}
                                    </strong>

                                </div>


                                <div
                                    className={`booking-status ${
                                        booking.status?.toLowerCase()
                                    }`}
                                >
                                    {booking.status}
                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default MyBookings;