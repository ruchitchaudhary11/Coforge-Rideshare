import { useState } from "react";

function LocationInput({
    label,
    name,
    value,
    onChange,
    placeholder
}) {

    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {

        const text = e.target.value;

        onChange({
            target: {
                name: name,
                value: text
            }
        });

        // Temporary suggestions
        if (text.length > 0) {

            setSuggestions([
                `${text}, Delhi`,
                `${text}, Noida`,
                `${text}, Gurgaon`
            ]);

        } else {

            setSuggestions([]);
        }
    };

    const selectLocation = (location) => {

        onChange({
            target: {
                name: name,
                value: location
            }
        });

        setSuggestions([]);
    };

    return (
        <div className="location-input">

            <label>
                {label}
            </label>

            <div className="input-with-icon">

                <span className="location-dot">
                    ●
                </span>

                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    required
                />

            </div>

            {suggestions.length > 0 && (

                <div className="location-suggestions">

                    {suggestions.map((location, index) => (

                        <div
                            key={index}
                            className="location-suggestion"
                            onClick={() =>
                                selectLocation(location)
                            }
                        >
                            📍 {location}
                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default LocationInput;