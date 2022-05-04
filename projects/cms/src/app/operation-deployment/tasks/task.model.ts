import { UserModel } from '../../system-setting/user/user.model';

export class TaskModel {
  assignee: UserModel;
  createdDate: Date;
  createdUser: UserModel;
  deadline: Date;
  description: string;
  endDate: Date;
  id: number;
  previousTaskId: number;
  startDate: string;
  status: number;
  ticket: string;
  title: string;
  type: number;

  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.assignee = obj.assignee;
    this.createdDate = obj.createdDate;
    this.createdUser = obj.createdUser;
    this.deadline = obj.deadline;
    this.description = obj.description;
    this.endDate = obj.endDate;
    this.id = obj.id;
    this.previousTaskId = obj.previousTaskId;
    this.startDate = obj.startDate;
    this.status = obj.status;
    this.ticket = obj.ticket;
    this.title = obj.title;
    this.type = obj.type;
  }
}
