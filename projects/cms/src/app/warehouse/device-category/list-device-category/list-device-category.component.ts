import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DeviceCategoryService } from '../device-category.service';
import { DeviceItem } from '../device-item.model';

@Component({
  selector: 'cms-list-device-category',
  templateUrl: './list-device-category.component.html',
  styleUrls: ['./list-device-category.component.less'],
})
export class ListDeviceCategoryComponent implements OnInit {
  listOfData: DeviceItem[];
  sort: string;
  total: number;
  page: number;
  size: number;
  constructor(
    private deviceCategory: DeviceCategoryService,
    private modal: NzModalService,
    private baseService: BaseService
  ) {
    this.deviceCategory.reloadItemList$.subscribe((data: any) => {
      this.getListDeviceItem();
    });
  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    this.getListDeviceItem();
  }
  getListDeviceItem() {
    this.deviceCategory
      .getDeviceItem(this.page - 1, this.size)
      .subscribe((data: any) => {
        if(data.error==0){
          this.responseProcess(data);
        }
      });
  }

  pageChange($event) {
    this.page = $event;
    this.getListDeviceItem();
  }

  responseProcess(data) {
    this.listOfData = [];
    console.log("data category", data)
    this.total = data.data.total;
    if (data.data.data != null) {
      this.total = data.data.total;
      data.data.data.forEach((item) => {
        let itemCategory = new DeviceItem(item);
        this.listOfData.push(itemCategory);
      });
    }
  }

  editItemGroup(data: DeviceItem) {
    this.deviceCategory.showEditCategoryItem(data);
  }

  deleteItemGroup(data: DeviceItem) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa thiết bị <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.deviceCategory.deleteDeviceItem(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa nhóm thiết bị thành công',
                Constants.TOAST_OK
              );
              this.getListDeviceItem();
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
