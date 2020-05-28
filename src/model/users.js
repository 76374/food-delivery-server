const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../mongoose/user');
const { getUnauthorized } = require('../utils/errors');
const { AUTH } = require('../consts/secret');
const { modelToPlainObject } = require('./util');

const verify = util.promisify(jwt.verify);
const sign = util.promisify(jwt.sign);

const getAuthData = async function (user) {
  const payload = { userId: user._id.toString() };
  const token = await sign(payload, AUTH);
  return {
    token: token,
    user: modelToPlainObject(user),
  };
};

const signUp = async function (firstName, lastName, email, pwd) {
  let user = await User.findOne({ email: email }).exec();
  if (user) {
    throw getUnauthorized('A user with provided email already exists');
  }
  const pwdHash = await bcrypt.hash(pwd, 12);
  user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    pwd: pwdHash,
  });
  await user.save();

  return await getAuthData(user);
};

const signIn = async function (email, pwd) {
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    throw getUnauthorized("A user with provided email doesn't exist");
  }
  const pwdMatch = await bcrypt.compare(pwd, user.pwd);
  if (!pwdMatch) {
    throw getUnauthorized('Wrong password');
  }
  return await getAuthData(user);
};

const checkAutorization = async function (token) {
  let data = null;
  if (token) {
    try {
      data = await verify(token, AUTH);
    } catch (err) {
      throw getUnauthorized();
    }
  }
  if (!data) {
    throw getUnauthorized();
  }
  return data.userId;
};

module.exports = {
  signUp,
  signIn,
  checkAutorization,
};
