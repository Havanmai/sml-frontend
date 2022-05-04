import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaybillsService } from 'projects/cms/src/shared/services/waybills.service';
import * as _ from 'lodash';
import { BaseService } from 'common';
import { BillsType } from 'projects/cms/src/shared/constants/waybills.constants';
@Component({
  selector: 'cms-history-device',
  templateUrl: './history-device.component.html',
  styleUrls: ['./history-device.component.less'],
})
export class HistoryDeviceComponent implements OnInit {
  /** PUBLIC */
  public filterObj = {
    idBills: null,
    typeBills: null,
    idUser: null,
    importDevice: null,
    exportDevice: null,
  };
  publicbillsType = BillsType;
  public lstImportDevice = [];
  public lstExportDevice = [];
  public lstBills = [];

  public pageSize = 10;
  public pageNumber = 1;
  public totalPage = 0;
  public isLoading = false;

  /**CONSTRUCTOR */
  constructor(
    private router: Router,
    public waybillsService: WaybillsService,
    public baseService: BaseService
  ) {}

  /** LIFE CYCLE */
  ngOnInit(): void {
    this.getListBills();
  }

  /** PUBLIC METHOD */
  public selectTab(num) {}
  public pageChange(e) {
    this.pageNumber = e;
    this.getListBills();
  }

  public onClose() {
    this.router.navigateByUrl('/store');
  }

  public onFilter() {
    console.log(this.filterObj);
  }

  public actionView(item) {
    this.router.navigateByUrl('store/history-device/' + item.id);
  }

  /**PRIVATE METHOD */

  private getListBills() {
    this.isLoading = false;
    this.baseService.showLoading(true);
    this.waybillsService
      .getListBills(this.pageNumber - 1, this.pageSize)
      .subscribe(
        (res) => {
          console.log("dâdaddadadda",res)
          if (res && res.data) {
            this.baseService.showLoading(false);
            this.isLoading = true;
            this.lstBills = res.data.data;
            this.totalPage = res.data.total;
          }
        },
        (error) => {
          console.log('Không gửi được yêu cầu lấy thông tin', error);
        }
      );
  }
}
