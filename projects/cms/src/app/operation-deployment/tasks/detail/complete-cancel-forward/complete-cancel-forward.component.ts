import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants, UserModel } from 'common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TaskType } from '../../data-type-task.data';
import { TaskModel } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'cms-complete-cancel-forward',
  templateUrl: './complete-cancel-forward.component.html',
  styleUrls: ['./complete-cancel-forward.component.less'],
})
export class CompleteCancelForwardComponent implements OnInit {
  editContentForm: FormGroup;
  editSubmitting: boolean = false;
  forward: boolean = false;
  task: TaskModel;
  currentUser: UserModel;
  importerId: number;
  datenow: Date;
  listOfOption: Array<{ value: string; text: string }> = [];
  page: number = 0;
  size: number = 10;
  totalReceiver: number = 0;
  listOfType: Array<{ value: number; text: string }> = TaskType;
  isLoading = false;
  complete: boolean;
  status: number;
  nzFilterOption = (): boolean => true;
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private ticketService: TaskService,
    private baseService: BaseService
  ) {
    this.ticketService.castTask.subscribe((task) => (this.task = task));
    this.ticketService.castStatus.subscribe(
      (status) => (this.complete = status)
    );
  }

  ngOnInit(): void {
    this.editContentForm = this.fb.group({
      note: [null, [Validators.required]],
      checked: [false],
      deadline: [null],
      receiver: [null],
      type: [null],
      content: [null],
    });
    this.editContentForm.controls.checked.setValue(false);
  }

  submitContent() {
    this.datenow = new Date();
    for (const i in this.editContentForm.controls) {
      if (this.editContentForm.controls.hasOwnProperty(i)) {
        this.editContentForm.controls[i].markAsDirty();
        this.editContentForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.complete) {
      this.status = 2;
    } else {
      this.status = 3;
    }
    if (!this.editContentForm.controls.checked.value) {
      this.ticketService
        .forwardStatus(
          this.task.id,
          this.status,
          this.editContentForm.controls.note.value
        )
        .subscribe((data: any) => {
          if (data.error == 0) {
            this.baseService.showToast('Chuyển trạng thái task thành công');
            const editTask = new CustomEvent('EditTask');
            window.dispatchEvent(editTask);
            this.cancelContent();
          }
        });
    } else {
      this.ticketService
        .forwardTask(
          this.task.id,
          this.datenow.toISOString(),
          this.importerId,
          this.editContentForm.controls.content.value,
          this.editContentForm.controls.deadline.value.toISOString(),
          this.editContentForm.controls.receiver.value,
          this.editContentForm.controls.type.value,
          this.editContentForm.controls.note.value,
          this.status
        )
        .subscribe(
          (data: any) => {
            if (data.error == 0) {
              this.baseService.showToast(
                'Chuyển trạng thái và chuyển tiếp task thành công',
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

  changeStatus(event) {
    if (event) {
      this.forward = true;
    } else {
      this.forward = false;
    }
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
}
