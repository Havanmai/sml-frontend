import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TaskModel } from './task.model';
import { TicketModel } from './ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTicket(
    page: number = 0,
    size: number = 10,
    mytask: boolean = false,
    status: number,
    id: number,
    name: number,
    startDate: string,
    endDate: string
  ) {
    let url =
      'smartlocker-ticket/api/v1/tickets/filter?page=' +
      page +
      '&size=' +
      size +
      '&myTask=' +
      mytask +
      '&sort=id,desc';
    if (status > 0) {
      url = url.concat('&status=' + status);
    }
    if (id) {
      url = url.concat('&id.equals=' + id);
    }
    if (name) {
      url = url.concat('&confirmBy.equals=' + name);
    }
    if (startDate) {
      url = url.concat('&confirmDate.greaterThan=', startDate);
    }
    if (endDate) {
      url = url.concat('&confirmDate.lessThan=', endDate);
    }

    return this.http.get(url);
  }

  createTicket(
    title: string,
    content: string,
    receiver: number,
    createById: number,
    createdDate: string,
    taskType: number,
    deadline: string
  ) {
    let json = {
      assignee: receiver,
      createdDate: createdDate,
      createdUser: createById,
      taskTitle: content,
      taskType: taskType,
      ticketTitle: title,
      deadline: deadline,
    };
    return this.http.post(
      'smartlocker-ticket/api/v1/tickets',
      JSON.stringify(json)
    );
  }

  getReceiver(page: number = 0, size: number = 10, value: string) {
    return this.http.get('smartlocker/api/v1/users/search?search=' + value);
  }

  getDetailTickets(id: number) {
    return this.http.get('smartlocker-ticket/api/v1/tickets/' + id);
  }

  reloadItemList$ = new Subject<void>();
  reloadItem() {
    this.reloadItemList$.next();
  }

  /**API Task */
  getAllTaskByTicket(id: number) {
    return this.http.get(
      'smartlocker-ticket/api/v1/tasks/get-all-by-ticket?ticketId=' + id
    );
  }

  getDetailTaskByTicket(id: number) {
    return this.http.get('smartlocker-ticket/api/v1/tasks/' + id);
  }

  getAllFileByTicket(id: number) {
    return this.http.get(
      'smartlocker-ticket/api/v1/tickets/' + id + '/get-files'
    );
  }

  getDataRatingByTask(id: number) {
    return this.http.get(
      'smartlocker-ticket/api/v1/task-ratings/find-by-task?taskId=' + id
    );
  }

  updateTittleTicket(id: number, title: string) {
    let json = {
      id: id,
      title: title,
    };
    return this.http.patch(
      'smartlocker-ticket/api/v1/tickets/' + id,
      JSON.stringify(json)
    );
  }

  createRating(
    rate: number,
    rateById: number,
    idTask: number,
    decription: string,
    time: string
  ) {
    let json = {
      rate: rate,
      rateBy: {
        id: rateById,
      },
      task: {
        id: idTask,
      },
      note: decription,
      timestamp: time,
    };
    return this.http.post(
      'smartlocker-ticket/api/v1/task-ratings',
      JSON.stringify(json)
    );
  }

  updateRating(
    id: number,
    rate: number,
    rateById: number,
    decription: string,
    time: string
  ) {
    let json = {
      id: id,
      rate: rate,
      rateBy: {
        id: rateById,
      },
      note: decription,
      timestamp: time,
    };
    return this.http.patch(
      'smartlocker-ticket/api/v1/task-ratings/' + id,
      JSON.stringify(json)
    );
  }

  //Xử lý action task
  updateTask(
    id: number,
    title: string,
    idAssign: number,
    deadline: string,
    description: string
  ) {
    let json = {
      assignee: {
        id: idAssign,
      },
      deadline: deadline,
      note: description,
      id: id,
      title: title,
    };
    return this.http.patch(
      'smartlocker-ticket/api/v1/tasks/' + id,
      JSON.stringify(json)
    );
  }

  private task = new BehaviorSubject<TaskModel>(null);
  castTask = this.task.asObservable();

  editTask(newTask: TaskModel) {
    this.task.next(newTask);
  }

  createTask(
    idTask: number,
    createdDate: string,
    userId: number,
    title: string,
    deadline: string,
    assignee: number,
    type: number,
    note: string
  ) {
    let json = {
      status: 1,
      newTask: true,
      taskId: idTask,
      updateDate: createdDate,
      userId: userId,
      nTitle: title,
      nDeadline: deadline,
      nAssignee: assignee,
      nType: type,
      note: note,
    };
    return this.http.post(
      'smartlocker-ticket/api/v1/tasks/action',
      JSON.stringify(json)
    );
  }

  forwardStatus(id: number, status: number, description: string) {
    let json = {
      id: id,
      status: status,
      note: description,
    };
    return this.http.patch(
      'smartlocker-ticket/api/v1/tasks/' + id,
      JSON.stringify(json)
    );
  }

  forwardTask(
    id: number,
    createdDate: string,
    userId: number,
    title: string,
    deadline: string,
    assignee: number,
    type: number,
    note: string,
    status: number
  ) {
    let json = {
      status: status,
      newTask: true,
      taskId: id,
      updateDate: createdDate,
      userId: userId,
      nTitle: title,
      nDeadline: deadline,
      nAssignee: assignee,
      nType: type,
      note: note,
    };
    return this.http.post(
      'smartlocker-ticket/api/v1/tasks/action',
      JSON.stringify(json)
    );
  }

  private status = new BehaviorSubject<boolean>(false);
  castStatus = this.status.asObservable();

  statusCurrent(newStatus: boolean) {
    this.status.next(newStatus);
  }

  //Xử lý file Task
  showFile(id: number) {
    return this.http.get(
      'smartlocker-ticket/api/v1/tasks/' + id + '/get-files'
    );
  }

  addFileOfTask(id: number, file: any[]) {
    const formData = new FormData();
    file.forEach((item) => {
      formData.append('files', item);
    });
    return this.http.post<FormData>(
      'smartlocker-ticket/api/v1/tasks/' + id + '/upload-files',
      formData
    );
  }
}
