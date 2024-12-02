import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from './screens/views/Scan/Scanner';
import QRScann from './screens/views/Scan/QRScann';
import QRInfo from './screens/views/Planta/InformePlantaQR';
import Menu from './screens/views/Planta/Menu';
import Mantenimiento from './screens/views/Planta/InformeMantenimiento';

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
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ title: 'Menú' }} 
        />
        <Stack.Screen 
          name="QRInfo" 
          component={QRInfo} 
          options={{ title: 'Producción' }} 
        />
        <Stack.Screen 
          name="Mantenimiento" 
          component={Mantenimiento} 
          options={{ title: 'Mantenimiento' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
