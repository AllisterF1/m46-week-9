const { Router } = require("express");
const {
  registerUser,
  getAllUsers,
  updateUserByUsername,
  deleteUserByUsername,
} = require("./controllers");

const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.get("/users/getallusers", getAllUsers);
userRouter.put("/users/updateuser", updateUserByUsername);
userRouter.delete("/users/deleteuser", deleteUserByUsername);

module.exports = userRouter;
