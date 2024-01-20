const express = require('express');
const router = express.Router();
const Appointment = require('../models/appoinment.model');

router.post('/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointmentData = { ...req.body, patientId };
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    res.status(201).json({
      message: 'Appointment created successfully'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId }).populate('patientId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/report/all', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

module.exports = router;
