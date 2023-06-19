import jwt from 'jsonwebtoken';
require('dotenv').config();

const nonSecurePath = ['/login', '/register', '/logout'];


const createJWT = (payload) => {

    let key = process.env.JWT_SECRET;
    let token = null;
    let expiresIn = process.env.JWT_EXPIRES_IN;

    try {
        token = jwt.sign(payload, key, { expiresIn });

    } catch (error) {
        console.log(error);
    }
    return token;
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        return token;
    }
    return null;
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
    if (nonSecurePath.includes(req.path)) return next();
    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req);

    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyJWT(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
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
    if (nonSecurePath.includes(req.path) || req.path === '/account') return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        // console.log(currentUrl);
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: `You don't have permission to access this page`,
                DT: ''
            })
        }

        // console.log(roles);
        let canAccess = roles.some(item => item.url === currentUrl || currentUrl.includes(item.url));

        // console.log(canAccess);
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