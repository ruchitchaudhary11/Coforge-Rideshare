import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    useEffect(() => {

        const handleUserLogin = () => {

            const savedUser = localStorage.getItem("user");

            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        };

        window.addEventListener(
            "userLogin",
            handleUserLogin
        );

        return () => {
            window.removeEventListener(
                "userLogin",
                handleUserLogin
            );
        };

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("user");

        setUser(null);

        navigate("/login");
    };


    return (
        <nav className="navbar">

            <div className="navbar-brand">
                🚗 Coforge RideShare
            </div>


            <div className="navbar-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/search-rides">
                    Find Ride
                </Link>

                <Link to="/offer-ride">
                    Offer Ride
                </Link>

                <Link to="/my-bookings">
                    My Bookings
                </Link>
                <Link to="/my-rides">
    My Rides
</Link>



                {user ? (

                    <>
                        <span className="navbar-user">
                            Hi, {user.name} 👋
                        </span>

                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </button>
                    </>

                ) : (

                    <Link
                        to="/login"
                        className="login-button"
                    >
                        Login
                    </Link>

                )}

            </div>

        </nav>
    );
}

export default Navbar;