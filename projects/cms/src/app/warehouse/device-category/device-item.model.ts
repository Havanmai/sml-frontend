import { DeviceCategory } from './device-category.model';

export class DeviceItem {
  id: number;
  name: string;
  category: DeviceCategory;
  unit: string;
  isLockerCabinet: boolean;
  isBlock: boolean;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.category = obj.category;
    this.unit = obj.unit;
    this.isLockerCabinet = obj.isLockerCabinet;
    this.isBlock = obj.isBlock;
  }
}
