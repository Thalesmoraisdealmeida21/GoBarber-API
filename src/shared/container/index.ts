import { container } from 'tsyringe';
import mailConfig from '@config/mail'


import '@modules/users/providers/index';
import './providers';



import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';


import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import mailsProvider from './providers/MailProvider'

import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider'
import SESMailProvider from './providers/MailProvider/implementations/SESMailProvider'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository'


import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';
import IMailProvider from './providers/MailProvider/models/IMailProvider';


container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);



container.registerSingleton<IUsersRepository>(
  'UsersRepository',
   UsersRepository,
);


container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
   UserTokensRepository
)


container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationRepository
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailsProvider[mailConfig.driver],
)


module.exports = container;







