import React, { use, useEffect, useState, useRef } from 'react'
import './Weather.css';
import cloudyy from '../assets/cloudy.png';
import wind from '../assets/wind.png';
import humidity from '../assets/humidity.png';
const Weather = () => {

  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef(null);

  const allIcons = {
    '01d': cloudyy,
    '01n': wind,
    '02d': cloudyy,
    '02n': wind,
    '03d': cloudyy,
  }
  const search = async (city) => {
    if (city === '') {
      alert('Please enter a city name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok) {
        alert(data.message);
        setWeatherData(false);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || cloudyy;
      console.log(icon);
      
      // const icon = cloudyy;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        name: data.name,
        description: data.weather[0].description,
        temperature: (data.main.temp - 273.15).toFixed(2),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error('Error fetching weather data:', error);
    }
  }

  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Enter city name' />
        <button onClick={() => search(inputRef.current.value)}>Search</button>
      </div>
      {weatherData ? <>
        <img src={weatherData?.icon} alt='weather icon' className='weather-icon' />
        <h2 className='temperature'>{weatherData?.temperature}°C</h2>
        {/* <p className='description'>{weatherData?.description}</p> */}
        <p className='description'>{weatherData?.name}</p>

        <div className='weather-data'>
          <div className='data-item'>
            <img src={humidity} alt='humidity icon' className='weather-icon' />
            <h3>Humidity</h3>
            <p>{weatherData?.humidity}%</p>
          </div>
          <div className='data-item'>
            <img src={wind} alt='wind icon' className='weather-icon' />
            <h3>Wind Speed</h3>
            <p>{weatherData?.windSpeed} km/h</p>
          </div>
        </div></> : <></>}

    </div>
  )
}

export default Weather
