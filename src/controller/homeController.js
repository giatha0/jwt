import userService from '../service/userService.js';

const handleHelloword = (req, res) => {

    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    // model -> get data from database
    let userList = await userService.getUserList();

    return res.render('user.ejs', { userList });
}

const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);
    return res.redirect('/user');
}

const handleDeleteUser = async (req, res) => {
    let id = req.params.id;
    await userService.deleteUser(id);

    return res.redirect('/user');

}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let userData = await userService.getUserById(id);

    return res.render('user-update.ejs', { userData });
}


const handleUpdateUser = async (req, res) => {
    let id = req.body.id;
    let username = req.body.username;
    let email = req.body.email;

    await userService.updateUser(id, username, email);
    return res.redirect('/user');
}

module.exports = {
    handleHelloword, handleUserPage, handleCreateUser, handleDeleteUser,
    handleUpdateUser, getUpdateUserPage
}