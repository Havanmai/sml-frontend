export class LockerCabinetCaterory {
  id: number;
  name: string;
  note: string;
  status: number;
  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.note = obj.note;
    this.status = obj.status;
  }
}
