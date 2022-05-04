import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WorkflowService } from 'projects/cms/src/shared/services/workflow.service';

@Component({
  selector: 'cms-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.less'],
})
export class WorkflowComponent implements OnInit {
  // PUBLIC
  public lstWorkflow = [];
  public pageSize = 10;
  public pageNumber = 1;
  public totalPage = 0;
  public isEdit = false;
  public isVisibleForm = false;
  public isLoading = false;
  public currentWorkflow = null;
  public mainForm: FormGroup;
  public obj = {
    id: null,
    description: null,
    name: null,
  };
  constructor(
    private workflowService: WorkflowService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllWorkflows();
  }

  /** PUBLIC METHOD */
  public getAllWorkflows() {
    this.baseService.showLoading(true);
    this.workflowService
      .getAllWorkflows(this.pageNumber - 1, this.pageSize)
      .subscribe((res) => {
        if (res && res.data) {
          this.baseService.showLoading(false);
          this.lstWorkflow = res.data.data;
          this.totalPage = res.data.total;
        } else {
          this.baseService.showLoading(false);
        }
      });
  }

  public onSubmit() {
    if (this.mainForm.valid) {
      this.isLoading = true;
      if (!this.isEdit) {
        this.obj.description = this.mainForm.controls.description.value;
        this.obj.name = this.mainForm.controls.name.value;
        this.baseService.showLoading(true);
        this.workflowService.createWorkflows(this.obj).subscribe((res) => {
          if (res && res.data) {
            this.baseService.showLoading(false);
            this.isLoading = false;
            this.baseService.showNotification(
              'Khởi tạo thành công workflow',
              Constants.NOTI_OK
            );
            this.getAllWorkflows();
            this.onCancel();
          } else {
            this.baseService.showNotification(
              'Khởi tạo không thành công workflow',
              Constants.NOTI_ERROR
            );
          }
        });
      } else {
        this.obj.description = this.mainForm.controls.description.value;
        this.obj.name = this.mainForm.controls.name.value;
        this.obj.id = this.currentWorkflow.id;
        this.baseService.showLoading(true);
        this.workflowService
          .updateWorkflows(this.obj, this.currentWorkflow.id)
          .subscribe((res) => {
            if (res) {
              this.baseService.showLoading(false);
              this.isLoading = false;
              this.baseService.showNotification(
                'Cập nhật thành công workflow',
                Constants.NOTI_OK
              );
              this.getAllWorkflows();
              this.onCancel();
            } else {
              this.baseService.showNotification(
                'Cập nhật không thành công workflow',
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

  public pageChange(e) {
    this.pageNumber = e;
    this.getAllWorkflows();
  }

  public onCreate() {
    this.isEdit = false;
    this.isVisibleForm = true;
    this.clearValue();
  }

  public onDelete(data) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa workflows <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.workflowService.deleteWorkflows(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa workflows hàng thành công',
                Constants.TOAST_OK
              );
              this.getAllWorkflows();
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

  public onCancel() {
    this.isVisibleForm = false;
    this.clearValue();
  }

  public onEdit(data) {
    this.isVisibleForm = true;
    this.isEdit = true;
    this.currentWorkflow = data;
    this.setValue(data);
  }

  public setValue(data) {
    this.mainForm.controls.name.setValue(data.name);
    this.mainForm.controls.description.setValue(data.description);
  }

  public clearValue() {
    this.mainForm.reset();
    this.obj.id = null;
    this.obj.name = null;
    this.obj.description = null;
  }

  /** PRIVATE METHOD */
  private createForm() {
    this.mainForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }
}
