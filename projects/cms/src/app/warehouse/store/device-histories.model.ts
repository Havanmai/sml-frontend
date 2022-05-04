import { DeviceModel } from './device.model';

export class DeviceHistoryModel {
  device: DeviceModel;
  id: number;
  note: string;
  task: {
    assignee: {
      activated: true;
      email: string;
      firstName: string;
      id: 0;
      imageUrl: string;
      langKey: string;
      lastName: string;
      login: string;
      resetDate: string;
    };
    description: string;
    id: 0;
    status: string;
    title: number;
    type: string;
  };
  type: string;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.device = obj.device;
    this.type = obj.type;
    this.id = obj.id;
    this.note = obj.note;
    this.task = obj.task;
  }
}
