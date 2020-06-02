const errorFormat = (error) => {
  if (error.originalError) {
    if (error.originalError.code) {
      error.code = error.originalError.code;
    }
    if (error.originalError.key) {
      error.key = error.originalError.key;
    }
  }
  return error;
};

module.exports = errorFormat;
