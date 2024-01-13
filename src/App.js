// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('City not found. Please enter a valid city name.');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, unit]);

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {weatherData && (
        <div className="weather-details">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div>
            <strong>Current Temperature:</strong> {weatherData.main.temp}°
          </div>
          <div>
            <strong>Min Temperature:</strong> {weatherData.main.temp_min}°
          </div>
          <div>
            <strong>Max Temperature:</strong> {weatherData.main.temp_max}°
          </div>
          <div>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </div>
          <div>
            <strong>Wind:</strong> {weatherData.wind.speed} m/s, {weatherData.wind.deg}°
          </div>
          <div>
            <strong>Description:</strong> {weatherData.weather[0].description}
          </div>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      )}

      <div className="unit-toggle">
        <button onClick={handleUnitToggle} disabled={loading}>
          Toggle Unit ({unit === 'metric' ? 'Celsius' : 'Fahrenheit'})
        </button>
      </div>
    </div>
  );
};

export default App;
