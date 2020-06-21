import { GraphQLError } from 'graphql';
import { ServerError } from '../consts/errors';

const errorFormat = (error: GraphQLError) => {
  if (error.originalError instanceof ServerError) {
    return error.originalError;
  }
  return error;
};

export default errorFormat;
