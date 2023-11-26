export default async function appointmentsFromAlgo() {
  const response = await fetch("http://localhost:3001/api/appointments");
  const appointments = await response.json();
  appointments.forEach((appointment: any) => {
    appointment.start = new Date(new Date(appointment.start).getTime() + 24 * 60 * 60 * 1000);
    appointment.end = new Date(new Date(appointment.end).getTime() + 24 * 60 * 60 * 1000);
  });

  return appointments;
}
