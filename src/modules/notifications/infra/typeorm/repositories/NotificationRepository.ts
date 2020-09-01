
import {getMongoRepository, MongoRepository} from 'typeorm'


import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';


class NotificationsRepository implements INotificationsRepository{
  private ormRepository: MongoRepository<Notification>;


  constructor(){
        this.ormRepository = getMongoRepository(Notification, 'mongo');
  }


   public async create({ content, recipient_id}: ICreateNotificationDTO): Promise<Notification>{
      const notification =  this.ormRepository.create({
        content,
        recipient_id,
      })
      this.ormRepository.save(notification);
      return notification;
   }

}

export default NotificationsRepository;
