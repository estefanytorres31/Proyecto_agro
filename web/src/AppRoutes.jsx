import { Routes, Route } from "react-router-dom";
import Scorpius1 from "./pages/Scorpius1";
import Scorpius2 from "./pages/Scorpius2";
import Inicio from "./pages/Inicio";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/scorpius1" element={<Scorpius1 />} />
      <Route path="/scorpius2" element={<Scorpius2 />} />
    </Routes>
  );
};

export default AppRoutes;