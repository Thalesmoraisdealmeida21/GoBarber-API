import { parseISO} from 'date-fns';
import {container} from 'tsyringe';


import ListProviderService from '@modules/appointments/services/ListProviderService';

import { Request, Response } from 'express';
import { ca } from 'date-fns/locale';

export default class ProvidersController {
   public async index(request: Request, response: Response): Promise<Response>{

    try {
      const user_id = request.user.id;
      const listProviders = container.resolve(ListProviderService);



      const providers = await listProviders.execute({ user_id })

      return response.json(providers);
    } catch(err){
      return response.json({error: err.message})
    }



   }
}
