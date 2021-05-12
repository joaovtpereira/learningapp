import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../Containers/SignIn';

const Stack = createStackNavigator();

const navOptionHandler = {
  headerShown: false,
};

function App() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={navOptionHandler}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default App;
