// src/components/NavBar.jsx
import React from "react";

export default function NavBar({ user, onLogout }) {
  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="text-2xl sm:text-3xl font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer">
          MERN Notes
        </div>

        {/* Navigation / User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 text-sm sm:text-base">
                Hello,&nbsp;<span className="font-semibold">{user.name}</span>
              </span>

              <button
                onClick={onLogout}
                aria-label="Logout"
                className="flex items-center px-5 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 hover:scale-105 transform transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/register"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transform transition font-medium"
              >
                Register
              </a>

              <a
                href="/"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 hover:scale-105 transform transition font-medium"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
