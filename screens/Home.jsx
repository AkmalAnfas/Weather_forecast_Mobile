import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';
import { MagnifyingGlassIcon, MapPinIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [lastCity, setLastCity] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLastCity();
  }, []);

  const loadLastCity = async () => {
    try {
      const saved = await AsyncStorage.getItem('lastCity');
      if (saved) {
        setCity(saved);
        setLastCity(saved);
      }
    } catch (e) {
      console.error("Failed to load last city", e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLastCity();
    setRefreshing(false);
  };

  const handleSearch = async () => {
    if (city.trim()) {
      await AsyncStorage.setItem('lastCity', city);
      Keyboard.dismiss();
      navigation.navigate('Weather', { city });
    }
  };

  const clearLastSearch = async () => {
    await AsyncStorage.removeItem('lastCity');
    setLastCity('');
    setCity('');
  };

  return (
    <View style={tw`flex-1`}>
      <LinearGradient
        colors={['rgba(8, 28, 63, 0.85)', 'rgba(3, 12, 28, 0.95)']}
        style={tw`absolute top-0 left-0 right-0 bottom-0`}
      />

      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={['#fff']}
          />
        }
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`flex-1 justify-center p-6`}>
          <View style={tw`items-center mb-10`}>
            <Text style={tw`text-4xl text-center font-bold text-white mb-2`}>Weather Forecast</Text>
            <Text style={tw`text-lg text-center text-blue-200`}>Discover weather around the world</Text>
          </View>

          <View style={tw`relative mb-4`}>
            <TextInput
              placeholder="Search for a city..."
              placeholderTextColor="#94a3b8"
              value={city}
              onChangeText={setCity}
              onSubmitEditing={handleSearch}
              style={[
                tw`border-0 rounded-2xl bg-white text-gray-800 text-lg shadow-xl`,
                { 
                  height: 52,
                  paddingLeft: 48,
                  paddingRight: 48,
                  paddingTop: 2,
                  paddingBottom: 0,
                  textAlignVertical: 'center',
                  includeFontPadding: false,
                  lineHeight: 20
                }
              ]}
              returnKeyType="search"
            />
            <MapPinIcon 
              size={25} 
              color="#64748b" 
              style={tw`absolute left-4 top-3.5`} 
            />
            {city ? (
              <TouchableOpacity 
                onPress={() => setCity('')} 
                style={tw`absolute right-12 top-3.5`}
              >
                <XMarkIcon size={24} color="#64748b" />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity 
              onPress={handleSearch} 
              style={tw`absolute right-2 top-2 bg-blue-600 p-2 rounded-xl`}
            >
              <MagnifyingGlassIcon size={20} color="white" />
            </TouchableOpacity>
          </View>

          {lastCity ? (
            <View style={tw`flex-row items-center justify-between mb-6`}>
              <Text style={tw`text-blue-200 text-base`}>
                Last searched: <Text style={tw`font-semibold text-white`}>{lastCity}</Text>
              </Text>
              <TouchableOpacity 
                onPress={clearLastSearch} 
                style={tw`bg-red-500/20 px-3 py-1 rounded-full`}
              >
                <Text style={tw`text-red-100 text-sm`}>Clear</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <TouchableOpacity 
            onPress={handleSearch}
            activeOpacity={0.8}
            style={tw`rounded-2xl mb-4 overflow-hidden`}
          >
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              style={tw`py-4 px-6`}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>Get Weather</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={tw`items-center mt-8`}>
            <Text style={tw`text-blue-200 text-sm`}>Try searching for:</Text>
            <View style={tw`flex-row mt-2`}>
              <TouchableOpacity 
                onPress={() => setCity('London')}
                style={tw`bg-white/10 px-3 py-1 rounded-full mx-1`}
              >
                <Text style={tw`text-blue-100`}>London</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setCity('New York')}
                style={tw`bg-white/10 px-3 py-1 rounded-full mx-1`}
              >
                <Text style={tw`text-blue-100`}>New York</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setCity('Tokyo')}
                style={tw`bg-white/10 px-3 py-1 rounded-full mx-1`}
              >
                <Text style={tw`text-blue-100`}>Tokyo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;