import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/weather?city=${city}`
      );
      console.log(response)
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError('City not found');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Search</button>
      {error && <p className="error">{error}</p>}
      {weather && ( 
        <div className="weather-result">
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Weather: {weather.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;
