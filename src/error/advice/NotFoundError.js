class NotFoundError extends Error {
    constructor(code, message, ...params) {
        super(...params);

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }

        this.code = code;
        this.message = message;
    };
}

module.exports = NotFoundError;