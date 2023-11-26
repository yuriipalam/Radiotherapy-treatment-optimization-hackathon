import { create } from "zustand";
import Appointment from "@/store/appointments/appointmentType.ts";
import initialAppointments from "@/store/appointments/appointments.ts";

interface AppointmentsStore {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (id: string) => void;
  changeAppointment: (appointment: Appointment) => void;
  // clearAppointments: () => void;
}

const useAppointmentsStore = create<AppointmentsStore>((set) => ({
  appointments: initialAppointments,
  addAppointment: (appointment: Appointment) =>
    set((state) => ({ appointments: [appointment, ...state.appointments] })),
  changeAppointment: (appointment: Appointment) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === appointment.id ? appointment : a,
      ),
    })),
  removeAppointment: (id: string) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
    })),
}));

export default useAppointmentsStore;
