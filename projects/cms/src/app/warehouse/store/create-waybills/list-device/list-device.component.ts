import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LstHeaderExport } from 'projects/cms/src/shared/constants/waybills.constants';

@Component({
  selector: 'cms-list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.less'],
})
export class ListDeviceComponent implements OnInit {
  /**INPUT */
  @Input() iData = [];
  @Input() isWarehouse = false;
  /**OUTPUT */
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();

  /** PUBLIC */
  public lstHeaderExport = LstHeaderExport;
  public billsStatus = {
    CHUAXUAT: 1,
    DAXUAT: 2,
    HONG: 3,
    DANGSUACHUA: 4,
  };
  constructor(
    private modal: NzModalService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {}

  public deleteExportDevice(number) {
    this.onDelete.emit(number);
  }
  public addListDevice(isWarehouse) {
    if (isWarehouse) {
      this.onAdd.emit();
    } else {
      this.baseService.showToast(
        'Bạn không thể để trống kho !',
        Constants.TOAST_ERROR
      );
    }
  }
}
