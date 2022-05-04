import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LockerCategoryService } from '../locker-category/locker-category.service';
import { LockerLocation } from './set-point.model';
import * as _ from 'lodash';
import { SetPointService } from './set-point.service';
@Component({
  selector: 'cms-set-points',
  templateUrl: './set-points.component.html',
  styleUrls: ['./set-points.component.less'],
})
export class SetPointsComponent implements OnInit {
  public createLocationForm: FormGroup;
  public showCreateLocation: boolean = false;
  public editLocation: boolean = false;
  public submitting: boolean = false;

  // PUBLIC
  public listLocationLocker = [];
  public total: number;
  public filterLocation = {
    pageSize: 10,
    pageNumber: 1,
  };

  public objLocation = {
    id: null,
    name: null,
    note: null,
  };

  // PRIVATE
  private id: number;

  // CONSTRUCTOR
  constructor(
    private baseService: BaseService,
    private setPointService: SetPointService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {

    this.setPointService.reloadLocationLocker$.subscribe((data) => {
      this.getAllLockerlocationCategory();
    });
    this.setPointService.editLocation$.subscribe((data) => {
      this.editLocationLocker(data);
    });
  }

  // LIFE CYCLE
  ngOnInit(): void {
    this.filterLocation.pageNumber=1;
    this.filterLocation.pageSize=10;
    this.getAllLockerlocationCategory();
    this.createLocationForm = this.fb.group({
      locationName: [null],
      note: [null],
    });
  }

  // PUBLIC METHOD
  public onPageChange(event) {
    this.filterLocation.pageNumber = event;
    this.getAllLockerlocationCategory();
  }

  public onEdit(data) {
    this.setPointService.editLocation(data);
  }

  public onDelete(data) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa vị trí Locker ${data.name} này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.setPointService.deleteLocationLocker(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa vị trí Locker thành công',
                Constants.TOAST_OK
              );
              this.getAllLockerlocationCategory();
            }
          },
          () => {
            this.baseService.showLoading(false);
          }
        );
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  // PRIVATE METHOD
  private getAllLockerlocationCategory() {
    this.baseService.showLoading(true);
    this.setPointService
      .getAllLocationLocker(
        this.filterLocation.pageNumber - 1,
        this.filterLocation.pageSize
      )
      .subscribe(
        (res: any) => {
          this.baseService.showLoading(false);
          if (res && res.data.data) {
            this.listLocationLocker = [];
            _.each(res.data.data, (x) => {
              const data = new LockerLocation(x);
              this.listLocationLocker.push(data);
            });
            this.total = res.data.total;
          }
        },
        (error: any) => {
          console.log('Không gửi được yêu cầu lấy thông tin', error);
        }
      );
  }

  //CRUD

  public createLocationLocker() {
    this.showCreateLocation = true;
    this.editLocation = false;
    this.createLocationForm.controls.locationName.setValue(null);
    this.createLocationForm.controls.note.setValue(null);
  }

  public editLocationLocker(data) {
    this.showCreateLocation = true;
    this.editLocation = true;
    this.id = data.id;
    this.createLocationForm.controls.locationName.setValue(data.name);
    this.createLocationForm.controls.note.setValue(data.note);
  }

  public submitLocation() {
    for (const i in this.createLocationForm.controls) {
      if (this.createLocationForm.controls.hasOwnProperty(i)) {
        this.createLocationForm.controls[i].markAsDirty();
        this.createLocationForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createLocationForm.invalid) {
      if (!this.editLocation) {
        this.submitting = true;
        this.setPointService
          .postLocationLocker(
            this.createLocationForm.controls.locationName.value,
            this.createLocationForm.controls.note.value
          )
          .subscribe(
            (data: any) => {
              this.submitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Tạo vị trí Locker thành công',
                  Constants.TOAST_OK
                );
                this.cancelModal();
                this.setPointService.reloadLocationLocker();
              } else {
                this.baseService.showToast(
                  'Tạo vị trí Locker không thành công',
                  Constants.TOAST_ERROR
                );
              }
            },
            (error) => {
              this.submitting = false;
            }
          );
      } else {
        this.submitting = true;
        this.setPointService
          .updateLocationLocker(
            this.id,
            this.createLocationForm.controls.locationName.value,
            this.createLocationForm.controls.note.value
          )
          .subscribe(
            (data: any) => {
              this.submitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Cập nhật vị trí Locker thành công',
                  Constants.TOAST_OK
                );
                this.cancelModal();
                this.setPointService.reloadLocationLocker();
              } else {
                this.baseService.showToast(
                  'Cập nhật vị trí Locker không thành công',
                  Constants.TOAST_ERROR
                );
              }
            },
            (error) => {
              this.submitting = false;
            }
          );
      }
    }
  }

  cancelModal() {
    this.showCreateLocation = false;
  }
}
