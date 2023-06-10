import { raw } from 'body-parser'
import db from '../models/models/index.js'

const getGroupWithRoles = async (user) => {
    // scope
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        include: [{
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through: {
                attributes: []
            }
        }]
    })

    return roles ? roles : {}
}

module.exports = {
    getGroupWithRoles
}