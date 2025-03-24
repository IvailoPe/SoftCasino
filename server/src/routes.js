import { Router } from 'express';

import userController from './controllers/userController.js';
import itemController from './controllers/itemController.js';

const routes = Router();

routes.use('/users', userController);
routes.use("/items", itemController)

export default routes;