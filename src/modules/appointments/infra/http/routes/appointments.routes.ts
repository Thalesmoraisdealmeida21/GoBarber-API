import { Router, response } from 'express'


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController';
const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();


import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'
const providerAppointmentsController = new ProviderAppointmentsController();






  appointmentsRouter.use(ensureAuthenticated);
  appointmentsRouter.post('/', appointmentsController.create);


  appointmentsRouter.get('/me',  providerAppointmentsController.index);



export default appointmentsRouter;
