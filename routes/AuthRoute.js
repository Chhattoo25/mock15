
const { Router } = require("express");
const { signup, login } = require("../controllers/AuthController");


const AuthRouter = Router();
AuthRouter.post("/signup", signup);

AuthRouter.post("/login", login);

// AuthRouter.get("/getProfile", getProfile);

module.exports = { AuthRouter };
