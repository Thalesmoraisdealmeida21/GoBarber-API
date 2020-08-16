
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError'


describe('CreateUser', () => {
  it('should bbe able to create a new appointment', async  () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);


        const user = await createUser.execute({
          name: "Jhon Doe",
          email: "jhon@jhon.com",
          password: '123456'
        })

        expect(user).toHaveProperty('id');
  })
});
