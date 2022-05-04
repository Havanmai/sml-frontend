import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StoreService } from '../../../warehouse/store/store.service';
import { AddressModel } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'cms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
  @Input() data: AddressModel;
  editModal: boolean;
  id: number;
  createContentForm: FormGroup;
  createSubmitting: boolean = false;
  importerId: number;
  datenow: Date;
  listOfOption: Array<{ value: string; text: string }> = [];
  page: number = 0;
  size: number = 10;
  totalReceiver: number = 0;
  /* listOfType:Array<{ value: number; text: string }> = TaskType; */
  isLoading = false;
  nzFilterOption = (): boolean => true;

  listOfProvince: any[];
  listOfDist: any[];
  listOfWard: any[];
  listOfBuidClass: any[];
  listOfLocationLocker: any[];
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private baseService: BaseService,
    private storeService: StoreService,
    private addressService: AddressService
  ) {
    this.getProvince();
    this.getBuildClass();
    this.getLocationLocker();
  }

  ngOnInit(): void {
    this.createContentForm = this.fb.group({
      provinceId: [null, [Validators.required]],
      distId: [null, [Validators.required]],
      wardId: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      buildclass: [null, [Validators.required]],
    });

    if (this.data) {
      this.editModal = true;
      this.id = this.data.id;
      console.log('data', this.data);
      this.getListDistByProvice(this.data.vtpPhuongXa.maTinh);
      this.getListWardByDist(this.data.vtpPhuongXa.quanHuyen.id);
      this.createContentForm.controls.provinceId.setValue(
        this.data.vtpPhuongXa.maTinh
      );
      this.createContentForm.controls.distId.setValue(
        this.data.vtpPhuongXa.quanHuyen.id
      );
      this.createContentForm.controls.wardId.setValue(this.data.vtpPhuongXa.id);
      this.createContentForm.controls.detail.setValue(this.data.detail);
      this.createContentForm.controls.buildclass.setValue(this.data.place.id);
      this.createContentForm.controls.locationlocker.setValue(
        this.data.buildingClass.id
      );
    } else {
      this.editModal = false;
      this.createContentForm.controls.provinceId.setValue(null);
      this.createContentForm.controls.distId.setValue(null);
      this.createContentForm.controls.wardId.setValue(null);
      this.createContentForm.controls.detail.setValue(null);
      this.createContentForm.controls.buildclass.setValue(null);
      this.createContentForm.controls.locationlocker.setValue(null);
    }
  }

  getListDistByProvice(id: string) {
    this.storeService.getDistByProvince(id).subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfDist = data.data.data;
      }
    });
  }
  getListWardByDist(id: number) {
    this.storeService.getWardByDist(id).subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfWard = data.data.data;
      }
    });
  }

  getProvince() {
    this.storeService.getAllProvince().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfProvince = data.data.data;
      }
    });
  }

  getBuildClass() {
    this.addressService.getAllRatingBuildingLocker().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfBuidClass = data.data.data;
      }
    });
  }

  getLocationLocker() {
    this.addressService.getAllLocationLocker().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfLocationLocker = data.data.data;
      }
    });
  }

  provinceChange(event) {
    if (event != null) {
      this.storeService.getDistByProvince(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.listOfWard = [];
          this.createContentForm.controls.distId.setValue(null);
          this.createContentForm.controls.wardId.setValue(null);
          this.listOfDist = data.data.data;
        }
      });
    } else {
      this.listOfDist = [];
      this.listOfWard = [];
      this.createContentForm.controls.distId.setValue(null);
    }
  }

  distChange(event) {
    if (event != null) {
      this.storeService.getWardByDist(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.createContentForm.controls.wardId.setValue(null);
          this.listOfWard = data.data.data;
        }
      });
    } else {
      this.listOfWard = [];
      this.createContentForm.controls.wardId.setValue(null);
    }
  }

  wardChange(event) {
    if (event != null) {
      this.storeService.getWardByDist(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.createContentForm.controls.wardId.setValue(null);
          this.listOfWard = data.data.data;
        }
      });
    } else {
      this.listOfWard = [];
      this.createContentForm.controls.wardId.setValue(null);
    }
  }

  submitContent() {
    for (const i in this.createContentForm.controls) {
      if (this.createContentForm.controls.hasOwnProperty(i)) {
        this.createContentForm.controls[i].markAsDirty();
        this.createContentForm.controls[i].updateValueAndValidity();
      }
    }

    this.datenow = new Date();
    if (!this.createContentForm.invalid) {
      if (this.editModal == false) {
        this.addressService
          .createAddress(
            this.createContentForm.controls.wardId.value,
            this.createContentForm.controls.detail.value,
            this.createContentForm.controls.buildclass.value
          )
          .subscribe(
            (data: any) => {
              if (data.error == 0) {
                console.log('create', data);
                this.baseService.showToast(
                  'Khởi tạo thành công địa chỉ mới',
                  Constants.TOAST_OK
                );
                this.addressService.reloadItem();
                this.cancelContent();
              }
            },
            (error: any) => {
              console.log('Khởi tạo thất bại', error);
            }
          );
      } else {
        this.addressService
          .editAddress(
            this.id,
            this.createContentForm.controls.wardId.value,
            this.createContentForm.controls.detail.value,
            this.createContentForm.controls.buildclass.value
          )
          .subscribe(
            (data: any) => {
              if (data.error == 0) {
                console.log(data);
                this.baseService.showToast(
                  'Chỉnh sửa thành công địa chỉ mới',
                  Constants.TOAST_OK
                );
                this.addressService.reloadItem();
                this.cancelContent();
              }
            },
            (error: any) => {
              console.log('Chỉnh sửa thất bại', error);
            }
          );
      }
    }
  }

  cancelContent() {
    this.modalRef.destroy();
  }
}
