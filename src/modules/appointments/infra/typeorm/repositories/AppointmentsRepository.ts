
import {getRepository, Repository, Raw} from 'typeorm'

import Appointment from "../entities/Appointment"

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';



class AppointmentsRepository implements IAppointmentsRepository{
  private ormRepository: Repository<Appointment>;


  constructor(){
        this.ormRepository = getRepository(Appointment);
  }


  public async findAllInMonthFromProvider({ provider_id, month, year}:
    IFindAllInMonthProvider): Promise<Appointment[]>{

      const parsedMonth = String(month).padStart(2, '0');


      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY'}) = '${parsedMonth}-${year}'`
          ),
        },
      });


      return appointments;

 }


 public async findAllInDayFromProvider({ provider_id, month, year, day}:
  IFindAllInDayProviderDTO): Promise<Appointment[]>{

    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');


    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });


    console.log(`appointments: ${appointments}`);

    return appointments;

}


   public async findByDate(date: Date): Promise<Appointment | undefined>{
    const findAppointment = await this.ormRepository.findOne({
        where: { date },
    });
    return findAppointment;
   }


   public async create({provider_id, date, user_id }: ICreateAppointmentDTO): Promise<Appointment>{
      const appointment =  this.ormRepository.create({provider_id, date, user_id})
      this.ormRepository.save(appointment);
      return appointment;
   }

}

export default AppointmentsRepository;
