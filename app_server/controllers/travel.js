const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

/* GET travel view - queries live trip data from MongoDB via Mongoose */
const travel = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        res.render('travel', { title: 'Travlr Getaways', trips });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    travel
};
