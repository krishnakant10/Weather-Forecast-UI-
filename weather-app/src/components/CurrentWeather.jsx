
import { getWeatherDescription, getWeatherIcon } from "../weatherUtils";

function CurrentWeather({ weather, location }) {
  const current = weather.current;
  const daily = weather.daily;

  const description = getWeatherDescription(current.weather_code);
  const icon = getWeatherIcon(current.weather_code);

  const formattedDate = new Date(current.time).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="current-weather">
      <div className="location-info">
        <p className="location-label">CURRENT WEATHER</p>
        <h2>{location.name}</h2>
        <p className="date">{formattedDate}</p>
      </div>

      <div className="main-weather">
        <div className="weather-icon-large">{icon}</div>

        <div className="temperature">
          <span>{Math.round(current.temperature_2m)}</span>
          <sup>°C</sup>
        </div>

        <div className="weather-description">
          <h3>{description}</h3>
          <p>
            Feels like{" "}
            {Math.round(current.apparent_temperature)}°C
          </p>
        </div>
      </div>

      <div className="temperature-range">
        <span>
          ↑ High: {Math.round(daily.temperature_2m_max[0])}°C
        </span>
        <span>
          ↓ Low: {Math.round(daily.temperature_2m_min[0])}°C
        </span>
      </div>
    </section>
  );
}

export default CurrentWeather;