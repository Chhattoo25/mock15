const { login, signup, getProfile } = require("../controllers/AuthController");
const { Router } = require("express");
const { authentication } = require("../middleware/authentication");

const AuthRouter = Router();
AuthRouter.post("/signup", signup);

AuthRouter.post("/login", login);

AuthRouter.get("/getProfile", authentication, getProfile);

module.exports = { AuthRouter };
