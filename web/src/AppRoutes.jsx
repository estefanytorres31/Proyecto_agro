import { Routes, Route } from "react-router-dom";
import Scorpius1 from "./pages/Scorpius1";
import Scorpius2 from "./pages/Scorpius2";
import MapaCalor1 from "./pages/MapaCalor1";
import MapaCalor2 from "./pages/MapaCalor2";
import Inicio from "./pages/Inicio";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/scorpius1" element={<Scorpius1 />} />
      <Route path="/scorpius2" element={<Scorpius2 />} />
      <Route path="/scorpius1/MapaCalor" element={<MapaCalor1 />} />
      <Route path="/scorpius2/MapaCalor" element={<MapaCalor2 />} />
    </Routes>
  );
};

export default AppRoutes;

