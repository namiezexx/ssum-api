class TokenExpiredError extends Error {
    constructor(code, message, ...params) {
        super(...params);

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenExpiredError);
        }

        this.code = code;
        this.message = message;
    };
}

module.exports = TokenExpiredError;