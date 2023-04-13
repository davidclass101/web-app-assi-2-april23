'use strict';

// import all required modules
import logger from '../utils/logger.js';
import developerStore from '../models/developer-store.js';
import accounts from "./accounts.js";

// create about object
const about = {
  
index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('about rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About the Playlist App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
};

// export the about module
export default about;