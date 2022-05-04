import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { toArray } from 'rxjs/operators';
import { HardwareStatus } from '../hardware-status.model';
import { LockerStatus } from '../locker-status.model';
import { LockerStatusService } from '../locker-status.service';
import { Locker } from '../locker.model';

@Component({
  selector: 'cms-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit, AfterViewInit {
  id: number;
  tabSelected: number = 0;
  hardwareStatus: HardwareStatus;
  lockerCabinet: LockerStatus;
  constructor(
    private lockerstatus: LockerStatusService,
    private activeroute: ActivatedRoute,
    private baseService: BaseService,
    private modal: NzModalService,
    private router: Router
  ) {
    this.activeroute.paramMap.subscribe((param: any) => {
      this.id = param.params.id;

    });
  }

  ngOnInit(): void {
    this.getDetailLockerCabinet(this.id);
  }

  listAllLocker: Locker[] = [];
  listBlock: any[] = [];

  getDetailLockerCabinet(id: number) {
    this.baseService.showLoading(true);
    this.lockerstatus.getDetailLockerCabinet(id).subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        if (data.error == 0) {
          this.responseProcess(data);
        }
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
    this.lockerCabinet = new LockerStatus(data.data);
    if (data.data.hardwareStatus != null) {
      this.hardwareStatus = new HardwareStatus(data.data.hardwareStatus);
    }
  }

  updated() {
    this.router.navigateByUrl('lockers/edit/' + this.id);
  }

  locked() {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn mở tất cả tủ  không?</i>`,
      nzOnOk: () => {
        /* ${data.sequence} */
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  opened() {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn khóa tất cả tủ không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.lockerstatus.lockLockerAll(this.id).subscribe((data: any) => {
          this.baseService.showLoading(false);
          if (data.error == 0) {
            this.baseService.showToast('Khóa thành công ', Constants.TOAST_OK);
          }
        });
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  refresh() {
    this.getDetailLockerCabinet(this.id);
  }

  ngAfterViewInit(): void {}

  selectTab(index: number) {
    switch (index) {
      case 0:
        this.lockerstatus.reloadLockerDiagram();
        break;
      case 1:
        this.lockerstatus.reloadLockerTransaction();
        break;
      case 2:
        this.lockerstatus.reloadLockerActivity();
        break;
      case 2:
        this.lockerstatus.reloadLockerDeploy();
        break;
      default:
        break;
    }
  }
}
