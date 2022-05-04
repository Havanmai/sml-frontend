import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseService, Constants } from 'common';
import { StateUserService } from 'projects/cms/src/shared/services/state-user.service';
import { StateService } from 'projects/cms/src/shared/services/state.service';
import { UserService } from '../../../system-setting/user/user.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ListingUserModalComponent } from '../listing-user-modal/listing-user-modal.component';
import { Subscription } from 'rxjs';
import {
  MESSAGE_BUS_SERVICE_INJECTOR,
  INgRxMessageBusService,
} from 'ngrx-message-bus';
import { MessageBusChannelNameConstant } from 'projects/cms/src/shared/constants/message-bus-channel-name.constant';
import { MessageBusEventNameConstant } from 'projects/cms/src/shared/constants/message-bus-event-name.constant';
@Component({
  selector: 'cms-create-states',
  templateUrl: './create-states.component.html',
  styleUrls: ['./create-states.component.less'],
})
export class CreateStatesComponent implements OnInit, OnDestroy {
  /** PUBLIC */
  public mainForm: FormGroup;
  public lstUserHolder = [];
  public lstUser = [];
  public totalPage = 0;

  public isSubmit = false;
  public checkedAll = false;
  public setOfCheckedId = new Set<number>();
  public indeterminate = false;
  public isEdit = false;
  public isLoadingTable = false;
  public currentStateId = null;
  public listOfCurrentPageData = [];
  public obj = {
    id: null,
    description: null,
    name: null,
    stateUsers: [],
    userHolder: {
      id: null,
    },
  };

  /** PRIVATE */
  private _subscription = new Subscription();

  /** CONSTRUCTOR */
  constructor(
    private stateService: StateService,
    private stateUserService: StateUserService,
    private userService: UserService,
    private modalService: NzModalService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    @Inject(MESSAGE_BUS_SERVICE_INJECTOR)
    public messageBusService: INgRxMessageBusService,
    private cdr: ChangeDetectorRef
  ) {
    this.activeRouter.paramMap.subscribe((data: any) => {
      if (data && data.params.id) {
        this.isEdit = true;
        this.currentStateId = data.params.id;
        this.getDetailState(data.params.id);
      }
    });
  }

  /** LIFE CYCLE */
  ngOnInit(): void {
    this.getAllUserHolder();
    const hookListUserStateMessageSubscription = this.messageBusService
      .hookMessageChannel(
        MessageBusChannelNameConstant.listUserStateChannel,
        MessageBusEventNameConstant.submitListUserState
      )
      .subscribe((data: any) => {
        if (data) {
          if (this.lstUser.length > 0) {
            const lstUser = this.lstUser;
            _.each(data, (x) => {
              const result = _.filter(this.lstUser, (y) => x.id === y.id);
              if (result.length === 0) {
                lstUser.push(x);
              }
            });
            this.lstUser = lstUser;
          } else {
            this.lstUser = data;
          }
        }
      });
    this._subscription.add(hookListUserStateMessageSubscription);
    this.createForm();
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
    this.messageBusService.deleteChannelMessage(
      MessageBusChannelNameConstant.listUserStateChannel,
      MessageBusEventNameConstant.submitListUserState
    );
    this.cdr.detach();
  }

  /** PUBLIC METHOD */

  public buildObj() {
    const stateUser = [];
    _.each(this.lstUser, (x) => {
      stateUser.push({
        user: {
          id: x.id,
        },
      });
    });
    this.obj.description = this.mainForm.controls.description.value;
    this.obj.name = this.mainForm.controls.name.value;
    this.obj.stateUsers = stateUser;
    this.obj.userHolder.id = this.mainForm.controls.userHolder.value;
    this.obj.id = this.currentStateId;
  }

  public onSubmit() {
    this.isSubmit = true;
    if (this.mainForm.valid && this.lstUser.length > 0) {
      this.baseService.showLoading(true);
      this.buildObj();
      if (!this.isEdit) {
        this.stateService.createStates(this.obj).subscribe((res) => {
          if (res && res.data) {
            this.baseService.showLoading(false);
            this.baseService.showNotification(
              'Khởi tạo thành công state',
              Constants.NOTI_OK
            );
            this.router.navigateByUrl('state');
          }
        });
      } else {
        this.stateService
          .updateStates(this.obj, this.currentStateId)
          .subscribe((res) => {
            if (res && res.data) {
              this.baseService.showLoading(false);
              this.baseService.showNotification(
                'Cập nhật thành công state',
                Constants.NOTI_OK
              );
              this.router.navigateByUrl('state');
            }
          });
      }
    } else {
      Object.values(this.mainForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public onDeleteUser(userIndex: number) {
    if (userIndex >= 0) {
      this.lstUser = this.lstUser.filter((d, i) => i !== userIndex);
    }
  }

  public addLstStateUser() {
    this.modalService.create({
      nzContent: ListingUserModalComponent,
      nzClosable: false,
    });
  }

  /** PRIVATE METHOD */
  private createForm() {
    this.mainForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      userHolder: new FormControl(null, Validators.required),
      stateUsers: new FormControl([]),
    });
  }

  private setValue(data) {
    this.mainForm.controls.name.setValue(data.name);
    this.mainForm.controls.description.setValue(data.description);
    this.mainForm.controls.userHolder.setValue(
      data.userHolder ? data.userHolder.id : null
    );
  }

  private getAllUserHolder() {
    this.stateUserService.getAllUser().subscribe((res) => {
      if (res && res.data) {
        this.lstUserHolder = res.data.data;
      }
    });
  }

  private getDetailState(id) {
    this.stateService.getDetailState(id).subscribe((res) => {
      if (res && res.data) {
        this.setValue(res.data);
        const data = [];
        _.each(res.data.stateUsers, (x) => {
          data.push(x.user);
        });
        this.lstUser = data;
      }
    });
  }
}
