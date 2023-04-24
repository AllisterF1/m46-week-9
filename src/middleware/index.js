const User = require("../users/model");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      parseInt(saltRounds)
    );
    next();
  } catch (error) {
    res.status(501).json({ errorMessage: error.Message, error: error });
  }
};


const comparePass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ where: { username: req.body.username } });
    if (!req.user) {
      return res.status(401).json({ errorMessage: "incorrect login details" });
    }

    const comparePass = await bcrypt.compare(
      req.body.password,
      req.user.password
    );

    if (!comparePass) {
      return res.status(401).json({ errorMessage: "incorrect login details" });
    }

    console.log("credentials match");
    next();
  } catch (error) {
    res.status(501).json({ errorMessage: error.Message, error: error });
  }
};

module.exports = {
  hashPass,
  comparePass,
};
