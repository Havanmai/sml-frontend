import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService, Constants } from 'common';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { UserModel } from '../../../system-setting/user/user.model';
import { FileAttach } from '../file.model';
import { Rating } from '../rating.model';
import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';
import { TicketModel } from '../ticket.model';
import { AttachFileComponent } from './attach-file/attach-file.component';
import { CompleteCancelForwardComponent } from './complete-cancel-forward/complete-cancel-forward.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditContentComponent } from './edit-content/edit-content.component';

@Component({
  selector: 'cms-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
  id: number;
  ItemTicket: TicketModel;
  listOfTask: TaskModel[];
  datenow: Date;
  currentUser: UserModel;
  importerId: number;
  changeButton: boolean = false;

  showAttachFile: boolean = false;
  constructor(
    private modal: NzModalService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private ticketService: TaskService
  ) {
    this.activeroute.paramMap.subscribe((param: any) => {
      this.id = param.params.id;
      this.getDetailTicket(this.id);
    });
    window.addEventListener('EditTask', () => {
      this.getListTask();
    });
  }

  ngOnInit(): void {
    this.fileCodeList = [];
    this.getListTask();
  }

  getDetailTicket(id: number) {
    this.ticketService.getDetailTickets(id).subscribe(
      (data: any) => {
        this.ItemTicket = new TicketModel(data.data);
      },
      (error: any) => {
        console.log('Không gwuir được request lấy chi tiết ticket', error);
      }
    );
  }

  getListTask() {
    this.ticketService.getAllTaskByTicket(this.id).subscribe(
      (data: any) => {
        console.log('list Task', data);
        if (data.error == 0) {
          this.resonseListTask(data);
        }
      },
      (error: any) => {
        console.log('Khong gui dc request lay list data', error);
      }
    );
  }

  resonseListTask(data: any) {
    this.listOfTask = [];
    if (data.data.length > 0) {
      data.data.forEach((element) => {
        let item = new TaskModel(element);
        this.listOfTask.push(item);
      });
    }
  }

  idTaskFocus: number;
  activeCollapseChange(event, id: number) {
    if (event) {
      this.idTaskFocus = id;
      this.getRateByTask(id);
    }
  }

  // lấy rating
  rateTask: Rating;
  getRateByTask(id: number) {
    this.ticketService.getDataRatingByTask(id).subscribe(
      (data: any) => {
        if (data.error == 0) {
          if (data.data != null) {
            this.rateTask = data.data;
          } else {
            this.rateTask = null;
          }
        }
      },
      (error: any) => {
        console.log('Khong gui dc request lay data rating của task', error);
      }
    );
  }

  //#region xử lý file
  codeErrMessage: string;
  fileCodeList: NzUploadFile[] = [];
  codeUploading: boolean;
  hiddenfile: boolean = false;
  filename: string;

  beforeUploadCode = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    const isExcel =
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.type === '.csv' ||
      file.type === 'application/msword' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/vnd.ms-powerpoint' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.type === 'application/pdf' ||
      file.type === 'image/jpeg';
    if (!isExcel) {
      this.baseService.showNotification(
        'Vui lòng chỉ chọn định dạng file .xlsx!, .xls, .doc, .docx, .ppt, .pptx, .png, .jpeg, .jpg',
        Constants.NOTI_ERROR
      );
      return false;
    }
    if (this.fileCodeList) this.fileCodeList.push(file);
    this.codeErrMessage = '';
    this.handleUploadCode();
    return false;
  };

  handleUploadCode(): void {
    console.log(' Xử lý file được thêm vào', this.fileCodeList);
    this.handleCodeChange('uploading');
    this.fileCodeList.forEach((file) => {
      if (file) {
        this.handleCodeChange('done', file);
      } else {
        this.handleCodeChange('error');
      }
    });
  }

  removeFile(id: string) {
    this.fileCodeList = this.fileCodeList.filter((item) => {
      return item.uid !== id;
    });
  }

  handleCodeChange(status: string, data?: any): void {
    switch (status) {
      case 'uploading':
        this.codeUploading = true;
        break;
      case 'done':
        this.codeUploading = false;
        this.hiddenfile = false;
        break;
      case 'removed':
        this.codeUploading = false;
        this.hiddenfile = true;

        break;
      case 'error':
        this.codeErrMessage = 'Upload bị lỗi, vui lòng thử lại';
        this.codeUploading = false;
        break;
    }
  }
  //#endregion xử lý file
  //Xử lý file ẩn
  listOfFile: FileAttach[];

  attachFile() {
    this.showAttachFile = !this.showAttachFile;
    if (this.showAttachFile) {
      this.ticketService.getAllFileByTicket(this.id).subscribe((data: any) => {
        if (data.error == 0) {
          this.responeFileAttach(data);
        }
      });
    } else {
      this.listOfFile = [];
    }
  }

  responeFileAttach(data: any) {
    this.listOfFile = [];
    if (data.data.length > 0) {
      data.data.forEach((element) => {
        let item = new FileAttach(element);
        this.listOfFile.push(item);
      });
    }
  }

  //#region edit title
  editTitle: boolean = false;
  editTitleForm: FormGroup;
  editSubmitting: boolean = false;
  showEditTitle() {
    this.editTitle = true;
    this.editTitleForm = this.fb.group({
      title: [null, [Validators.required]],
    });
  }
  submitTitle() {
    for (const i in this.editTitleForm.controls) {
      if (this.editTitleForm.controls.hasOwnProperty(i)) {
        this.editTitleForm.controls[i].markAsDirty();
        this.editTitleForm.controls[i].updateValueAndValidity();
      }
      if (!this.editTitleForm.invalid) {
        this.ticketService
          .updateTittleTicket(this.id, this.editTitleForm.controls.title.value)
          .subscribe(
            (data: any) => {
              if (data.error == 0) {
                this.baseService.showToast(
                  'Chỉnh sửa tiêu đề nhiệm vụ thành công',
                  Constants.TOAST_OK
                );
                this.getDetailTicket(this.id);
                this.cancelTitle();
              }
            },
            (error: any) => {
              console.log('không gui được thông tin chỉnh sửa title', error);
            }
          );
      }
    }
  }

  cancelTitle() {
    this.editTitle = false;
  }
  //#endregion edit title

  comleteSubmitting: boolean = false;

  submitCompleteConfirm() {}

  /*  cancelCompleteConfirm(){
  this.completeConfirm=false;
 } */
  //#endregion complete confirm

  //#region edit rate
  editRate: boolean = false;
  openRate: boolean = false;
  editRateForm: FormGroup;
  editRateSubmitting: boolean = false;
  showRateTitle() {
    this.openRate = true;
    this.editRateForm = this.fb.group({
      description: [null, [Validators.required]],
      stars: [null, [Validators.required]],
    });

    if (this.rateTask != null) {
      this.editRate = true;
      this.editRateForm.controls.stars.setValue(this.rateTask.rate);
      this.editRateForm.controls.description.setValue(
        this.rateTask.description
      );
    } else {
      this.editRate = false;
      this.editRateForm.controls.stars.setValue(null);
      this.editRateForm.controls.description.setValue(null);
    }
  }
  submitRate() {
    for (const i in this.editRateForm.controls) {
      if (this.editRateForm.controls.hasOwnProperty(i)) {
        this.editRateForm.controls[i].markAsDirty();
        this.editRateForm.controls[i].updateValueAndValidity();
      }
    }
    this.datenow = new Date();
    this.currentUser = this.baseService.getCachedUser();
    this.importerId = this.currentUser.id;
    if (!this.editRateForm.invalid) {
      if (this.editRate) {
        this.ticketService
          .updateRating(
            this.rateTask.id,
            this.editRateForm.controls.stars.value,
            this.importerId,
            this.editRateForm.controls.description.value,
            this.datenow.toISOString()
          )
          .subscribe(
            (data: any) => {
              if (data.error == 0) {
                this.baseService.showToast(
                  'Chỉnh sửa đánh giá thành công',
                  Constants.TOAST_OK
                );
                this.rateTask = data.data;
                this.cancelRate();
              }
            },
            (error: any) => {
              console.log('không gui được thông tin chỉnh sửa đánh giá', error);
            }
          );
      } else {
        this.ticketService
          .createRating(
            this.editRateForm.controls.stars.value,
            this.importerId,
            this.idTaskFocus,
            this.editRateForm.controls.description.value,
            this.datenow.toISOString()
          )
          .subscribe(
            (data: any) => {
              if (data.error == 0) {
                console.log('đánh giá', data);
                this.baseService.showToast(
                  'Đánh giá thành công',
                  Constants.TOAST_OK
                );
                this.rateTask = data.data;
                this.cancelRate();
              }
            },
            (error: any) => {
              console.log('không gui được thông tin chỉnh sửa title', error);
            }
          );
      }
    }
  }

  cancelRate() {
    this.openRate = false;
  }

  //#endregion edit rate

  editContent(task: TaskModel) {
    this.ticketService.editTask(task);
    this.modal.create({
      nzContent: EditContentComponent,
      nzClosable: false,
    });
  }

  createContent(task: TaskModel) {
    this.ticketService.editTask(task);
    this.modal.create({
      nzContent: CreateTaskComponent,
      nzClosable: false,
    });
  }

  comFor(task: TaskModel) {
    this.ticketService.editTask(task);
    this.ticketService.statusCurrent(true);
    this.modal.create({
      nzContent: CompleteCancelForwardComponent,
      nzClosable: false,
    });
  }

  canFor(task: TaskModel) {
    this.ticketService.editTask(task);
    this.ticketService.statusCurrent(false);
    this.modal.create({
      nzContent: CompleteCancelForwardComponent,
      nzClosable: false,
    });
  }
  //Xử lý show file

  listOfFileTask: FileAttach[];
  showFile: boolean = false;
  showfileTask(id: number) {
    this.showFile = true;
    this.getListFileOfTask(id);
  }

  getListFileOfTask(id: number) {
    this.ticketService.showFile(id).subscribe((data: any) => {
      if (data.error == 0) {
        this.responeShowFile(data);
      }
    });
  }

  responeShowFile(data: any) {
    this.listOfFileTask = [];
    if (data.data.length > 0) {
      data.data.forEach((element) => {
        let item = new FileAttach(element);
        this.listOfFileTask.push(item);
      });
    }
  }

  hiddenfileTask() {
    this.showFile = false;
  }

  // Xử lý thêm file mới

  addFileTask(id: number) {
    this.ticketService
      .addFileOfTask(id, this.fileCodeList)
      .subscribe((data: any) => {
        if (data.error == 0) {
          this.baseService.showToast(
            'Thêm file vào task thành công',
            Constants.TOAST_OK
          );
          this.getListFileOfTask(id);
          this.fileCodeList.length = 0;
        }
      });
  }

  buttonMore: boolean = true;

  changeAction() {
    this.changeButton = true;
    this.buttonMore = false;
  }

  hiddenAction() {
    this.changeButton = false;
    this.buttonMore = true;
  }

  listAllFile: FileAttach[] = [];
}
