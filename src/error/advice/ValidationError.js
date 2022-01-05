class ValidationError extends Error {
    constructor(code, message, ...params) {
        super(...params);

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }

        this.code = code;
        this.message = message;
    };
}

module.exports = ValidationError;