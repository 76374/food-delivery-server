const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../mongoose/user');
const { userExists, authorizationFailed, unauthorized } = require('../consts/errors');
const getError = require('../utils/getError');
const { Auth } = require('../consts/secret');
const { modelToPlainObject } = require('./util');
const validator = require('./validator');

const verify = util.promisify(jwt.verify);
const sign = util.promisify(jwt.sign);

const getAuthData = async function (user) {
  const payload = { userId: user._id.toString() };
  const token = await sign(payload, Auth);
  return {
    token: token,
    user: modelToPlainObject(user),
  };
};

const signUp = async function (firstName, lastName, email, pwd) {
  validator.validateFirstName(firstName);
  validator.validateLastName(lastName);
  validator.validateEmail(email);
  validator.validatePwd(pwd);

  let user = await User.findOne({ email: email }).exec();
  if (user) {
    throw getError(userExists);
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
  validator.validateEmail(email);
  validator.validatePwd(pwd);

  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    throw getError(authorizationFailed);
  }
  const pwdMatch = await bcrypt.compare(pwd, user.pwd);
  if (!pwdMatch) {
    throw getError(authorizationFailed);
  }
  return await getAuthData(user);
};

const checkAutorization = async function (token) {
  let data = null;
  if (token) {
    try {
      data = await verify(token, Auth);
    } catch (err) {
      throw getError(unauthorized);
    }
  }
  if (!data) {
    throw getError(unauthorized);
  }
  return data.userId;
};

module.exports = {
  signUp,
  signIn,
  checkAutorization,
};
