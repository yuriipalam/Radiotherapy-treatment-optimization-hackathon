import AppointmentType from "@/store/appointments/appointmentType.ts";

const resp = await fetch("http://127.0.0.1:5000/api/appointments");
const data = await resp.json();

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
  for (let i = 0; i < data.length; i++) {
    const resource = data[i][0];
    let skippedWeekends = 0;
    for (let j = 0; j < data[i][1].length; j++) {
      if (j > 0 && j % 5 === 0) {
        skippedWeekends+=2;
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
  }

  return serializedAppointments;
}
