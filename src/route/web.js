import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/createUserForm', homeController.createUserForm);
  router.post('/postCreateUser', homeController.postCRUD);
  router.get('/getListUser', homeController.getListUser);
  router.get('/editUser', homeController.editUser);
  router.post('/editUserComplete', homeController.editUserComplete);
  router.get('/deleteUser', homeController.deleteUser);

  // user
  router.post('/api/login', userController.handleLogin);
  router.get('/api/getAllUser', userController.getAllUser);
  router.get('/api/getUserById', userController.getUserById);
  router.post('/api/create-user', userController.createUser);
  router.delete('/api/delete-user', userController.deleteUser);
  router.put('/api/update-user', userController.updateUser);

  return app.use('/', router);
};

module.exports = initWebRoutes;
