import db from "../models/models/index.js";

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
            limit: limit
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
        await db.User.create({

        })
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
        let user = db.User.findOne({
            where: { id: data.id },
        })

        if (user) {
            //update user

            user.save({

            })
        } else {
            // not found
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

const deleteUser = async (data) => {
    try {
        await db.User.destroy({
            where: { id: data.id },
        })

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