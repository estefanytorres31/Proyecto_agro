import 'react-native-gesture-handler';
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from './screens/views/Scan/Scanner';
import QRScann from './screens/views/Scan/QRScann';
import QRInfo from './screens/views/Planta/InformePlantaQR';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen 
          name="Scanner" 
          component={Scanner}
        />
        <Stack.Screen 
          name="QRScann" 
          component={QRScann} 
          options={{ title: 'Escanear QR' }} 
        />
        <Stack.Screen name="QRInfo" 
        component={QRInfo} 
        options={{ title: 'Información QR' }} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

