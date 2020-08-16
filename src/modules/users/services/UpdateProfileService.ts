
// import User from '@modules/users/infra/typeorm/entities/User'

import {inject, injectable} from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from './../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';



interface Request {
    user_id: string
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider


      ){}



    public async execute({user_id, name, email, password, old_password}: Request): Promise<User> {

      const user = await this.usersRepository.findById(user_id);

      if(!user){
        throw new AppError('Users not found')
      }

      const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

      if((userWithUpdatedEmail) && (userWithUpdatedEmail.id !== user_id)){
        throw new AppError('E-mail aready in use');
      }

      user.name = name;
      user.email = email;


      if(password  && !old_password){
        throw new AppError('plis check your old password')
      }



      if (password && old_password){

      const checkedOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      )


      if(!checkedOldPassword){
          throw new AppError('Old Password does not match')
      }

        user.password = await this.hashProvider.generateHash(password);


      }

      return this.usersRepository.save(user);


    }


}


export default UpdateProfileService;
