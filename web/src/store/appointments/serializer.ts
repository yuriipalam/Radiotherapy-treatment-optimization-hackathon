import AppointmentType from "@/store/appointments/appointmentType.ts";
import { Patient } from "@/store/patients/patientType.ts";

export default function getSerializedAppointments(data: any) {
  const getDateFromMinutes = (minutes: number, step: number) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return new Date(
      new Date(
        currentDate + minutes * 60000 + 24 * (step + 1) * 60 * 60 * 1000,
      ),
    );
  };

  const serializedAppointments: AppointmentType[] = [];
  const serializedPatients: Patient[] = [];
  for (let i = 0; i < data.length; i++) {
    const resource = data[i][0];
    let skippedWeekends = 0;
    for (let j = 0; j < data[i][1].length; j++) {
      if (j > 0 && j % 5 === 0) {
        skippedWeekends += 2;
      }
      if (data[i][1][j] === null) continue;
      const appointment = {
        title: data[i][2],
        id: "appointment-" + i.toString() + "-" + j.toString(),
        resource: resource,
        start: getDateFromMinutes(data[i][1][j][0], j + skippedWeekends),
        end: getDateFromMinutes(data[i][1][j][1], j + skippedWeekends),
        tajNumber: data[i][3],
        region: data[i][4],
      };
      serializedAppointments.push(appointment);
    }
    const patient = {
      fullname: data[i][2],
      tajNumber: data[i][3],
      numberOfFractions: Number(data[i][5]),
      region: data[i][4],
      birthDate: `${
        Math.floor(Math.random() * (2000 - 1950 + 1)) + 1950
      }-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(
        Math.floor(Math.random() * 28) + 1,
      ).padStart(2, "0")}`,
      weight: Math.floor(Math.random() * 100 + 50),
      height: Math.floor(Math.random() * 100 + 100),
      sessionsLeft: Number(data[i][5]),
      inpatient: Math.random() < 0.1,
    };
    serializedPatients.push(patient);
  }

  return {
    appointments: serializedAppointments,
    patients: serializedPatients,
  };
}
