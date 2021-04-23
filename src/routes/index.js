import { Router } from 'express';

import userRoutes from './user';
import permissionRoutes from './permission';

import UserSessionController from '../app/controllers/sessions/UserSessionController';

const routes = new Router();


// User session
routes.post('/session/new', UserSessionController.store);

routes.use('/user', userRoutes);
routes.use('/permission', permissionRoutes);


routes.get('/', (req, res) =>{
  return res.json({ message: 'funfou'});
})


export default routes;