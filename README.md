# Weather_forecastMobile

# Weather Forecast App

A simple and clean weather forecast mobile app built using **React Native (Expo)** and the **OpenWeatherMap API**. Users can search for any city to see real-time weather data including temperature, conditions, humidity, and more. Last searched city is stored and reloaded automatically.

---

## Features

- Search for any city’s current weather
- Displays:
  - City name
  - Current temperature
  - Weather condition and icon
  - Wind speed, humidity, pressure, and visibility
- Saves last searched city using `AsyncStorage`
- Pull-to-refresh to reload the last searched city
- Loading and error states with user-friendly messages
- Clean UI using **Tailwind CSS for React Native** and `expo-linear-gradient`

---

## Tech Stack

- [React Native (Expo)](https://expo.dev/)
- [OpenWeatherMap API](https://openweathermap.org/)
- [Axios](https://axios-http.com/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Tailwind CSS](https://github.com/jaredh159/tailwind-react-native-classnames)
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
