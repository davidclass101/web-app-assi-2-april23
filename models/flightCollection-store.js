"use strict";

import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";

import cloudinary from "cloudinary";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
} catch (e) {
  logger.info("You must provide a Cloudinary credentials file - see README.md");
  process.exit(1);
}

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

  /*async addFlightCollection(flightCollection, response) {
    function uploader() {
      return new Promise(function (resolve, reject) {
        cloudinary.uploader.upload(
          flightCollection.picture.tempFilePath,
          function (result, err) {
            if (err) {
              console.log(err);
            }
            resolve(result);
          }
        );
      });
    }
    let result = await uploader();
    logger.info("cloudinary result", result);
    flightCollection.picture = result.url;

    this.store.addCollection(this.collection, flightCollection);
    response();
  },*/
  
  async addFlightCollection(flightCollection, response) {
  if (!flightCollection.picture || !flightCollection.picture.tempFilePath) {
    // Handle missing picture or tempFilePath properties
    logger.error("Missing picture or tempFilePath properties");
    response();
    return;
  }

  function uploader() {
    return new Promise(function (resolve, reject) {
      cloudinary.uploader.upload(
        flightCollection.picture.tempFilePath,
        function (result, err) {
          if (err) {
            console.log(err);
          }
          resolve(result);
        }
      );
    });
  }

  let result = await uploader();
  logger.info("cloudinary result", result);
  flightCollection.picture = result.url;

  this.store.addCollection(this.collection, flightCollection);
  response();
},


  addFlight(id, flight) {
    const flightCollection = "flights";
    this.store.addItem(this.collection, id, flightCollection, flight);
  },

  updateFlight(id, flightId, updatedFlight) {
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

  getUserFlightCollections(userid) {
    return this.store.findBy(
      this.collection,
      (flightCollection) => flightCollection.userid === userid
    );
  },
};

export default flightCollectionStore;
