import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TaskType } from './data-type-task.data';
import { TaskService } from './task.service';
import { TicketModel } from './ticket.model';

@Component({
  selector: 'cms-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less'],
})
export class TasksComponent implements OnInit {
  listOfData: TicketModel[] = [];
  total: number;
  page: number;
  size: number;
  status: number = 0;
  dateStartCreate: string;
  dateEndCreate: string;
  myTask: boolean = false;
  pageReceiver: number = 0;
  sizeReceiver: number = 10;
  totalReceiver: number = 0;
  listOfType: Array<{ value: number; text: string }> = TaskType;
  isLoading = false;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = (): boolean => true;
  createBy: number;
  idTicket: number;

  constructor(
    private modal: NzModalService,
    private ticketService: TaskService
  ) {
    this.ticketService.reloadItemList$.subscribe((data: any) => {
      this.size=10;
      this.page=1;
      this.getAllTicket();
    });
  }

  search(event) {
    this.pageReceiver = 0;
    this.sizeReceiver = 10;
    this.keyreceiver = event;
    this.getReceiver();
  }

  loadMore(): void {
    if (this.totalReceiver > this.listOfOption.length) {
      this.isLoading = true;
      this.pageReceiver = this.pageReceiver + 1;
      this.getReceiver();
    }
  }

  keyreceiver: string;

  getReceiver() {
    this.ticketService
      .getReceiver(this.pageReceiver, this.sizeReceiver, this.keyreceiver)
      .subscribe(
        (data: any) => {
          if (data.error == 0) {
            console.log(data);
            this.responseProcessReceiver(data);
          }
        },
        (error: any) => {
          console.log('không gửi được request tạo mới', error);
        }
      );
  }

  responseProcessReceiver(data: any) {
    this.totalReceiver = data.data.total;
    this.listOfOption = [];
    data.data.data.forEach((item) => {
      this.listOfOption.push({
        value: item.id,
        text: item.lastName.concat(' ', item.firstName),
      });
    });
  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    this.getAllTicket();
  }

  pageChange(event) {}

  onChange(result: Date[]): void {
    console.log(result);
    if (result.length > 0) {
      this.dateStartCreate = result[0].toISOString();
      this.dateEndCreate = result[1].toISOString();
      this.searchAll();
    } else {
      this.dateStartCreate = null;
      this.dateEndCreate = null;
      this.searchAll();
    }
  }

  searchAll() {
    this.page = 1;
    this.size = 10;
    this.getAllTicket();
  }

  getAllTicket() {
    this.ticketService
      .getAllTicket(
        this.page - 1,
        this.size,
        this.myTask,
        this.status,
        this.idTicket,
        this.createBy,
        this.dateStartCreate,
        this.dateEndCreate
      )
      .subscribe(
        (data: any) => {
          if (data.error == 0) {
            this.responeProcess(data);
          }
        },
        (error: any) => {
          console.log('Không gửi được yêu cầu lấy ticket', error);
        }
      );
  }

  responeProcess(data: any) {
    this.total = data.data.total;
    this.listOfData = [];
    data.data.data.forEach((element) => {
      let item = new TicketModel(element);
      this.listOfData.push(item);
    });
  }

  alltask() {
    this.page=1;
    this.size=10;
    this.myTask = false;
    this.status = 0;
    this.getAllTicket();
  }

  mytask() {
    this.page=1;
    this.size=10;
    this.myTask = true;
    this.status = 0;
    this.getAllTicket();
  }

  dotask() {
    this.page=1;
    this.size=10;
    this.status = 1;
    this.myTask = true;
    this.getAllTicket();
  }

  completetask() {
    this.page=1;
    this.size=10;
    this.status = 2;
    this.myTask = true;
    this.getAllTicket();
  }

  canceltask() {
    this.page=1;
    this.size=10;
    this.status = 3;
    this.myTask = true;
    this.getAllTicket();
  }

  createTicket() {
    this.modal.create({
      nzContent: CreateTicketComponent,
      nzClosable: false,
    });
  }
}
