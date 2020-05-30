const getError = (props) => {
  const error = new Error(props.message);
  error.key = props.key;
  error.code = props.code;
  return error;
};

module.exports = getError;
