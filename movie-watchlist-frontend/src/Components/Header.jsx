import React from "react";
import { useLocation } from "react-router-dom";
import CustomLink from "./CustomNavLink";

const Header = () => {
  const location = useLocation(); // Get current path

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-3 lg:px-5">
        <div className="flex flex-col md:flex-row  space-y-2 items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">
              🎬 Movie Watchlist
            </h1>
          </div>
          <nav className="flex space-x-4">
            {/* Conditionally hide the Movie List if the current path is "/" */}
            {location.pathname !== "/" && (
              <CustomLink to="/">Movie List</CustomLink>
            )}
            {location.pathname !== "/add-movie" && (
              <CustomLink to="/add-movie">Add Movie to WishList</CustomLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
