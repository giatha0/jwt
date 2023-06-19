import roleApiService from '../service/roleApiService';

const showRoleFunc = async (req, res) => {
    try {

        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await roleApiService.showRoleFuncWithPaginate(+page, +limit);
            // console.log(data);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })

        } else {
            let data = await roleApiService.showRoleFunc();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const createRoleFunc = async (req, res) => {
    try {
        const data = await roleApiService.createNewRole(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            data: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            data: '',
        });
    }
}

const deleteRoleFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            data: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            data: '',
        });
    }
}

const getRoleByGroupFunc = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleApiService.getRoleByGroup(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const assignRoleToGroupFunc = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        });
    }
}

module.exports = {
    showRoleFunc, createRoleFunc, deleteRoleFunc, getRoleByGroupFunc,
    assignRoleToGroupFunc
};