const getTripsEndpoint = (req) => {
    if (process.env.API_URL) {
        return process.env.API_URL;
    }
    const port = req.socket?.localPort || process.env.PORT || 3000;
    return `http://localhost:${port}/api/trips`;
};

/* GET travel view - fetches live trip data from the /api/trips REST endpoint */
const travel = async (req, res) => {
    const tripsEndpoint = getTripsEndpoint(req);
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const response = await fetch(tripsEndpoint, options);
        const data = await response.json().catch(() => null);

        let trips = [];
        let message = null;

        if (!response.ok) {
            message = data && data.message ? data.message : 'API lookup error';
        } else if (!Array.isArray(data)) {
            message = 'API lookup error';
        } else if (data.length === 0) {
            message = 'No trips exist in our database!';
        } else {
            trips = data;
        }

        return res.render('travel', { title: 'Travlr Getaways', trips, message });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    travel
};
