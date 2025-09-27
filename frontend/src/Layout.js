import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow mb-6">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6">
          <Link to="/notifications" className="text-blue-600 font-medium hover:underline">
          Notifications
          </Link>
          <Link to="/tools" className="text-blue-600 font-medium hover:underline">Trending Tools</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}