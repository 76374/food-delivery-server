import { Document } from "mongoose";

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
}

export const modelToPlainObject = (model: Document) => {
  const result = model.toObject({versionKey: false});
  replaceIds(result);
  return result;
};
