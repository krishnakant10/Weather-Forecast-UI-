
# 🌤️ Weather Forecast Application

A responsive and user-friendly Weather Forecast Application built using React, JavaScript, CSS, and a Weather API.

This application allows users to search for a city and view current weather conditions, hourly forecasts, and a 7-day weather forecast.

---

## 📌 Project Overview

The Weather Forecast Application is a web-based project designed to provide weather information for selected locations.

Users can search for a city, view its current temperature and weather conditions, explore hourly and daily forecasts, and switch between Celsius and Fahrenheit.

The project focuses on API integration, reusable React components, responsive design, and a clean user experience.

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Display current temperature
- ☀️ Show current weather conditions
- 📍 Display selected location
- 💧 Show humidity information
- 💨 Display wind speed
- 🌧️ Display precipitation information
- 🕒 Hourly weather forecast
- 📅 7-day weather forecast
- 🌡️ Celsius and Fahrenheit temperature toggle
- 🕘 Recent searches UI
- ⏳ Loading state
- ⚠️ Error handling UI
- 📱 Responsive design
- 🎨 Modern weather dashboard interface

---

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- CSS3
- Open-Meteo Weather API
- Vite
- HTML5
- Git & GitHub

---

## 📂 Project Structure

```text
weather-app/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── WeatherDetails.jsx
│   │   ├── Forecast.jsx
│   │   ├── HourlyForecast.jsx
│   │   └── TemperatureToggle.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── index.html
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Navigate to the Project Folder

```bash
cd weather-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

---

## 🌐 API Integration

This project uses the Open-Meteo Weather API to retrieve weather information.

### API Used

- Open-Meteo Weather Forecast API
- Open-Meteo Geocoding API

### API Workflow

1. User enters a city name.
2. The application gets the location coordinates.
3. The weather API is called using latitude and longitude.
4. Weather data is received from the API.
5. React state is updated.
6. Weather information is displayed in the UI.

### Weather Data Displayed

- Current temperature
- Weather conditions
- Humidity
- Wind speed
- Precipitation
- Hourly forecast
- Daily forecast

---

## 🧩 React Components

### SearchBar

Handles city search input and search actions.

### CurrentWeather

Displays the current weather information, including temperature, location, and weather condition.

### WeatherDetails

Displays additional weather information such as humidity, wind speed, and precipitation.

### Forecast

Displays the 7-day weather forecast.

### HourlyForecast

Displays weather information for upcoming hours.

### TemperatureToggle

Allows users to switch between Celsius and Fahrenheit.

### App.jsx

Acts as the main component that combines the different sections of the application and manages the overall application flow.

---

## 🎨 Styling and Design

The application uses CSS3 to create a clean and responsive weather dashboard.

### CSS Features Used

- Flexbox
- CSS Grid
- CSS Gradients
- Responsive Design
- Media Queries
- Rounded Cards
- Buttons and Hover Effects
- Loading Spinner
- Error and Welcome Cards

### Responsive Breakpoints

- Desktop: Full dashboard layout
- Tablet: Adjusted grid columns
- Mobile: Stacked search form and responsive cards

---

## 👤 User Interaction

### How to Use the Application

1. Open the Weather Forecast Application.
2. Enter a city name in the search bar.
3. Click the Search button.
4. View the current weather information.
5. Check humidity, wind speed, and precipitation.
6. Explore the hourly forecast.
7. View the 7-day forecast.
8. Switch between Celsius and Fahrenheit.
9. Search for another city to view its weather.

---

## 📸 Screenshots

Add screenshots of your application here.

### Home Page

![Weather App Home Page](screenshots/home.png)

### Current Weather

![Current Weather](screenshots/current-weather.png)

### Forecast Section

![Weather Forecast](screenshots/forecast.png)

> Replace the screenshot paths with the actual images in your project.

---

## 📚 Learning Outcomes

Through this project, I learned:

- React component-based development
- React state management
- API integration
- Fetching data from external APIs
- Handling loading and error states
- JavaScript event handling
- CSS Flexbox and Grid
- Responsive web design
- Creating reusable components
- Git and GitHub workflow

---

## 🔮 Future Improvements

- Add current location detection
- Add weather icons based on conditions
- Add dark mode
- Add weather charts
- Add search suggestions
- Add more detailed weather information
- Improve accessibility
- Deploy the application online

---

## 👨‍💻 Author

**Krishnakant**


---

## 📄 License

This project is created for educational and learning purposes.

---

⭐ If you like this project, consider giving it a star on GitHub!
