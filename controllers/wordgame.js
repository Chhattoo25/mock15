const { WordGameModel } = require("../Models/User");

const getUser = async (req, res) => {
  try {
    const users = await WordGameModel.find();
    res.send({ data: users, msg: "get data" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server Error" });
  }
};

const postUser = async (req, res) => {
  const { name, level } = req.body;
  const new_User = new WordGameModel({
    name,
    level,
  });
  await new_User.save();
  res.send({
    message: "user registered successfully",
    new_User: { name: new_User.name, level: new_User.level },
  });
};

const randomWord = async (req, res) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  let num = Math.floor(Math.random() * (10 - 7) + 7);

  let a = generateString(num);

  res.send({ data: a.toLocaleLowerCase(), msg: "Here is your  word" });
};

const getScore = async (req, res) => {
  const { name } = req.params;

  const user = await WordGameModel.findOne({ name });
  res.json(user.score);
};

const scoreUpdate = async (req, res) => {
  const { name, score } = req.params;

  const user = await WordGameModel.findOneAndUpdate(
    { name: name },
    { $inc: { score: parseInt(score) } },
    { new: true }
  );

  res.json(user);
};

module.exports = {
  getUser,
  postUser,
  randomWord,
  getScore,
  scoreUpdate,
};
