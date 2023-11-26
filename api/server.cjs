// server.cjs
const express = require('express');
// import getSerializedAppointments from './serializer.cjs';
const serializer = require('./serializer.cjs');
const cors = require('cors');


const app = express();
const port = 3001;
app.use(cors());

app.get('/api/appointments', (req, res) => {
  const appointments = serializer.getSerializedAppointments();
  res.json(appointments);
  // res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
