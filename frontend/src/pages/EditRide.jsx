import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getRideById,
    updateRide
} from "../services/rideApi";
import "./EditRide.css";

function EditRide() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        source: "",
        destination: "",
        departureTime: "",
        availableSeats: "",
        price: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadRide();
    }, [id]);

    const loadRide = async () => {

        try {

            const ride = await getRideById(id);

            setForm({
                source: ride.source || "",
                destination: ride.destination || "",
                departureTime: ride.departureTime
                    ? ride.departureTime.slice(0, 16)
                    : "",
                availableSeats:
                    ride.availableSeats ?? "",
                price:
                    ride.price ?? ""
            });

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load ride details."
            );

        } finally {

            setLoading(false);
        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            const savedUser =
                localStorage.getItem("user");

            if (!savedUser) {
                navigate("/login");
                return;
            }

            const user = JSON.parse(savedUser);

            const rideData = {
                driverId: user.id,
                source: form.source,
                destination: form.destination,
                departureTime: form.departureTime,
                availableSeats:
                    Number(form.availableSeats),
                price:
                    Number(form.price)
            };

            await updateRide(id, rideData);

            setSuccess(
                "Ride updated successfully! ✓"
            );

            setTimeout(() => {
                navigate("/my-rides");
            }, 1000);

        } catch (err) {

            console.error(
                "Update ride failed:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to update ride."
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-ride-page">
                <p>Loading ride...</p>
            </div>
        );
    }

    return (
        <div className="edit-ride-page">

            <div className="edit-ride-card">

                <button
                    className="edit-back-button"
                    onClick={() => navigate("/my-rides")}
                >
                    ← Back to My Rides
                </button>

                <div className="edit-header">

                    <p>
                        MANAGE YOUR RIDE
                    </p>

                    <h1>
                        Edit Ride
                    </h1>

                    <span>
                        Update your journey details below.
                    </span>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="edit-row">

                        <div className="edit-field">

                            <label>
                                Pickup Location
                            </label>

                            <input
                                type="text"
                                name="source"
                                value={form.source}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="edit-field">

                            <label>
                                Destination
                            </label>

                            <input
                                type="text"
                                name="destination"
                                value={form.destination}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <div className="edit-row">

                        <div className="edit-field">

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


                        <div className="edit-field">

                            <label>
                                Available Seats
                            </label>

                            <input
                                type="number"
                                name="availableSeats"
                                min="1"
                                max="10"
                                value={form.availableSeats}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <div className="edit-field">

                        <label>
                            Price per Seat
                        </label>

                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {error && (
                        <div className="edit-error">
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div className="edit-success">
                            ✓ {success}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="save-ride-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving Changes..."
                            : "Save Changes"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditRide;