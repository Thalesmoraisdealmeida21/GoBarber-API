import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from './../dtos/ICreateAppointmentDTO';
import IFindAllInMontFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';


export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMontFromProviderDTO): Promise<Appointment[]>;
 findAllInDayFromProvider(data: IFindAllInDayProviderDTO): Promise<Appointment[]>
}
