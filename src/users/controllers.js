const User = require("./model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    console.log("next called");
    // const user = await User.create({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    const user = await User.create(req.body);
    res.status(201).json({
      message: "success",
      user: { username: req.body.username, email: req.body.email },
    });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    // remove passwords from users object
    for (let user of users) {
      user.password = "";
    }

    res.status(201).json({ message: "success", users: users });
  } catch (error) {
    res.status(501).json({ errorMessage: "Validation error", error });
  }
};

const updateUserByUsername = async (req, res) => {
  const { username, newUsername, newPassword, newEmail } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    await user.update({
      username: newUsername,
      email: newEmail,
      password: newPassword,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: { username: req.body.username, email: req.body.email },
    });
  } catch (error) {
    res.status(501).json({ errorMessage: "Validation error", error });
  }
};

//Alex's version
// {
//     "username" : "Alex",
//     "updateKey" : "email",
//     "updateValue" : "alexA@email.com"
// }
const updateUser = async (req, res) => {
    try {
      const updateResult = await User.update(
        { [req.body.updateKey]: req.body.updateValue },
        { where: { username: req.body.username } }
      );

      res.status(201).json({ message: "success", updateResult: updateResult });
    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }
};

const deleteUserByUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.destroy({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      message: "user deleted successfully",
      user: { username: req.body.username, email: req.body.email },
    });
  } catch (error) {
    res.status(501).json({ errorMessage: "Validation error", error });
  }
};

const login = async (req, res) => {
  try {
    if (req.authUser) {
      res.status(200).json({
        message: "success",
        user: {
          username: req.authUser.username,
        },
      });
      return
    }
    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET); //user is generated in the comparePass func
    res.status(200).json({
      message: "success",
      user: {
        username: req.user.username,
        email: req.user.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(501).json({ errorMessage: "Validation error", error });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  updateUserByUsername,
  deleteUserByUsername,
  login,
};
