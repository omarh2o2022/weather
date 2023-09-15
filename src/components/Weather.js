import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  
  
  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  console.log("API_KEY:", API_KEY);


  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, [city, API_KEY]); 

  const convertKelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };

  return (
    <div className="weather-app">
      <h1>my Weather App</h1>
      <div>
        <label htmlFor="city">Enter City:</label>
        <input
          type="text"
          id="city"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {weatherData.main && (
            <div className="weather-info">
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <p>Temperature: {convertKelvinToFahrenheit(weatherData.main.temp).toFixed(2)}°F</p>
              <p>Chance of Rain: {weatherData.clouds.all}%</p>
            </div>
          )}
          {weatherData.message && (
            <p className="error-message">Error: {weatherData.message}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
