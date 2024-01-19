const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const Patient = require('../models/patient.model');
const authMiddleware = require('../middleware/auth.middleware');

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

function isValidGender(gender) {
  const validGenders = ['Male', 'Female', 'Other'];
  return validGenders.includes(gender);
}

router.post('/', authMiddleware, async (req, res) => {
  try {

    const {name, dateOfBirth, gender, address, contactInfo} = req.body;

    if (!name || !dateOfBirth || !gender || !address || !contactInfo) {
      return res.status(400).json({error: 'All fields are required.'});
    }

    if (!isValidDateFormat(dateOfBirth) || !isValidGender(gender)) {
      return res.status(400).json({error: 'Invalid date format or gender.'});
    }

    const patientId = shortid.generate();

    const patient = new Patient({...req.body, patientId});
    await patient.save();
    res.status(201).json({
      patient,
      message: 'Patient created successfully'
    });
  } catch (error) {
    console.error('Error submitting patient:', error);
    res.status(400).json({error: error.message});
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({message: 'Patient not found'});
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {

    const {name, dateOfBirth, gender, address, contactInfo} = req.body;

    if (!name || !dateOfBirth || !gender || !address || !contactInfo) {
      return res.status(400).json({error: 'All fields are required.'});
    }

    if (!isValidDateFormat(dateOfBirth) || !isValidGender(gender)) {
      return res.status(400).json({error: 'Invalid date format or gender.'});
    }

    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!patient) {
      return res.status(404).json({error: 'Patient not found'});
    }

    res.status(200).json({
      message: 'Patient updated successfully',
      patient
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(400).json({error: error.message});
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({error: 'Patient not found'});
    }

    res.json({message: 'Patient deleted successfully'});
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(400).json({error: error.message});
  }
});

module.exports = router;
