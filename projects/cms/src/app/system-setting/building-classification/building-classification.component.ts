import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LockerCategoryService } from '../locker-category/locker-category.service';
import { LockerRatingBuilding } from './building-classification.model';
import * as _ from 'lodash';
import { BuildingClassificationService } from './building-classification.service';
@Component({
  selector: 'cms-building-classification',
  templateUrl: './building-classification.component.html',
  styleUrls: ['./building-classification.component.less'],
})
export class BuildingClassificationComponent implements OnInit {
  public createRatingBuildingForm: FormGroup;

  public showCreateRatingBuilding: boolean = false;

  public editRatingBuilding: boolean = false;

  public submitting: boolean = false;
  // PUBLIC
  public listRatingBuildingLocker = [];
  public filterRatingBuilding = {
    pageSize: 10,
    pageNumber: 1,
  };

  total: number = 0;

  public objRatingBuilding = {
    id: null,
    name: null,
    note: null,
  };

  // PRIVATE
  private id: number;

  // CONSTRUCTOR
  constructor(
    private baseService: BaseService,
    private buildingClassService: BuildingClassificationService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {

    this.buildingClassService.reloadRatingBuildingLocker$.subscribe((data) => {
      this.getAllLockerRatingBuildingCategory();
    });
    this.buildingClassService.editRatingBuilding$.subscribe((data) => {
      this.editRatingBuildingLocker(data);
    });
  }

  // LIFE CYCLE
  ngOnInit(): void {
    this.filterRatingBuilding.pageNumber=1;
    this.filterRatingBuilding.pageSize=10;
    this.getAllLockerRatingBuildingCategory();
    this.createRatingBuildingForm = this.fb.group({
      ratingBuildingName: [null],
      note: [null],
    });
  }

  public createRatingBuildingLocker() {
    this.showCreateRatingBuilding = true;
    this.editRatingBuilding = false;
    this.createRatingBuildingForm.controls.ratingBuildingName.setValue(null);
    this.createRatingBuildingForm.controls.note.setValue(null);
  }

  // PUBLIC METHOD
  public onPageChange(event) {
    this.filterRatingBuilding.pageNumber = event;
    this.getAllLockerRatingBuildingCategory();
  }

  public onEdit(data) {
    this.buildingClassService.editRatingBuilding(data);
  }

  public onDelete(data) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa vị trí Locker ${data.name} này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.buildingClassService.deleteRatingBuildingLocker(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa vị trí Locker thành công',
                Constants.TOAST_OK
              );
              this.getAllLockerRatingBuildingCategory();
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
  private getAllLockerRatingBuildingCategory() {
    this.baseService.showLoading(true);
    this.buildingClassService
      .getAllRatingBuildingLocker(
        this.filterRatingBuilding.pageNumber - 1,
        this.filterRatingBuilding.pageSize
      )
      .subscribe(
        (res: any) => {
          this.baseService.showLoading(false);
          if (res && res.data.data) {
            this.listRatingBuildingLocker = [];
            _.each(res.data.data, (x) => {
              const data = new LockerRatingBuilding(x);
              this.listRatingBuildingLocker.push(data);
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

  public editRatingBuildingLocker(data) {
    this.showCreateRatingBuilding = true;
    this.editRatingBuilding = true;
    this.id = data.id;
    this.createRatingBuildingForm.controls.ratingBuildingName.setValue(
      data.name
    );
    this.createRatingBuildingForm.controls.note.setValue(data.note);
  }
  public submitRatingBuilding() {
    for (const i in this.createRatingBuildingForm.controls) {
      if (this.createRatingBuildingForm.controls.hasOwnProperty(i)) {
        this.createRatingBuildingForm.controls[i].markAsDirty();
        this.createRatingBuildingForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createRatingBuildingForm.invalid) {
      if (!this.editRatingBuilding) {
        this.submitting = true;
        this.buildingClassService
          .postRatingBuildingLocker(
            this.createRatingBuildingForm.controls.ratingBuildingName.value,
            this.createRatingBuildingForm.controls.note.value
          )
          .subscribe(
            (data: any) => {
              this.submitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Tạo phân hạng tòa nhà thành công',
                  Constants.TOAST_OK
                );
                this.cancelModal();
                this.buildingClassService.reloadRatingBuildingLocker();
              } else {
                this.baseService.showToast(
                  'Tạo phân hạng tòa nhà không thành công',
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
        this.buildingClassService
          .updateRatingBuildingLocker(
            this.id,
            this.createRatingBuildingForm.controls.ratingBuildingName.value,
            this.createRatingBuildingForm.controls.note.value
          )
          .subscribe(
            (data: any) => {
              this.submitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Cập nhật phân hạng tòa nhà thành công',
                  Constants.TOAST_OK
                );
                this.cancelModal();
                this.buildingClassService.reloadRatingBuildingLocker();
              } else {
                this.baseService.showToast(
                  'Cập nhật phân hạng tòa nhà không thành công',
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
    this.showCreateRatingBuilding = false;
  }
}
