// Create an instance of meetingsRouter 
const meetingsRouter = require('express').Router();

//export meetingsRouter 
module.exports = meetingsRouter; 

const { 
  addToDatabase,
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');

// Get an array of all the meetings
meetingsRouter.get('/', (req, res, next) => {
    //const allMeetings = getAllFromDatabase('meetings'); 
    //console.log(allMeetings); 
    res.send(getAllFromDatabase('meetings'));
}); 

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting(); 
    const allMeetings = getAllFromDatabase('meetings');
    allMeetings.push(newMeeting); 
    res.status(201).send(newMeeting);
}); 

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings'); 
    res.status(204).send('No content');
}); 