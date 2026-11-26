const mongoose = require('mongoose');

// Define the trip schema with strict validation
const tripSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Trip code is required'],
        unique: true,
        index: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Trip name is required'],
        index: true,
        trim: true
    },
    length: {
        type: String,
        required: [true, 'Trip length is required'],
        trim: true
    },
    start: {
        type: Date,
        required: [true, 'Start date is required']
    },
    resort: {
        type: String,
        required: [true, 'Resort name is required'],
        trim: true
    },
    perPerson: {
        type: String,
        required: [true, 'Price per person is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Trip image filename is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Trip description is required']
    }
});

// Compile and export the Trip model
const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
