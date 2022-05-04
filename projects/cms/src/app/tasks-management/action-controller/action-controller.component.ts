import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseService, Constants } from 'common';
import * as _ from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActionControllerService } from 'projects/cms/src/shared/services/action-controller.service';
@Component({
  selector: 'cms-action-controller',
  templateUrl: './action-controller.component.html',
  styleUrls: ['./action-controller.component.less'],
})
export class ActionControllerComponent implements OnInit {
  /**PUBLIC */
  public pageSize = 10;
  public pageNumber = 1;
  public totalPage = 0;
  public isEdit = false;
  public isVisibleForm = false;
  public isLoading = false;
  public currentAction = null;
  public lstAction = [];
  public lstStatus = [
    {
      id: 0,
      name: 'In Active',
    },
    {
      id: 1,
      name: 'Active',
    },
  ];
  public obj = {
    name: null,
    code: null,
    description: null,
    id: null,
    status: null,
  };
  public mainForm: FormGroup;
  /** CONSTRUCTOR */
  constructor(
    private baseService: BaseService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private actionControllerService: ActionControllerService
  ) {}

  /**LIFE CYCLE */
  ngOnInit(): void {
    this.getAllAction();

    this.createForm();
  }

  /**PUBLIC METHOD */
  public getAllAction() {
    this.isLoading = true;
    this.actionControllerService.getAllAction().subscribe((res) => {
      if (res && res.data) {
        this.isLoading = false;
        this.lstAction = res.data.data;
        this.totalPage = res.data.total;
      }
    });
  }

  public onCreate() {
    this.isEdit = false;
    this.isVisibleForm = true;
    this.clearValue();
  }

  public onEdit(data) {
    this.isVisibleForm = true;
    this.isEdit = true;
    this.currentAction = data;
    this.setValue(data);
  }

  public setValue(data) {
    this.mainForm.controls.name.setValue(data.name);
    this.mainForm.controls.description.setValue(data.description);
    this.mainForm.controls.code.setValue(data.code);
    this.mainForm.controls.status.setValue(data.status);
  }

  public onDelete(data) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa action <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.actionControllerService.deleteAction(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa action hàng thành công',
                Constants.TOAST_OK
              );
              this.getAllAction();
            }
          },
          () => {
            this.baseService.showLoading(false);
          }
        );
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  public onSubmit() {
    if (this.mainForm.valid) {
      this.isLoading = true;
      if (!this.isEdit) {
        this.obj.description = this.mainForm.controls.description.value;
        this.obj.name = this.mainForm.controls.name.value;
        this.obj.code = this.mainForm.controls.code.value;
        this.obj.status = this.mainForm.controls.status.value;
        this.baseService.showLoading(true);
        this.actionControllerService.createAction(this.obj).subscribe((res) => {
          if (res && res.data) {
            this.baseService.showLoading(false);
            this.isLoading = false;
            this.baseService.showNotification(
              'Khởi tạo thành công Action',
              Constants.NOTI_OK
            );
            this.getAllAction();
            this.onCancel();
          } else {
            this.baseService.showNotification(
              'Khởi tạo không thành công Action',
              Constants.NOTI_ERROR
            );
          }
        });
      } else {
        this.obj.description = this.mainForm.controls.description.value;
        this.obj.name = this.mainForm.controls.name.value;
        this.obj.code = this.mainForm.controls.code.value;
        this.obj.status = this.mainForm.controls.status.value;
        this.obj.id = this.currentAction.id;
        this.baseService.showLoading(true);
        this.actionControllerService
          .updateAction(this.obj, this.currentAction.id)
          .subscribe((res) => {
            if (res) {
              this.baseService.showLoading(false);
              this.isLoading = false;
              this.baseService.showNotification(
                'Cập nhật thành công action',
                Constants.NOTI_OK
              );
              this.getAllAction();
              this.onCancel();
            } else {
              this.baseService.showNotification(
                'Cập nhật không thành công action',
                Constants.NOTI_ERROR
              );
            }
          });
      }
    } else {
      Object.values(this.mainForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  public onCancel() {
    this.isVisibleForm = false;
    this.clearValue();
  }

  public pageChange(e) {
    this.pageNumber = e;
    this.getAllAction();
  }

  public clearValue() {
    this.mainForm.reset();
    this.obj.id = null;
    this.obj.name = null;
    this.obj.description = null;
    this.obj.code = null;
    this.obj.status = null;
  }

  /**PRIVATE METHOD */

  private createForm() {
    this.mainForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      status: new FormControl(null),
      code: new FormControl(null, Validators.required),
    });
  }
}
