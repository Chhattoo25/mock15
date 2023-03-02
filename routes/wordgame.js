const { Router } = require("express");
const { getUser, postUser, randomWord, getScore, scoreUpdate } = require("../controllers/wordgame");

const WordRouter = Router();

WordRouter.get("/getuser", getUser);
WordRouter.post("/postuser", postUser);

WordRouter.get("/getrandom",randomWord)
WordRouter.get("/getscore",getScore)
WordRouter.post("/scoreupdate",scoreUpdate)
WordRouter.post("/getrandom/:id",randomWord)
module.exports = {
  WordRouter,
};
