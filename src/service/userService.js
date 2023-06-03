import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// salt for password
const salt = bcrypt.genSaltSync(10);


// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: '8889',
//     user: 'root',
//     password: 'root',
//     database: 'jwt'
// });

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results); // results contains rows returned by server

        }
    );
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
    // let users = [];
    // return connection.query(
    //     'SELECT * from users ',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         return users;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('SELECT * from users ');
        console.log('check rows', rows);
        return rows;
    } catch (error) {
        console.log('error', error);
    }


}

module.exports = {
    createNewUser, getUserList
}