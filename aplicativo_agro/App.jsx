import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './screens/views/Scan/Scanner';
import QRScann from './screens/views/Scan/QRScann';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scan">
        <Stack.Screen 
          name="Scan" 
          component={Scanner}
        />
        <Stack.Screen 
          name="QRScann" 
          component={QRScann} 
          options={{ title: 'Escanear QR' }} 
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

