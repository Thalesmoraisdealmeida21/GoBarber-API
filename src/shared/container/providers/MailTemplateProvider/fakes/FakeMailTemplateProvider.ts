import IParseTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IMailProvider from '../../MailProvider/models/IMailProvider';


class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}



export default FakeMailTemplateProvider;
