const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    address: { type: String, required: true },
    contactInfo: { type: String, required: true },
  },
  { timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
