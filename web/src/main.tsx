import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layout.tsx";
import Patients from "@/pages/Patients.tsx";
import Appointments from "@/pages/Appointments.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        index: true,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
    ],

  },
  // {
  //   path: "/contacts/:id",
  //   element: <App />,
  // }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
