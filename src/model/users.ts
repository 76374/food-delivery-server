import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import UserModel from '../mongoose/UserModel';
import { UserExistsError, WrongCredentialsError, UnauthorizedError } from '../consts/errors';
import Secret from '../consts/secret';
import { modelToPlainObject, verifyToken, signToken } from './util';
import * as validator from './validator';

interface TokenPayload {
  userId: string;
}

const getAuthData = async function (user: Document) {
  const payload = { userId: user._id.toString() };
  const token = await signToken(payload, Secret.Auth);
  return {
    token: token,
    user: modelToPlainObject(user),
  };
};

export const signUp = async function (
  firstName: string,
  lastName: string,
  email: string,
  pwd: string
) {
  validator.validateFirstName(firstName);
  validator.validateLastName(lastName);
  validator.validateEmail(email);
  validator.validatePwd(pwd);

  let user = await UserModel.findOne({ email: email }).exec();
  if (user) {
    throw new UserExistsError();
  }

  const pwdHash = await bcrypt.hash(pwd, 12);
  user = new UserModel({
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
  validator.validateArg(pwd, 'password');

  const user = await UserModel.findOne({ email: email }).exec();
  if (!user) {
    throw new WrongCredentialsError();
  }
  const pwdMatch = await bcrypt.compare(pwd, user.pwd);
  if (!pwdMatch) {
    throw new WrongCredentialsError();
  }
  return await getAuthData(user);
};

export const checkAutorization = async function (token: any) {
  let data: TokenPayload | null = null;
  if (token && typeof token === 'string') {
    try {
      data = await verifyToken(token, Secret.Auth);
    } catch (err) {
      throw new UnauthorizedError();
    }
  }
  if (!data) {
    throw new UnauthorizedError();
  }
  return data.userId;
};
