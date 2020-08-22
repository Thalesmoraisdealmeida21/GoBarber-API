
// import User from '@modules/users/infra/typeorm/entities/User'

import 'reflect-metadata'
import {inject, injectable} from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';



interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}





@injectable()
class ListProviderAppointmentsService {

    constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository
    ){}



    public async execute({
      provider_id,
      day,
      month,
      year }: IRequest): Promise<Appointment[]> {



        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          day,
          month,
          provider_id,
          year
        });

        console.log(appointments);

        return appointments;

    }


}


export default ListProviderAppointmentsService;
