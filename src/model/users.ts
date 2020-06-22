import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import UserModel from '../mongoose/UserModel';
import { UserExistsError, WrongCredentialsError, UnauthorizedError } from '../consts/errors';
import Secret from '../consts/secret';
import { modelToPlainObject } from './util';
import * as validator from './validator';

interface TokenPayload {
  userId: string;
}

const verify = (token: string, secret: string): Promise<TokenPayload> =>
  new Promise<TokenPayload>((resolve, reject) =>
    jwt.verify(token, secret, (err: Error | null, decoded: object | undefined) => {
      if (!err) {
        const payload = decoded as TokenPayload;
        resolve(payload);
      } else {
        reject(err);
      }
    })
  );

const sign = (payload: TokenPayload, secret: string): Promise<string> =>
  new Promise<string>((resolve, reject) =>
    jwt.sign(payload, secret, (err: Error | null, encoded: string | undefined) => {
      if (!err) {
        resolve(encoded);
      } else {
        reject(err);
      }
    })
  );

const getAuthData = async function (user: Document) {
  const payload = { userId: user._id.toString() };
  const token = await sign(payload, Secret.Auth);
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
  validator.validatePwd(pwd);

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

export const checkAutorization = async function (token: string | null) {
  let data: TokenPayload | null = null;
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
