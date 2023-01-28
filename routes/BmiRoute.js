
const {Router} = require('express');
const { getBMI, calculateBMI } = require('../controllers/BmiController');
const { authentication } = require('../middleware/authentication');

const BMIRouter = Router();
BMIRouter.get("/getCalculation",authentication , getBMI );


BMIRouter.post("/calculateBMI",authentication, calculateBMI );


module.exports = {BMIRouter}