'use strict';

import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import flightCollectionStore from '../models/flightCollection-store.js';

const flightCollection = {
  index(request, response) {
    const flightCollectionId = request.params.id;
    logger.debug('Flight Collection id = ' + flightCollectionId);
    const viewData = {
      title: 'Flight Collection',
      flightCollection: flightCollectionStore.getFlightCollection(flightCollectionId),
    };
    logger.info('about to render', viewData.flightCollection);
    response.render('flightCollection', viewData);
  },
    deleteFlight(request, response) {
    const flightCollectionId = request.params.id;
    const flightId = request.params.flightId;
    logger.debug(`Deleting Flight ${flightId} from Flight Collection ${flightCollectionId}`);
    flightCollectionStore.removeFlight(flightCollectionId, flightId);
    response.redirect('/flightCollection/' + flightCollectionId);
  },
    addFlight(request, response) {
    const flightCollectionId = request.params.id;
    const flightCollection = flightCollectionStore.getFlightCollection(flightCollectionId);
    const newFlight = {
      id: uuidv4(),
      flightNumber: request.body.flightNumber,
      origin: request.body.origin,
      destination: request.body.destination,
      airline: request.body.airline,
      pilot: request.body.pilot,
      duration: request.body.duration,
      departureTime: request.body.departureTime,
      departureDate: request.body.departureDate
    };
    flightCollectionStore.addFlight(flightCollectionId, newFlight);
    response.redirect('/flightCollection/' + flightCollectionId);
  },
};


export default flightCollection;