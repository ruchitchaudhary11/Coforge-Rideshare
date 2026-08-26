import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/search-rides");
    };

    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">

                <div className="hero-content">
                    <p className="hero-tag">
                        🚗 SMART • SIMPLE • AFFORDABLE
                    </p>

                    <h1>
                        Your Journey,
                        <span> Our Community.</span>
                    </h1>

                    <p className="hero-description">
                        Find a ride, share your journey and travel comfortably
                        with Coforge RideShare.
                    </p>

                    <button
                        className="primary-button"
                        onClick={handleSearch}
                    >
                        🔍 Find a Ride
                    </button>
                </div>

            </section>


            {/* Search Card */}
            <section className="search-section">

                <div className="search-card">

                    <h2>Find Your Ride</h2>

                    <div className="search-fields">

                        <div className="input-group">
                            <label>From</label>
                            <input
                                type="text"
                                placeholder="Enter pickup location"
                            />
                        </div>

                        <div className="input-group">
                            <label>To</label>
                            <input
                                type="text"
                                placeholder="Enter destination"
                            />
                        </div>

                        <div className="input-group">
                            <label>Date</label>
                            <input type="date" />
                        </div>

                        <button
                            className="search-button"
                            onClick={handleSearch}
                        >
                            Search Rides
                        </button>

                    </div>

                </div>

            </section>


            {/* Features */}
            <section className="features-section">

                <h2>Why Choose RideShare?</h2>

                <div className="features-grid">

                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Find Rides</h3>
                        <p>
                            Easily search for available rides
                            based on your destination.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>Save Money</h3>
                        <p>
                            Share travel costs and make your
                            journey more affordable.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>Connect</h3>
                        <p>
                            Connect with people travelling
                            on the same route.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;