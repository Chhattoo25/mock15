const { JobModel } = require("../Models/JobPosting.Model");

const getJob = async (req, res) => {
  const user = req.params.body;
  try {
    var jobs = await JobModel.find();
  } catch (err) {
    console.log(err);
  }
  res.send(jobs);
};

const postJob = async (req, res) => {
  try{
    const { company, position, contract, location } = req.body;
    const job = new JobModel({ company, position, contract, location });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
    res.send({ massage: "Job successfully create", savedJob });
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:"job posting failed due to some error"})
  }

};

const deleteJob = async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const job = await JobModel.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send({ error: "Job not found" });
    }
    res.send({ message: "Job deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getJob,
  postJob,
  deleteJob
};
