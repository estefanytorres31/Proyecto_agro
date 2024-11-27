import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './screens/views/Scan/Scanner';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scan">
        <Stack.Screen 
          name="Scan" 
          component={Scanner} 
          options={{ title: 'Escanear QR' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

