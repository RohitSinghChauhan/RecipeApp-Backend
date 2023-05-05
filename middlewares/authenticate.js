const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, 'hush', function (err, decoded) {
        if (decoded) {
            const userID = decoded.userID;
            req.body.userID = userID;
            next();
        } else {
            res.send({ 'msg': 'Please login' });
        }
    })
};

module.exports = authenticate;