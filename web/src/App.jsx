import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;

