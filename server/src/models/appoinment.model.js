const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Scheduled', 'Cancelled'],
    default: 'Scheduled',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
