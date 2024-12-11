// App.js
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/SIdeBar";
import AppRoutes from "./AppRoutes";
import CosechaProvider from "./context/Cosecha/CosechaProvider"; // Importa el CosechaProvider

function App() {
  return (
    <Router>
      <CosechaProvider> {/* Envuelve tu aplicación con el provider */}
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <AppRoutes />
          </main>
        </div>
      </CosechaProvider>
    </Router>
  );
}

export default App;