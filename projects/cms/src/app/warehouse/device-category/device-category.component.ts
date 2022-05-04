import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { DeviceCategory } from './device-category.model';
import { DeviceCategoryService } from './device-category.service';
import { DeviceItem } from './device-item.model';

@Component({
  selector: 'cms-device-category',
  templateUrl: './device-category.component.html',
  styleUrls: ['./device-category.component.less'],
})
export class DeviceCategoryComponent implements OnInit {
  showCreateGroup: boolean = false;
  listOfData: DeviceItem[] = [];
  createGroupForm!: FormGroup;
  groupSubmitting: boolean = false;
  showCreatItem: boolean = false;
  createItemForm: FormGroup;
  editGroupFlag: boolean = false;
  id: number;
  itemSubmitting: boolean = false;
  editItemFlag: boolean = false;
  idItem: number;
  showCreatDepot: boolean = false;
  createDepotForm: FormGroup;
  editDepotFlag: boolean = false;
  depotSubmitting: boolean = false;
  isDuplicateCodeDepot: boolean = false;

  listOfCategory: DeviceCategory[];

  public objFilterDepot = {
    code: null,
    name: null,
    address: null,
    phone: null,
    note: null,
  };

  public idDepot: number;

  constructor(
    private fb: FormBuilder,
    private deviceCategory: DeviceCategoryService,
    private baseService: BaseService
  ) {
    this.deviceCategory.editCategoryGroupDialog$.subscribe((data: any) => {
      this.creategroup(true);
      this.id = data.id;
      this.createGroupForm.controls.groupName.setValue(data.name);
      this.createGroupForm.controls.noteGroup.setValue(data.note);
    });

    this.deviceCategory.editCategoryItemDialog$.subscribe((data: any) => {
      this.createItem(true);
      this.idItem = data.id;
      this.createItemForm.controls.category.setValue(data.category.id);
      this.createItemForm.controls.itemName.setValue(data.name);
      this.createItemForm.controls.noteItem.setValue(data.unit);
      this.createItemForm.controls.isLockerCabinet.setValue(
        data.isLockerCabinet
      );
      this.createItemForm.controls.isBlock.setValue(data.isBlock);
      this.createItemForm.controls.type.setValue(data.isBlock ? 2 : 1);
    });

    this.deviceCategory.editDepot$.subscribe((data) => {
      this.setValueDepot(data);
    });
  }

  ngOnInit(): void {
    this.createGroupForm = this.fb.group({
      groupName: [null, [Validators.required]],
      noteGroup: [null],
    });
    this.createItemForm = this.fb.group({
      category: [null, [Validators.required]],
      itemName: [null, [Validators.required]],
      noteItem: [null, [Validators.required]],
      isLockerCabinet: [false],
      isBlock: [false],
      type: [null],
    });
    this.createDepotForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      address: [null],
      phone: [null],
      note: [],
    });
  }

  creategroup(edit: boolean = false): void {
    this.groupSubmitting = false;
    this.showCreateGroup = true;
    this.editGroupFlag = edit;
    this.createGroupForm.controls.groupName.setValue(null);
    this.createGroupForm.controls.noteGroup.setValue(null);
  }

  getAllCategory() {
    this.deviceCategory.getDeviceCategory().subscribe((data: any) => {
      this.listOfCategory = data.data.data;
    });
  }

  onChangeType() {
    if (this.createItemForm.controls.type.value === 1) {
      this.createItemForm.controls.isLockerCabinet.setValue(true);
      this.createItemForm.controls.isBlock.setValue(false);
    } else if (this.createItemForm.controls.type.value === 2) {
      this.createItemForm.controls.isLockerCabinet.setValue(false);
      this.createItemForm.controls.isBlock.setValue(true);
    }
  }

  submitGroup() {
    for (const i in this.createGroupForm.controls) {
      if (this.createGroupForm.controls.hasOwnProperty(i)) {
        this.createGroupForm.controls[i].markAsDirty();
        this.createGroupForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createGroupForm.invalid) {
      this.groupSubmitting = true;
      if (!this.editGroupFlag) {
        this.baseService.showLoading(true);
        this.deviceCategory
          .createDeviceCategory(
            this.createGroupForm.controls.groupName.value,
            this.createGroupForm.controls.noteGroup.value
          )
          .subscribe(
            (data) => {
              this.baseService.showLoading(false);
              this.groupSubmitting = false;
              if (data) {
                this.deviceCategory.reloadGroup();
                this.baseService.showNotification(
                  'Khởi tạo thành công nhóm thiết bị',
                  Constants.NOTI_OK
                );
              } else {
                this.baseService.showNotification(
                  'Khởi tạo không thành công nhóm thiết bị',
                  Constants.NOTI_ERROR
                );
              }
            },
            (error: any) => {
              console.log('Không gửi được thông tin tạo mới ', error);
            }
          );
      } else {
        this.baseService.showLoading(true);
        this.deviceCategory
          .updateDeviceCategory(
            this.id,
            this.createGroupForm.controls.groupName.value,
            this.createGroupForm.controls.noteGroup.value
          )
          .subscribe(
            (data) => {
              this.groupSubmitting = false;
              this.baseService.showLoading(false);
              if (data) {
                this.deviceCategory.reloadGroup();
                this.baseService.showNotification(
                  'Cập nhật thành công nhóm thiết bị',
                  Constants.NOTI_OK
                );
              } else {
                this.baseService.showNotification(
                  'Cập nhật không thành công nhóm thiết bị',
                  Constants.NOTI_ERROR
                );
              }
            },
            (error: any) => {
              console.log('Không gửi được thông tin cập nhật ', error);
            }
          );
      }
      this.cancelGroup();
    }
  }
  cancelGroup() {
    this.showCreateGroup = false;
  }

  submitItem() {
    for (const i in this.createItemForm.controls) {
      if (this.createItemForm.controls.hasOwnProperty(i)) {
        this.createItemForm.controls[i].markAsDirty();
        this.createItemForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createItemForm.invalid) {
      if (!this.editItemFlag) {
        this.itemSubmitting = true;
        this.baseService.showLoading(true);
        this.deviceCategory
          .createDeviceItem(
            this.createItemForm.controls.itemName.value,
            this.createItemForm.controls.category.value,
            this.createItemForm.controls.noteItem.value,
            this.createItemForm.controls.isLockerCabinet.value,
            this.createItemForm.controls.isBlock.value
          )
          .subscribe(
            (data: any) => {
              this.itemSubmitting = false;
              this.baseService.showLoading(false);
              if (data.data != null) {
                this.deviceCategory.reloadItem();
                this.baseService.showNotification(
                  'Tạo mới thành công thiết bị',
                  Constants.NOTI_OK
                );
                this.cancelItem();
              } else {
                this.baseService.showNotification(
                  'Cập nhật không thành công nhóm thiết bị',
                  Constants.NOTI_ERROR
                );
              }
            },
            (error: any) => {
              console.log('Không gửi được thông tin cập nhật ', error);
            }
          );
      } else {
        this.itemSubmitting = true;
        this.baseService.showLoading(true);
        this.deviceCategory
          .updateDeviceItem(
            this.idItem,
            this.createItemForm.controls.itemName.value,
            this.createItemForm.controls.category.value,
            this.createItemForm.controls.noteItem.value,
            this.createItemForm.controls.isLockerCabinet.value,
            this.createItemForm.controls.isBlock.value
          )
          .subscribe(
            (data) => {
              this.itemSubmitting = false;
              this.baseService.showLoading(false);
              if (data) {
                this.deviceCategory.reloadItem();
                this.baseService.showNotification(
                  'Cập nhật thành công thiết bị',
                  Constants.NOTI_OK
                );
                this.cancelItem();
              } else {
                this.baseService.showNotification(
                  'Cập nhật không thành công thiết bị',
                  Constants.NOTI_ERROR
                );
              }
            },
            (error: any) => {
              console.log('Không gửi được thông tin cập nhật ', error);
            }
          );
      }
    }
  }
  cancelItem() {
    this.showCreatItem = false;
  }

  createItem(edit: boolean = false) {
    this.itemSubmitting = false;
    this.editItemFlag = edit;
    this.showCreatItem = true;
    this.createItemForm.controls.category.setValue(1);
    this.createItemForm.controls.itemName.setValue(null);
    this.createItemForm.controls.noteItem.setValue(null);
    this.createItemForm.controls.isLockerCabinet.setValue(false);
    this.createItemForm.controls.isBlock.setValue(false);
    this.createItemForm.controls.type.setValue(null);
    this.getAllCategory();
  }

  createDepot() {
    this.depotSubmitting = false;
    this.showCreatDepot = true;
    this.editDepotFlag = false;
    this.createDepotForm.controls.code.enable();
    this.createDepotForm.controls.code.setValue(null);
    this.createDepotForm.controls.name.setValue(null);
    this.createDepotForm.controls.address.setValue(null);
    this.createDepotForm.controls.phone.setValue(null);
    this.createDepotForm.controls.note.setValue('');
  }

  public setValueDepot(data) {
    this.showCreatDepot = true;
    this.editDepotFlag = true;
    this.idDepot = data.id;
    this.createDepotForm.controls.code.disable();
    this.createDepotForm.controls.code.setValue(data.code);
    this.createDepotForm.controls.name.setValue(data.name);
    this.createDepotForm.controls.address.setValue(data.address);
    this.createDepotForm.controls.phone.setValue(data.phone);
    this.createDepotForm.controls.note.setValue(data.note);
  }

  public buildObj() {
    this.objFilterDepot.code = this.createDepotForm.controls.code.value;
    this.objFilterDepot.name = this.createDepotForm.controls.name.value;
    this.objFilterDepot.address = this.createDepotForm.controls.address.value;
    this.objFilterDepot.phone = this.createDepotForm.controls.phone.value;
    this.objFilterDepot.note = this.createDepotForm.controls.note.value;
  }

  submitDepot() {
    for (const i in this.createDepotForm.controls) {
      if (this.createDepotForm.controls.hasOwnProperty(i)) {
        this.createDepotForm.controls[i].markAsDirty();
        this.createDepotForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createDepotForm.invalid && !this.isDuplicateCodeDepot) {
      if (!this.editDepotFlag) {
        this.depotSubmitting = true;
        this.baseService.showLoading(true);
        this.buildObj();
        this.deviceCategory.createDepotItem(this.objFilterDepot).subscribe(
          (res) => {
            if (res) {
              this.depotSubmitting = false;
              this.baseService.showLoading(false);
              this.deviceCategory.reloadDepotLocker();
              this.baseService.showNotification(
                'Tạo mới thành công thiết bị',
                Constants.NOTI_OK
              );
              this.cancelDepot();
            } else {
              this.baseService.showNotification(
                'Cập nhật không thành công nhóm thiết bị',
                Constants.NOTI_ERROR
              );
            }
          },
          (error: any) => {
            console.log('Không gửi được thông tin cập nhật ', error);
          }
        );
      } else {
        this.depotSubmitting = true;
        this.baseService.showLoading(true);
        this.buildObj();
        this.deviceCategory
          .updateDepotItem(this.objFilterDepot, this.idDepot)
          .subscribe(
            (res) => {
              if (res) {
                this.depotSubmitting = false;
                this.deviceCategory.reloadDepotLocker();
                this.baseService.showNotification(
                  'Cập nhật thành công thiết bị',
                  Constants.NOTI_OK
                );
                this.cancelDepot();
              } else {
                this.baseService.showNotification(
                  'Cập nhật không thành công thiết bị',
                  Constants.NOTI_ERROR
                );
              }
            },
            (error: any) => {
              console.log('Không gửi được thông tin cập nhật ', error);
            }
          );
      }
    }
  }

  public changeCodeDepot() {
    if (this.createDepotForm.controls.code.value) {
      this.deviceCategory
        .checkExistDepot(this.createDepotForm.controls.code.value)
        .subscribe(
          (res) => {
            if (res && res.data) {
              this.isDuplicateCodeDepot = true;
            } else {
              this.isDuplicateCodeDepot = false;
            }
          },
          (error: any) => {}
        );
    }
  }

  cancelDepot() {
    this.showCreatDepot = false;
  }
}
