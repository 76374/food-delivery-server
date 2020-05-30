exports.isNotEmpty = (value) => Boolean(value);

exports.checkLength = (value, min, max) => {
    return value && (!min || value.length >= min) && (!max || value.length <= max);
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.isEmail = (value) => emailRegex.test(value);

const notNameRegex = /[^\u0400-\u04FFa-zA-Z-]/;
exports.isName = (value) => !notNameRegex.test(value);