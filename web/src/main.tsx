import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/contacts/:id",
    element: <App />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
