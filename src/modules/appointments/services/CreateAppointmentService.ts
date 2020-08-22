import Appointment from '../infra/typeorm/entities/Appointment'
import {injectable, inject} from 'tsyringe';
import { startOfHour, isBefore, getHours } from 'date-fns';



import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest{
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    constructor(

        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository

    ){}



    public async execute({provider_id, date, user_id}: IRequest): Promise<Appointment> {



    const appointmentDate = startOfHour(date);

    console.log(appointmentDate);
    console.log(Date.now());

    if(isBefore(Date.now(), appointmentDate)) {
          throw new AppError("You can't create appointment on a past date.");
    }

    if(user_id === provider_id) {
      throw new AppError("You can t an appointment with yourself");

    }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17 ) {
      throw new AppError("You can't only appointments between 8am and 5pm");

    }

    const provider = await this.usersRepository.findById(provider_id);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
   );



    if(findAppointmentInSameDate){
        throw  new AppError('This appointment is already booked', 400);
    }



    if(!provider){
        console.log("This provider is not exists");
        throw new AppError('This provider is not exists', 400);

    }





     const appointment = await this.appointmentsRepository.create({
        provider_id,
        user_id,
        date: appointmentDate
     });


     return appointment

    }
}

export default CreateAppointmentService
