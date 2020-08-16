import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from './../dtos/ICreateUserDTO';
import IFindAllprovidersDTO from "@modules/appointments/dtos/IFindAllProvidersDTO";

export default interface IUsersRepository {
    findAllProviders(data: IFindAllprovidersDTO): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User | undefined>;
    save(user: User): Promise<User>;

}
