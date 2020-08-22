import { parseISO} from 'date-fns';
import {container} from 'tsyringe';


import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';


import { Request, Response } from 'express';


export default class ProviderDayAvailabilityController {
   public async index(request: Request, response: Response): Promise<Response>{
     const provider_id = request.params.id;
    const  { month, year, day } = request.body
    try {
      const user_id = request.user.id;
      const listProviderDayAvailability = container.resolve(ListProviderDayAvailability);



      const availability = await listProviderDayAvailability.execute({
          provider_id,
          day,
          month,
          year
       });

      return response.json(availability);
    } catch(err){
      return response.json({error: err.message})
    }



   }
}
