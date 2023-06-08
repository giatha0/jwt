import db from "../models/models/index.js";

const getAllGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [
                ['name', 'ASC'],
            ],
        });
        if (!data) {
            return {
                EM: "Get all group failed",
                EC: "1",
                DT: [],
            }
        }
        return {
            EM: "Get all group success",
            EC: "0",
            DT: data,
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
    getAllGroup
}