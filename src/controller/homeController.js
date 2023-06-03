import userService from '../service/userService.js';

const handleHelloword = (req, res) => {

    return res.render('home.ejs');
}

const handleUserPage = (req, res) => {
    // model -> get data from database
    return res.render('user.ejs');
}

const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // userService.createNewUser(email, password, username);
    userService.getUserList();

    return res.send('Check your console');
}


module.exports = {
    handleHelloword, handleUserPage, handleCreateUser
}