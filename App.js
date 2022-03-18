/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './src/components/home/HomeStack';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

const App = () => {
    return (
      <Provider store={Store}>
        <NavigationContainer>
        <HomeStack/>

        </NavigationContainer>
      </Provider>
  );
};


export default App;
