const { BMIModel } = require("../models/BMIModel");

// get BMI DATA
const getBMI = async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id);
  const all_bmi = await BMIModel.find({ user_id: user_id });
  console.log(all_bmi);
  res.send({ history: all_bmi });
};

// post BMI DATA
const calculateBMI = async (req, res) => {
  const { height, weight, user_id } = req.body;
  const height_in_meter = Number(height) * 0.3048;
  const  BMI = (Number(weight) / height_in_meter ** 2).toFixed(2);
  let result="";
  if(BMI<18.5){
   result = "Underweight"
  }
  else if(BMI>18.5 && BMI<24.9){
  result = "Normal Weight"
  }
  else if(BMI>25 &&BMI<29.9){
  result = "Overweight"
  } 
   else if(BMI>30 &&BMI<34.9){
  result = "Obesity"
  } 
   else if(BMI>35 &&BMI<39.9){
  result = "Extreme Obesity"
  }
//   BMI = BMI.tofixed(2)
  const new_BMI = new BMIModel({
    BMI,
    height: height_in_meter,
    weight,
    user_id: user_id,
    result:result
  });
  await new_BMI.save();
  res.send({ BMI });
};


module.exports = {
  getBMI,
  calculateBMI,
};
