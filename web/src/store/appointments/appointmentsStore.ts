import { create } from "zustand";
import Appointment from "@/store/appointments/appointmentType.ts";
import getSerializedAppointments from "@/store/appointments/serializer.ts";
import { Patient } from "@/store/patients/patientType.ts";

interface AppointmentsStore {
  fetch: () => void;
  appointments: Appointment[];
  patients: Patient[];
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (id: string) => void;
  changeAppointment: (appointment: Appointment) => void;
  // clearAppointments: () => void;
}

const useAppointmentsStore = create<AppointmentsStore>((set, get) => ({
  appointments: [],
  patients: [],
  fetch: async () => {
    const response = await fetch("http://127.0.0.1:5000/api/appointments");
    const data = await response.json();
    const serializedData = getSerializedAppointments(data);
    set({
      appointments: serializedData.appointments,
      patients: serializedData.patients,
    });
    console.log("fetch", get().appointments);
  },
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
