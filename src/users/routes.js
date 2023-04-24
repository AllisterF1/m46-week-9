const { Router } = require("express");
const {
  registerUser,
  getAllUsers,
  updateUserByUsername,
  deleteUserByUsername,
  login,
} = require("./controllers");
const { hashPass, comparePass } = require("../middleware");

const userRouter = Router();

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/users/getallusers", getAllUsers);
userRouter.put("/users/updateuser", updateUserByUsername);
userRouter.delete("/users/deleteuser", deleteUserByUsername);

module.exports = userRouter;
