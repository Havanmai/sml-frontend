import { Component, Input, OnInit } from '@angular/core';
import { BillsType } from 'projects/cms/src/shared/constants/waybills.constants';
import { DetailBillsModel } from 'projects/cms/src/shared/models/waybills.model';

@Component({
  selector: 'cms-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
  /** INPUT */
  @Input() iData: DetailBillsModel;
  /** PUBLIC */
  public billsType = BillsType;
  /** CONSTRUCTOR */
  constructor() {}

  /** LIFE CYCLE */
  ngOnInit(): void {}

  public mapData() {}
}
