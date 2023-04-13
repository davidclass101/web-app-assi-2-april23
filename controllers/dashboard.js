'use strict';

// import all required modules
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import flightCollectionStore from '../models/flightCollection-store.js';
import accounts from "./accounts.js";

// create dashboard object
const dashboard = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Flight Collection Dashboard",
        flightCollectons: flightCollectionStore.getUserFlightCollections(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture
      };
      logger.info("about to render" + viewData.playlists);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },
  
  deleteFlightCollection(request, response) {
    const flightCollectionId = request.params.id;
    logger.debug(`Deleting Flight Collection ${flightCollectionId}`);
    flightCollectionStore.removeFlightCollection(flightCollectionId);
    response.redirect('/dashboard');
  },
  
  addFlightCollection(request, response) {
      const date = new Date();
      const loggedInUser = accounts.getCurrentUser(request);
      const newFlightCollection = {
        id: uuidv4(),
        userid: loggedInUser.id,
        title: request.body.title,
        picture: request.files.picture,
        date: date,
        flights: []
      };
      logger.debug("Creating a new Flight Collection" + newFlightCollection);
      flightCollectionStore.addFlightCollection(newFlightCollection, function() {
        response.redirect("/dashboard");
  });
},
}

// export the dashboard module
export default dashboard;