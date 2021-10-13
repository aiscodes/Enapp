import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Home from './src';
import { useFonts } from 'expo-font';

function App() {

  let [fontsLoaded] = useFonts({
    'Gilroy-Regular' : require('./assets/fonts/Gilroy-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;