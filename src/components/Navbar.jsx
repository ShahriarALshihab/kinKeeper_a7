/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart2 } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/timeline", label: "Timeline", icon: Clock },
    { to: "/stats", label: "Stats", icon: BarChart2 },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
         
          <NavLink to="/" className="font-bold text-gray-900 text-lg tracking-tight">
            KeenKeeper
          </NavLink>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;