class DatabaseError extends Error {
    constructor(code, message, ...params) {
        super(...params);

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }

        this.code = code;
        this.message = message;
    };
}

module.exports = DatabaseError;