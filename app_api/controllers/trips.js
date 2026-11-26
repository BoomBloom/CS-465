const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

/* GET /api/trips - List all trips */
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found in database' });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

/* GET /api/trips/:tripCode - Retrieve a trip by unique code using Mongoose find() */
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip.find({ 'code': req.params.tripCode }).exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: `Trip not found with code: ${req.params.tripCode}` });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
