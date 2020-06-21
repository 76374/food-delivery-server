//TODO: any
export const modelToPlainObject = (model: any, nestedProps?: string) => {
  if (!model._doc) {
    throw new Error('unexpected model');
  }
  const result = { ...model._doc };
  result.id = result._id.toString();
  delete result._id;

  if (nestedProps) {
    const prop = result[nestedProps];
    if (prop) {
      if (prop instanceof Array) {
        result[nestedProps] = prop.map((i) => modelToPlainObject(i));
      } else {
        result[nestedProps] = modelToPlainObject(result[nestedProps]);
      }
    }
  }
  return result;
};
