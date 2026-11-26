const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// GET /api/trips - list all trips
router
    .route('/trips')
    .get(tripsController.tripsList);

// GET /api/trips/:tripCode - get single trip by code
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;
