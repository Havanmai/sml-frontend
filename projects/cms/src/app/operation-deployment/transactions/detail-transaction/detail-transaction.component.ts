import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HistoryTransaction } from '../history-transaction.model';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'cms-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.less'],
})
export class DetailTransactionComponent implements OnInit {
  id: string;
  DetailTransaction: HistoryTransaction;
  listOfHistoryTransaction: HistoryTransaction[] = [];
  listOfHistoryTransactionReverse: HistoryTransaction[] = [];
  idLocker: number;
  constructor(
    private activeroute: ActivatedRoute,
    private transactionService: TransactionService,
    private baseService: BaseService,
    private modal: NzModalService
  ) {
    this.activeroute.paramMap.subscribe((data: any) => {
      this.id = data.params.id;
      this.getHistoryDetailTransaction(this.id);
    });
  }

  ngOnInit(): void {}

  getHistoryDetailTransaction(id: string) {
    this.baseService.showLoading(true);
    this.transactionService
      .getHistoryDetailTransaction(id)
      .subscribe((data: any) => {
        this.baseService.showLoading(false);
        if (data.error == 0) {
          this.responseProcess(data);
        }
      });
  }
  responseProcess(data: any) {
    this.listOfHistoryTransaction = [];
    this.listOfHistoryTransactionReverse = [];
    if (data.data.data.length > 0) {
      this.idLocker = data.data.data[0].lockerId;
      data.data.data.forEach((element) => {
        let item = new HistoryTransaction(element);
        this.listOfHistoryTransaction.push(item);
      });

      this.listOfHistoryTransactionReverse =
        this.listOfHistoryTransaction.reverse();
    }
  }

  Lockerlock() {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn khóa khẩn cấp đơn ${this.id} này này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.transactionService.Lockerlock(this.idLocker).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Khóa khẩn cấp thành công',
                Constants.TOAST_OK
              );
            }
          },
          (err: any) => {
            console.log(err);
          }
        );
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  isVisibleVideo: boolean = false;
  linkVideo: string;
  listOfVideo: Array<{ name: string; value: string }> = [];
  videoPlay(id: number) {
    this.transactionService.getVideo(id).subscribe(
      (data: any) => {
        if (data.data.length > 0 && data.error == 0) {
          this.isVisibleVideo = true;
          const listOfVideo: Array<{ name: string; value: string }> = [];
          data.data.forEach((item, index) => {
            this.linkVideo = item.value;
            listOfVideo.push({
              name: 'video ' + (index + 1),
              value: item,
            });
          });
          this.listOfVideo = listOfVideo;
          this.linkVideo = listOfVideo[0].value;
        }
      },
      (error: any) => {
        console.log('Không gửi đc request lấy video', error);
      }
    );
  }
  handleCancel() {
    this.isVisibleVideo = false;
  }

  selectVideo(value: string) {
    this.linkVideo = value;
  }
}
