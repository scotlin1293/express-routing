const express = require('express');
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function mean(string){
    let numArray = string.split(",")
    let sum = 0;
    for(let num of numArray){
        num=parseInt(num)
        sum += num
    }
    
    let mean = sum / numArray.length
    return mean    
}


function mode(string) {
    let frequency = {}; // array of frequency.
    let maxFreq = 0; // holds the max frequency.
    let modes = [];
    let numArray = string.split(",")
  
    for (let i in numArray) {
      frequency[numArray[i]] = (frequency[numArray[i]] || 0) + 1; // increment frequency.
  
      if (frequency[numArray[i]] > maxFreq) { // is this frequency > max so far ?
        maxFreq = frequency[numArray[i]]; // update max.
      }
    }
  
    for (let i in frequency) {
      if (frequency[i] == maxFreq) {
        modes.push(i);
      }
    }
  
    return modes;
  }

function median(string) {
    let numArray = string.split(",")
    const mid = Math.floor(numArray.length / 2),
    nums = [...numArray].sort((a, b) => a - b);
    return numArray.length % 2 !== 0 ? parseInt(nums[mid]) : (parseInt(nums[mid - 1]) + parseInt(nums[mid])) / 2;
  };

app.get('/mean', function(req, res, next) {
    if(!req.query.nums){
        const badRequest = new ExpressError("Bad Request, must have nums", 400);
        return next(badRequest)
    }
    let numArray = req.query.nums.split(",")
    for(let num of numArray){
        intNum=parseInt(num)
        if(!intNum){
            const badRequest = new ExpressError(`Bad Request, ${num} is not a number`, 400);
            return next(badRequest)
        }
    }

    let avg = mean(req.query.nums)
    // res.send("The mean is:"  + mean(req.query.nums))

    return res.json({
        operation: "mean",
        value: avg
    })
    // return res.status(404).json('Whoops! Nothing here!');
  });

app.get('/median', function(req, res, next) {
    if(!req.query.nums){
        const badRequest = new ExpressError("Bad Request, must have nums", 400);
        return next(badRequest)
    }
    let numArray = req.query.nums.split(",")
    for(let num of numArray){
        intNum=parseInt(num)
        if(!intNum){
            const badRequest = new ExpressError(`Bad Request, ${num} is not a number`, 400);
            return next(badRequest)
        }
    }

    
    let med= median(req.query.nums)
    // res.send("The mean is:"  + mean(req.query.nums))

    return res.json({
        operation: "median",
        value: med
    })
  });
  
  /** Sample of validating / error handling */
  
app.get('/mode', function(req, res, next) {
    if(!req.query.nums){
        const badRequest = new ExpressError("Bad Request, must have nums", 400);
        return next(badRequest)
    }
    let numArray = req.query.nums.split(",")
    for(let num of numArray){
        intNum=parseInt(num)
        if(!intNum){
            const badRequest = new ExpressError(`Bad Request, ${num} is not a number`, 400);
            return next(badRequest)
        }
    }

    let result=mode(req.query.nums)

    return res.json({
        operation: "mode",
        value: result
    })

});

// app.use(function (req, res, next) {
//     console.log(req.body)
//     const badRequest = new ExpressError("Bad Request, only numbers allowed", 400);
//     return next(badRequest)
//   });
  
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });
  /** Start server on port 3000 */
  
app.listen(3000, function() {
    console.log('Server started on port 3000.');
  });


  module.exports={mean, mode, median}