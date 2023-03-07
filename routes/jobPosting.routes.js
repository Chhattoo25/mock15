const { Router } = require("express");
const { getJob, postJob, deleteJob } = require("../controllers/jobPostingController");

const PostingRouter = Router();

PostingRouter.get("/getjob", getJob);
PostingRouter.post("/postjob", postJob);
PostingRouter.post("/deletejob", deleteJob);

module.exports = {
  PostingRouter,
};
