import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layout.tsx";
import Patients from "@/pages/Patients.tsx";
import Appointments from "@/pages/Appointments.tsx";
import { Login } from "@/pages/Login.tsx";
import { Dashboard } from "@/pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Patients />,
        index: true,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
