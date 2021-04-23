import { Router } from 'express';

import UserController from '../app/controllers/UserController';

import authMiddleware from '../app/middlewares/auth';

const routes = new Router;


routes.post('/register', UserController.store);

routes.use(authMiddleware)
//private routes
routes.get('/get_all', UserController.index);
routes.post('/get_by_id', UserController.show);
routes.put('/update', UserController.update);
routes.delete('/delete', UserController.destroy);

export default routes;