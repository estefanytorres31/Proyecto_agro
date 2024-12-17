import { Routes, Route } from "react-router-dom";
import Scorpius1 from "./pages/Scorpius1";
import Scorpius2 from "./pages/Scorpius2";
import Inicio from "./pages/Inicio";
import Fundo1 from  "./pages/Fundo1";
import Fundo2 from "./pages/Fundo2";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/scorpius1" element={<Scorpius1 />} />
      <Route path="/scorpius2" element={<Scorpius2 />} />
      <Route path="/fundo1" element ={<Fundo1/>}/>
      <Route path="/fundo2" element={<Fundo2/>}/>
    </Routes>
  );
};

export default AppRoutes;