
// import User from '@modules/users/infra/typeorm/entities/User'

import {inject, injectable} from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';



interface Request {
    user_id: string
}

@injectable()
class ListProvidersService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
      ){}



    public async execute({user_id }: Request): Promise<User[]> {

      const users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      });

      if(!users){
        throw new AppError('Users not found')
      }


      return users;


    }


}


export default ListProvidersService;
