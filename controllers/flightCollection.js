"use strict";

import logger from "../utils/logger.js";
import { v4 as uuidv4 } from "uuid";
import flightCollectionStore from "../models/flightCollection-store.js";
import accounts from "./accounts.js";

const flightCollection = {
  index(request, response) {
    const flightCollectionId = request.params.id;
    logger.debug("Flight Collection id = " + flightCollectionId);
    const loggedInUser = accounts.getCurrentUser(request);

    let flightCollection =
      flightCollectionStore.getFlightCollection(flightCollectionId);
    let totFlights = 0;
    for (let flight of flightCollection.flights) {
      totFlights += flightCollection.flight;
    }
    const viewData = {
      title: "Flight Collection",
      flightCollection: flightCollection,
      Flights: totFlights,
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    logger.info("about to render", viewData.flightCollection);
    response.render("flightCollection", viewData);
  },
  deleteFlight(request, response) {
    const flightCollectionId = request.params.id;
    const flightId = request.params.flightId;
    logger.debug(
      `Deleting Flight ${flightId} from Flight Collection ${flightCollectionId}`
    );
    flightCollectionStore.removeFlight(flightCollectionId, flightId);
    response.redirect("/flightCollection/" + flightCollectionId);
  },
  addFlight(request, response) {
    const flightCollectionId = request.params.id;
    const flightCollection =
      flightCollectionStore.getFlightCollection(flightCollectionId);
    const newFlight = {
      id: uuidv4(),
      flightNumber: request.body.flightNumber,
      origin: request.body.origin,
      destination: request.body.destination,
      airline: request.body.airline,
      pilot: request.body.pilot,
      duration: request.body.duration,
      departureTime: request.body.departureTime,
      departureDate: request.body.departureDate,
    };
    flightCollectionStore.addFlight(flightCollectionId, newFlight);
    response.redirect("/flightCollection/" + flightCollectionId);
  },
  updateFlight(request, response) {
    const flightCollectionId = request.params.id;
    const flightCollection =
      flightCollectionStore.getFlightCollection(flightCollectionId);
    logger.debug("updating flight " + flightId);
    const updatedFlight = {
      id: uuidv4(),
      flightNumber: request.body.flightNumber,
      origin: request.body.origin,
      destination: request.body.destination,
      airline: request.body.airline,
      pilot: request.body.pilot,
      duration: request.body.duration,
      departureTime: request.body.departureTime,
      departureDate: request.body.departureDate,
    };
    flightCollectionStore.updateFlight(
      flightCollectionId,
      flightId,
      updatedFlight
    );
    response.redirect("/flightCollection/" + flightCollectionId);
  },
};

export default flightCollection;
