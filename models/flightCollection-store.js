"use strict";

import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";

const flightCollectionStore = {
  store: new JsonStore("./models/flightCollection-store.json", {
    flightCollectionCollection: [],
  }),
  collection: "flightCollectionCollection",

  getAllFlightCollections() {
    return this.store.findAll(this.collection);
  },
  
  getAllFlights() {
    return this.store.findAll(this.collection);
  },

  getFlightCollection(id) {
    return this.store.findOneBy(
      this.collection,
      (collection) => collection.id === id
    );
  },

  removeFlight(id, flightId) {
    const flightCollection = "flights";
    this.store.removeItem(this.collection, id, flightCollection, flightId);
  },

  removeFlightCollection(id) {
    const flightCollection = this.getFlightCollection(id);
    this.store.removeCollection(this.collection, flightCollection);
  },

  removeAllFlightCollections() {
    this.store.removeAll(this.collection);
  },

  addFlightCollection(flightCollection) {
    this.store.addCollection(this.collection, flightCollection);
  },

  addFlight(id, flight) {
    const flightCollection = "flights";
    this.store.addItem(this.collection, id, flightCollection, flight);
  },

  editFlight(id, flightId, updatedFlight) {
    const flightCollection = this.getFlightCollection(id);
    const flights = flightCollection.flights;
    const index = flights.findIndex((flight) => flight.id === flightId);
    flights[index].flightNumber = updatedFlight.flightNumber;
    flights[index].origin = updatedFlight.origin;
    flights[index].destination = updatedFlight.destination;
    flights[index].airline = updatedFlight.airline;
    flights[index].pilot = updatedFlight.pilot;
    flights[index].duration = updatedFlight.duration;
    flights[index].departureDate = updatedFlight.departureDate;
    flights[index].departureTime = updatedFlight.departureTime;
  },
};

export default flightCollectionStore;
