'use strict';

// import express and initialise router
import express from 'express';
const router = express.Router();

// import controllers
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import flightCollection from './controllers/flightCollection.js';
import accounts from './controllers/accounts.js';

// connect routes to controllers
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/flightCollection/:id', flightCollection.index);

router.post('/flightCollection/:id/addFlight', flightCollection.addFlight);
router.post('/flightCollection/:id/updateFlight/:flightId', flightCollection.updateFlight);
router.get('/flightCollection/:id/deleteFlight/:flightId', flightCollection.deleteFlight);

router.get('/dashboard/deleteFlightCollection/:id', dashboard.deleteFlightCollection);
router.post('/dashboard/addFlightCollection', dashboard.addFlightCollection);


// export router module
export default router;







