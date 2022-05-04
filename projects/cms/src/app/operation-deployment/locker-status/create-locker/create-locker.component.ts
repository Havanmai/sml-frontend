import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddressModel } from '../../../system-setting/address/address.model';
import { LockerCabinetCaterory } from '../../../system-setting/locker-category/locker-cabinet-category.model';
import { LockerCategoryService } from '../../../system-setting/locker-category/locker-category.service';
import { StoreService } from '../../../warehouse/store/store.service';
import { CreateAddressComponent } from './create-address/create-address.component';

@Component({
  selector: 'cms-create-locker',
  templateUrl: './create-locker.component.html',
  styleUrls: ['./create-locker.component.less'],
})
export class CreateLockerComponent implements OnInit {
  showExportLocker: boolean = false;
  createExportLocker: FormGroup;
  listOfCategoryLock: LockerCabinetCaterory[];
  listOfProvince: any[];
  listOfDist: any[];
  listOfWard: any[];
  listOfBuidClass: any[];
  listOfLocationLocker: any[];
  listOfAddress: AddressModel[];
  size: number;
  page: number;
  total: number;
  checkWard: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private baseService: BaseService,
    private lockerCategoryService: LockerCategoryService,
    private modalRef: NzModalRef,
    private modal: NzModalService
  ) {
    this.storeService.reloadItemList$.subscribe((data) => {
      this.page = 1;
      this.size = 10;
      this.getAllAddress();
    });
  }

  ngOnInit(): void {
    this.createExportLocker = this.fb.group({
      nameLocker: [null, [Validators.required]],
      codeSecret: [null, [Validators.required]],
      postOffice: [null, [Validators.required]],
      categorylock: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      distId: [null, [Validators.required]],
      wardId: [null, [Validators.required]],
      streetAddress: [null, [Validators.required]],
      randomSecret: [false],
      locationlocker: [null, [Validators.required]],
    });
    this.page = 1;
    this.size = 10;
    this.getAllAddress();
    this.getListCategoryLocker();
    this.getProvince();
    this.getLocationLocker();
  }

  checkRandom: boolean = false;

  buuCucId: number;
  maBuuCuc: string;
  address: string;

  getLocationLocker() {
    this.storeService.getAllLocationLocker().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfLocationLocker = data.data.data;
      }
    });
  }

  maQuanHuyen: number;
  setCodeDist(id: number) {
    this.storeService.getDistById(id).subscribe((data: any) => {
      if (data.error == 0) {
        this.maQuanHuyen = data.data.maQuanHuyen;
      }
    });
  }

  getAllAddress() {
    this.baseService.showLoading(true);
    if (this.createExportLocker.controls.distId.value) {
      this.setCodeDist(this.createExportLocker.controls.distId.value);
    } else {
      this.maQuanHuyen = null;
    }

    this.storeService
      .getAllAddress(
        this.page - 1,
        this.size,
        this.createExportLocker.controls.provinceId.value,
        this.maQuanHuyen,
        this.createExportLocker.controls.wardId.value
      )
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.error == 0) {
            this.responseProcess(data);
          }
        },
        (err: any) => {
          console.log('không gửi được request lấy all buu cuc', err);
        }
      );
  }

  responseProcess(data: any) {
    this.total = data.data.total;
    this.listOfAddress = [];
    data.data.data.forEach((element) => {
      let item = new AddressModel(element);
      this.listOfAddress.push(item);
    });
  }

  getProvince() {
    this.storeService.getAllProvince().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfProvince = data.data.data;
      }
    });
  }

  provinceChange(event) {
    if (event != null) {
      this.storeService.getDistByProvince(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.listOfWard = [];
          this.createExportLocker.controls.distId.setValue(null);
          this.createExportLocker.controls.wardId.setValue(null);
          this.listOfDist = data.data.data;
        }
      });
    } else {
      this.listOfDist = [];
      this.listOfWard = [];
      this.createExportLocker.controls.distId.setValue(null);
    }
    this.getAllAddress();
  }

  distChange(event) {
    if (event != null) {
      this.storeService.getWardByDist(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.createExportLocker.controls.wardId.setValue(null);
          this.listOfWard = data.data.data;
        }
      });
    } else {
      this.listOfWard = [];
      this.createExportLocker.controls.wardId.setValue(null);
    }
    this.getAllAddress();
  }

  wardChange() {
    this.getAllAddress();
  }

  submitExportLocker() {
    for (const i in this.createExportLocker.controls) {
      if (this.createExportLocker.controls.hasOwnProperty(i)) {
        this.createExportLocker.controls[i].markAsDirty();
        this.createExportLocker.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createExportLocker.invalid && this.checkAddress == false) {
      this.baseService.showLoading(true);
      this.storeService
        .getPostOfficeToCode(this.createExportLocker.controls.postOffice.value)
        .subscribe(
          (data: any) => {
            if (data.error == 0) {
              this.buuCucId = data.data.data[0].id;
              this.maBuuCuc = data.data.data[0].maBuuCuc;
              this.storeService
                .postExportLocker(
                  this.buuCucId,
                  this.maBuuCuc,
                  this.createExportLocker.controls.codeSecret.value,
                  this.createExportLocker.controls.nameLocker.value,
                  this.createExportLocker.controls.categorylock.value,
                  this.createExportLocker.controls.streetAddress.value,
                  this.createExportLocker.controls.locationlocker.value
                )
                .subscribe(
                  (data: any) => {
                    this.baseService.showLoading(false);
                    if (data.error == 0) {
                      this.baseService.showToast(
                        'Tạo mới locker thành công',
                        Constants.TOAST_OK
                      );
                    } else {
                      this.baseService.showToast(
                        'Tạo locker không thành công',
                        Constants.TOAST_ERROR
                      );
                    }
                    /* this.getAllDevices(); */
                    this.cancelExportLocker();
                  },
                  (error: any) => {
                    console.log('Thông tin Locker chưa được gửi đi', error);
                  }
                );
            }
          },
          (error: any) => {
            console.log('Thông tin lấy bưu cục chưa được gửi đi', error);
          }
        );
    }
  }

  cancelExportLocker() {
    this.modalRef.destroy();
  }

  getListCategoryLocker() {
    this.lockerCategoryService.getAllLockerCategory().subscribe(
      (data: any) => {
        if (data.error == 0) {
          this.listOfCategoryLock = [];
          data.data.data.forEach((item) => {
            let itemdata = new LockerCabinetCaterory(item);
            this.listOfCategoryLock.push(itemdata);
          });
        }
      },
      (error: any) => {
        console.log('Không gửi được thông tin ', error);
      }
    );
  }

  showPostOffice: boolean = false;
  tonggleSeachPostOffice() {
    if (this.showPostOffice) this.showPostOffice = false;
    else this.showPostOffice = true;
  }

  genCodeSecret(result: boolean) {
    if (result == true) {
      this.checkRandom = true;
      this.createExportLocker.controls.codeSecret.setValue(
        this.randomString(9)
      );
      this.createExportLocker.controls.codeSecret.disable();
    } else {
      this.checkRandom = false;
      this.createExportLocker.controls.codeSecret.enable();
      this.createExportLocker.controls.codeSecret.setValue(null);
    }
  }

  randomString(len) {
    let charSet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  checkPost: boolean = false;

  onSelectPost(event) {
    if (event) {
      this.createExportLocker.get('postOffice').setValue(event.maBuuCuc);
      this.createExportLocker.controls.provinceId.setValue(event.maTinh);
      setTimeout(() => {
        this.setDistLocker(event.maQuanHuyen);
      }, 100);
      this.showPostOffice = false;
      this.checkPost = true;
    } else {
      this.checkPost = false;
    }
  }

  checkAddress: boolean = false;
  iddisst: number;

  setProvince() {
    if (this.createExportLocker.controls.postOffice.value != null) {
      this.checkPost = true;
      this.storeService
        .getPostOfficeToCode(this.createExportLocker.controls.postOffice.value)
        .subscribe(
          (data: any) => {
            if (data.data.total === 1) {
              this.createExportLocker.controls.provinceId.setValue(
                data.data.data[0].maTinh
              );
              setTimeout(() => {
                this.setDistLocker(data.data.data[0].maQuanHuyen);
              }, 100);

              this.checkAddress = false;
            } else {
              this.createExportLocker.controls.provinceId.setValue(null);
              this.checkAddress = true;
            }
          },
          (error: any) => {
            console.log('Thông tin lấy bưu cục chưa được gửi đi', error);
          }
        );
    } else {
      this.checkPost = false;
      this.createExportLocker.controls.provinceId.setValue(null);
    }
  }

  setDistLocker(code: number) {
    this.storeService.getDistByCode(code).subscribe((data: any) => {
      if (data.data.total === 1) {
        this.createExportLocker.controls.distId.setValue(data.data.data[0].id);
      } else {
        this.createExportLocker.controls.distId.setValue(null);
      }
    });
  }

  addAddress() {
    let item = this.createExportLocker.controls.wardId.value;
    if (item) {
      this.modal.create({
        nzContent: CreateAddressComponent,
        nzComponentParams: {
          data: item,
        },
        nzClosable: false,
      });
    } else {
      this.baseService.showToast(
        'Hãy chọn phường đặt locker để thêm địa chỉ mới',
        Constants.TOAST_ERROR
      );
    }
  }
}
