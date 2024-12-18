import React, { useState } from "react";
import { 
  FaBars, 
  FaHouseUser, 
  FaIndustry, 
  FaHeartbeat, 
  FaCogs, 
  FaThermometerHalf, 
  FaChartArea 
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleMenuClick = (menuIndex) => {
    setOpenMenu(openMenu === menuIndex ? null : menuIndex);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsExpanded(false);
    setOpenMenu(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`
        h-screen 
        bg-gradient-to-b from-gray-900 to-gray-800 
        text-white 
        flex 
        flex-col 
        shadow-2xl 
        transition-all 
        duration-300 
        ease-in-out 
        ${isExpanded ? "w-64" : "w-20"}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 p-4 border-b border-green-600">
        <button 
          className="text-2xl text-green-400 hover:text-green-300 focus:outline-none transition " 
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <ul className="flex-grow mt-4 space-y-1 overflow-hidden">
        {/* Home */}
        <li>
          <Link
            to="/inicio"
            className={`
              flex 
              items-center 
              space-x-3 
              px-4 
              py-3 
              transition 
              group
              ${isActive("/inicio") 
                ? "bg-green-600/30 text-green-300" 
                : "hover:bg-green-600/30"}
            `}
          >
            <FaHouseUser className={`
              text-xl 
              ${isActive("/inicio") ? "text-green-300" : "text-green-400 group-hover:text-green-300"}
            `} />
            {isExpanded && (
              <span className={`
                text-sm 
                ${isActive("/inicio") ? "text-white" : "text-gray-300 group-hover:text-white"}
              `}>
                Inicio
              </span>
            )}
          </Link>
        </li>

        {/* Producción */}
        <li>
          <button
            onClick={() => handleMenuClick(1)}
            className="
              w-full 
              flex 
              items-center 
              justify-between 
              px-4 
              py-3 
              hover:bg-green-600/30 
              transition 
              group
            "
          >
            <div className="flex items-center space-x-3">
              <FaIndustry className="text-xl text-green-400 group-hover:text-green-300" />
              {isExpanded && (
                <span className="text-sm text-gray-300 group-hover:text-white">
                  Producción
                </span>
              )}
            </div>
            {isExpanded && (
              <FiChevronRight
                className={`
                  text-gray-400 
                  transform 
                  transition 
                  duration-200 
                  ${openMenu === 1 ? "rotate-90 text-green-400" : ""}
                `}
              />
            )}
          </button>

          {openMenu === 1 && isExpanded && (
            <ul className="bg-gray-800/50 border-l-4 border-green-600 ml-4 mr-2">
              {/* Scorpius 1 */}
              <li className="py-2 hover:bg-green-600/20 rounded">
                <button
                  onClick={() => handleNavigation('/scorpius1')}
                  className={`
                    flex 
                    items-center 
                    space-x-3 
                    w-full 
                    text-left 
                    px-4 
                    py-2 
                    group
                    ${isActive("/scorpius1") 
                      ? "bg-green-600/30 text-green-300" 
                      : ""}
                  `}
                >
                  <FaCogs className={`
                    text-green-400 
                    group-hover:text-green-300
                    ${isActive("/scorpius1") ? "text-green-300" : ""}
                  `} />
                  <span className={`
                    text-gray-300 
                    group-hover:text-white
                    ${isActive("/scorpius1") ? "text-white" : ""}
                  `}>
                    Scorpius 1
                  </span>
                </button>
                {/* Submenú: Mapa de calor */}
                <ul className="pl-12">
                  <li className="py-1 hover:bg-green-600/20 rounded">
                    <button
                      onClick={() => handleNavigation('/scorpius1/MapaCalor')}
                      className={`
                        w-full 
                        flex 
                        items-center 
                        space-x-2
                        text-left 
                        text-sm 
                        px-4 
                        py-2 
                        group
                        ${isActive("/scorpius1/MapaCalor") 
                          ? "text-white bg-green-600/30" 
                          : "text-gray-400 hover:text-white"}
                      `}
                    >
                      <FaThermometerHalf className={`
                        ${isActive("/scorpius1/MapaCalor") 
                          ? "text-green-300" 
                          : "text-green-400 group-hover:text-green-300"}
                      `} />
                      <span>Mapa de calor</span>
                    </button>
                  </li>
                </ul>
              </li>

              {/* Scorpius 2 */}
              <li className="py-2 hover:bg-green-600/20 rounded">
                <button
                  onClick={() => handleNavigation('/scorpius2')}
                  className={`
                    flex 
                    items-center 
                    space-x-3 
                    w-full 
                    text-left 
                    px-4 
                    py-2 
                    group
                    ${isActive("/scorpius2") 
                      ? "bg-green-600/30 text-green-300" 
                      : ""}
                  `}
                >
                  <FaCogs className={`
                    text-green-400 
                    group-hover:text-green-300
                    ${isActive("/scorpius2") ? "text-green-300" : ""}
                  `} />
                  <span className={`
                    text-gray-300 
                    group-hover:text-white
                    ${isActive("/scorpius2") ? "text-white" : ""}
                  `}>
                    Scorpius 2
                  </span>
                </button>
                {/* Submenú: Mapa de calor */}
                <ul className="pl-12">
                  <li className="py-1 hover:bg-green-600/20 rounded">
                    <button
                      onClick={() => handleNavigation('/scorpius2/MapaCalor')}
                      className={`
                        w-full 
                        flex 
                        items-center 
                        space-x-2
                        text-left 
                        text-sm 
                        px-4 
                        py-2 
                        group
                        ${isActive("/scorpius2/MapaCalor") 
                          ? "text-white bg-green-600/30" 
                          : "text-gray-400 hover:text-white"}
                      `}
                    >
                      <FaThermometerHalf className={`
                        ${isActive("/scorpius2/MapaCalor") 
                          ? "text-green-300" 
                          : "text-green-400 group-hover:text-green-300"}
                      `} />
                      <span>Mapa de calor</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </li>

        {/* Salud */}
        <li>
          <Link
            to="/"
            className={`
              flex 
              items-center 
              space-x-3 
              px-4 
              py-3 
              transition 
              group
              ${isActive("/") 
                ? "bg-green-600/30 text-green-300" 
                : "hover:bg-green-600/30"}
            `}
          >
            <FaHeartbeat className={`
              text-xl 
              ${isActive("/") ? "text-green-300" : "text-green-400 group-hover:text-green-300"}
            `} />
            {isExpanded && (
              <span className={`
                text-sm 
                ${isActive("/") ? "text-white" : "text-gray-300 group-hover:text-white"}
              `}>
                Salud
              </span>
            )}
          </Link>
        </li>
      </ul>

      {/* Footer */}
      {isExpanded && (
        <div className="bg-gray-900 p-4 text-center text-xs text-gray-500">
          © 2024 Scorpius System
        </div>
      )}
    </nav>
  );
};

export default Nav;