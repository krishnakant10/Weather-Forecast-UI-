
function WeatherDetails({ weather }) {
  const current = weather.current;

  const details = [
    {
      icon: "💧",
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
    },
    {
      icon: "💨",
      label: "Wind Speed",
      value: `${current.wind_speed_10m} km/h`,
    },
    {
      icon: "🌧️",
      label: "Precipitation",
      value: `${current.precipitation} mm`,
    },
    {
      icon: "🌡️",
      label: "Feels Like",
      value: `${Math.round(current.apparent_temperature)}°C`,
    },
  ];

  return (
    <section className="details-section">
      <h2 className="section-title">Weather Details</h2>

      <div className="details-grid">
        {details.map((detail) => (
          <div className="detail-card" key={detail.label}>
            <div className="detail-icon">{detail.icon}</div>
            <div>
              <p className="detail-label">{detail.label}</p>
              <h3>{detail.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeatherDetails;