import { LockerStatus } from './locker-status.model';

export class Locker {
  id: number;
  block: number;
  sequence: number;
  sizeType: number;
  maVanDon?: string;
  status?: number;
  serviceType?: number;
  objectSensor?: string;
  doorSensor?: string;
  light?: string;
  uvLight?: string;
  cabinet?: LockerStatus;

  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.block = obj.block;
    this.sequence = obj.sequence;
    this.sizeType = obj.sizeType;
    this.maVanDon = obj.maVanDon;
    this.status = obj.status;
    this.serviceType = obj.serviceType;
    this.objectSensor = obj.objectSensor;
    this.doorSensor = obj.doorSensor;
    this.light = obj.light;
    this.uvLight = obj.uvLight;
    this.cabinet = obj.cabinet;
  }
}
