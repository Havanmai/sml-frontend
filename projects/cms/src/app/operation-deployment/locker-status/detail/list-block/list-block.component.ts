import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { ListOfLocker } from '../../data-fake-lock';
import { HardwareStatus } from '../../hardware-status.model';
import { LockerStatus } from '../../locker-status.model';
import { LockerStatusService } from '../../locker-status.service';
import { Locker } from '../../locker.model';

@Component({
  selector: 'cms-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.less'],
})
export class ListBlockComponent implements OnInit, AfterViewInit {
  id: number;
  widthDrall: number;
  checkwidthDrall: boolean = false;
  checkNull: boolean = false;
  lockerCabinet: LockerStatus;
  hardwareStatus: HardwareStatus;
  checkFullBlock: boolean = false;
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  closePopover(): void {
    document.getElementsByTagName('body')[0].click();
  }
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  focus: number;
  moveStep(step: number) {
    this.ds.moveTo(step);
    this.focus = step;
  }

  constructor(
    private lockerstatus: LockerStatusService,
    private activeroute: ActivatedRoute,
    private baseService: BaseService,
    private modal: NzModalService
  ) {
    this.activeroute.paramMap.subscribe((param: any) => {
      this.id = param.params.id;
      this.getDetailLockerCabinet(this.id);
    });

    this.lockerstatus.reloadLockerDiagram$.subscribe((data) => {
      //reload data here
    });
  }

  ngOnInit(): void {}
  data: HardwareStatus;

  getDetailLockerCabinet(id: number) {
    this.baseService.showLoading(true);
    this.lockerstatus.getDetailLockerCabinet(id).subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        this.responseProcess(data);
      },
      (error: any) => {
        console.log(
          'Không lấy được thông tin trạng thái locker cabinet',
          error
        );
      }
    );
  }
  responseProcess(data: any) {
    if (data.error == 0) {
      if (data.data.hardwareStatus !== null) {
        this.lockerCabinet = new LockerStatus(data.data);
        this.hardwareStatus = new HardwareStatus(data.data.hardwareStatus);
        this.checkNull = false;
        this.getListLocked(this.id);
      } else {
        this.listNumberBlock = [];
        this.listAllLocker = [];
        this.checkNull = true;
        ListOfLocker.forEach((itemLocker) => {
          let item = new Locker(itemLocker);
          this.getCountStatus(item.maVanDon, item.status);
          if (this.listNumberBlock.length == 0) {
            this.listNumberBlock = [];
            this.listNumberBlock.push(item.block);
          } else {
            const found = this.listNumberBlock.some((el) => el === item.block);
            if (!found) this.listNumberBlock.push(item.block);
          }
          this.listAllLocker.push(item);
        });
        for (let i = 1; i <= this.listNumberBlock.length; i++) {
          let listOfBlock: Locker[] = this.listAllLocker.filter(
            ({ block }) => block === i
          );
          this.listBlock.push(listOfBlock);
        }
      }
    }
  }

  ngAfterViewInit() {
    this.lockerstatus
      .getDetailLockerCabinet(this.id)
      .pipe(
        catchError(() => of({ data: [] })),
        map((res: any) => res.data)
      )
      .subscribe((data) => {
        if (data.hardwareStatus != null) {
          setTimeout(() => {
            if (
              this.ds._contentRef.nativeElement.offsetWidth ==
              this.ds._contentRef.nativeElement.scrollWidth
            ) {
              this.checkwidthDrall = false;
            } else {
              this.checkwidthDrall = true;
            }
          }, 500);
        }
      });
  }

  listAllLocker: Locker[] = [];
  listBlock: any[] = [];
  listNumberBlock: number[];
  datablock: number[];
  listAddBlock = [];

  listBlockNow: any = [];
  listBlockArray: any = [];

  getListLocked(id: number) {
    this.baseService.showLoading(true);
    this.lockerstatus.getLockerList(id).subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        if (data.error == 0) {
          if (data.data.total > 0) {
            this.checkNull = false;
            this.listNumberBlock = [];
            this.listAllLocker = [];
            data.data.data.forEach((itemLocker) => {
              let item = new Locker(itemLocker);
              this.getCountStatus(item.maVanDon, item.status);
              if (this.listNumberBlock.length == 0) {
                this.listNumberBlock = [];
                this.listNumberBlock.push(item.block);
              } else {
                const found = this.listNumberBlock.some(
                  (el) => el === item.block
                );
                if (!found) this.listNumberBlock.push(item.block);
              }
              this.listAllLocker.push(item);
            });
            if (this.listNumberBlock[length] < 5) {
              this.checkFullBlock = false;
              for (let i = 1; i <= this.listNumberBlock.length; i++) {
                let listOfBlock: Locker[] = this.listAllLocker.filter(
                  ({ block }) => block === i
                );
                this.listBlockNow.push(listOfBlock);
              }

              let offset = 5 - this.listBlockNow.length;

              for (let i = 1; i <= offset; i++) {
                if (i == 1) {
                  this.listAddBlock = [];
                  this.listBlockNow[this.listBlockNow.length - 1].forEach(
                    (item) => {
                      let itemAdd = {
                        id: item.id + 22,
                        block: this.listBlockNow.length + 1,
                        sequence: item.sequence,
                        sizeType: item.sizeType,
                        status: 3,
                      };
                      this.listAddBlock.push(itemAdd);
                    }
                  );
                  this.listBlockArray.push(this.listAddBlock);
                } else {
                  this.listAddBlock = [];
                  this.listBlockArray[this.listBlockArray.length - 1].forEach(
                    (item) => {
                      let itemAdd = {
                        id: item.id + 22,
                        block: this.listBlockNow.length + 1 * i,
                        sequence: item.sequence,
                        sizeType: item.sizeType,
                        status: 3,
                      };
                      this.listAddBlock.push(itemAdd);
                    }
                  );
                  this.listBlockArray.push(this.listAddBlock);
                }
              }

              const insert = (arr, index, newItem) => [
                // part of the array before the specified index
                ...arr.slice(0, index),
                // inserted item
                newItem,
                // part of the array after the specified index
                ...arr.slice(index),
              ];

              let middleposition = offset / 2;
              if (middleposition == 0) {
                this.listBlock = insert(
                  this.listBlockNow,
                  this.listBlockNow.length,
                  this.listBlockArray[0]
                );
              } else {
                for (let i = 0; i < this.listBlockNow.length; i++) {
                  if (i == 0) {
                    this.listBlock = insert(
                      this.listBlockArray,
                      middleposition + i,
                      this.listBlockNow[i]
                    );
                  } else {
                    this.listBlock = insert(
                      this.listBlock,
                      middleposition + i,
                      this.listBlockNow[i]
                    );
                  }
                }
              }
            } else {
              this.checkFullBlock = true;
              for (let i = 1; i <= this.listNumberBlock.length; i++) {
                let listOfBlock: Locker[] = this.listAllLocker.filter(
                  ({ block }) => block === i
                );
                this.listBlock.push(listOfBlock);
              }
            }
          } else {
            this.listNumberBlock = [];
            this.listAllLocker = [];
            this.checkNull = true;
            ListOfLocker.forEach((itemLocker) => {
              let item = new Locker(itemLocker);
              this.getCountStatus(item.maVanDon, item.status);
              if (this.listNumberBlock.length == 0) {
                this.listNumberBlock = [];
                this.listNumberBlock.push(item.block);
              } else {
                const found = this.listNumberBlock.some(
                  (el) => el === item.block
                );
                if (!found) this.listNumberBlock.push(item.block);
              }
              this.listAllLocker.push(item);
            });
            for (let i = 1; i <= this.listNumberBlock.length; i++) {
              let listOfBlock: Locker[] = this.listAllLocker.filter(
                ({ block }) => block === i
              );
              this.listBlock.push(listOfBlock);
            }
          }
        }
      },
      (error: any) => {
        console.log('Không lấy được thông tin trạng thái phần cứng', error);
      }
    );
  }

  emptyStatus: number = 0;
  normalStatus: number = 0;
  errorStatus: number = 0;
  lockedStatus: number = 0;
  getCountStatus(maVanDon: string, status: number) {
    if (maVanDon === null && status !== -1 && status !== 2) {
      this.emptyStatus = this.emptyStatus + 1;
    } else if (maVanDon !== null && status !== -1 && status !== 2) {
      if (status !== 3) {
        this.normalStatus = this.normalStatus + 1;
      }
    } else if (status === -1) {
      this.errorStatus = this.errorStatus + 1;
    } else if (status === 2) {
      this.lockedStatus = this.lockedStatus + 1;
    }
  }

  check: boolean = false;
  display(item: number, arr: Locker[]) {
    this.check = arr.every(({ status }) => {
      status === 2;
    });
    return this.check;
  }

  itemConfirmLocker(data: any) {
    console.log(data);
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn khóa ngăn tủ ${data.id}  này không?</i>`,
      nzOnOk: () => {
        this.lockerstatus.Lockerlock(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Khóa ngăn tủ thành công',
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

  itemConfirmOpen(data: any) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn mở ngăn tủ  này không?</i>`,
      nzOnOk: () => {},
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  blockConfirmLocker(data: any) {
    if (!this.checkNull && data[0].status != 3) {
      this.modal.confirm({
        nzTitle: `<i>Bạn có chắc muốn khóa block ${data[0].block}  này không?</i>`,
        nzOnOk: () => {
          this.lockerstatus
            .lockLockersByBlock(data[0].block, this.id)
            .subscribe(
              (data: any) => {
                this.baseService.showLoading(false);
                if (data.error == 0) {
                  this.baseService.showToast(
                    'Khóa block thành công',
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
    } else {
      this.modal.info({
        nzTitle: `<i>Ngăn tủ chưa được kích hoạt !</i>`,
        nzClosable: false,
      });
    }
  }

  blockConfirmOpen(data: any) {
    if (!this.checkNull && data[0].status != 3) {
      this.modal.confirm({
        nzTitle: `<i>Bạn có chắc muốn mở tủ  này không?</i>`,
        nzOnOk: () => {
          /* ${data.sequence} */
        },
        nzClosable: false,
        nzCancelText: 'Tôi không muốn',
        nzOkText: 'Đồng ý',
      });
    } else {
      this.modal.info({
        nzTitle: `<i>Ngăn tủ chưa được kích hoạt !</i>`,
        nzClosable: false,
      });
    }
  }
}
