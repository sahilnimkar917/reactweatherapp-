import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "c01bfb7d6ded43149d86c66c8cd54afb";

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && getWeather()}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
