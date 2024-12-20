import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav";
import AppRoutes from "./AppRoutes";
import CosechaProvider from "./context/Cosecha/CosechaProvider";

function App() {
  return (
    <Router>
      <CosechaProvider>
      <div className="flex h-screen overflow-hidden">
          <Nav />
          <main className="flex-1 overflow-y-auto md:h-screen h-[calc(100vh-4rem)] mt-16 md:mt-0">
            <AppRoutes />
          </main>
        </div>
      </CosechaProvider>
    </Router>
  );
}

export default App;
