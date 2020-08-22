import { Router, response } from 'express'


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProviderController from '../controllers/ProvidersController';
const providerController = new ProviderController();
const provdersRouter = Router();

import MonthAvailabilityController from '../controllers/MonthAvailabilityController';
const monthAvailabilityController = new MonthAvailabilityController();


import DayAvailabilityController from '../controllers/DayAvailabilityController';
const dayAvailabilityController = new DayAvailabilityController();




provdersRouter.use(ensureAuthenticated);

provdersRouter.get('/', providerController.index);
provdersRouter.get('/:id/month-availability', monthAvailabilityController.index);
provdersRouter.get('/:id/day-availability', dayAvailabilityController.index);





export default provdersRouter;
