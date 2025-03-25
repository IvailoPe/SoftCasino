import { Router } from 'express';

import userController from './controllers/userController.js';
import itemController from './controllers/itemController.js';
import casinoController from './controllers/casinoController.js';

const routes = Router();

routes.use('/users', userController);
routes.use("/items", itemController);
routes.use("/casino", casinoController);

export default routes;