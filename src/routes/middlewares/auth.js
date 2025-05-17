module.exports = (req, res, next) => {
    console.log('Checking auth token', req.headers.authorization);
    next();
}