import express from 'express';
import homeController from '../controller/homeController';


const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloword);
    router.get('/user', homeController.handleUserPage);
    router.post('/users/create-user', homeController.handleCreateUser)
    return app.use('/', router);
}

export default initWebRoutes;