import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2';
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'jwt'
});

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

const getUserList = () => {
    connection.query(
        'SELECT * from users ',
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results); // results contains rows returned by server
        }
    );
}

module.exports = {
    createNewUser, getUserList
}