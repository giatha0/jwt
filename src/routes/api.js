import express from 'express';
import apiController from '../controller/apiController';


const router = express.Router();

const initApiRoutes = (app) => {


    //rest api
    // GET-r POST-c PUT-u DELETE-d
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);


    return app.use('/api/v1', router);


}

export default initApiRoutes;