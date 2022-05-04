import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BillsType,
  LstBillsType,
  LstHeaderExport,
  LstHeaderImport,
} from '../../../../shared/constants/waybills.constants';
import { ExportLockerComponent } from '../export-locker/export-locker.component';
import { StoreService } from '../store.service';
import * as _ from 'lodash';
import {
  INgRxMessageBusService,
  MESSAGE_BUS_SERVICE_INJECTOR,
} from 'ngrx-message-bus';
import { MessageBusChannelNameConstant } from 'projects/cms/src/shared/constants/message-bus-channel-name.constant';
import { MessageBusEventNameConstant } from 'projects/cms/src/shared/constants/message-bus-event-name.constant';
import { Subscription } from 'rxjs';
import { DeviceCategoryService } from '../../device-category/device-category.service';
import { WaybillsService } from 'projects/cms/src/shared/services/waybills.service';
import {
  DeviceModel,
  ImportDeviceModel,
} from 'projects/cms/src/shared/models/waybills.model';
import { LockerStatusService } from '../../../operation-deployment/locker-status/locker-status.service';
import { LockerStatus } from '../../../operation-deployment/locker-status/locker-status.model';
import { AppConstant } from 'projects/cms/src/shared/constants/app-constants';

@Component({
  selector: 'cms-create-waybills',
  templateUrl: './create-waybills.component.html',
  styleUrls: ['./create-waybills.component.less'],
})
export class CreateWaybillsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /** PUBLIC */
  public mainForm: FormGroup;
  public billsType = BillsType;
  public lstHeaderImport = LstHeaderImport;
  public lstBillsType = LstBillsType;
  public lstWarehouse = [];
  public lstDevice = [];
  public lstLocker = [];

  public objDevice = {
    modelId: null,
    color: null,
    vendor: null,
    weight: null,
    long: null,
    wide: null,
    high: null,
    serial: null,
    version: null,
    price: null,
    note: null,
  };

  public lstDeviceUploadFile = [];

  public objFilter = {
    createdUser: null,
    batchNumber: null,
    type: null,
    statusBills: null,
    warehouseId: null,
    receiver: null,
    description: null,
    lockerId: null,
    destinationWarehouse: null,
    multipartFile: null,
    listDevices: [],
    exportDevice: [],
  };
  public statusTypeBills = {
    NHAPLE: 1,
    NHAPLO: 2,
  };
  public checkRandomBatch = false;
  public isCreate: boolean = false;
  public isLoading: boolean = false;
  public isValidFile: boolean = false;
  public isShowAlert = false;
  public currentUser = null;
  public nameNewLocker = null;
  public _subscription = new Subscription();
  public subDataCreateWayBills: Subscription;
  /** Get Device */
  get device() {
    return this.mainForm.controls.device as FormArray;
  }

  /** CONSTRUCTOR */
  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService,
    private baseService: BaseService,
    private deviceCategoryService: DeviceCategoryService,
    private waybillsService: WaybillsService,
    private lockerStatusService: LockerStatusService,
    private modalService: NzModalService,
    @Inject(MESSAGE_BUS_SERVICE_INJECTOR)
    public messageBusService: INgRxMessageBusService
  ) {
    this.subDataCreateWayBills =
      this.storeService.dataCreateWayBills$.subscribe((res) => {
        if (res) {
          this.setValueObjService(res);
        }
      });
  }

  /** LIFECYCLE */
  public ngOnInit(): void {
    this.getAllDepot();
    this.getAllLockerStatus();
    this.getListDevice();
    this.currentUser = this.baseService.getCachedUser();
    const dataExport = this.objFilter.exportDevice;
    const hookListDropdownLockerMessageSubscription = this.messageBusService
      .hookMessageChannel(
        MessageBusChannelNameConstant.listDropdownLockerChannel,
        MessageBusEventNameConstant.submitExportNewLocker
      )
      .subscribe((data: any) => {
        this.getAllLockerStatus(data);
      });
    this._subscription.add(hookListDropdownLockerMessageSubscription);
    const hookListDeviceMessageSubscription = this.messageBusService
      .hookMessageChannel(
        MessageBusChannelNameConstant.listDeviceChannel,
        MessageBusEventNameConstant.submitListDevice
      )
      .subscribe((data: any) => {
        if (data) {
          if (this.objFilter.exportDevice.length === 0) {
            data.forEach((x) => {
              dataExport.push(x);
            });
            this.objFilter.exportDevice = dataExport;
          } else {
            _.each(data, (x) => {
              const result = _.filter(
                this.objFilter.exportDevice,
                (y) => x.id === y.id
              );
              if (result.length === 0) {
                dataExport.push(x);
              }
            });
            this.objFilter.exportDevice = dataExport;
          }
        }
      });
    this._subscription.add(hookListDeviceMessageSubscription);
    this.createForm();
    this.setValue(this.objFilter);
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
    if (this.subDataCreateWayBills) {
      this.subDataCreateWayBills.unsubscribe();
    }
    this.messageBusService.deleteChannelMessage(
      MessageBusChannelNameConstant.listDeviceChannel,
      MessageBusEventNameConstant.submitListDevice
    );
    this.messageBusService.deleteChannelMessage(
      MessageBusChannelNameConstant.listDropdownLockerChannel,
      MessageBusEventNameConstant.submitExportNewLocker
    );
    this.cdr.detach();
  }

  /** PUBLIC METHOD */

  public onClose() {
    this.storeService.dataCreateWayBills(null);
  }

  public onChangeType() {
    this.mainForm.controls.batchNumber.reset();
    this.mainForm.controls.random.reset();
    this.mainForm.controls.warehouseId.reset();
    this.mainForm.controls.statusBills.reset();
    this.mainForm.controls.receiver.reset();
    this.mainForm.controls.description.reset();
    this.mainForm.controls.lockerId.reset();
    this.mainForm.controls.destinationWarehouse.reset();
    this.mainForm.controls.device = this.fb.array([this.initImportDevice()]);
    this.objFilter.exportDevice = [];
  }

  public addImportDevice() {
    this.device.push(this.initImportDevice());
  }

  public deleteDevice(deviceIndex?: number) {
    if (deviceIndex >= 0) {
      this.device.removeAt(deviceIndex);
    }
  }

  public deleteExportDevice(deviceIndex: number) {
    if (deviceIndex >= 0) {
      this.objFilter.exportDevice = this.objFilter.exportDevice.filter(
        (d, i) => i !== deviceIndex
      );
    }
  }

  public submitForm() {
    for (const i in this.mainForm.controls) {
      if (this.mainForm.controls.hasOwnProperty(i)) {
        this.mainForm.controls[i].markAsDirty();
        this.mainForm.controls[i].updateValueAndValidity();
      }
    }
    this.device.controls.forEach((device) => {
      for (const k in device['controls']) {
        if (device['controls'].hasOwnProperty(k)) {
          device['controls'][k].markAsDirty();
          device['controls'][k].updateValueAndValidity();
        }
      }
    });

    if (this.mainForm.controls.type.invalid) {
      return;
    }

    if (
      this.mainForm.controls.type.value === this.billsType.NHAPKHO &&
      (this.mainForm.controls.statusBills.invalid ||
        this.mainForm.controls.warehouseId.invalid)
    ) {
      return;
    }

    if (
      this.mainForm.controls.statusBills.value ===
        this.statusTypeBills.NHAPLE &&
      this.mainForm.controls.device.invalid
    ) {
      return;
    }

    if (
      this.mainForm.controls.statusBills.value === this.statusTypeBills.NHAPLO
    ) {
      if (this.lstDeviceUploadFile.length === 0) {
        this.isValidFile = true;
        return;
      }

      if (this.mainForm.controls.batchNumber.invalid) {
        return;
      }
    }

    if (this.mainForm.controls.type.value !== this.billsType.NHAPKHO) {
      if (this.mainForm.controls.type.value === this.billsType.CHUYENKHO) {
        if (this.mainForm.controls.destinationWarehouse.invalid) {
          return;
        }
      }
      if (this.mainForm.controls.warehouseId.invalid) {
        return;
      }
      if (this.objFilter.exportDevice.length === 0) {
        this.baseService.showToast(
          'Thêm danh sách thiết bị',
          Constants.TOAST_ERROR,
          2000
        );
        return;
      }
    }
    this.modalService.confirm({
      nzTitle: 'Xác nhận tạo phiếu',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzWidth: 300,
      nzOnOk: () => {
        this.submitCreateBills();
      },
    });
  }

  public addLocker() {
    this.modal.create({
      nzContent: ExportLockerComponent,
      nzClosable: false,
    });
  }

  public genCodeBatch(result) {
    if (result == true) {
      this.waybillsService.getCodeRandom().subscribe((res) => {
        if (res && res.data) {
          this.checkRandomBatch = true;
          this.mainForm.controls.batchNumber.setValue(res.data);
          this.mainForm.controls.batchNumber.disable();
        }
      });
    } else {
      this.checkRandomBatch = false;
      this.mainForm.controls.batchNumber.enable();
      this.mainForm.controls.batchNumber.setValue(null);
    }
  }

  public addListDevice() {
    this.router.navigateByUrl('/store/list-device');
    this.resetObj();
    this.storeService.dataCreateWayBills(this.objFilter);
  }

  public onDelectFile() {
    this.lstDeviceUploadFile = [];
    this.isValidFile = true;
  }

  public onChangeStatusBill() {
    this.isValidFile = false;
    this.lstDeviceUploadFile = [];
    this.mainForm.controls.random.reset();
    this.mainForm.controls.warehouseId.reset();
    this.mainForm.controls.receiver.reset();
    this.mainForm.controls.description.reset();
    this.mainForm.controls.lockerId.reset();
    this.mainForm.controls.receiver.reset();
    this.mainForm.controls.batchNumber.reset();
    if (
      this.mainForm.controls.statusBills.value === this.statusTypeBills.NHAPLE
    ) {
      this.mainForm.controls.device = this.fb.array([this.initImportDevice()]);
    } else {
      this.mainForm.controls.device = this.fb.array([]);
    }
  }

  /** PRIVATE METHOD */

  private submitCreateBills() {
    this.isLoading = false;
    this.baseService.showLoading(true);
    const obj = this.buildObjOddImport();
    this.waybillsService.createDevices(obj).subscribe(
      (res) => {
        if (res && res.data) {
          this.baseService.showLoading(false);
          this.isLoading = true;
          this.router.navigateByUrl('/store/history-device');
        }
      },
      (err) => {
        this.baseService.showToast('Tạo phiếu lỗi', Constants.TOAST_ERROR);
      }
    );
  }

  private getAllLockerStatus(data?) {
    this.lockerStatusService.getAllLockerCabinets().subscribe(
      (res: any) => {
        if (res && res.data) {
          this.lstLocker = [];
          res.data.data.forEach((item) => {
            let itemData = new LockerStatus(item);
            this.lstLocker.push({ id: itemData.id, name: itemData.title });
            if (data && data === itemData.title) {
              this.mainForm.controls.lockerId.setValue(itemData.id);
            }
          });
        } else {
          this.baseService.showToast(
            'Hệ thông đang bảo trì, vui lòng liên hệ quản trị viên',
            Constants.TOAST_ERROR
          );
        }
      },
      (error: any) => {
        console.log('Không thể truy cập lấy thông tin Locker Status', error);
      }
    );
  }

  private getListDevice() {
    this.waybillsService.getListDeviceModels().subscribe(
      (res: any) => {
        if (res && res.data) {
          _.each(res.data.data, (x) => {
            this.lstDevice.push(x);
          });
        }
      },
      (error: any) => {
        console.log('Không gửi được yêu cầu lấy thông tin', error);
      }
    );
  }

  private getAllDepot() {
    this.deviceCategoryService.getAllDepot().subscribe(
      (res: any) => {
        if (res && res.data.data) {
          _.each(res.data.data, (x) => {
            this.lstWarehouse.push(x);
          });
        }
      },
      (error: any) => {
        console.log('Không gửi được yêu cầu lấy thông tin', error);
      }
    );
  }

  private createForm() {
    this.mainForm = this.fb.group({
      type: new FormControl(null, Validators.required),
      batchNumber: new FormControl(null, Validators.required),
      random: new FormControl(false),
      statusBills: new FormControl(null, Validators.required),
      warehouseId: new FormControl(null, Validators.required),
      receiver: new FormControl(null, Validators.required),
      description: new FormControl(null),
      lockerId: new FormControl(null),
      destinationWarehouse: new FormControl(null, Validators.required),
      device: this.fb.array([this.initImportDevice()]),
    });
  }

  private initImportDevice() {
    return this.fb.group({
      modelId: [null, Validators.required],
      color: [null],
      vendor: [null],
      weight: [null],
      long: [null],
      wide: [null],
      high: [null],
      serial: [null, Validators.required],
      version: [null],
      price: [null],
      note: [null],
    });
  }

  private buildObjOddImport() {
    let listDevices = [];

    if (this.mainForm.controls.type.value === this.billsType.NHAPKHO) {
      if (
        this.mainForm.controls.statusBills.value === this.statusTypeBills.NHAPLE
      ) {
        _.each(this.mainForm.controls.device.value, (x) => {
          let itemdata = new DeviceModel(x);
          if (itemdata.serial) {
            listDevices.push(itemdata);
          }
        });
      } else {
        _.each(this.lstDeviceUploadFile, (x) => {
          let itemdata = new DeviceModel(x);
          if (itemdata.serial) {
            listDevices.push(itemdata);
          }
        });
      }
    } else {
      listDevices = this.objFilter.exportDevice;
    }
    return {
      createdUser: this.currentUser.id,
      batchNumber: this.mainForm.controls.batchNumber.value,
      type: this.mainForm.controls.type.value,
      warehouseId: this.mainForm.controls.warehouseId.value,
      receiver: this.mainForm.controls.receiver.value,
      description: this.mainForm.controls.description.value,
      lockerId: this.mainForm.controls.lockerId.value,
      destinationWarehouse: this.mainForm.controls.destinationWarehouse.value,
      listDevices: listDevices,
    };
  }

  private setValueObjService(data) {
    this.objFilter.batchNumber = data.batchNumber;
    this.objFilter.type = data.type;
    this.objFilter.warehouseId = data.warehouseId;
    this.objFilter.receiver = data.receiver;
    this.objFilter.description = data.description;
    this.objFilter.lockerId = data.lockerId;
    this.objFilter.destinationWarehouse = data.destinationWarehouse;
    this.objFilter.listDevices = data.listDevices;
    this.objFilter.exportDevice = data.exportDevice;
  }

  private setValue(objFilter) {
    this.mainForm.controls.batchNumber.setValue(objFilter.batchNumber);
    this.mainForm.controls.type.setValue(objFilter.type);
    this.mainForm.controls.warehouseId.setValue(objFilter.warehouseId);
    this.mainForm.controls.statusBills.setValue(objFilter.statusBills);
    this.mainForm.controls.receiver.setValue(objFilter.receiver);
    this.mainForm.controls.description.setValue(objFilter.description);
    this.mainForm.controls.lockerId.setValue(objFilter.lockerId);
    this.mainForm.controls.destinationWarehouse.setValue(
      objFilter.destinationWarehouse
    );
  }

  private resetObj() {
    this.objFilter.createdUser = this.currentUser.id;
    this.objFilter.batchNumber = this.mainForm.controls.batchNumber.value;
    this.objFilter.type = this.mainForm.controls.type.value;
    this.objFilter.warehouseId = this.mainForm.controls.warehouseId.value;
    this.objFilter.receiver = this.mainForm.controls.receiver.value;
    this.objFilter.description = this.mainForm.controls.description.value;
    this.objFilter.lockerId = this.mainForm.controls.lockerId.value;
    this.objFilter.destinationWarehouse =
      this.mainForm.controls.destinationWarehouse.value;
    this.objFilter.listDevices = this.mainForm.controls.device.value;
  }
}
