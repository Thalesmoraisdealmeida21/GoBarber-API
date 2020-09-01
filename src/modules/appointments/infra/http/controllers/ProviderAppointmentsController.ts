import { parseISO} from 'date-fns';
import {container} from 'tsyringe';


import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';

import { Request, Response } from 'express';

export default class ProviderAppointmentsController {
   public async index(request: Request, response: Response): Promise<Response>{

    try {
      const provider_id = request.user.id;
      const { day, month, year } = request.query

      const listProviderAppointments = container.resolve(ListProviderAppointments);




      const appointments = await listProviderAppointments.execute(
      {
        provider_id,
        day: Number(day),
        month: Number(month),
        year: Number(year),
      })

      return response.json(appointments);
    } catch(err){
      return response.json({error: err.message})
    }



   }
}
