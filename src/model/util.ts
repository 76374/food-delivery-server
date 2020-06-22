import { Document } from 'mongoose';
import jwt from 'jsonwebtoken';

const replaceIds = (doc: any) => {
  if (typeof doc === 'object') {
    if (doc.hasOwnProperty('_id')) {
      doc.id = doc._id.toString();
    }
    if (doc instanceof Array) {
      doc.forEach(replaceIds);
    } else {
      Object.values(doc).forEach(replaceIds);
    }
  }
};

export const modelToPlainObject = (model: Document) => {
  const result = model.toObject({ versionKey: false });
  replaceIds(result);
  return result;
};

export const verifyToken = function <T>(token: string, secret: string): Promise<T> {
  return new Promise<T>((resolve, reject) =>
    jwt.verify(token, secret, (err: Error | null, decoded: object | undefined) => {
      if (!err) {
        const payload = (decoded as unknown) as T;
        resolve(payload);
      } else {
        reject(err);
      }
    })
  );
};

export const signToken = function <T>(payload: T, secret: string): Promise<string> {
  return new Promise<string>((resolve, reject) =>
    jwt.sign(
      (payload as unknown) as object | string | Buffer,
      secret,
      (err: Error | null, encoded: string | undefined) => {
        if (!err) {
          resolve(encoded);
        } else {
          reject(err);
        }
      }
    )
  );
};
