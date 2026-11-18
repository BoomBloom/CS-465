const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = process.env.MONGODB_URI || `mongodb://${host}:27017/travlr`;

// Function to establish database connection
const connect = () => {
    setTimeout(() => {
        mongoose.connect(dbURI)
            .catch(err => console.log('Mongoose connection initial error: ', err));
    }, 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows-specific listener for SIGINT emit
if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// Graceful shutdown helper
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close()
        .then(() => {
            console.log(`Mongoose disconnected through ${msg}`);
            if (callback) callback();
        })
        .catch(err => {
            console.log('Error closing Mongoose connection:', err);
            if (callback) callback();
        });
};

// Event Listeners for graceful shutdown
// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination (Ctrl+C)
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For container / platform termination
process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown', () => {
        process.exit(0);
    });
});

// Make initial connection to DB
connect();

// Bring in Mongoose schema definitions
require('./travlr');

module.exports = mongoose;
