const express = require('express');
const router = express.Router();
const Appointment = require('../models/appoinment.model');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/:patientId', authMiddleware, async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointmentData = { ...req.body, patientId };
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    res.status(201).json({
      message: 'Appointment created successfully',
    });
  } catch (error) {
    console.error('Error adding appointment:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:patientId', authMiddleware, async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId }).populate(
      'patientId'
    );
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/report/all', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
