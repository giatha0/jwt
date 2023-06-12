import loginRegisterService from "../service/loginRegisterService.js";

const testApi = (req, res) => {
    return res.status(200).json({
        message: "Test api success",
        data: "test api"
    })
}

const handleRegister = async (req, res) => {
    try {
        // req.body
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameter", // error message
                EC: "-1", // error code
                DT: "", // data
            })
        }
        if (req.body.password && req.body.password.length < 6) {
            return res.status(200).json({
                EM: "Password must be greater than 6 characters", // error message
                EC: "-1", // error code
                DT: "", // data
            })
        }


        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body);


        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: {
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            },
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        })
    }


}

const handleLogin = async (req, res) => {
    try {
        // req.body

        let data = await loginRegisterService.handleUserLogin(req.body);

        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

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
    testApi, handleRegister, handleLogin
}