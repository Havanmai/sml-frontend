import { UserModel } from '../../system-setting/user/user.model';

export class TicketModel {
  /* confirmBy	: UserModel;
    confirmDate	:string; */
  createdBy: UserModel;
  createdDate: Date;
  id: number;
  note: string;
  status: number;
  title: string;

  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    /* this.confirmBy	= obj.confirmBy;
    this.confirmDate	= obj.confirmDate; */
    this.createdBy = obj.createdBy;
    this.createdDate = obj.createdDate;
    this.id = obj.id;
    this.note = obj.note;
    this.status = obj.status;
    this.title = obj.title;
  }
}
