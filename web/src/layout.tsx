import { Outlet } from "react-router-dom";
import Header from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";
import { Toaster } from "./components/ui/toaster";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  );
}
