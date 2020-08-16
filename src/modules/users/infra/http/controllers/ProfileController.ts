import { Request, Response } from "express";
import {container} from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService'


export default class UserController {


  public async show(request: Request, response: Response) {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({user_id});

    delete user.password;
    return response.json(user)
  }


  public async update(request: Request, response: Response){
      try {
        const { name, email, old_password, password} = request.body;
        const user_id = request.user.id;
        const updateProfile =  container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id: user_id,
            name,
            email,
            password,
            old_password
        });

          delete user.password;
        return response.status(201).json(user);
    } catch(err){
        return response.status(400).json({ error: err.message})
    }
  }



}
