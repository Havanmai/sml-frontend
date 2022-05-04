import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  INgRxMessageBusService,
  MESSAGE_BUS_SERVICE_INJECTOR,
} from 'ngrx-message-bus';
import { MessageBusChannelNameConstant } from 'projects/cms/src/shared/constants/message-bus-channel-name.constant';
import { MessageBusEventNameConstant } from 'projects/cms/src/shared/constants/message-bus-event-name.constant';
import { WaybillsService } from 'projects/cms/src/shared/services/waybills.service';
import { Subscription } from 'rxjs';
import { StoreService } from '../../store.service';
import * as _ from 'lodash';

@Component({
  selector: 'cms-list-device-modal',
  templateUrl: './list-device-modal.component.html',
  styleUrls: ['./list-device-modal.component.less'],
})
export class ListDeviceModalComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  // PUBLIC
  public mainForm: FormGroup;
  public totalPage = 0;
  public pageSize = 0;
  public pageNumber = 0;
  public lstTicket = [];
  public billsStatus = {
    CHUAXUAT: 1,
    DAXUAT: 2,
    HONG: 3,
    DANGSUACHUA: 4,
  };
  public lstDeviceId = [
    {
      id: 1,
      name: 1,
    },
    {
      id: 2,
      name: 2,
    },
    {
      id: 3,
      name: 3,
    },
    {
      id: 4,
      name: 4,
    },
  ];

  public setOfCheckedId = new Set<number>();
  public checkedAll = false;
  public indeterminate = false;
  public listOfCurrentPageData = [];
  public listOfData = [];
  public subDataCreateWayBills: Subscription;

  // CONSTRUCTOR
  constructor(
    private router: Router,
    private waybillsService: WaybillsService,
    @Inject(MESSAGE_BUS_SERVICE_INJECTOR)
    public messageBusService: INgRxMessageBusService,
    private cdr: ChangeDetectorRef,
    private storeService: StoreService
  ) {
    this.subDataCreateWayBills =
      this.storeService.dataCreateWayBills$.subscribe((res) => {
        if (res) {
          this.getListDevices(res);
        } else {
          this.router.navigateByUrl('/store');
        }
      });
  }

  // LIFE CYCLE

  public ngOnInit(): void {
    this.createForm();
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.subDataCreateWayBills) {
      this.subDataCreateWayBills.unsubscribe();
    }
    this.cdr.detach();
  }

  // PUBLIC METHOD

  public updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  public onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  public onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  public onCurrentPageDataChange($event): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }
  public refreshCheckedStatus(): void {
    this.checkedAll = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checkedAll;
  }

  public onSubmitForm() {
    const requestData = this.listOfData.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );

    this.setOfCheckedId.clear();
    this.refreshCheckedStatus();
    this.messageBusService.addMessage(
      MessageBusChannelNameConstant.listDeviceChannel,
      MessageBusEventNameConstant.submitListDevice,
      requestData
    );
    history.back();
  }

  // PRIVATE METHOD

  private createForm() {
    this.mainForm = new FormGroup({
      maloID: new FormControl(null),
      deviceId: new FormControl(null),
      modelId: new FormControl(null),
      category: new FormControl(null),
    });
  }

  private getListDevices(data) {
    this.waybillsService.getListDevices(data.warehouseId, data.type).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.listOfData = res.data.data;
        }
      },
      (error: any) => {
        console.log('Không gửi được yêu cầu lấy thông tin', error);
      }
    );
  }
}
