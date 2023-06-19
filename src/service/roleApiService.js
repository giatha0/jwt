import db from "../models/models/index.js";


const createNewRole = async (roles) => {
    try {

        let currentRole = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true,
        })
        const persists = roles.filter(({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2));

        if (persists.length === 0) {
            return {
                EM: "Role already exists",
                EC: "-1",
                DT: [],
            }
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Role created successfully: ${persists.length} roles...  `,
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



module.exports = {
    createNewRole
}