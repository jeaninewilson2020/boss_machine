

// Create an instance of minionsRouter 
const minionsRouter = require('express').Router();

//export minionsRouter 
module.exports = minionsRouter; 

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
  } = require('./db'); 


// Get an array of all the minions 
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
}); 

//Solutions code:
/*
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});
*/

//My code:

//Removed if statement checking if name, title and salary were entered and it passed the test
// So addToDatabase must already check if the correct request data has been entered 
minionsRouter.post('/', (req, res, next) => {
  const newMinionObject = {
    name: req.body.name,  
    title: req.body.title, 
    salary: req.body.salary
  }
  const newMinion = addToDatabase('minions', newMinionObject); 
  const minions = getAllFromDatabase('minions'); 
  minions.push(newMinion); 
  res.status(201).send(newMinion); 
})

minionsRouter.get('/:minionId', (req, res, next) => {
   const getMinion = getFromDatabaseById('minions', req.params.minionId); 
   if (!getMinion) {
    res.status(404).send("Not found");
   }
   res.status(200).send(getMinion); 
   
}); 

//any POST or PUT requests will send their new/updated resources in 
// the request body (req.body)

minionsRouter.put('/:minionId', (req, res, next) => {
   const updateMinion = updateInstanceInDatabase('minions', req.body);  
   if(!updateMinion) {
     res.status(404).send(); 
   } else if (updateMinion) {
   res.status(200).send(updateMinion); 
   }
}); 

minionsRouter.delete('/:minionId', (req, res, next) => {
  const parsed = parseInt(req.params.minionId);  
  if (isNaN(parsed)) {
    res.status(404).send(); 
  }
  const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId); 
  if(deleteMinion) {
    res.status(204).send(); 
  } else if (!deleteMinion) {
    res.status(404).send(); 
  }
}); 

