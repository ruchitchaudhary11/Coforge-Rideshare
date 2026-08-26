import { useNavigate } from "react-router-dom";

function RideCard({ ride }) {
    const navigate = useNavigate();

    return (
        <div className="ride-card">

            <div className="ride-card-header">
                <div>
                    <span className="ride-label">FROM</span>
                    <h3>{ride.source}</h3>
                </div>

                <div className="ride-arrow">
                    →
                </div>

                <div>
                    <span className="ride-label">TO</span>
                    <h3>{ride.destination}</h3>
                </div>
            </div>

            <div className="ride-info">

                <div>
                    <span>🕐 Departure</span>
                    <strong>{ride.departureTime}</strong>
                </div>

                <div>
                    <span>💺 Seats</span>
                    <strong>{ride.availableSeats}</strong>
                </div>

                <div>
                    <span>💰 Price</span>
                    <strong>₹{ride.price}</strong>
                </div>

            </div>

            <button
                className="view-ride-button"
                onClick={() => navigate(`/ride/${ride.id}`)}
            >
                View Ride
            </button>

        </div>
    );
}

export default RideCard;