export class LockerRatingBuilding {
  id: number;
  name: string;
  note: string;
  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.note = obj.note;
  }
}
