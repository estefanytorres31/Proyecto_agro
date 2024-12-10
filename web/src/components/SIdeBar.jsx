import { useState } from "react";
import { FaBars, FaHouseUser, FaIndustry, FaHeartbeat, FaCogs } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menuIndex) => {
    setOpenMenu(openMenu === menuIndex ? null : menuIndex);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpenMenu(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col transition-all ${
          isExpanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-900 p-4 border-b border-green-500">
          <button className="text-xl focus:outline-none">
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul className="flex-grow mt-4 space-y-1 overflow-y-auto">
          {/* Home */}
          <li className="border-b border-gray-700">
            <Link
              to="/inicio"
              className="flex items-center space-x-2 px-4 py-3 hover:bg-green-500"
            >
              <FaHouseUser className="text-xl" />
              {isExpanded && <span className="text-sm">Inicio</span>}
            </Link>
          </li>

          {/* Producción */}
          <li>
            <button
              onClick={() => toggleMenu(1)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-500"
            >
              <div className="flex items-center space-x-2">
                <FaIndustry className="text-xl" />
                {isExpanded && <span className="text-sm">Producción</span>}
              </div>
              {isExpanded && (
                <FiChevronRight
                  className={`transform transition ${openMenu === 1 ? "rotate-90" : ""}`}
                />
              )}
            </button>
            {openMenu === 1 && isExpanded && (
              <ul className="pl-8 bg-gray-700">
                <li className="py-2 hover:bg-green-500">
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="flex items-center space-x-2 w-full text-left"
                  >
                    <FaCogs />
                    <span>Scorpius 1</span>
                  </button>
                </li>
                <li className="py-2 hover:bg-green-500">
                  <button className="flex items-center space-x-2 w-full text-left">
                    <FaCogs />
                    <span>Scorpius 2</span>
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Salud */}
          <li className="border-t border-gray-700">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-3 hover:bg-green-500"
            >
              <FaHeartbeat className="text-xl" />
              {isExpanded && <span className="text-sm">Salud</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
