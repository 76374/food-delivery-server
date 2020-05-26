const getError = (message, httpCode) => {
    const error = new Error(message);
    error.httpCode = httpCode;
    return error;
}

const getUnexpectedArgs = (message) => (getError(message || 'Unexpected arguments', 422));

const getUnauthorized = (message) => (getError(message || 'Unauthorized', 401));

module.exports = {
    getUnexpectedArgs,
    getUnauthorized
}

