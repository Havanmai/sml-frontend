import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserModel } from 'projects/cms/src/app/system-setting/user/user.model';
import { TaskType } from '../../data-type-task.data';
import { TaskModel } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'cms-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.less'],
})
export class EditContentComponent implements OnInit {
  task: TaskModel;
  editContentForm: FormGroup;
  editSubmitting: boolean = false;
  currentUser: UserModel;
  importerId: number;
  datenow: Date;
  listOfOption: Array<{ value: string; text: string }> = [];
  page: number = 0;
  size: number = 10;
  totalReceiver: number = 0;
  listOfType: Array<{ value: number; text: string }> = TaskType;
  isLoading = false;
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
    this.editContentForm = this.fb.group({
      content: [null, [Validators.required]],
      deadline: [null, [Validators.required]],
      receiver: [null, [Validators.required]],
      description: [null],
    });
    this.editContentForm.controls.content.setValue(this.task.title);
    this.editContentForm.controls.receiver.setValue(this.task.assignee.id);
    this.editContentForm.controls.deadline.setValue(this.task.deadline);
    this.editContentForm.controls.description.setValue(this.task.description);
  }

  showEditContent() {}

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
    for (const i in this.editContentForm.controls) {
      if (this.editContentForm.controls.hasOwnProperty(i)) {
        this.editContentForm.controls[i].markAsDirty();
        this.editContentForm.controls[i].updateValueAndValidity();
      }
    }

    this.datenow = new Date();
    if (!this.editContentForm.invalid) {
      this.ticketService
        .updateTask(
          this.task.id,
          this.editContentForm.controls.content.value,
          this.editContentForm.controls.receiver.value,
          this.editContentForm.controls.deadline.value,
          this.editContentForm.controls.description.value
        )
        .subscribe(
          (data: any) => {
            if (data.error == 0) {
              this.baseService.showToast(
                'Chỉnh sửa thành công task mới',
                Constants.TOAST_OK
              );
              const editTask = new CustomEvent('EditTask');
              window.dispatchEvent(editTask);
              this.cancelContent();
            }
          },
          (error: any) => {
            console.log('Chỉnh sửa thất bại', error);
          }
        );
    }
  }

  cancelContent() {
    this.modalRef.destroy();
  }
}
