import db from '../models/models/index.js';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true;
    }

    return false;
}

const checkPhoneExist = async (userPhone) => {
    let phone = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (phone) {
        return true;
    }

    return false;
}

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}



const registerNewUser = async (data) => {
    try {


        // check email/phone number are existed in database
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist) {
            return {
                EM: "Email is existed",
                EC: "1",
                DT: "",
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist) {
            return {
                EM: "Phone is existed",
                EC: "1",
                DT: "",
            }
        }
        // hash user password
        let hashPassword = hashUserPassword(data.password);

        // create user
        await db.User.create({
            email: data.email,
            username: data.username,
            phone: data.phone,
            password: hashPassword,
        })

        return {
            EM: "Register success",
            EC: "0",
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "-2",

        }
    }
}


module.exports = {
    registerNewUser
}