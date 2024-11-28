import "react-native-gesture-handler";
import Navigation from "./Navigation.jsx";
import PlantaProvider from "./screens/context/Planta/PlantaProvider.jsx";

export default function App() {
  return (
    <PlantaProvider>
      <NavigationContainer>
      </NavigationContainer>
    </PlantaProvider>
  );
}

