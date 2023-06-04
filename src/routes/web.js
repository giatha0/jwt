import express from 'express';
import homeController from '../controller/homeController';


const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloword);
    router.get('/user', homeController.handleUserPage);
    router.post('/users/create-user', homeController.handleCreateUser)
    router.post('/users/delete-user/:id', homeController.handleDeleteUser)
    router.get('/users/update-user/:id', homeController.getUpdateUserPage)
    router.post('/users/update-user/', homeController.handleUpdateUser)
    return app.use('/', router);
}

export default initWebRoutes;