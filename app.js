const express = require('express');
const app = express();
const PORT = 3000;

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. Smith',
    availability: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
    },
    maxPatients: 10,
  },
  {
    id: 2,
    name: 'Dr. Johnson',
    availability: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
    },
    maxPatients: 8,
  },
];

// Sample data for appointments
const appointments = [];

app.use(express.json());

// Endpoint for listing doctors
app.get('/doctors', (req, res) => {
  res.json(doctors);
});

// Endpoint for getting doctor details
app.get('/doctors/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find((doc) => doc.id === doctorId);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

// Endpoint for booking an appointment
app.post('/appointments/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find((doc) => doc.id === doctorId);
  if (doctor) {
    if (appointments.length < doctor.maxPatients) {
      appointments.push(doctorId);
      res.json({ message: 'Appointment booked successfully' });
    } else {
      res.status(400).json({ error: "Doctor's schedule is full" });
    }
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
