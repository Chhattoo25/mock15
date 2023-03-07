
const { Router } = require("express");
const { signup, login, getProfile } = require("../controllers/AuthController");
const { authentication } = require("../middlewares/authentication");


const AuthRouter = Router();
AuthRouter.post("/signup", signup);

AuthRouter.post("/login", login);

AuthRouter.get("/getProfile",authentication, getProfile);

module.exports = { AuthRouter };
