import { Router, response } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController';
const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();


import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'
const providerAppointmentsController = new ProviderAppointmentsController();






  appointmentsRouter.use(ensureAuthenticated);
  appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
    }
  }),appointmentsController.create);


  appointmentsRouter.get('/me',  providerAppointmentsController.index);



export default appointmentsRouter;
