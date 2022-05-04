import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { UpdateService } from './update.service';

@Component({
  selector: 'cms-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less'],
})
export class UpdateComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  total: number = 0;
  listUpdates: any[];

  showCreateDialog = false;
  submitting: boolean = false;

  createForm!: FormGroup;
  updaterChangeFlag: boolean = false;

  fileTypeError1: string;
  fileTypeError2: string;

  fileList1: NzUploadFile[] = [];
  fileList2: NzUploadFile[] = [];

  listCategory: any[];

  showEditDialog: boolean = false;

  radioValue: boolean;
  currentSelectData: any;
  updating: boolean = false;

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private updateService: UpdateService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: [null],
      type: [1, [Validators.required]],
      category: [0, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, []],
      newUpdater: [null, []],
    });

    setTimeout(() => {
      this.reload();
    }, 100);

    setTimeout(() => {
      this.updateService.getAllLockerCategory().subscribe((data: any) => {
        if (data.error == 0) {
          this.listCategory = data.data.data;
        }
      });
    }, 1000);
  }

  submitForm() {
    for (const i in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createForm.invalid) {
      if (this.fileList1.length <= 0)
        this.fileTypeError1 = 'Vui lòng chọn file cập nhật';
      else {
        let updaterFile: any = null;
        if (this.updaterChangeFlag && this.fileList2.length > 0) {
          updaterFile = this.fileList2[0];
        }
        this.submitting = true;
        this.updateService
          .createVersion(
            this.createForm.get('type').value,
            this.createForm.get('category').value,
            this.createForm.get('name').value,
            this.fileList1[0],
            updaterFile,
            this.createForm.get('description').value
          )
          .subscribe(
            (data: any) => {
              this.submitting = false;
              if (data.error == 0) {
                this.showCreateDialog = false;
                this.baseService.showToast(
                  'Tạo mới phiên bản thành công',
                  Constants.TOAST_OK
                );
                setTimeout(() => {
                  this.reload();
                }, 200);
              }
            },
            () => {
              this.submitting = false;
            }
          );
      }
    }
  }

  showDialogCreate() {
    this.submitting = false;
    this.showCreateDialog = true;
  }

  cancelGroup() {
    this.showCreateDialog = false;
  }

  pageChange(index: number) {
    this.page = index;
    this.reload();
  }

  reload() {
    if (this.page < 1) this.page = 1;

    this.baseService.showLoading(true);
    this.updateService.getALlVersion(this.page - 1, this.size).subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        if (data.error === 0) {
          this.listUpdates = data.data.data;
          this.total = data.data.total;
        }
      },
      () => this.baseService.showLoading(false)
    );
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    const isApk =
      file.type === 'application/x-zip-compressed' ||
      file.type === 'application/vnd.android.package-archive';
    if (!isApk) {
      this.fileTypeError1 = 'Hệ thống chỉ chấp nhận định dạng .apk hoặc .zip';
      return false;
    } else {
      this.fileTypeError1 = null;
    }
    if (this.fileList1) this.fileList1.length = 0;
    this.fileList1 = [file];
    return false;
  };

  beforeUpload2 = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    const isApk = file.type === 'application/vnd.android.package-archive';
    if (!isApk) {
      this.fileTypeError2 = 'Hệ thống chỉ chấp nhận định dạng .apk';
      return false;
    } else {
      this.fileTypeError2 = null;
    }
    if (this.fileList2) this.fileList2.length = 0;
    this.fileList2 = [file];
    return false;
  };

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
    } else if (status === 'error') {
    }
  }

  updaterChange(event) {
    this.updaterChangeFlag = event;
  }

  editUpdate(data: any) {
    this.showEditDialog = true;
    this.currentSelectData = data;
    this.radioValue = this.currentSelectData.status ? true : false;
  }

  cancelEdit() {
    this.showEditDialog = false;
  }

  updateStatus() {
    let value: number = this.radioValue ? 1 : 0;
    if (value != this.currentSelectData.status) {
      this.updating = true;
      this.updateService
        .updateStatus(this.currentSelectData.id, value)
        .subscribe(
          (data: any) => {
            this.updating = false;
            if (data.error == 0) {
              this.showEditDialog = false;
              this.baseService.showToast(
                'Cập nhật thành công',
                Constants.TOAST_OK
              );
              setTimeout(() => {
                this.reload();
              }, 200);
            }
          },
          () => {
            this.updating = false;
          }
        );
    }
  }
}
