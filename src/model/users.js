const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../mongoose/user');
const { getUnauthorized } = require('../utils/errors');
const { AUTH } = require('../consts/secret');
const { modelToPlainObject } = require('./util');

const getAuthData = (user) => {
  const payload = { userId: user._id.toString() };
  const token = jwt.sign(payload, AUTH);
  return {
    token: token,
    user: modelToPlainObject(user),
  };
};

const signUp = async function (firstName, lastName, email, pwd) {
  console.log('signUp', firstName, lastName, email, pwd);
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    console.log('ERROR', err);
  }
  console.log('user found, hashing', user);
  if (user) {
    throw getUnauthorized('A user with provided email already exists');
  }
  const pwsHash = await bcrypt.hash(pwd, 12);
  console.log('hashed, creating');
  user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    pwd: pwsHash,
  });
  console.log('created, saving');
  await user.save();
  console.log('saved');
  return getAuthData(user);
};

const signIn = async function (email, pwd) {
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    throw getUnauthorized("A user with provided email doesn't exist");
  }
  const pwdMatch = await bcrypt.compare(user.pwd, pwd);
  if (!pwdMatch) {
    throw getUnauthorized('Wrong password');
  }
  return getAuthData(user);
};

module.exports = {
  signUp,
  signIn,
};
