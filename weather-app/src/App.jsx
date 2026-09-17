
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import "./App.css";

// Default location: New Delhi
const DEFAULT_LOCATION = {
  name: "New Delhi",
  latitude: 28.6139,
  longitude: 77.209,
};

function App() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather(DEFAULT_LOCATION);
  }, []);

  async function fetchWeather(selectedLocation) {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
        hourly:
          "temperature_2m,precipitation_probability,weather_code",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
        timezone: "auto",
        forecast_days: "7",
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch weather data.");
      }

      const data = await response.json();

      setLocation(selectedLocation);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleLocationChange(selectedLocation) {
    fetchWeather(selectedLocation);
  }

  return (
    <div className="app">
      <div className="weather-container">
        <header className="app-header">
          <div>
            <p className="eyebrow">WEATHER FORECAST</p>
            <h1>Weatherly</h1>
            <p className="subtitle">
              Stay updated with the weather around you.
            </p>
          </div>

          <div className="header-icon">☀️</div>
        </header>

        <SearchBar onLocationChange={handleLocationChange} />

        {loading && (
          <div className="status-card">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-card">
            <span>⚠️</span>
            <div>
              <h3>Unable to load weather</h3>
              <p>{error}</p>
              <button
                className="retry-btn"
                onClick={() => fetchWeather(location)}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            <CurrentWeather
              weather={weather}
              location={location}
            />

            <WeatherDetails weather={weather} />

            <Forecast weather={weather} />
            <HourlyForecast weather={weather} />
          </>
        )}

        {!loading && !error && !weather && (
          <div className="welcome-card">
            <h2>Check the weather</h2>
            <p>Search for a city to see the latest forecast.</p>
          </div>
        )}

        <footer className="footer">
          Weather data provided by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
          >
            Open-Meteo
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;