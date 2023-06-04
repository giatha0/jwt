import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/models/index.js';

// salt for password
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const createNewUser = async (email, password, username) => {

    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            email,
            password: hashPass,
            username
        })
    } catch (error) {
        console.log('error', error);
    }


}

const getUserList = async () => {
    return await db.User.findAll();

}

const deleteUser = async (id) => {
    await db.User.destroy({
        where: {
            id
        }
    })
}

const getUserById = async (id) => {
    return await db.User.findOne({
        where: {
            id
        }
    })
}

const updateUser = async (id, username, email) => {
    await db.User.update({
        username,
        email
    }, {
        where: {
            id
        }
    })
}


module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUser
}