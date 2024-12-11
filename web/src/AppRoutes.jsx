import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Inicio";
import Scorpius2 from "./components/Scorpius2";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Scorpius2" element={<Scorpius2 />}/>
    </Routes>
  );
};

export default AppRoutes;

