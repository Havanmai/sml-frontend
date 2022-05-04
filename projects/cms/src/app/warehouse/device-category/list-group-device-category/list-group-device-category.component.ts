import { Component, OnInit } from '@angular/core';
import { DeviceCategoryService } from '../device-category.service';
import { DeviceCategory } from '../device-category.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseService, Constants } from 'common';

@Component({
  selector: 'cms-list-group-device-category',
  templateUrl: './list-group-device-category.component.html',
  styleUrls: ['./list-group-device-category.component.less'],
})
export class ListGroupDeviceCategoryComponent implements OnInit {
  listOfData: DeviceCategory[];
  total: number;
  size: number;
  page: number;
  constructor(
    private deviceCategory: DeviceCategoryService,
    private modal: NzModalService,
    private baseService: BaseService
  ) {
    this.deviceCategory.reloadGroupList$.subscribe((data: any) => {
      this.getListDeviceCategory();
    });
  }

  ngOnInit(): void {
    this.size = 10;
    this.page = 1;
    this.getListDeviceCategory();
  }
  getListDeviceCategory() {
    this.deviceCategory
      .getDeviceCategory(this.page - 1, this.size)
      .subscribe((data: any) => {
        this.responseProcess(data);
      });
  }

  pageChange($event) {
    this.page = $event;
    this.getListDeviceCategory();
  }

  responseProcess(data) {
    this.listOfData = [];
    this.total = data.data.total;
    if (data.data.data != null) {
      data.data.data.forEach((item) => {
        let itemCategory = new DeviceCategory(item);
        this.listOfData.push(itemCategory);
      });
    }
  }

  editCategoryGroup(data: DeviceCategory) {
    this.deviceCategory.showEditCategoryGroup(data);
  }

  deleteCategoryGroup(data: DeviceCategory) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa nhóm thiết bị <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.deviceCategory.deleteDeviceCategory(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa nhóm thiết bị thành công',
                Constants.TOAST_OK
              );
              this.getListDeviceCategory();
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
