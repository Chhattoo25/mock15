const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  contract: {
    type: String,
    enum: ['Full Time', 'Part Time'],
    required: true
  },
  location: {
    type: String,
    required: true
  }
}
,{timestamps:true}
);

const JobModel = mongoose.model("job", jobSchema);

module.exports = { JobModel };
