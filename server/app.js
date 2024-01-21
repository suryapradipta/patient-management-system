const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// to allow requests from your Angular frontend
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Connection failed:', error);
  });

const patientRoutes = require('./src/routes/patient.route');
const userRoutes = require('./src/routes/user.route');
const appointmentRoutes = require('./src/routes/appointment.route');

app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
