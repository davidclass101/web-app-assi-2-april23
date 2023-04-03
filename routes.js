'use strict';

// import express and initialise router
import express from 'express';
const router = express.Router();

// import controllers
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import flightCollection from './controllers/flightCollection.js';

// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/flightCollection/:id', flightCollection.index);

router.get('/flightCollection/:id/deleteFlight/:flightId', flightCollection.deleteFlight);
router.post('/flightCollection/:id/addFlight', flightCollection.addFlight);

router.get('/dashboard/deleteFlightCollection/:id', dashboard.deleteFlightCollection);
router.post('/dashboard/addFlightCollection', dashboard.addFlightCollection);

// export router module
export default router;

