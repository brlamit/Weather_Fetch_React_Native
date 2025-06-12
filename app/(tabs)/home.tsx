// import { View, Text, Button, ImageBackground } from 'react-native'
// import React from 'react'
// import './globals.css'
// import { Assets } from '@react-navigation/elements'


// const Index = () => {
//   return (
//      <ImageBackground
//       source={{uri:'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600'}} className='w-full h-full'>
    
//     <View className=''>
//       {/* <ImageBackground
//       source={{uri:'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600'}} className=''>*/}
//       <Text 
//       className="bg-blue-200 px-3 mt-8 w-1/2 text-gray-600">Index</Text>
//       {/* </ImageBackground> */}
//     </View>
//     </ImageBackground>
//   )
// }

// export default Index

import React from 'react';
import { View, StyleSheet } from 'react-native';
import useWeatherData from '@/service/weatherService'; // Adjust path accordingly
import WeatherDisplay from '../WeatherDisplay';

const App = () => {
  const { weather, loading, error, searchCity } = useWeatherData();

  return (
    <View style={styles.container}>
      <WeatherDisplay
        weather={weather}
        loading={loading}
        error={error}
        onSearchCity={searchCity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});

export default App;



