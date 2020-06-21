import util from 'util';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../mongoose/user';
import { UserExistsError, WrongCredentialsError, UnauthorizedError } from '../consts/errors';
import Secret from '../consts/secret';
import { modelToPlainObject } from './util';
import * as validator from './validator';

const verify = util.promisify(jwt.verify);
const sign = util.promisify(jwt.sign);

//TODO: any
const getAuthData = async function (user: any) {
  const payload = { userId: user._id.toString() };
  const token = await sign(payload, Secret.Auth);
  return {
    token: token,
    user: modelToPlainObject(user),
  };
};

export const signUp = async function (firstName: string, lastName: string, email: string, pwd: string) {
  validator.validateFirstName(firstName);
  validator.validateLastName(lastName);
  validator.validateEmail(email);
  validator.validatePwd(pwd);

  let user = await User.findOne({ email: email }).exec();
  if (user) {
    throw new UserExistsError();
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

export const signIn = async function (email: string, pwd: string) {
  validator.validateEmail(email);
  validator.validatePwd(pwd);

  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    throw new WrongCredentialsError();
  }
  const pwdMatch = await bcrypt.compare(pwd, user.pwd);
  if (!pwdMatch) {
    throw new WrongCredentialsError();
  }
  return await getAuthData(user);
};

export const checkAutorization = async function (token: string) {
  //TODO: any
  let data: any = null;
  if (token) {
    try {
      data = await verify(token, Secret.Auth);
    } catch (err) {
      throw new UnauthorizedError();
    }
  }
  if (!data) {
    throw new UnauthorizedError();
  }
  return data.userId;
};
