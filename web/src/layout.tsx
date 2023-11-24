import React from "react";
import { Link, Outlet, Route } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="container border-b flex items-center gap-2 space-x-4 lg:space-x-6 p-4">
        <img width={100} src="../public/siemens-logo.png" alt="Logo" />
        <div className="flex gap-4">
          <nav className="flex gap-4">
            <Link
              to="/zalupa"
              className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/zalupa"
              className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"
            >
              Appointments
            </Link>
            <Link
              to="/zalupa"
              className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"
            >
              Search
            </Link>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}
