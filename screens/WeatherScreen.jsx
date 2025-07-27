import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const WeatherScreen = ({ route }) => {
  const { city } = route.params;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const apiKey = '3343f329d29aa100223cda3cc8f2b8c6';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: { q: city, appid: apiKey, units: 'metric' },
        });
        setWeather(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="white" />
        <Text style={tw`mt-4 text-white text-lg`}>Fetching weather data...</Text>
      </LinearGradient>
    );
  }

  if (error || !weather) {
    return (
      <LinearGradient colors={['#ff758c', '#ff7eb3']} style={tw`flex-1 justify-center items-center p-6`}>
        <Feather name="cloud-off" size={48} color="white" />
        <Text style={tw`text-white text-xl font-bold mt-4 text-center`}>
          Could not fetch weather for "{city}"
        </Text>
        <Text style={tw`text-white mt-2 text-center`}>
          Please check the city name and try again
        </Text>
      </LinearGradient>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const getBackgroundColors = () => {
    const weatherMain = weather.weather[0].main.toLowerCase();
    if (weatherMain.includes('rain')) return ['#4da0b0', '#d39d38'];
    if (weatherMain.includes('cloud')) return ['#757F9A', '#D7DDE8'];
    if (weatherMain.includes('sun') || weatherMain.includes('clear')) return ['#FFB75E', '#ED8F03'];
    return ['#4c669f', '#3b5998'];
  };

  return (
    <LinearGradient 
      colors={getBackgroundColors()} 
      style={tw`flex-1`}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center p-6`}>
        <View style={tw`items-center mb-6`}>
          <Text style={tw`text-white text-2xl font-bold`}>{weather.name}</Text>
          <Text style={tw`text-white opacity-80`}>{currentDate}</Text>
        </View>

        <View style={tw`items-center mb-8`}>
          <Image 
            source={{ uri: iconUrl }} 
            style={{ width: 150, height: 150 }} 
            resizeMode="contain"
          />
          <Text style={tw`text-white text-5xl font-bold mt-2`}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={tw`text-white text-xl capitalize mt-1`}>{weather.weather[0].description}</Text>
          <Text style={tw`text-white mt-1`}>
            H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
          </Text>
        </View>

        <View style={tw`bg-white bg-opacity-20 rounded-2xl p-5 w-full max-w-md`}>
          <View style={tw`flex-row justify-between mb-4`}>
            <WeatherDetail icon="droplet" value={`${weather.main.humidity}%`} label="Humidity" />
            <WeatherDetail icon="wind" value={`${weather.wind.speed} m/s`} label="Wind" />
          </View>
          <View style={tw`flex-row justify-between`}>
            <WeatherDetail icon="eye" value={`${weather.visibility/1000} km`} label="Visibility" />
            <WeatherDetail icon="barometer" value={`${weather.main.pressure} hPa`} label="Pressure" />
          </View>
        </View>

        <View style={tw`mt-8 bg-white bg-opacity-20 rounded-full px-4 py-2`}>
          <Text style={tw`text-white`}>Last updated: {new Date().toLocaleTimeString()}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const WeatherDetail = ({ icon, value, label }) => (
  <View style={tw`items-center`}>
    <Feather name={icon} size={24} color="white" />
    <Text style={tw`text-white text-xl font-bold mt-1`}>{value}</Text>
    <Text style={tw`text-white opacity-80 text-sm`}>{label}</Text>
  </View>
);

export default WeatherScreen;