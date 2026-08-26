import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userApi";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        }
        );
        
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
console.log(form);

            const user = await registerUser(form);

            console.log("Registered user:", user);

            setSuccess("Account created successfully! 🎉");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {

            console.error("Registration failed:", err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(
                    "Registration failed. Please check your details and try again."
                );
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <div className="auth-logo">
                        🚗
                    </div>

                    <h1>Create Account</h1>

                    <p>
                        Join Coforge RideShare today
                    </p>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="auth-input">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                    </div>


                    <div className="auth-input">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    <div className="auth-input">

                        <label>Phone</label>

                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />

                    </div>


                    <div className="auth-input">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Create password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>


                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}


                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;