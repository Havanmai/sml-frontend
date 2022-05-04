import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BillsType } from 'projects/cms/src/shared/constants/waybills.constants';
import { DetailBillsModel } from 'projects/cms/src/shared/models/waybills.model';
import { WaybillsService } from 'projects/cms/src/shared/services/waybills.service';
import * as _ from 'lodash';
@Component({
  selector: 'cms-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.less'],
})
export class DetailTicketComponent implements OnInit {
  /** PUBLIC */
  public tabSelected: number = 0;
  public idTicket: string = '';
  public billsType = BillsType;
  public lstDataDetail: DetailBillsModel;
  public lstData = [];
  public isImportDevice = false;
  public isVisibleModal = false;
  public isVisibleExportModal = false;
  /** CONSTRUCTOR */
  constructor(
    private activeroute: ActivatedRoute,
    private baseService: BaseService,
    private modal: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private waybillsService: WaybillsService
  ) {
    this.activatedRoute.paramMap.subscribe((x: any) => {
      this.idTicket = x.params.id;
      this.getDetailTicket(this.idTicket);
    });
  }
  /** LIFE CYCLE */
  ngOnInit(): void {}

  /** PUBLIC METHOD */
  public downloadAttachment() {}

  public selectTab(num) {}

  public showModal(bool) {
    this.isVisibleModal = true;
    this.isImportDevice = bool;
  }

  public onCancelModal() {
    this.isVisibleModal = false;
  }

  public onOkModal() {
    this.isVisibleModal = false;
  }

  private getDetailTicket(id) {
    this.baseService.showLoading(true);
    this.waybillsService.getDetailBills(id).subscribe(
      (res) => {
        if (res && res.data) {
          this.baseService.showLoading(false);
          this.lstDataDetail = res.data.billDTO;
          this.lstData = res.data.deviceDTO;
          _.each(this.lstData, (x, i) => {
            x.no = i + 1;
          });
        }
      },
      (error) => {
        console.log('Không gửi được yêu cầu lấy thông tin', error);
      }
    );
  }
}
