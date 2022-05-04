import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { DeviceHistoryModel } from '../device-histories.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'cms-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.less'],
})
export class DetailDeviceComponent implements OnInit {
  listOfData: DeviceHistoryModel[] = [];
  constructor(
    private storeService: StoreService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {}
  getAllDeviceHistory() {
    this.baseService.showLoading(true);
    this.storeService.getAllDeviceHistories().subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        if (data.error == 0) {
          this.responseProcess(data);
        }
        {
          this.baseService.showToast(
            'Vui lòng liên hệ với quản trị viên',
            Constants.TOAST_ERROR
          );
        }
      },
      (error: any) => {
        console.log('Truy cập lấy thông tin lịch sử thiết bị thất bại', error);
      }
    );
  }
  responseProcess(data: any) {
    this.listOfData = [];
    if (data.data) {
      data.data.forEach((item) => {
        this.listOfData.push(item);
      });
    }
  }
}
