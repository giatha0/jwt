import express from 'express';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';

const router = express.Router();

const initApiRoutes = (app) => {

    // rest api
    //rest api

    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);


    // GET-r POST-c PUT-u DELETE-d
    router.get("/user/show", userController.showFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get("/user/show/page=?&limit=?", userController.showFunc);
    router.get("/group/show", groupController.showFunc);


    return app.use('/api/v1', router);


}

export default initApiRoutes;