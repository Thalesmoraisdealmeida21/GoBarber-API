import { Router, response } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

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
provdersRouter.get('/:id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    }
  }),
monthAvailabilityController.index);
provdersRouter.get('/:id/day-availability',  celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  }
}), dayAvailabilityController.index);





export default provdersRouter;
