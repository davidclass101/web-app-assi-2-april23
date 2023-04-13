"use strict";

// import all required modules
import logger from "../utils/logger.js";
import flightCollectionStore from "../models/flightCollection-store.js";
import accounts from './accounts.js';

// create start object
const start = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    // app statistics calculations

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    // app statistics calculations
 if(loggedInUser){
    const flightCollections = flightCollectionStore.getAllFlightCollections();

    let numFlightCollections = flightCollections.length;

    let numFlights = 0;

    for (let item of flightCollections) {
       numFlights += item.flights.length;
    }
   let average = 0;
   if (numFlightCollections > 0) {
    average = numFlights / numFlightCollections;
    average = average.toFixed(2);
   }
   
     
    let currentLargest = 0;
    let largestFlightCollectionTitle = "";
    for (let flightCollection of flightCollections) {
      if (flightCollection.flights.duration > currentLargest) {
        currentLargest = flightCollection.flight.duration;
      }
      
      
    }
    for (let flightCollection of flightCollections) {
      if (flightCollection.flights.duration === currentLargest) {
            largestFlightCollectionTitle += flightCollection.flightNumber + ", ";
      }
    }
    
    let currentSmallest = 1;
    if (numFlightCollections > 0) {
      currentSmallest = flightCollections[0].flights.length;
    } 
    let smallestFlightCollectionTitle = "";

    for (let flightCollection of flightCollections) {
      if (flightCollection.flights.duration  < currentSmallest) {
        currentSmallest = flightCollection.flights.length;
      }
    }
    for (let flightCollection of flightCollections) {
      if (flightCollection.flights.duration === currentSmallest) {
        smallestFlightCollectionTitle += flightCollection.flightNumber + ", ";
      }
    }
       
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: "Welcome to the Playlist App!",
      totalFLightCollections: numFlightCollections,
      totalFlights: numFlights,
      average: average,
      largest: largestFlightCollectionTitle,
      smallest: smallestFlightCollectionTitle,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };


    // render the start view and pass through the data
    response.render('start', viewData);
 }
    else response.redirect('/')
  },
};

// export the start module
export default start;
