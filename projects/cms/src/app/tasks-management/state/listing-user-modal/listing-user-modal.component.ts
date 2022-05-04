import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StateUserService } from 'projects/cms/src/shared/services/state-user.service';
import { UserModel } from '../../../system-setting/user/user.model';
import * as _ from 'lodash';
import { MessageBusChannelNameConstant } from 'projects/cms/src/shared/constants/message-bus-channel-name.constant';
import { MessageBusEventNameConstant } from 'projects/cms/src/shared/constants/message-bus-event-name.constant';
import {
  MESSAGE_BUS_SERVICE_INJECTOR,
  INgRxMessageBusService,
} from 'ngrx-message-bus';
@Component({
  selector: 'cms-listing-user-modal',
  templateUrl: './listing-user-modal.component.html',
  styleUrls: ['./listing-user-modal.component.less'],
})
export class ListingUserModalComponent implements OnInit {
  /** PUBLIC */

  public mainForm: FormGroup;
  public pageNumber: number = 1;
  public pageSize: number = 10;
  public totalPage: number = 0;

  public keyword: string = '';
  public role: string = '';

  public listUsers: UserModel[];
  public listRoles: any[];

  public checkedAll = false;
  public setOfCheckedId = new Set<number>();
  public indeterminate = false;
  public listOfCurrentPageData = [];

  constructor(
    private stateUserService: StateUserService,
    private modalRef: NzModalRef,
    @Inject(MESSAGE_BUS_SERVICE_INJECTOR)
    public messageBusService: INgRxMessageBusService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllUser();
  }

  /** PUBLIC METHOD */
  public onSearch() {
    this.getAllUser();
  }
  public onSubmit() {
    const requestData = this.listUsers.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    this.messageBusService.addMessage(
      MessageBusChannelNameConstant.listUserStateChannel,
      MessageBusEventNameConstant.submitListUserState,
      requestData
    );
    this.modalRef.destroy();
  }
  public onCancel() {
    this.modalRef.destroy();
  }
  /** Select checkbox item in Table */
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

  /** PRIVATE METHOD */
  private getAllUser() {
    this.stateUserService
      .searchUser(this.pageNumber - 1, this.pageSize, this.keyword, this.role)
      .subscribe((res) => {
        if (res && res.data) {
          this.listUsers = res.data.data;
        }
      });
  }

  private getAllRoles() {
    this.stateUserService.getAllRoles().subscribe((data: any) => {
      if (data.error == 0) {
        this.listRoles = data.data;
      }
    });
  }
}
