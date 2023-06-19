import db from "../models/models/index.js";
import { checkEmailExist, checkPhoneExist, hashUserPassword } from "./loginRegisterService.js";

const getAllUser = async () => {

    try {
        let users = await db.User.findAll({
            attributes: ['id', 'email', 'phone', 'username', 'sex'],
            include: {
                model: db.Group,
                attributes: ["name", "description"],
            },
        });
        if (users) {
            // let data = users.get({ plain: true })
            return {
                EM: "Get all user success",
                EC: "0",
                DT: users,
            }
        } else {
            return {
                EM: "Get all user failed",
                EC: "1",
                DT: [],
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "Something went wrong",
            EC: "-1",
            DT: [],
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'email', 'phone', 'username', 'sex', 'address'],
            include: {
                model: db.Group,
                attributes: ["name", "description", "id"],
            },
            order: [
                ['id', 'DESC'],
            ],
            raw: true,
        });
        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            users: rows,
        }
        console.log(data);
        return {
            EM: "Get all user success",
            EC: "0",
            DT: data,
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "Something went wrong",
            EC: "-1",
            DT: [],
        }
    }
}

const createNewUser = async (data) => {
    try {

        // check email/phone number are existed in database
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist) {
            return {
                EM: "Email is existed",
                EC: "1",
                DT: "email",
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist) {
            return {
                EM: "Phone is existed",
                EC: "1",
                DT: "phone",
            }
        }

        // hash password
        let hashPassword = hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: "Create new user success",
            EC: "0",
            DT: [],
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something went wrong",
            EC: "-1",
            DT: [],
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Group id is required",
                EC: "1",
                DT: 'group'
            }
        }
        console.log('check data', data);
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        console.log('check user', user);
        if (user) {
            //update user
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: "Update user success",
                EC: "0",
                DT: [],
            }
        } else {
            // not found
            return {
                EM: "User is not found",
                EC: "1",
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something went wrong",
            EC: "-1",
            DT: [],
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })

        if (user) {
            await user.destroy();
            return {
                EM: "Delete user success",
                EC: "0",
                DT: [],
            }

        } else {
            return {
                EM: "User is not found",
                EC: "1",
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something went wrong",
            EC: "-1",
            DT: [],
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}