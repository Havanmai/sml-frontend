import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'common';
import { DeviceModel } from 'projects/cms/src/app/warehouse/store/device.model';
import { LockerStatusService } from '../../locker-status.service';

@Component({
  selector: 'cms-deploy-install-repair',
  templateUrl: './deploy-install-repair.component.html',
  styleUrls: ['./deploy-install-repair.component.less'],
})
export class DeployInstallRepairComponent implements OnInit {
  id: number;
  listOfDevices: DeviceModel[] = [];
  total: number;
  page: number;
  size: number;
  constructor(
    private lockerstatus: LockerStatusService,
    private activeroute: ActivatedRoute,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.activeroute.paramMap.subscribe((param: any) => {
      this.id = param.params.id;
      this.page = 1;
      this.size = 10;
      this.getAllDevices(this.id);
    });
  }

  getAllDevices(id: number) {
    this.baseService.showLoading(true);
    this.lockerstatus
      .getAllDevicesByLocker(id, this.page - 1, this.size)
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.error == 0) {
            this.responeProcess(data);
          }
        },
        (error: any) => {
          console.log('Không gửi được thông tìn lấy danh sách thiết bị', error);
        }
      );
  }

  responeProcess(data: any) {
    this.total = data.data.total;
    console.log('danh sách thiết bị', data);
    this.listOfDevices = [];
    if (data.data) {
      data.data.forEach((item) => {
        let element = new DeviceModel(item);
        this.listOfDevices.push(element);
      });
    }
  }
}
