import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NumberToTextVnd } from '../../models/changeNumberToTextVnd.model';
import VNnum2words from 'vn-num2words';
@Component({
  selector: 'cms-dialog-import-device-modal',
  templateUrl: './dialog-import-device-modal.component.html',
  styleUrls: ['./dialog-import-device-modal.component.less'],
})
export class DialogImportDeviceModalComponent implements OnInit {
  /**INPUT */
  @Input() id = 'componentId';
  @Input() iData: any;
  @Input() lstData: any = [];

  constructor() {}

  ngOnInit(): void {
    let total: number = 0;
    let result: any;
    if (this.lstData.length > 0) {
      _.each(this.lstData, (x) => {
        total = x.price + total;
        x.price = x.price.toLocaleString();
      });
      this.lstData.totalMoney = total.toLocaleString();
      result = this.upperCase(VNnum2words(total));
      this.lstData.textMoney = result;
    }
  }

  public upperCase(result) {
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
