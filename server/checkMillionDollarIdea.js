const express = require('express');
const app = express();

/*
function isString(string) {
    return typeof string === "string" || string instanceof String;
}
*/

//This function does seem to work, when I try submitting a post request on postman it
//prevents a new idea from being added if the revenue is less than a million dollars
const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body; 
    const totalMoney = Number(numWeeks) * Number(weeklyRevenue); 
    if (!numWeeks || !weeklyRevenue || isNaN(totalMoney) || totalMoney < 1000000) {
        res.status(400).send(); 
    } else {
      next(); 
     }
    };


/*
const checkMillionDollarIdea = (numWeeks, weeklyRevenue, name) => {
if (!numWeeks || !weeklyRevenue) {
    return false; 
    //console.log('Please enter number of weeks and expected revenue'); 
    //res.status(400).send(); 
} else if (!isString(numWeeks) || !isString(weeklyRevenue)) {
    return false; 
}

else if ((numWeeks * weeklyRevenue) >= 1000000) {
     next(); 
     //return true; 
 } else {
     console.log(`${name} is not a valid million dollar idea!`)
     //res.status(400).send(); 
     return false; 
 }
};
*/

//console.log(checkMillionDollarIdea(52, 10000, 'my idea')); 
// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
