import { LockerStatus } from './locker-status.model';

export class HardwareStatus {
  id: number;
  softwareVersion: string;
  firstCamera: number;
  secondCamera: number;
  powerMeter: number;
  wifi: number;
  screen: number;
  blockCount: number;

  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.softwareVersion = obj.softwareVersion;
    this.firstCamera = obj.firstCamera;
    this.secondCamera = obj.secondCamera;
    this.powerMeter = obj.powerMeter;
    this.wifi = obj.wifi;
    this.screen = obj.screen;
    this.blockCount = obj.blockCount;
  }
}
