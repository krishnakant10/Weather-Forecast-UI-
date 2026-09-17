
import {
  getWeatherDescription,
  getWeatherIcon,
} from "../weatherUtils";

function HourlyForecast({ weather }) {
  const hourly = weather.hourly;
  const currentTime = weather.current.time;

  // Find the current hour in the hourly forecast
  let startIndex = hourly.time.findIndex(
    (time) => time === currentTime
  );

  // If the exact time is not found, use the first hour
  if (startIndex === -1) {
    startIndex = 0;
  }

  // Display the next 12 hours
  const hours = hourly.time.slice(startIndex, startIndex + 12);

  return (
    <section className="hourly-section">
      <h2 className="section-title">Hourly Forecast</h2>

      <div className="hourly-grid">
        {hours.map((time, index) => {
          const originalIndex = startIndex + index;
          const temperature =
            hourly.temperature_2m[originalIndex];

          const weatherCode =
            hourly.weather_code[originalIndex];

          const rainProbability =
            hourly.precipitation_probability[originalIndex];

          const hour = new Date(time).toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              hour12: true,
              timeZone: "UTC",
            }
          );

          return (
            <div className="hourly-card" key={time}>
              <p className="hourly-time">
                {index === 0 ? "Now" : hour}
              </p>

              <div className="hourly-icon">
                {getWeatherIcon(weatherCode)}
              </div>

              <h3>{Math.round(temperature)}°</h3>

              <p className="hourly-condition">
                {getWeatherDescription(weatherCode)}
              </p>

              <p className="hourly-rain">
                💧 {rainProbability}%
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;