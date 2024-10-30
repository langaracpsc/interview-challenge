import React from "react";
import { Link, useLocation } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  console.log("isActive :", isActive);

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-200
           bg-blue-600 text-white shadow-md'
    
      }`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
