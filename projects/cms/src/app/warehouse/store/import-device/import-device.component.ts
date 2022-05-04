import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { UserModel } from '../../../system-setting/user/user.model';
import { DeviceCategoryService } from '../../device-category/device-category.service';
import { DeviceItem } from '../../device-category/device-item.model';
import { DataColor } from '../list-color.data-fake';
import { StoreService } from '../store.service';

@Component({
  selector: 'cms-import-device',
  templateUrl: './import-device.component.html',
  styleUrls: ['./import-device.component.less'],
})
export class ImportDeviceComponent implements OnInit {
  createForm: FormGroup;
  listOfMenu: DeviceItem[];
  batchNumber: string;
  color: string;
  dimension: string;
  importDate: string;
  importerId: number;
  modelId: number;
  note: string;
  price: number;
  provider: string;
  serial: string;
  status: string;
  vendor: string;
  version: string;
  weight: string;
  datenow: Date;
  currentUser: UserModel;
  formattedAmount: string;
  expandKeys = ['0-0'];
  listOfColor = DataColor;
  constructor(
    private fb: FormBuilder,
    private deviceItem: DeviceCategoryService,
    private baseService: BaseService,
    private storeService: StoreService,
    private currencyPipe: CurrencyPipe
  ) {
    this.getListMenu();
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      menu: [null, [Validators.required]],
      color: [null],
      vendor: [null],
      weight: [null],
      sizeHeight: [null],
      sizeLarge: [null],
      sizeLegth: [null],
      version: [null],
      price: [null],
      note: [null],
      serial: [null, [Validators.required]],
      unitweight: [1],
      depot: [null],
    });
    this.getListMenu();
    this.getUserCurrent();
  }

  getListMenu() {
    this.baseService.showLoading(true);
    this.deviceItem.getDeviceItem().subscribe((data: any) => {
      this.baseService.showLoading(false);
      this.listOfMenu = [];
      data.data.data.forEach((item) => {
        let itemData = new DeviceItem(item);
        this.listOfMenu.push(itemData);
      });
    });
  }

  getUserCurrent() {
    this.currentUser = this.baseService.getCachedUser();
    this.importerId = this.currentUser.id;
  }

  submitCreateDevice() {
    for (const i in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createForm.invalid) {
      this.datenow = new Date();

      this.batchNumber = '';
      if (
        this.createForm.controls.sizeLegth.value &&
        this.createForm.controls.sizeHeight &&
        this.createForm.controls.sizeLarge
      ) {
        this.dimension = this.createForm.controls.sizeLegth.value
          .toString()
          .concat(
            'x',
            this.createForm.controls.sizeLegth.value.toString(),
            'x',
            this.createForm.controls.sizeHeight.value.toString(),
            'mm'
          );
      } else {
        if (this.createForm.controls.sizeLarge.value == null) {
          this.createForm.controls.sizeLarge.setValue(0);
        }
        if (this.createForm.controls.sizeHeight.value == null) {
          this.createForm.controls.sizeHeight.setValue(0);
        }
        if (this.createForm.controls.sizeLegth.value == null) {
          this.createForm.controls.sizeLegth.setValue(0);
        }
        this.dimension = this.createForm.controls.sizeLegth.value
          .toString()
          .concat(
            'x',
            this.createForm.controls.sizeLegth.value.toString(),
            'x',
            this.createForm.controls.sizeHeight.value.toString(),
            'mm'
          );
      }

      this.importDate = this.datenow.toISOString();
      this.modelId = this.createForm.controls.menu.value;
      this.note = this.createForm.controls.note.value;
      if (this.createForm.controls.price.value != null) {
        this.price = this.createForm.controls.price.value.replace(/,/g, '');
      } else {
        this.price = 0;
      }

      this.status = 'Chưa xuất';
      this.vendor = this.createForm.controls.vendor.value;
      this.version = this.createForm.controls.version.value;
      if (this.createForm.controls.weight.value) {
        if (this.createForm.controls.unitweight.value == 0) {
          this.weight = this.createForm.controls.weight.value
            .toString()
            .concat('G');
        } else if (this.createForm.controls.unitweight.value == 1) {
          this.weight = this.createForm.controls.weight.value
            .toString()
            .concat('KG');
        }
      } else {
        if (this.createForm.controls.unitweight.value == 0) {
          this.weight = '0 G';
        } else if (this.createForm.controls.unitweight.value == 1) {
          this.weight = '0 KG';
        }
      }

      this.storeService
        .createDevice(
          this.batchNumber,
          this.color,
          this.dimension,
          this.importDate,
          this.importerId,
          this.modelId,
          this.note,
          this.price,
          this.serial,
          this.status,
          this.vendor,
          this.version,
          this.weight
        )
        .subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.data != null) {
              this.baseService.showToast(
                'Nhập hàng lẻ thành công',
                Constants.TOAST_OK
              );
              history.back();
            } else {
              this.baseService.showToast(
                'Nhập hàng lẻ không thành công' + data.error,
                Constants.TOAST_ERROR
              );
            }
          },
          (error: any) => {
            console.log(
              'Không gửi được thông tin thiết bị càn khởi tạo',
              error
            );
          }
        );
    }
  }

  onChange($event: string): void {
    if ($event) {
      this.listOfColor.forEach((item) => {
        if ($event.startsWith(item.value)) {
          if (item.value === $event) {
            this.color = item.title;
          } else {
            item.children.forEach((itemChildren) => {
              if (itemChildren.value === $event) {
                this.color = itemChildren.title;
              }
            });
          }
        }
      });
    } else {
      this.color = null;
    }
  }

  isNotNumber: boolean = false;
  formatCurrency_Value(event) {
    let stringNumber = event.target.value.split(',').join('');

    if (!isNaN(stringNumber)) {
      this.isNotNumber = false;
      let strNum = stringNumber
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.createForm.controls.price.setValue(strNum);
    } else {
      this.isNotNumber = true;
      this.createForm.controls.price.setValue(null);
    }
  }
}
