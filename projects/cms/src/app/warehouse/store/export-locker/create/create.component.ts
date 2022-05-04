import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AddressService } from 'projects/cms/src/app/system-setting/address/address.service';
import { StoreService } from '../../store.service';

@Component({
  selector: 'cms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
  @Input() data: number;
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

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private baseService: BaseService,
    private storeService: StoreService,
    private addressService: AddressService
  ) {
    /*  this.getProvince(); */
    this.getBuildClass();
  }

  ngOnInit(): void {
    this.createContentForm = this.fb.group({
      /*  provinceId:[null,[Validators.required]],
      distId:[null,[Validators.required]],
      wardId:[null,[Validators.required]], */
      detail: [null, [Validators.required]],
      buildclass: [null, [Validators.required]],
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
      this.addressService
        .createAddress(
          this.data,
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
              this.storeService.reloadItem();
              this.cancelContent();
            }
          },
          (error: any) => {
            console.log('Khởi tạo thất bại', error);
          }
        );
    }
  }

  cancelContent() {
    this.modalRef.destroy();
  }
}
