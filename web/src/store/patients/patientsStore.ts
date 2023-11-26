import { create } from "zustand";
import { Patient } from "@/store/patients/patientType.ts";

interface PatientsStore {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  setPatients: (patients: Patient[]) => void;
  removePatient: (patient: Patient) => void;
  changePatient: (patient: Patient) => void;
  // clearPatients: () => void;
  getPatients: () => void;
  markAsFinished: (patient: Patient) => void;
}

const usePatientsStore = create<PatientsStore>()(
  // persist(
  (set) => ({
    patients: [],
    addPatient: (patient: Patient) =>
      set((state) => ({ patients: [patient, ...state.patients] })),
    setPatients: (patients: Patient[]) =>
      set(() => ({ patients: patients })),
    removePatient: (patient: Patient) =>
      set((state) => ({
        patients: state.patients.filter(
          (p) => p.tajNumber !== patient.tajNumber,
        ),
      })),
    changePatient: (patient: Patient) =>
      set((state) => ({
        patients: state.patients.map((p) =>
          p.tajNumber === patient.tajNumber ? patient : p,
        ),
      })),
    markAsFinished: (patient: Patient) =>
      set((state) => {
        patient.finished = true;

        return {
          patients: [
            ...state.patients.filter((p) => p.tajNumber !== patient.tajNumber),
            patient,
          ],
        };
      }),
    // clearPatients: () => set({ patients: [] }),
    getPatients: () => set((state) => ({ patients: state.patients })),
  }),
  // {
  //   name: "patients-storage",
  //   storage: createJSONStorage(() => sessionStorage),
  // },
);

export default usePatientsStore;
