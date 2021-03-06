import { parseISO} from 'date-fns';
import {container} from 'tsyringe';


import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import { Request, Response } from 'express';
import { ca } from 'date-fns/locale';

export default class AppointmentsController {
   public async create(request: Request, response: Response): Promise<Response>{

    try {
      const { provider_id, date } = request.body
      const user_id = request.user.id;

      const parsedDate = parseISO(date);

      const createAppointment = container.resolve(CreateAppointmentService);



      const appointment = await createAppointment.execute(
      {
          date: parsedDate,
          user_id,
          provider_id: provider_id
      })

      return response.json(appointment);
    } catch(err){
      return response.json({error: err.message})
    }



   }
}
