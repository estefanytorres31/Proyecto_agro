import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Inicio";
import ClockTime from "./components/ClockTime";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ClockTime" element={<ClockTime/>}/>
    </Routes>
  );
};

export default AppRoutes;

