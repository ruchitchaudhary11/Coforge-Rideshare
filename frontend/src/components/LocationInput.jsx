import { useState } from "react";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

function LocationInput({ placeholder, onLocationSelect }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchLocation = async (value) => {
        setQuery(value);

        if (value.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            setLoading(true);

            const url =
                `https://api.geoapify.com/v1/geocode/autocomplete` +
                `?text=${encodeURIComponent(value)}` +
                `&limit=5` +
                `&apiKey=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            setSuggestions(data.features || []);
        } catch (error) {
            console.error("Location search failed:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const selectLocation = (feature) => {
        const properties = feature.properties;

        const location = {
            name: properties.name || properties.formatted,
            address: properties.formatted,
            latitude: properties.lat,
            longitude: properties.lon
        };

        setQuery(properties.formatted);
        setSuggestions([]);

        onLocationSelect(location);
    };

    return (
        <div className="location-input">
            <input
                type="text"
                value={query}
                placeholder={placeholder}
                onChange={(e) => searchLocation(e.target.value)}
            />

            {loading && <p>Searching...</p>}

            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((feature, index) => (
                        <li
                            key={feature.properties.place_id || index}
                            onClick={() => selectLocation(feature)}
                        >
                            {feature.properties.formatted}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LocationInput;