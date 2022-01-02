const CustomError = require('./custom-error');

module.exports = (err, req, res, next) => {
    if(err instanceof CustomError) {
        console.log(err);
        return res.status(500).json(err);
    }
    console.log(err);
    return res.status(500).json(err);
}