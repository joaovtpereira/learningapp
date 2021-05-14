import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../Containers/Home';

const Stack = createStackNavigator();

const navOptionHandler = {
  headerShown: false,
};

function App() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={navOptionHandler}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default App;
