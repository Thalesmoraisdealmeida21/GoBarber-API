import { parseISO} from 'date-fns';
import {container} from 'tsyringe';


import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvaliability';


import { Request, Response } from 'express';


export default class ProviderMonthAvailabilityController {
   public async index(request: Request, response: Response): Promise<Response>{
    const provider_id = request.params.id;
    const  { month, year } = request.query
    try {
      const user_id = request.user.id;
      const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailability);



      const availability = await listProviderMonthAvailability.execute({
          provider_id,
          month: Number(month),
          year: Number(year)
       });

      return response.json(availability);
    } catch(err){
      return response.json({error: err.message})
    }



   }
}
