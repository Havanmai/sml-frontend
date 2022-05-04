import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StateService } from 'projects/cms/src/shared/services/state.service';

@Component({
  selector: 'cms-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.less'],
})
export class StateComponent implements OnInit {
  /** PUBLIC */
  public lstState = [];
  public listStateChildrenData = [];
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
    private stateService: StateService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllState();
  }

  /** PUBLIC METHOD */
  public routerLink(id) {
    this.router.navigateByUrl('state/detail/' + id);
  }
  public getAllState() {
    this.baseService.showLoading(true);
    this.stateService
      .getAllStates(this.pageNumber - 1, this.pageSize)
      .subscribe((res) => {
        if (res && res.data) {
          this.baseService.showLoading(false);
          this.lstState = res.data.data;
          this.totalPage = res.data.total;
        } else {
          this.baseService.showLoading(false);
        }
      });
  }
  public pageChange(e) {
    this.pageNumber = e;
    this.getAllState();
  }
  public onEdit(data) {
    this.router.navigateByUrl('state/edit/' + data.id);
  }

  public onDelete(data) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa state <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.stateService.deleteStates(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa state hàng thành công',
                Constants.TOAST_OK
              );
              this.getAllState();
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
}
