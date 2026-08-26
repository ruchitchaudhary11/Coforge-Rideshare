import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../services/userApi";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {

        const user = await loginUser({
            email: email,
            password: password
        });

        console.log("Logged in user:", user);

        // Save logged-in user
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
        window.dispatchEvent(new Event("userLogin"));

        setMessage(`Welcome back, ${user.name}! 🚗`);

        setTimeout(() => {
            navigate("/");
        }, 1000);

    } catch (err) {

        console.error("Login failed:", err);

        setError(
            err.response?.data?.message ||
            "Invalid email or password."
        );

    } finally {

        setLoading(false);
    }
};

    return (
        <div className="login-page">

            <div className="login-wrapper">

                {/* LEFT SIDE */}

                <div className="login-intro">

                    <div className="login-brand">
                        🚗
                        <span>Coforge RideShare</span>
                    </div>

                    <div className="login-intro-content">

                        <p className="login-tag">
                            WELCOME BACK
                        </p>

                        <h1>
                            Your ride,
                            <br />
                            your journey.
                        </h1>

                        <p>
                            Connect with colleagues, share rides,
                            save time and make every journey easier.
                        </p>

                    </div>

                    <div className="login-feature">

                        <div className="feature-icon">
                            ✓
                        </div>

                        <div>
                            <strong>Safe & convenient</strong>

                            <span>
                                Travel comfortably with your colleagues.
                            </span>
                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="login-card">

                    <div className="login-card-header">

                        <div className="login-icon">
                            🚗
                        </div>

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Login to your RideShare account
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* EMAIL */}

                        <div className="login-field">

                            <label>
                                Email Address
                            </label>

                            <div className="login-input-wrapper">

                                <span>✉</span>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="login-field">

                            <div className="login-label-row">

                                <label>
                                    Password
                                </label>

                                <a href="#">
                                    Forgot password?
                                </a>

                            </div>

                            <div className="login-input-wrapper">

                                <span>🔒</span>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
                                />

                            </div>

                        </div>


                        {/* REMEMBER */}

                        <label className="remember-me">

                            <input
                                type="checkbox"
                            />

                            <span>
                                Remember me
                            </span>

                        </label>


                        {/* ERROR */}

                        {error && (
                            <div className="login-error">
                                ⚠️ {error}
                            </div>
                        )}


                        {/* SUCCESS */}

                        {message && (
                            <div className="login-success">
                                ✓ {message}
                            </div>
                        )}


                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"
                            }

                            {!loading && (
                                <span>→</span>
                            )}

                        </button>

                    </form>


                    {/* REGISTER */}

                    <div className="login-divider">
                        <span>OR</span>
                    </div>

                    <p className="login-register">

                        Don't have an account?

                        <Link to="/register">
                            Create an account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;