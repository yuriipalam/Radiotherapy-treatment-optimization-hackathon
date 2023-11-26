import { Outlet } from "react-router-dom";
import Header from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";
import { Toaster } from "./components/ui/toaster";
import usePatientsStore from "@/store/patients/patientsStore.ts";
import { useEffect } from "react";
import useAppointmentsStore from "@/store/appointments/appointmentsStore.ts";

export default function RootLayout() {
  const patientsState = usePatientsStore();
  const state = useAppointmentsStore();

  useEffect(() => {
    state.fetch();
  }, []);

  useEffect(() => {
    patientsState.setPatients(state.patients);
  }, [state.appointments]);

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
