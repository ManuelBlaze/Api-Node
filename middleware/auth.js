const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Read token from header
    const token = req.header('x-auth-token');

    //Check if dont have token
    if (!token) {
        return res.status(401).json({ msg: 'There is no token, invalid access' });
    }

    //Validate token
    try {
        const encr = jwt.verify(token, process.env.SECRET);
        req.user = encr.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'No valid token' });
    }
};