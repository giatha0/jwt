import db from "../models/models/index.js";

const showRoleFunc = async () => {
    try {
        let data = await db.Role.findAll({
            order: [
                ['id', 'DESC'],
            ],
        });
        return {
            EM: "Role fetched successfully",
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

const showRoleFuncWithPaginate = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Role.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'url', 'description'],
            order: [
                ['id', 'DESC'],
            ],
            raw: true,
        });

        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            roles: rows,
        }

        // console.log(data.roles);
        return {
            EM: "Get all role success",
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

const deleteRole = async (id) => {
    try {
        let data = await db.Role.destroy({
            where: { id: id }
        })
        return {
            EM: "Role deleted successfully",
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: "Group id is required",
                EC: "-1",
                DT: [],
            }
        }
        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: [{
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: {
                    attributes: [],
                }
            }]
        })

        return {
            EM: "Get role by group success",
            EC: "0",
            DT: roles,
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

const assignRoleToGroup = async (data) => {
    try {
        // data = {groupId: 1, groupRoles: [{}, {}, {}]}
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })

        await db.Group_Role.bulkCreate(data.groupRoles);
        return {
            EM: 'Assign role to group success',
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
    createNewRole, showRoleFunc, deleteRole, showRoleFuncWithPaginate, getRoleByGroup,
    assignRoleToGroup
}