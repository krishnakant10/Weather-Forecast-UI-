
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { getBackgroundImage } from "./services/unsplashApi";
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
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    fetchWeather(DEFAULT_LOCATION);
  }, []);

  useEffect(() => {
    if (!location?.name) return;

    let isMounted = true;

    getBackgroundImage(location.name)
      .then((photo) => {
        if (isMounted) {
          setBackgroundImage(photo?.urls?.full || "");
        }
      })
      .catch(() => {
        if (isMounted) {
          setBackgroundImage("");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [location]);

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

  async function resolveLocationName(latitude, longitude) {
    // Try Open-Meteo reverse geocoding first
    try {
      const resp = await fetch(
        `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&limit=1&language=en&format=json`
      );

      if (resp.ok) {
        const json = await resp.json();
        const result = json.results?.[0];
        if (result && (result.name || result.country)) {
          return [result.name, result.country].filter(Boolean).join(", ");
        }
      }
    } catch (e) {
      // ignore and fallback
    }

    // Fallback to Nominatim (OpenStreetMap)
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
      );

      if (resp.ok) {
        const json = await resp.json();
        // Prefer a concise name if available
        const addr = json.address || {};
        const place =
          addr.city || addr.town || addr.village || addr.hamlet || addr.county;
        if (place) {
          return [place, addr.state, addr.country].filter(Boolean).join(", ");
        }
        if (json.display_name) {
          return json.display_name;
        }
      }
    } catch (e) {
      // ignore
    }

    return null;
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        let name = null;
        try {
          name = await resolveLocationName(latitude, longitude);
        } catch (e) {
          // ignore; name remains null
        }

        fetchWeather({
          name: name || "Current location",
          latitude,
          longitude,
        });
      },
      (err) => {
        const message =
          err.code === 1
            ? "Location access was denied. Please allow permission to use your current location."
            : err.code === 3
              ? "Location request timed out. Please try again."
              : "Unable to access your location right now.";

        setError(message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  }

  return (
    <div
      className="app"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.35)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
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

        <SearchBar
          onLocationChange={handleLocationChange}
          onLocationRequest={handleUseCurrentLocation}
        />

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