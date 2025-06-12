import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

const getWeatherEmoji = (main) => {
  switch (main.toLowerCase()) {
    case 'clear': return '☀️';
    case 'clouds': return '☁️';
    case 'rain': return '🌧️';
    case 'drizzle': return '🌦️';
    case 'thunderstorm': return '⛈️';
    case 'snow': return '❄️';
    case 'mist':
    case 'fog':
    case 'haze': return '🌫️';
    default: return '🌡️';
  }
};

const isDayTime = (icon) => icon && icon.includes('d');

const WeatherDisplay = ({ weather, loading, error }) => {
  const [sortKey, setSortKey] = useState('temp');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchCity, setSearchCity] = useState('');
  const [filteredWeather, setFilteredWeather] = useState(weather);

  useEffect(() => {
    if (!searchCity.trim()) {
      setFilteredWeather(weather);
    } else {
      const filtered = weather.filter(w =>
        w.name.toLowerCase().includes(searchCity.toLowerCase())
      );
      setFilteredWeather(filtered);
    }
  }, [searchCity, weather]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const sortedWeather = [...filteredWeather].sort((a, b) => {
    let aValue, bValue;
    switch (sortKey) {
      case 'temp': aValue = a.main.temp; bValue = b.main.temp; break;
      case 'humidity': aValue = a.main.humidity; bValue = b.main.humidity; break;
      case 'wind': aValue = a.wind.speed; bValue = b.wind.speed; break;
      default: aValue = a.main.temp; bValue = b.main.temp;
    }
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const toggleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Weather App</Text>

        <TextInput
          placeholder="🔍 Search by city name..."
          placeholderTextColor="#ddd"
          style={styles.searchInput}
          value={searchCity}
          onChangeText={setSearchCity}
        />

        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[styles.sortButton, sortKey === 'temp' && styles.activeSortButton]}
            onPress={() => setSortKey('temp')}
          >
            <Text style={styles.sortButtonText}>Temp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortKey === 'humidity' && styles.activeSortButton]}
            onPress={() => setSortKey('humidity')}
          >
            <Text style={styles.sortButtonText}>Humidity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortKey === 'wind' && styles.activeSortButton]}
            onPress={() => setSortKey('wind')}
          >
            <Text style={styles.sortButtonText}>Wind</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOrderButton} onPress={toggleSortOrder}>
            <Text style={styles.sortButtonText}>{sortOrder === 'asc' ? '↑' : '↓'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {sortedWeather.map((cityWeather, index) => (
            <View key={index} style={styles.weatherCard}>
              <Text style={styles.cityText}>
                {getWeatherEmoji(cityWeather.weather[0].main)} {cityWeather.name}
              </Text>

              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png` }}
                style={{ width: 60, height: 60 }}
              />

              <Text style={styles.tempText}>{Math.round(cityWeather.main.temp)}°C</Text>

              <Text style={styles.descriptionText}>
                {cityWeather.weather[0].description.charAt(0).toUpperCase() +
                  cityWeather.weather[0].description.slice(1)}
              </Text>

              <Text style={styles.dayNightText}>
                {isDayTime(cityWeather.weather[0].icon) ? '☀️ Daytime' : '🌙 Nighttime'}
              </Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailValue}>{cityWeather.main.humidity}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Wind</Text>
                  <Text style={styles.detailValue}>{cityWeather.wind.speed} m/s</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 12,
    color: '#1e3a8a',
    marginBottom: 20,
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  sortButton: {
    backgroundColor: 'rgba(222, 255, 234, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    margin: 5,
  },
  activeSortButton: {
    backgroundColor: '#1e7a8a',
  },
  sortOrderButton: {
    backgroundColor: '#facc15',
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  sortButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    width: '100%',
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  cityText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
    textAlign: 'center',
  },
  tempText: {
    fontSize: 54,
    fontWeight: '300',
    color: '#dc2626',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: '#475569',
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  dayNightText: {
    fontSize: 16,
    color: '#facc15',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default WeatherDisplay;
