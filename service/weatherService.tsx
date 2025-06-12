import axios from 'axios';
import { useEffect, useState } from 'react';


const API_KEY = '47a51855f75c952472a916bddfa4fc42'; // Replace with a valid API key
const CITIES = [
    // Nepal cities
    "Kathmandu", "Pokhara", "Biratnagar", "Lalitpur", "Bharatpur",
    "Dhangadhi", "Bhairahawa", "Butwal", "Hetauda", "Nepalgunj",
    "Damak", "Besisahar", "Birgunj", "Bhaktapur", "Dharan",
    "Itahari", "Janakpur", "Ghorahi", "Tikapur", "Tulsipur",
    // International cities
    "Tokyo", "Delhi", "New York", "London", "Paris",
    "Los Angeles", "Beijing", "Shanghai", "Hong Kong", "Singapore",
    "Mumbai", "Bangalore", "Sydney", "Melbourne", "Berlin",
    "Madrid", "Rome", "Toronto", "Vancouver", "Chicago",
    "Boston", "Seattle", "Mexico City", "Sao Paulo", "Rio de Janeiro",
    "Istanbul", "Moscow", "Dubai", "Bangkok", "Seoul",
    "Cairo", "Lima",
    // Additional cities
    "Oslo", "Stockholm", "Copenhagen", "Helsinki", "Zurich",
    "Vienna", "Budapest", "Prague", "Warsaw", "Dublin",
    "Lisbon", "Athens", "Brussels", "Munich", "Frankfurt",
    "Hamburg", "Amsterdam", "Rotterdam", "Kuala Lumpur",
    "Manila", "Jakarta", "Taipei", "San Francisco", "Wellington"
];

const useWeatherData = () => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const requests = CITIES.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      );

      const responses = await Promise.allSettled(requests);

      const data = responses
        .filter(r => r.status === 'fulfilled')
        .map(r => {
          const d = r.value.data;
          return {
            name: d.name,
            country: d.sys.country,
            main: d.main,
            weather: d.weather,
            wind: d.wind,
          };
        });

      setWeather(data);
    } catch (err) {
      console.error('Weather API error:', err?.response?.data || err.message);
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { weather, loading, error, refetch: fetchWeather };
};

export default useWeatherData;
