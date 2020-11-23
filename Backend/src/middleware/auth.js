const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('config');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const user = await User.findOne({
      _id: decoded._id,
    });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Please Authenticate');
  }
};
