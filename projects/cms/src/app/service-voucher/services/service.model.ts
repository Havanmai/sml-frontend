export class ServiceModel {
  id: number;
  code: string;
  name: string;
  description: string;
  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.code = obj.code;
    this.name = obj.name;
    this.description = obj.description;
  }
}
