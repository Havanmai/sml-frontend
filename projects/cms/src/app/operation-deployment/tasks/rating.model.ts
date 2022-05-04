import { UserModel } from '../../system-setting/user/user.model';
import { TaskModel } from './task.model';

export class Rating {
  id: number;
  description: string;
  rate: number;
  rateBy: UserModel;
  timestamp: Date;
  task: TaskModel;
  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.description = obj.description;
    this.rate = obj.rate;
    this.rateBy = obj.rateBy;
    this.timestamp = obj.timestamp;
    this.task = obj.task;
  }
}
