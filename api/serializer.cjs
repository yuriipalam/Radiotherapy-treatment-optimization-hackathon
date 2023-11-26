const fs = require("fs");


function getSerializedAppointments() {
  const getDateFromMinutes = (minutes) => {
    const currentDate = new Date();
    return new Date(currentDate.getTime() + minutes * 60000);
  };

  const serializedAppointments = [];
  let data
  fetch("http://localhost:5000/api/appointments").then((response) => {
    data = response.json();
  });

  for (let i = 0; i < data.length; i++) {
    const resource = data[i][0];
    for (let j = 0; j < data[i][1].length; j++) {
      console.log(j)
    }
    break;
  }
  // console.log(`File content:\n${fileContent}`);

  for (let i = 0; i < fileContent.length; i++) {
    let values = fileContentLines[i].split(" ");
    const appointment = {
      title: "Sample appointment " + i.toString(),
      resource: values[0],
      start: getDateFromMinutes(values[1].replace("(", "").replace(",", "")),
      end: getDateFromMinutes(values[2].replace(")", "").replace(",", "")),
    };
    serializedAppointments.push(appointment);
    // console.log(appointment, ",");
    // break;
  }


  return serializedAppointments;
}

module.exports = {
  getSerializedAppointments,
}