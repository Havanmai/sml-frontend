import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LockerCabinetCaterory } from './locker-cabinet-category.model';
import { LockerCategoryService } from './locker-category.service';
import * as _ from 'lodash';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'cms-locker-category',
  templateUrl: './locker-category.component.html',
  styleUrls: ['./locker-category.component.less'],
})
export class LockerCategoryComponent implements OnInit {
  // PUBLIC
  public createCategoryForm: FormGroup;

  public showCreateCategory: boolean = false;

  public editCategory: boolean = false;

  public submitting: boolean = false;

  public tabSelected: number = 2;
  public typeModal = {
    location: 1,
    category: 2,
    ratingBuilding: 3,
  };

  // Upload File
  public isLoading = false;
  // PRIVATE
  private id: number;

  // CONSTRUCTOR
  constructor(
    private baseService: BaseService,
    private lockerCategoryService: LockerCategoryService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {

    this.lockerCategoryService.reloadCategoryLocker$.subscribe((data) => {
      this.getAllLockerCategory();
    });
    this.lockerCategoryService.editCategoryLocker$.subscribe((data) => {
      this.editGroupLocker(data);
    });
  }

  public listCategoryLocker = [];
  public total: number;
  public filterCategory = {
    pageSize: 10,
    pageNumber: 1,
  };

  public objCategory = {
    id: null,
    name: null,
    note: null,
  };
  // CONSTRUCTOR

  // LIFE CYCLE
  ngOnInit(): void {
    this.filterCategory.pageNumber=1;
    this.filterCategory.pageSize=10;
    this.getAllLockerCategory();
    this.createCategoryForm = this.fb.group({
      categoryName: [null, [Validators.required]],
      status: [false],
      note: [null],
    });
  }

  // PUBLIC METHOD
  public onPageChange(event) {
    this.filterCategory.pageNumber = event;
    this.getAllLockerCategory();
  }

  public onEdit(data) {
    this.lockerCategoryService.editCategory(data);
  }

  public onDelete(data) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa nhóm Locker ${data.name} này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.lockerCategoryService.deleteCategoryLocker(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa nhóm Locker thành công',
                Constants.TOAST_OK
              );
              this.getAllLockerCategory();
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
  private getAllLockerCategory() {
    this.baseService.showLoading(true);
    this.lockerCategoryService
      .getAllLockerCategory(
        this.filterCategory.pageNumber - 1,
        this.filterCategory.pageSize
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.baseService.showLoading(false);
          if (data.error == 0) {
            this.responseProcess(data);
          }
        },
        (error: any) => {
          console.log('Không gửi được yêu cầu lấy thông tin', error);
        }
      );
  }

  private responseProcess(data: any) {
    this.listCategoryLocker = [];
    this.total = data.data.total;
    data.data.data.forEach((item) => {
      let itemData = new LockerCabinetCaterory(item);
      this.listCategoryLocker.push(itemData);
    });
  }

  //CRUD

  public createCategoryLocker() {
    this.showCreateCategory = true;
    this.editCategory = false;
    this.createCategoryForm.controls.categoryName.setValue(null);
    this.createCategoryForm.controls.note.setValue(null);
    this.createCategoryForm.controls.status.setValue(false);
  }

  public editGroupLocker(data: LockerCabinetCaterory) {
    this.showCreateCategory = true;
    this.editCategory = true;
    this.id = data.id;
    this.createCategoryForm.controls.categoryName.setValue(data.name);
    this.createCategoryForm.controls.note.setValue(data.note);
    if (data.status == 1) {
      this.createCategoryForm.controls.status.setValue(true);
    } else {
      this.createCategoryForm.controls.status.setValue(false);
    }
  }

  public submitCategory() {
    for (const i in this.createCategoryForm.controls) {
      if (this.createCategoryForm.controls.hasOwnProperty(i)) {
        this.createCategoryForm.controls[i].markAsDirty();
        this.createCategoryForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createCategoryForm.invalid) {
      let status;
      if (this.createCategoryForm.controls.status.value) {
        status = 1;
      } else {
        status = 0;
      }
      if (!this.editCategory) {
        this.submitting = true;
        this.lockerCategoryService
          .postCategoryLocker(
            this.createCategoryForm.controls.categoryName.value,
            this.createCategoryForm.controls.note.value,
            status
          )
          .subscribe(
            (data: any) => {
              this.submitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Tạo nhóm Locker thành công',
                  Constants.TOAST_OK
                );
                this.cancelModal();
                this.lockerCategoryService.reloadCategoryLocker();
              } else {
                this.baseService.showToast(
                  'Tạo nhóm Locker không thành công',
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
        this.lockerCategoryService
          .updateCategoryLocker(
            this.id,
            this.createCategoryForm.controls.categoryName.value,
            this.createCategoryForm.controls.note.value,
            status
          )
          .subscribe(
            (data: any) => {
              this.submitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Cập nhật nhóm Locker thành công',
                  Constants.TOAST_OK
                );
                this.cancelModal();
                this.lockerCategoryService.reloadCategoryLocker();
              } else {
                this.baseService.showToast(
                  'Cập nhật nhóm Locker không thành công',
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

  public cancelModal() {
    this.showCreateCategory = false;
  }
}
