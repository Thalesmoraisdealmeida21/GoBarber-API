import { Router, response } from 'express'


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProviderController from '../controllers/ProvidersController';
const providerController = new ProviderController();
const provdersRouter = Router();




provdersRouter.use(ensureAuthenticated);
provdersRouter.get('/', providerController.index);



export default provdersRouter;
