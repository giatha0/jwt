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
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: {
            model: db.Group,
            attributes: ["name", "description"],
        },
        raw: true,
        nest: true
    })

    // let roles = await db.Group.findOne({
    //     where: { id: 1 },
    //     include: { model: db.Role },
    //     raw: true,
    //     nest: true
    // });

    let roles = await db.Role.findAll({
        attributes: ["id", "url", "description"],
        include: {
            model: db.Group,
            where: { id: 1 },
            attributes: ["name", "description"],
        },
        raw: true,
        nest: true
    })

    console.log('newUser', newUser);
    console.log('roles', roles);
    return await db.User.findAll();

    // test relationship



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