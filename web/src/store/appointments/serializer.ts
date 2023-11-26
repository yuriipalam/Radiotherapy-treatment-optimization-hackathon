import AppointmentType from "@/store/appointments/appointmentType.ts";

export default async function getSerializedAppointments() {
  const getDateFromMinutes = (minutes: number, step: number) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return new Date(
      new Date(
        currentDate +
          minutes * 60000 +
          24 * (step + 1) * 60 * 60 * 1000,
      ),
    );
  };

  const serializedAppointments: AppointmentType[] = [];
  const resp = await fetch("http://127.0.0.1:5000/api/appointments");
  const data = await resp.json();
  for (let i = 0; i < data.length; i++) {
    const resource = data[i][0];
    for (let j = 0; j < data[i][1].length; j++) {
      if (data[i][1][j] === null) continue;
      const appointment = {
        title: "Sample appointment " + i.toString() + " " + j.toString(),
        resource: resource,
        start: getDateFromMinutes(data[i][1][j][0], j),
        end: getDateFromMinutes(data[i][1][j][1], j),
      };
      serializedAppointments.push(appointment);
    }
  }

  return serializedAppointments;
}
