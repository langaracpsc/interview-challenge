import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Movie Watchlist. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
