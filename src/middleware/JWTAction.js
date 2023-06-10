import jwt from 'jsonwebtoken';
require('dotenv').config();

const createJWT = () => {
    let payload = {
        name: 'Thao',
        address: 'Ha Noi'
    }
    let key = process.env.JWT_SECRET;
    let token = null;

    try {
        token = jwt.sign(payload, key);
        console.log(token);
    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        data = jwt.verify(token, key);
        console.log(data);

    } catch (error) {
        console.log(error);
    }
    return data;
}

module.exports = {
    createJWT, verifyJWT
}