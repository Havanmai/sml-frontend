import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants, UserModel } from 'common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TaskType } from '../../data-type-task.data';
import { TaskModel } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'cms-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.less'],
})
export class CreateTaskComponent implements OnInit {
  createContentForm: FormGroup;
  createSubmitting: boolean = false;
  currentUser: UserModel;
  importerId: number;
  datenow: Date;
  listOfOption: Array<{ value: string; text: string }> = [];
  page: number = 0;
  size: number = 10;
  totalReceiver: number = 0;
  listOfType: Array<{ value: number; text: string }> = TaskType;
  isLoading = false;
  task: TaskModel;
  nzFilterOption = (): boolean => true;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private ticketService: TaskService,
    private baseService: BaseService
  ) {
    this.ticketService.castTask.subscribe((task) => (this.task = task));
  }

  ngOnInit(): void {
    this.createContentForm = this.fb.group({
      content: [null, [Validators.required]],
      deadline: [null, [Validators.required]],
      receiver: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null],
    });
    this.page = 1;
    this.size = 10;
    this.getUserCurrent();
  }

  getUserCurrent() {
    this.currentUser = this.baseService.getCachedUser();
    this.importerId = this.currentUser.id;
  }

  search(event) {
    this.page = 0;
    this.size = 10;
    this.keyreceiver = event;
    this.getReceiver();
  }

  loadMore(): void {
    if (this.totalReceiver > this.listOfOption.length) {
      this.isLoading = true;
      this.page = this.page + 1;
      this.getReceiver();
    }
  }

  keyreceiver: string;

  getReceiver() {
    this.ticketService
      .getReceiver(this.page, this.size, this.keyreceiver)
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

  submitContent() {
    for (const i in this.createContentForm.controls) {
      if (this.createContentForm.controls.hasOwnProperty(i)) {
        this.createContentForm.controls[i].markAsDirty();
        this.createContentForm.controls[i].updateValueAndValidity();
      }
    }

    this.datenow = new Date();
    if (!this.createContentForm.invalid) {
      this.ticketService
        .forwardTask(
          this.task.id,
          this.datenow.toISOString(),
          this.importerId,
          this.createContentForm.controls.content.value,
          this.createContentForm.controls.deadline.value.toISOString(),
          this.createContentForm.controls.receiver.value,
          this.createContentForm.controls.type.value,
          this.createContentForm.controls.description.value,
          this.task.status
        )
        .subscribe(
          (data: any) => {
            if (data.error == 0) {
              this.baseService.showToast(
                'Khởi tạo thành công task mới',
                Constants.TOAST_OK
              );
              const editTask = new CustomEvent('EditTask');
              window.dispatchEvent(editTask);
              this.cancelContent();
            }
          },
          (error: any) => {
            console.log('khơi tao thất bại', error);
          }
        );
    }
  }

  cancelContent() {
    this.modalRef.destroy();
  }
}
