import { useState } from "react";
import {
  FaBars,
  FaHouseUser,
  FaIndustry,
  FaHeartbeat,
  FaCogs,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleMenuClick = (menuIndex) => {
    setOpenMenu(openMenu === menuIndex ? null : menuIndex);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpenMenu(null);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen text-white flex flex-col transition-all duration-300 ease-in-out shadow-lg bg-gradient-to-b from-gray-900 to-gray-800 ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-teal-950 to-teal-950 p-4 border-b border-green-600 shadow-md">
        <button className="text-2xl focus:outline-none" onClick={toggleSidebar}>
          <FaBars />
        </button>
        {isExpanded && <h1 className="text-lg font-semibold">Mi Panel</h1>}
      </div>

      {/* Menu */}
      <ul className="flex-grow overflow-y-auto">
        {/* Home */}
        <li className="border-b border-gray-700">
          <Link
            to="/inicio"
            className="flex items-center space-x-4 px-4 py-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-green-800 hover:to-teal-900 hover:text-gray-950"
          >
            <FaHouseUser className="text-2xl" />
            {isExpanded && <span className="text-md font-medium">Inicio</span>}
          </Link>
        </li>

        {/* Producción */}
        <li>
          <button
            onClick={() => handleMenuClick(1)}
            aria-expanded={openMenu === 1}
            className="w-full flex items-center justify-between px-4 py-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-green-800 hover:to-teal-900 hover:text-gray-950"
          >
            <div className="flex items-center space-x-4">
              <FaIndustry className="text-2xl" />
              {isExpanded && <span className="text-md font-medium">Producción</span>}
            </div>
            {isExpanded && (
              <FiChevronRight
                className={`transform transition-transform duration-300 ${
                  openMenu === 1 ? "rotate-90" : ""
                }`}
              />
            )}
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openMenu === 1 && isExpanded ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="bg-gray-700 rounded-md shadow-inner">
              <li className="hover:bg-green-500 transition-colors duration-200">
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="flex items-center space-x-4 w-full text-left px-8 py-2 text-sm font-medium"
                >
                  <FaCogs className="text-lg" />
                  <span>Scorpius 1</span>
                </button>
              </li>
              <li className="hover:bg-green-500 transition-colors duration-200">
                <button
                  onClick={() => handleNavigation("/Scorpius2")}
                  className="flex items-center space-x-4 w-full text-left px-8 py-2 text-sm font-medium"
                >
                  <FaCogs className="text-lg" />
                  <span>Scorpius 2</span>
                </button>
              </li>
            </ul>
          </div>
        </li>

        {/* Salud */}
        <li className="border-t border-gray-700">
          <Link
            to="/"
            className="flex items-center space-x-4 px-4 py-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-green-800 hover:to-teal-900 hover:text-gray-950"
          >
            <FaHeartbeat className="text-2xl" />
            {isExpanded && <span className="text-md font-medium">Salud</span>}
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className="p-4 bg-gray-900 border-t border-green-600 text-center">
        {isExpanded ? (
          <span className="text-sm">&copy; 2024 Mi Aplicación</span>
        ) : (
          <span className="text-sm">&copy;</span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
