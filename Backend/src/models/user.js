const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config');
const secretKey = config.get('jwtSecret');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    trim: true,
  },
  coordinates: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  avatar: {
    type: Buffer,
  },
  expoPushToken: {
    type: String,
  },
});

userSchema.virtual('products', {
  ref: 'Product',
  //variable unimos
  localField: '_id',
  //campo de union
  foreignField: 'owner',
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, secretKey);
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.__v;

  return userObj;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to connect');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to connect');
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
