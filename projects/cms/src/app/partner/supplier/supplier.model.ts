export class Supplier {
  address: string;
  code: string;
  email: string;
  id: number;
  name: string;
  note: string;
  phoneNumber: string;
  status: number;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.address = obj.address;
    this.code = obj.code;
    this.email = obj.email;
    this.id = obj.id;
    this.name = obj.name;
    this.note = obj.note;
    this.phoneNumber = obj.phoneNumber;
    this.status = obj.status;
  }
}
