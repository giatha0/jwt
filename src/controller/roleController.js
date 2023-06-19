import roleApiService from '../service/roleApiService';

const showRoleFunc = async () => {
    try {
        const data = await groupApiService.showRole();
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


module.exports = {
    showRoleFunc, createRoleFunc
};