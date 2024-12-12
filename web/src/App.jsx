// App.js
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/SIdebar";
import AppRoutes from "./AppRoutes";
import CosechaProvider from "./context/Cosecha/CosechaProvider"; // Importa el CosechaProvider

function App() {
  return (
    <Router>
      <CosechaProvider> {/* Envuelve tu aplicación con el provider */}
        <div className="flex">
          <Sidebar />
          <main className="flex-1 transition-all duration-300 ml-20 md:ml-64 p-4 overflow-auto h-screen">
            <AppRoutes />
          </main>
        </div>
      </CosechaProvider>
    </Router>
  );
}

export default App;
