


import Appointment from "./../../infra/typeorm/entities/Appointment"
import { uuid } from 'uuidv4'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProvider from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import { isEqual, getMonth, getDate, getYear } from 'date-fns'


class AppointmentsRepository implements IAppointmentsRepository{

  private appointments: Appointment[] = [];


   public async findByDate(date: Date): Promise<Appointment | undefined>{
      const findAppointment = this.appointments.find(appointment =>
        appointment.date === date);


        return findAppointment;

   }


   public async findAllInMonthFromProvider({ provider_id, month, year}: IFindAllInMonthProvider): Promise<Appointment[]>{

    const appointments = this.appointments.filter(appointment =>
          appointment.provider_id === provider_id &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year,
    );


      return appointments;

 }


   public async create({provider_id, date }: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = new Appointment();


        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);
        return appointment;
   }

}

export default AppointmentsRepository;
