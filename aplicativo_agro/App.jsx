import "react-native-gesture-handler";
import Navigation from "./Navigation.jsx";
import PlantaProvider from "./screens/context/Planta/PlantaProvider.jsx";
import CosechaProvider from "./screens/context/Cosecha/CosechaProvider.jsx";
import MantenimientoProvider from "./screens/context/Mantenimiento/MantenimientoProvider.jsx";

export default function App() {
  return (
    <CosechaProvider>
      <MantenimientoProvider>
          <PlantaProvider>
            <Navigation /> 
          </PlantaProvider>
      </MantenimientoProvider>
    </CosechaProvider>
  );
}
