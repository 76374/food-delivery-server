import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { UnauthorizedError, WrongCredentialsError } from '../consts/errors';
import { verifyToken, signToken } from './util';
import Secret from '../consts/secret';
import * as validator from './validator';

interface AdminTokenPayload {
  name: string;
}

interface AdminUser {
  name: string;
  pwd: string;
}

let users: AdminUser[] | null = null;

const getUsers = (): AdminUser[] => {
  if (users === null) {
    const filePath = path.join(process.cwd(), 'src', 'staticData', 'adminUsers.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    users = JSON.parse(rawData);
  }
  return users as AdminUser[];
};

const getUser = (name: string) => {
    const users = getUsers();
    return users.find(u => u.name === name);
}

export const signIn = async function (name: string, pwd: string) {
    validator.validateLastName(name);
    validator.validateArg(pwd, 'password');
  
    const user = getUser(name);
    if (!user) {
      throw new WrongCredentialsError();
    }
    const pwdMatch = await bcrypt.compare(pwd, user.pwd);
    if (!pwdMatch) {
      throw new WrongCredentialsError();
    }
    const token = await signToken(name, Secret.Auth);
    return token;
  };

export const checkAutorization = async function (token: string | null) {
  let data: AdminTokenPayload | null = null;
  if (token) {
    try {
      data = await verifyToken(token, Secret.Admin);
    } catch (err) {
      throw new UnauthorizedError();
    }
  }
  if (!data) {
    throw new UnauthorizedError();
  }
  return true;
};
