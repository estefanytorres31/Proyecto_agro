import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/SIdebar";
import AppRoutes from "./AppRoutes";
import CosechaProvider from "./context/Cosecha/CosechaProvider";

function App() {
  return (
    <Router>
      <CosechaProvider>
        <div className="flex h-screen">
          {/* Sidebar ocupa una parte fija o proporcional del ancho */}
          <Sidebar />
          {/* Contenedor principal del dashboard */}
          <main className="flex-1 transition-all duration-100 overflow-auto">
            <AppRoutes />
          </main>
        </div>
      </CosechaProvider>
    </Router>
  );
}

export default App;
