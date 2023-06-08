import groupService from '../service/groupService.js'

const showFunc = async (req, res) => {
    try {
        let data = await groupService.getAllGroup();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        })
    }
}

module.exports = {
    showFunc
}