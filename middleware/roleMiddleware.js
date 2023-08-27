const jwt = require("jsonwebtoken");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({message: 'User is not auth'})
            }
            const {roles: userRoles} = jwt.verify(token, "")
            let hasRole = false;
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true;
                }
            })
            if (!hasRole) {
                return res.status(400).json({message: 'Access denied'});
            }
            next();
        } catch (e) {
            return res.status(400).json({message: 'User is not auth'})
        }
    }
}