import { Router } from 'express';

import PermissionController from '../app/controllers/PermissionController';

import authMiddleware from '../app/middlewares/auth';

const routes = new Router;



routes.use(authMiddleware)
//private routes
routes.post('/new', PermissionController.store);
routes.get('/get_all', PermissionController.index);
routes.post('/get_by_id', PermissionController.show);
routes.put('/update', PermissionController.update);
routes.delete('/delete', PermissionController.destroy);

export default routes;