const getToken = (request) => {
    const value = request.get('Authorization');
    if (value) {
        const parts = value.split(' ');
        if (parts.length > 1) {
            return parts[1];
        }
    }
    return null;
}

module.exports = {
    getToken
}