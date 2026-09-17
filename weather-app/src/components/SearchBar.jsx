
import { useState } from "react";

function SearchBar({ onLocationChange }) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    const city = query.trim();

    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setSearching(true);
    setError("");

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error("Location search failed.");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Try another location.");
      }

      const result = data.results[0];

      onLocationChange({
        name: [result.name, result.country]
          .filter(Boolean)
          .join(", "),
        latitude: result.latitude,
        longitude: result.longitude,
      });
    } catch (err) {
      setError(err.message || "Unable to search location.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search city (e.g. Delhi, London)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search city"
          />
        </div>

        <button
          type="submit"
          className="search-btn"
          disabled={searching}
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="search-error">{error}</p>}
    </div>
  );
}

export default SearchBar;