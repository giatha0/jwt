

const testApi = (req, res) => {
    return res.status(200).json({
        message: "Test api success",
        data: "test api"
    })
}


module.exports = {
    testApi
}