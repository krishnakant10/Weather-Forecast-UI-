
function TemperatureToggle({ unit, setUnit }) {
  return (
    <div className="temperature-toggle">
      <button
        className={unit === "C" ? "active" : ""}
        onClick={() => setUnit("C")}
      >
        °C
      </button>

      <button
        className={unit === "F" ? "active" : ""}
        onClick={() => setUnit("F")}
      >
        °F
      </button>
    </div>
  );
}

export default TemperatureToggle;