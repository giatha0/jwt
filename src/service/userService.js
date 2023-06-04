import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// salt for password
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let hashPass = hashUserPassword(password);
    try {
        const [rows, fields] =
            await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
                [email, hashPass, username]);
    } catch (error) {
        console.log('error', error);
    }


}

const getUserList = async () => {

    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('SELECT * from users ');
        // console.log('check rows', rows);
        return rows;
    } catch (error) {
        console.log('error', error);
    }


}

const deleteUser = async (id) => {
    // i want delete user with id from database, plase code here 

    const connection = await mysql.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
        console.log('check rows', rows);
        return rows;
    } catch (error) {
        console.log('error', error);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('SELECT * from users WHERE id = ?', [id]); // i want get user with id from database, plase code here
        // console.log('check rows', rows);
        return rows;
    } catch (error) {
        console.log('error', error);
    }
}

const updateUser = async (id, username, email) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]); // i want update user with id from database, plase code here
        // console.log('check rows', rows);
        return rows;
    } catch (error) {
        console.log('error', error);
    }
}


module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUser
}