import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav";
import AppRoutes from "./AppRoutes";
import CosechaProvider from "./context/Cosecha/CosechaProvider";

function App() {
  return (
    <Router>
      <CosechaProvider>
        <div className="flex h-screen">
          {/* Sidebar ocupa una parte fija o proporcional del ancho */}
          <Nav />
          <main className="flex-1 transition-all duration-0 ml-0 md:ml-0 p-4 overflow-auto h-screen">
            <AppRoutes />
          </main>
        </div>
      </CosechaProvider>
    </Router>
  );
}

export default App;
