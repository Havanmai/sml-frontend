import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DeviceCategoryService } from '../device-category.service';
import * as _ from 'lodash';

@Component({
  selector: 'cms-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.less'],
})
export class DepotComponent implements OnInit {
  lstDepot: any[];
  totalPage: number;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(
    private baseService: BaseService,
    private fb: FormBuilder,
    private deviceCategoryService: DeviceCategoryService,
    private modal: NzModalService
  ) {
    this.deviceCategoryService.reloadDepotLocker$.subscribe(() => {
      this.pageNumber = 1;
      this.pageSize = 10;
      this.getAllDepot();
    });
  }

  ngOnInit(): void {
    this.pageNumber = 1;
      this.pageSize = 10;
    this.getAllDepot();
  }

  // PUBLIC METHOD

  public onPageChange(event) {
    this.pageNumber = event;
    this.getAllDepot();
  }

  editDepot(data: any) {
    this.deviceCategoryService.editDepot(data);
  }

  deleteDepot(data: any) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa kho hàng <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.deviceCategoryService.deleteDepotItem(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa kho hàng thành công',
                Constants.TOAST_OK
              );
              this.getAllDepot();
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

  // PRIVATE METHOD
  private getAllDepot() {
    this.baseService.showLoading(true);
    this.deviceCategoryService.getAllDepot(this.pageNumber-1,this.pageSize).subscribe(
      (res: any) => {
        this.baseService.showLoading(false);
        if (res && res.data.data) {
          this.lstDepot = [];
          _.each(res.data.data, (x) => {
            this.lstDepot.push(x);
          });
          this.totalPage = res.data.total;
        }
      },
      (error: any) => {
        console.log('Không gửi được yêu cầu lấy thông tin', error);
      }
    );
  }
}
