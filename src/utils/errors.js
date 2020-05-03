const getError = (message, httpCode) => {
    const error = new Error(message);
    error.httpCode = httpCode;
    return error;
}

const getUnexpectedArgs = (message) => (getError(message || 'Unexpected arguments', 422));

module.exports = {
    getUnexpectedArgs
}

