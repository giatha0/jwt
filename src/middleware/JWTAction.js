import jwt from 'jsonwebtoken';
require('dotenv').config();

const createJWT = (payload) => {

    let key = process.env.JWT_SECRET;
    let token = null;

    try {
        token = jwt.sign(payload, key);

    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyJWT(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                EM: 'Unauthorized',
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Unauthorized',
            DT: ''
        })

    }
    // console.log(cookies);
}

const checkUserPermission = (req, res, next) => {
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        console.log(currentUrl);
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: `You don't have permission to access this page`,
                DT: ''
            })
        }

        console.log(roles);
        let canAccess = roles.some(item => item.url === currentUrl)

        console.log(canAccess);
        if (canAccess) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                EM: `You don't have permission to access this page`,
                DT: ''
            })
        }


    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Unauthorized',
            DT: ''
        })
    }
}

module.exports = {
    createJWT, verifyJWT, checkUserJWT, checkUserPermission
}