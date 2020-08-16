import handlebars from 'handlebars'

import IParseTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IMailProvider from '../../MailProvider/models/IMailProvider';
import fs from 'fs'

class HandlebarsTEmplateProvider implements IMailTemplateProvider {
  public async parse({file, varibles}: IParseTemplateDTO): Promise<string> {

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',

    });
        const parseTemplate = handlebars.compile(templateFileContent);

      return parseTemplate(varibles);
  }
}



export default HandlebarsTEmplateProvider;
