'use strict';

// import all required modules
import logger from '../utils/logger.js';
import developerStore from '../models/developer-store.js';

// create about object
const about = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('about rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'About the Flight Collection App',
      developers: developerStore.getAllDevelopers(),
    };
    
    // render the about view and pass through the data
    response.render('about', viewData);
  },
};

// export the about module
export default about;