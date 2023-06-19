import express from 'express';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import roleController from '../controller/roleController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'

const router = express.Router();


const initApiRoutes = (app) => {

    // rest api
    //rest api
    router.all('*', checkUserJWT, checkUserPermission)
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    router.get('/account', userController.getUserAccount);


    // GET-r POST-c PUT-u DELETE-d

    // user routes
    router.get("/user/show", userController.showFunc);
    router.post("/user/create", checkUserPermission, userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    // role routes
    router.get('/role/show', roleController.showRoleFunc);
    router.post('/role/create', roleController.createRoleFunc);

    // router.get("/user/show/page=?&limit=?", userController.showFunc);
    // group routes
    router.get("/group/show", groupController.showFunc);


    return app.use('/api/v1', router);


}

export default initApiRoutes;