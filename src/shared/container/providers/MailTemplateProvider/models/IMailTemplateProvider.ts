import IParseTempalteDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseTempalteDTO): Promise<string>
}
