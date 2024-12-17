import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  HomeIcon,
  BuildingOffice2Icon,
  HeartIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

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
      className={`h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 p-4 border-b border-green-500">
        <button className="text-xl focus:outline-none" onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Menu */}
      <ul className="flex-grow mt-4 space-y-1">
        {/* Fundo */}
        <li>
          <button
            onClick={() => handleMenuClick(0)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-500 hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center space-x-2">
              <HomeIcon className="h-6 w-6" />
              {isExpanded && <span className="text-sm">Fundo</span>}
            </div>
            {isExpanded && (
              <ChevronRightIcon
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  openMenu === 0 ? "rotate-90" : ""
                }`}
              />
            )}
          </button>
          {openMenu === 0 && isExpanded && (
            <ul className="pl-8 bg-gray-700">
              <li className="py-2 hover:bg-green-500 hover:shadow-md transition-all duration-200 ease-in-out">
                <button
                  onClick={() => handleNavigation("/fundo1")}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <BuildingLibraryIcon className="h-5 w-5" />
                  <span>Fundo 1</span>
                </button>
              </li>
              <li className="py-2 hover:bg-green-500 hover:shadow-md transition-all duration-200 ease-in-out">
                <button
                  onClick={() => handleNavigation("/fundo2")}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <BuildingLibraryIcon className="h-5 w-5" />
                  <span>Fundo 2</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Producción */}
        <li>
          <button
            onClick={() => handleMenuClick(1)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-500 hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center space-x-2">
              <BuildingOffice2Icon className="h-6 w-6" />
              {isExpanded && <span className="text-sm">Producción</span>}
            </div>
            {isExpanded && (
              <ChevronRightIcon
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  openMenu === 1 ? "rotate-90" : ""
                }`}
              />
            )}
          </button>
          {openMenu === 1 && isExpanded && (
            <ul className="pl-8 bg-gray-700">
              <li className="py-2 hover:bg-green-500 hover:shadow-md transition-all duration-200 ease-in-out">
                <button
                  onClick={() => handleNavigation("/scorpius1")}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  <span>Scorpius 1</span>
                </button>
              </li>
              <li className="py-2 hover:bg-green-500 hover:shadow-md transition-all duration-200 ease-in-out">
                <button
                  onClick={() => handleNavigation("/scorpius2")}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <Cog6ToothIcon className="h-5 w-5" />
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
            className="flex items-center space-x-2 px-4 py-3 hover:bg-green-500 hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            <HeartIcon className="h-6 w-6" />
            {isExpanded && <span className="text-sm">Salud</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
