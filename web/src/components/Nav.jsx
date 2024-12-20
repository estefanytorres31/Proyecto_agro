import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaHouseUser,
  FaIndustry,
  FaHeartbeat,
  FaCogs,
  FaThermometerHalf,
  FaTimes,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsExpanded(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsExpanded(false);
    setOpenMenu(null);
  };

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ path, icon: Icon, label }) => (
    <li>
      <Link
        to={path}
        className={`flex items-center space-x-3 px-4 py-3 transition ${
          isActive(path) ? "bg-teal-600 text-teal-300" : "hover:bg-teal-600/30 text-white"
        }`}
        onClick={() => setIsExpanded(false)}
      >
        <Icon className="text-xl" />
        {(isExpanded || isMobile) && <span className="text-sm">{label}</span>}
      </Link>
    </li>
  );

  const SubMenuItem = ({ path, label }) => (
    <li className="py-1">
      <button
        onClick={() => handleNavigation(path)}
        className={`w-full flex items-center space-x-2 px-4 py-2 ${
          isActive(path) 
            ? "text-teal-300 bg-teal-600/30" 
            : "text-gray-400 hover:text-white hover:bg-teal-600/20"
        }`}
      >
        <FaThermometerHalf />
        <span>{label}</span>
      </button>
    </li>
  );

  const MenuContent = () => (
    <ul className="flex-grow space-y-2">
      <NavItem path="/inicio" icon={FaHouseUser} label="Inicio" />
      
      <li>
        <button
          onClick={() => setOpenMenu(openMenu === 1 ? null : 1)}
          className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-teal-600/30"
        >
          <div className="flex items-center space-x-3">
            <FaIndustry className="text-xl" />
            {(isExpanded || isMobile) && <span className="text-sm">Producción</span>}
          </div>
          {(isExpanded || isMobile) && (
            <FiChevronRight className={`transform transition-transform duration-200 ${openMenu === 1 ? "rotate-90" : ""}`} />
          )}
        </button>

        {openMenu === 1 && (isExpanded || isMobile) && (
          <ul className={`space-y-2 ${isMobile ? "mt-2 ml-4" : "bg-gray-700/50 border-l-4 border-teal-600 ml-4 mr-2 mt-2"}`}>
            {["1", "2"].map((num) => (
              <li key={num} className="py-2">
                <button
                  onClick={() => handleNavigation(`/scorpius${num}`)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 ${
                    isActive(`/scorpius${num}`) ? "bg-teal-600/30 text-teal-300" : "text-white hover:bg-teal-600/20"
                  }`}
                >
                  <FaCogs />
                  <span>{`Scorpius ${num}`}</span>
                </button>
                <ul className={isMobile ? "ml-8 mt-2" : "pl-12 mt-1"}>
                  <SubMenuItem path={`/scorpius${num}/MapaCalor`} label="Mapa de calor" />
                </ul>
              </li>
            ))}
          </ul>
        )}
      </li>

      <NavItem path="/" icon={FaHeartbeat} label="Salud" />
    </ul>
  );

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-gray-900 flex items-center justify-between z-50 border-b border-teal-500">
          <span className="text-white font-semibold ml-4">Fundo Scorpius</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-2xl text-teal-400 hover:text-teal-300 mr-4"
          >
            {isExpanded ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile ? (
        <div 
          className={`fixed inset-0 bg-gray-800 z-40 transition-transform duration-300 ${
            isExpanded ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ top: '64px', height: 'calc(100vh - 64px)' }}
        >
          <div className="h-full overflow-y-auto pb-16">
            <MenuContent />
          </div>
        </div>
      ) : (
        /* Desktop Nav */
        <nav
          className={`hidden md:flex h-screen bg-gradient-to-b from-gray-800 to-gray-700 text-white flex-col shadow-xl transition-all duration-100 ${
            isExpanded ? "w-64" : "w-20"
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="flex items-center justify-between p-4 bg-gray-900 h-16 border-b border-teal-500">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full text-2xl text-teal-400 hover:text-teal-300"
            >
              <FaBars />
            </button>
          </div>
          
          <MenuContent />
          
          {isExpanded && (
            <div className="bg-gray-900 p-4 text-center text-xs text-gray-500">
              © 2024 Fundo Scorpius
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Nav;