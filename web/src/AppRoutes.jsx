import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Inicio";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;

