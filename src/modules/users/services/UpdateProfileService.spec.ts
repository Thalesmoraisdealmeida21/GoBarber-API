
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError'
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {

  beforeEach(()=> {
     fakeUsersRepository = new FakeUsersRepository();
     updateProfile = new UpdateProfileService(
        fakeUsersRepository,
        fakeHashProvider
     )





  })
  it('should be able to update the profile', async  () => {
      const user = await fakeUsersRepository.create({
        name: 'Jhon Doe',
        email: 'jhondoe@example.;com',
        password: '123456'
      })

      const updatedUser = await updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Tre',
        email: 'jhontre@example.com',

      })

      expect(updatedUser.name).toBe('Jhon Tre');
      expect(updatedUser.email).toBe('jhontre@example.com');
  })

  it('should not be able to change to another user email',  async  () => {
     await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456'
    })


    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'jhondoe@example.com',
    })).rejects.toBeInstanceOf(AppError);
})




it('should not be able to update the password', async  () => {
  const user = await fakeUsersRepository.create({
    name: 'Jhon Doe',
    email: 'jhondoe@example.;com',
    password: '123456'
  })

  await expect(updateProfile.execute({
    user_id: user.id,
    name: 'Jhon Tre',
    email: 'jhontre@example.com',
    password: '123123'
  })).rejects.toBeInstanceOf(AppError);

})

it('should not be able to update the wrong password', async  () => {
  const user = await fakeUsersRepository.create({
    name: 'Jhon Doe',
    email: 'jhondoe@example.;com',
    password: '123456'
  })

  await expect(updateProfile.execute({
    user_id: user.id,
    name: 'Jhon Tre',
    email: 'jhontre@example.com',
    old_password: 'wrong_old_password',
    password: '123123'
  })).rejects.toBeInstanceOf(AppError);

})

});
