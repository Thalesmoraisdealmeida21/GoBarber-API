import { parseISO} from 'date-fns';
import {container} from 'tsyringe';


import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';

import { Request, Response } from 'express';

export default class ProviderAppointmentsController {
   public async index(request: Request, response: Response): Promise<Response>{

    try {
      const provider_id = request.user.id;
      const { day, month, year } = request.body

      const listProviderAppointments = container.resolve(ListProviderAppointments);




      const appointments = await listProviderAppointments.execute(
      {
        provider_id,
        day,
        month,
        year,
      })

      return response.json(appointments);
    } catch(err){
      return response.json({error: err.message})
    }



   }
}
