import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Supplier } from '../../../partner/supplier/supplier.model';
import { SupplierService } from '../../../partner/supplier/supplier.service';
import { AddressModel } from '../../../system-setting/address/address.model';
import { LockerRatingBuilding } from '../../../system-setting/building-classification/building-classification.model';
import { LockerCabinetCaterory } from '../../../system-setting/locker-category/locker-cabinet-category.model';
import { LockerCategoryService } from '../../../system-setting/locker-category/locker-category.service';
import { LockerLocation } from '../../../system-setting/set-points/set-point.model';
import { PostOfficeModel } from '../../../warehouse/store/post-ofice.model';
import { StoreService } from '../../../warehouse/store/store.service';
import { CreateAddressComponent } from '../create-locker/create-address/create-address.component';
import { LockerStatusComponent } from '../locker-status.component';
import { LockerStatus } from '../locker-status.model';
import { LockerStatusService } from '../locker-status.service';
@Component({
  selector: 'cms-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class EditComponent implements OnInit {
  validateForm: FormGroup;
  lockerId: number;
  status: number;
  latitude: number;
  longitude: number;
  buuCucId: number;
  buuCucName: string;
  lstLockerPlace: LockerLocation[] = [];
  listLockerSupplier: Supplier[] = [];
  lstLockerBuildingClass: LockerRatingBuilding[] = [];

  objLocker = {
    buuCuc: {
      id: null,
    },
    category: {
      id: null,
    },
    /*  type: null, */
    place: {
      id: null,
    },
    supplier: {
      id: null,
    },
    address: {
      id: null,
    },
    code: null,
    title: null,
    description: null,
    id: null,
    latitude: null,
    longitude: null,
    secret: null,
    serial: null,
    status: null,
  };

  listOfCategoryLocker: Array<{ value: string; text: string }> = [];
  constructor(
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private lockerService: LockerStatusService,
    private baseService: BaseService,
    private storeService: StoreService,
    private lockerCategoryService: LockerCategoryService,
    private modal: NzModalService,
    private route: Router
  ) {
    this.activeroute.paramMap.subscribe((data: any) => {
      this.lockerId = data.params.id;
      this.getDataLocker(this.lockerId);
    });
    this.storeService.reloadItemList$.subscribe((data) => {
      this.page = 1;
      this.size = 10;
      this.getAllAddress();
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      secret: [null, [Validators.required]],
      serial: [null],
      streetAddress: [null, [Validators.required]],
      lattlong: [null, [Validators.pattern(/(\d|^), (\d|$)/)]],
      status: [null],
      description: [null],
      category: [null, [Validators.required]],
      title: [null, [Validators.required]],
      supplier: [null, [Validators.required]],
      postOffice: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      distId: [null, [Validators.required]],
      wardId: [null, [Validators.required]],
      locationlocker: [null, [Validators.required]],
    });
    this.getLockerCategory();
    this.getAllSupplier();
    this.getBuildingClass();
    this.getLocationLocker();
    this.getProvince();
  }

  public changePost(type) {
    this.validateForm.controls.postOffice.setValue(type);
  }
  public changeWard(type) {
    this.validateForm.controls.wardId.setValue(type);
  }
  public changeLockerAddress(type) {
    this.validateForm.controls.streetAddress.setValue(type);
  }
  public changeLockerSupplier(type) {
    this.validateForm.controls.supplier.setValue(type);
  }
  public changeLockerPlace(type) {
    this.validateForm.controls.locationlocker.setValue(type);
  }

  //#region xử lý set data cho các trường thông tin
  codeLocker: string;

  getDataLocker(id: number) {
    this.baseService.showLoading(true);
    this.lockerService.getDetailLockerCabinet(id).subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        this.codeLocker = data.data.code;
        this.validateForm.controls.title.setValue(data.data.title);
        this.validateForm.controls.secret.setValue(data.data.secret);
        this.validateForm.controls.serial.setValue(data.data.serial);
        if (data.data.latitude != null && data.data.longitude != null) {
          this.validateForm.controls.lattlong.setValue(
            data.data.latitude
              .toString()
              .concat(', ', data.data.longitude.toString())
          );
        } else {
          this.validateForm.controls.lattlong.setValue(null);
        }
        this.validateForm.controls.description.setValue(data.data.description);
        this.validateForm.controls.status.setValue(data.data.status);
        if (data.data.buuCuc == null) {
          this.validateForm.controls.postOffice.setValue(null);
        } else {
          /* this.buuCucId = data.data.buuCuc.id; */
          this.buuCucName = data.data.buuCuc.maBuuCuc;
          this.validateForm.controls.postOffice.setValue(
            data.data.buuCuc.maBuuCuc
          );
        }

        if (data.data.category == null) {
          this.validateForm.controls.category.setValue(null);
        } else {
          this.validateForm.controls.category.setValue(data.data.category.id);
        }

        if (data.data.place) {
          this.validateForm.controls.locationlocker.setValue(
            data.data.place.id
          );
        }
        if (data.data.address.vtpPhuongXa) {
          if (data.data.address.vtpPhuongXa.maTinh) {
            this.validateForm.controls.provinceId.setValue(
              data.data.address.vtpPhuongXa.maTinh
            );
            if (data.data.address.vtpPhuongXa.quanHuyen) {
              this.validateForm.controls.distId.setValue(
                data.data.address.vtpPhuongXa.quanHuyen.id
              );
              this.validateForm.controls.wardId.setValue(
                data.data.address.vtpPhuongXa.id
              );
            }
          }
        }
        if (data.data.address) {
          this.validateForm.controls.streetAddress.setValue(
            data.data.address.id
          );
        }
        if (data.data.supplier) {
          this.validateForm.controls.supplier.setValue(data.data.supplier.id);
        }

        this.validateForm.controls.secret.disable();
      },
      (error: any) => {
        console.log('Không thể lấy được thông tin của Locker', error);
      }
    );
  }

  listOfPostOffice: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  searchPostOffice($event) {
    this.storeService.getPostOffice($event).subscribe((data: any) => {
      if (data.error == 0) {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.data.data.forEach((item) => {
          listOfOption.push({
            value: item.id,
            text: item.maBuuCuc,
          });
        });
        this.listOfPostOffice = listOfOption;
      }
    });
  }
  //#endregion xử lý set data cho các trường thông tin

  //#region get data of list
  getLockerCategory() {
    this.lockerCategoryService.getAllLockerCategory().subscribe((data: any) => {
      if (data.error == 0) {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.data.data.forEach((item) => {
          listOfOption.push({
            value: item.id,
            text: item.name,
          });
        });
        this.listOfCategoryLocker = listOfOption;
      }
    });
  }

  pagesupplier: number = 0;
  sizesupplier: number = 10;
  getAllSupplier() {
    this.lockerService
      .getAllSupplier(this.pagesupplier, this.sizesupplier)
      .subscribe((data: any) => {
        if (data.error == 0) {
          this.responseSupplier(data);
        }
      });
  }

  responseSupplier(data: any) {
    this.listLockerSupplier = [];
    if (data.data.data.length > 0) {
      data.data.data.forEach((element) => {
        let item = new Supplier(element);
        this.listLockerSupplier.push(item);
      });
    }
  }

  pageLocationLocker: number = 0;
  sizeLocationLocker: number = 10;
  getLocationLocker() {
    this.lockerService
      .getAllLocationLocker(this.pageLocationLocker, this.sizeLocationLocker)
      .subscribe((data: any) => {
        if (data.error == 0) {
          this.responseLocationLocker(data);
        }
      });
  }

  responseLocationLocker(data: any) {
    this.lstLockerPlace = [];
    if (data.data.data.length > 0) {
      data.data.data.forEach((element) => {
        let item = new LockerLocation(element);
        this.lstLockerPlace.push(item);
      });
    }
  }

  pageBuildingClass: number = 0;
  sizeBuildingClass: number = 10;
  getBuildingClass() {
    this.lockerService
      .getAllRatingBuildingLocker(
        this.pageBuildingClass,
        this.sizeBuildingClass
      )
      .subscribe((data: any) => {
        if (data.error == 0) {
          this.responseBuildingClass(data);
        }
      });
  }
  responseBuildingClass(data: any) {
    this.lstLockerBuildingClass = [];
    if (data.data.data.length > 0) {
      data.data.data.forEach((element) => {
        let item = new LockerRatingBuilding(element);
        this.lstLockerBuildingClass.push(item);
      });
    }
  }

  //#endregion get data of list

  //#region setup object trước khi submit

  public buildObj() {
    if (this.validateForm.controls.postOffice.value) {
      this.objLocker.buuCuc.id = this.buuCucId;
    }
    this.objLocker.id = this.lockerId;
    this.objLocker.code = this.codeLocker;
    this.objLocker.description = this.validateForm.controls.description.value;
    this.objLocker.latitude = this.latitude;
    this.objLocker.title = this.validateForm.controls.title.value;
    this.objLocker.longitude = this.longitude;
    this.objLocker.secret = this.validateForm.controls.secret.value;
    this.objLocker.serial = this.validateForm.controls.serial.value;
    this.objLocker.status = this.validateForm.controls.status.value;
    if (this.validateForm.controls.category.value) {
      this.objLocker.category.id = this.validateForm.controls.category.value;
    }
    if (this.validateForm.controls.locationlocker.value) {
      this.objLocker.place.id = this.validateForm.controls.locationlocker.value;
    } else {
      this.objLocker.place = null;
    }
    if (this.validateForm.controls.streetAddress.value) {
      this.objLocker.address.id =
        this.validateForm.controls.streetAddress.value;
    } else {
      this.objLocker.address = null;
    }
    if (this.validateForm.controls.supplier.value) {
      this.objLocker.supplier.id = this.validateForm.controls.supplier.value;
    } else {
      this.objLocker.supplier = null;
    }
  }
  //#endregion setup object trước khi submit

  //#region xử lý submit data edit
  setBuild(id: number) {
    if (id) {
      this.buildObj();
    }
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.validateForm.invalid) {
      this.responseLattLong(this.validateForm.controls.lattlong.value);
      this.lockerService
        .getPostOffByCode(this.validateForm.controls.postOffice.value)
        .subscribe((data: any) => {
          this.buuCucId = data.data.data[0].id;
          this.setBuild(this.buuCucId);
          this.lockerService
            .updateLocker(this.objLocker, this.lockerId)
            .subscribe(
              (data: any) => {
                console.log(' Data sau khi update', data);
                if (data.error == 0) {
                  this.baseService.showToast(
                    'Cập nhật thành công Locker',
                    Constants.TOAST_OK
                  );
                  this.lockerService.reloadItem();
                  this.route.navigate(['/lockers']);
                } else {
                  this.baseService.showToast(
                    'Cập nhật không thành công Locker',
                    Constants.TOAST_ERROR
                  );
                }
              },
              (err: any) => {
                console.log('Không gửi được thông tin cần gửi', err);
              }
            );
        });
    } else {
      this.baseService.showToast(
        'Vui lòng hoàn thành form',
        Constants.TOAST_ERROR
      );
    }
  }

  responseLattLong(value: string) {
    if (value) {
      let n = value.split(', ');
      if (n.length >= 2) {
        this.latitude = Number(n[0]);
        this.longitude = Number(n[1]);
      }
    }
  }

  showPostOffice: boolean = false;
  tonggleSeachPostOffice() {
    if (this.showPostOffice) this.showPostOffice = false;
    else this.showPostOffice = true;
  }

  //#endregion xử lý submit data edit

  //#region xử lý khi địa chỉ khi thay đổi bưu cục

  checkAddress: boolean = false;
  iddisst: number;

  checkPost: boolean = false;

  onSelectPost(event) {
    console.log('Thông tin bưu cục', event);
    if (event) {
      this.validateForm.get('postOffice').setValue(event.maBuuCuc);
      this.validateForm.controls.provinceId.setValue(event.maTinh);

      setTimeout(() => {
        this.setDistLocker(event.maQuanHuyen);
      }, 100);
      this.validateForm.controls.wardId.setValue(null);
      this.validateForm.controls.streetAddress.setValue(null);
      this.showPostOffice = false;
      this.checkPost = true;
    } else {
      this.checkPost = false;
    }
  }

  setProvince() {
    if (this.validateForm.controls.postOffice.value != null) {
      this.checkPost = true;
      this.storeService
        .getPostOfficeToCode(this.validateForm.controls.postOffice.value)
        .subscribe(
          (data: any) => {
            if (data.data.total === 1) {
              this.validateForm.controls.provinceId.setValue(
                data.data.data[0].maTinh
              );
              setTimeout(() => {
                this.setDistLocker(data.data.data[0].maQuanHuyen);
              }, 100);
              this.validateForm.controls.wardId.setValue(null);
              this.validateForm.controls.streetAddress.setValue(null);
              this.checkAddress = false;
            } else {
              this.validateForm.controls.provinceId.setValue(null);
              this.checkAddress = true;
            }
          },
          (error: any) => {
            console.log('Thông tin lấy bưu cục chưa được gửi đi', error);
          }
        );
    } else {
      this.checkPost = false;
      this.validateForm.controls.provinceId.setValue(null);
    }
  }

  //#endregion xử lý khi địa chỉ khi thay đổi bưu cục

  //#region xử lý thông tin chi tiết phần địa chỉ

  listOfAddress: AddressModel[];
  total: number;
  size: number;
  page: number;

  getAllAddress() {
    this.baseService.showLoading(true);
    if (this.validateForm.controls.distId.value) {
      this.setCodeDist(this.validateForm.controls.distId.value);
    } else {
      this.maQuanHuyen = null;
    }

    setTimeout(() => {
      this.storeService
        .getAllAddress(
          0,
          this.size,
          this.validateForm.controls.provinceId.value,
          this.maQuanHuyen,
          this.validateForm.controls.wardId.value
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
    }, 100);
  }

  responseProcess(data: any) {
    this.total = data.data.total;
    this.listOfAddress = [];
    data.data.data.forEach((element) => {
      let item = new AddressModel(element);
      this.listOfAddress.push(item);
    });
  }

  setDistLocker(code: number) {
    this.storeService.getDistByCode(code).subscribe((data: any) => {
      if (data.data.total === 1) {
        this.validateForm.controls.distId.setValue(data.data.data[0].id);
      } else {
        this.validateForm.controls.distId.setValue(null);
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

  addAddress() {
    let item = this.validateForm.controls.wardId.value;
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

  listOfLocationLocker: any[];
  listOfProvince: any[];
  listOfDist: any[];
  listOfWard: any[];

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
          /* this.validateForm.controls.distId.setValue(null);
            this.validateForm.controls.wardId.setValue(null); */
          this.listOfDist = data.data.data;
        }
      });
    } else {
      this.listOfDist = [];
      this.listOfWard = [];
      /* this.listOfAddress=[]; */
      this.validateForm.controls.distId.setValue(null);
    }
    this.validateForm.controls.streetAddress.setValue(null);
    this.getAllAddress();
  }

  distChange(event) {
    if (event != null) {
      this.storeService.getWardByDist(event).subscribe((data: any) => {
        if (data.error == 0) {
          /* this.validateForm.controls.wardId.setValue(null); */
          this.listOfWard = data.data.data;
        }
      });
    } else {
      this.listOfWard = [];
      this.validateForm.controls.wardId.setValue(null);
    }
    this.validateForm.controls.streetAddress.setValue(null);
    this.getAllAddress();
  }

  wardChange() {
    this.getAllAddress();
  }

  addressChange(event) {
    if (event) {
      if (!this.validateForm.controls.wardId.value) {
        if (this.listOfAddress) {
          this.listOfAddress.forEach((item) => {
            if (item.id === event) {
              this.validateForm.controls.wardId.setValue(item.vtpPhuongXa.id);
            }
          });
        }
      }
    }
  }

  //#endregion xử lý thông tin chi tiết phần địa chỉ
}
