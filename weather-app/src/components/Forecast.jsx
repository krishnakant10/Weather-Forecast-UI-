
import {
  getWeatherDescription,
  getWeatherIcon,
} from "../weatherUtils";

function Forecast({ weather }) {
  const daily = weather.daily;

  return (
    <section className="forecast-section">
      <h2 className="section-title">7-Day Forecast</h2>

      <div className="forecast-grid">
        {daily.time.map((date, index) => {
          const weatherCode = daily.weather_code[index];

          const dayName = new Date(date).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            }
          );

          return (
            <div className="forecast-card" key={date}>
              <p className="forecast-date">
                {index === 0 ? "Today" : dayName}
              </p>

              <div className="forecast-icon">
                {getWeatherIcon(weatherCode)}
              </div>

              <p className="forecast-condition">
                {getWeatherDescription(weatherCode)}
              </p>

              <div className="forecast-temperature">
                <strong>
                  {Math.round(daily.temperature_2m_max[index])}°
                </strong>

                <span>
                  {Math.round(daily.temperature_2m_min[index])}°
                </span>
              </div>

              <p className="forecast-rain">
                🌧️ {daily.precipitation_sum[index]} mm
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;