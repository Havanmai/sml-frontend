import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'common';
import { LockerStatus } from '../../../locker-status/locker-status.model';
import { HistoryTransaction } from '../../history-transaction.model';
import { Transaction } from '../../transaction.model';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'cms-header-detail-order',
  templateUrl: './header-detail-order.component.html',
  styleUrls: ['./header-detail-order.component.less'],
})
export class HeaderDetailOrderComponent implements OnInit {
  id: string;
  DetailTransaction: Transaction;
  HistoryDetail: HistoryTransaction;
  DetailCabinets: LockerStatus;
  constructor(
    private activeroute: ActivatedRoute,
    private transactionService: TransactionService,
    private baseService: BaseService
  ) {
    this.activeroute.paramMap.subscribe((data: any) => {
      this.id = data.params.id;
    });
  }

  ngOnInit(): void {
    this.getDetailTransaction(this.id);
    this.getHistoryDetailTransaction(this.id);
  }

  getDetailTransaction(id: string) {
    this.baseService.showLoading(true);
    this.transactionService.getDetailTransaction(id).subscribe((data: any) => {
      this.baseService.showLoading(false);
      if (data.data.data.length > 0) {
        let item = new Transaction(data.data.data[0]);
        this.DetailTransaction = item;
      }
    });
  }

  getHistoryDetailTransaction(id: string) {
    this.baseService.showLoading(true);
    this.transactionService
      .getHistoryDetailTransaction(id)
      .subscribe((data: any) => {
        this.baseService.showLoading(false);
        if (data.data.data.length > 0) {
          let itemEnd = data.data.data.length - 1;
          let item = new HistoryTransaction(data.data.data[itemEnd]);
          this.HistoryDetail = item;
          if (item.cabinetId) {
            this.getCabinetsDetail(item.cabinetId);
          }
        }
      });
  }

  getCabinetsDetail(id: number) {
    this.transactionService.getDetailCabinets(id).subscribe((data: any) => {
      if (data.data.data.length > 0) {
        let item = new LockerStatus(data.data.data[0]);
        this.DetailCabinets = item;
      }
    });
  }
}
