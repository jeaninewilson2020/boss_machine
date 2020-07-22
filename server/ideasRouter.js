// Create an instance of ideasRouter 
const ideasRouter = require('express').Router();
const morgan = require('morgan'); 

//export ideasRouter 
module.exports = ideasRouter; 

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea'); 

ideasRouter.use((req, res, next) => {
  morgan('tiny'); 
  next(); 
})

//Solution code:
/*
ideasRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});
*/

//This function performs the look up of our id parameter and attaches it to the req object in 
//subsequent middleware that's run 
ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id); 
    console.log(idea);
    if (idea) {
    //Attach the idea as a property of the request object (req.idea), so future routes can refeence it as req.idea
    req.idea = idea; 
    next(); 
    } else {
    res.status(404).send('Not found'); 
    }
});



ideasRouter.get('/', (req, res, next) => {
    const getIdeas = getAllFromDatabase('ideas'); 
    //console.log(getIdeas); 
    res.send(getAllFromDatabase('ideas'));
}); 
/*
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});
*/
 //Solution code:

 /*
ideasRouter.post('/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});
*/

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
     //morgan('tiny'); 
     /*
    if (!req.body.name || !req.body.description || !req.body.weeklyRevenue || !req.body.numWeeks) {
         res.status(404).send('Please fill in all fields'); 
     } else if (!checkMillionDollarIdea) {
      //console.log(`${req.body.name} is not a valid million dollar idea!`); 
      res.status(400).send();
    }
   
     const newIdeaObject = {
       name: req.body.name,  
       description: req.body.description, 
       weeklyRevenue: req.body.weeklyRevenue, 
       numWeeks: req.body.numWeeks
     }
      */
     
    const newIdea = addToDatabase('ideas', req.body); 
     res.status(201).send(newIdea); 

   })

ideasRouter.get('/:id', (req, res, next) => {
// const ideas= getAllFromDatabase('ideas'); 
res.send(req.idea);
 });

 //Update a single minion by id
 //Send the updated resource in the request body 
 ideasRouter.put('/:id', (req, res, next) => {
   //console.log(req.idea); 
   //console.log(req.body); 
   const updatedIdea = updateInstanceInDatabase('ideas', req.body); 
   //console.log(updatedIdea); 
   res.send(updatedIdea);

 }); 

 ideasRouter.delete('/:id', (req, res, next) => {
  const deleteIdea = deleteFromDatabasebyId('ideas', req.params.id); 
  res.status(204).send();
 });

 ideasRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

 /*
//Solution code:
ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});
*/


/*



  //My code
  
  ideasRouter.get('/', (req, res, next) => {
      res.status(200).send(getAllFromDatabase('ideas'));
}); 

// My code:


//Submits a new idea object but doesn't check if the input fields are not empty 
ideasRouter.post('/', (req, res, next) => {
   if (!req.body.name || !req.body.description || !req.body.weeklyRevenue || !req.body.numWeeks) {
        res.status(404).send('Please fill in all fields'); 
    } else {
    const newIdeaObject = {
      name: req.body.name,  
      description: req.body.description, 
      weeklyRevenue: req.body.weeklyRevenue, 
      numWeeks: req.body.numWeeks
    }
    
   const newIdea = addToDatabase('ideas', req.body); 
    res.status(201).send(newIdea); 
}
  })



ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id); 
    console.log(idea);
    
    if (idea) {
    //Attach the idea as a property of the request object (req.idea), so future routes can refeence it as req.idea
    req.idea = idea; 
    next(); 
    //res.status(200).send(getIdea); 
    // res.status(404).send("Not found");
    } 
    res.status(404).send('Not found'); 
});

ideasRouter.get('/:id', (req, res, next) => {
  // const ideas= getAllFromDatabase('ideas'); 
    res.send(req.idea);
  });


*/