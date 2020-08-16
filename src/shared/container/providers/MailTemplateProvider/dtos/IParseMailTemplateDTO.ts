interface ITemplatVariables  {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  varibles: ITemplatVariables
}
