import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { PermissionService } from './permission.service';

@Component({
  selector: 'cms-permisions',
  templateUrl: './permisions.component.html',
  styleUrls: ['./permisions.component.less'],
})
export class PermisionsComponent implements OnInit {
  tabSelected: number = 0;

  showCreateGroup = false;
  createGroupForm!: FormGroup;
  groupSubmitting: boolean = false;
  editGroupFlag: boolean = false;

  showCreatePermission = false;
  createPermissionForm!: FormGroup;
  permissionSubmitting: boolean = false;
  editPermissionFlag: boolean = false;

  listGroup: any[];

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private permissionService: PermissionService
  ) {
    this.permissionService.editPermissionGroupDialog$.subscribe((data: any) => {
      this.showCreateGroupModal(true);
      this.createGroupForm.get('id').setValue(data.id);
      this.createGroupForm.get('groupName').setValue(data.name);
    });

    this.permissionService.editPermissionDialog$.subscribe((data: any) => {
      this.showCreatePermissionModal(true);
      this.createPermissionForm.get('id').setValue(data.id);
      this.createPermissionForm.get('name').setValue(data.name);
      this.createPermissionForm.get('groupName').setValue(data.group.id);
    });
  }

  ngOnInit(): void {
    this.createGroupForm = this.fb.group({
      id: [null],
      groupName: [null, [Validators.required]],
    });

    this.createPermissionForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      groupName: [null, [Validators.required]],
    });
  }

  showCreateGroupModal(edit: boolean = false): void {
    this.groupSubmitting = false;
    this.showCreateGroup = true;
    this.editGroupFlag = edit;
    this.createGroupForm.get('id').setValue(null);
    this.createGroupForm.get('groupName').setValue(null);
  }

  showCreatePermissionModal(edit: boolean = false): void {
    this.permissionSubmitting = false;
    this.showCreatePermission = true;
    this.listGroup = this.permissionService.listPermissionGroup;
    this.editPermissionFlag = edit;
    this.createPermissionForm.get('id').setValue(null);
    this.createPermissionForm.get('name').setValue(null);
    this.createPermissionForm.get('groupName').setValue(null);
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
      if (this.editGroupFlag) {
        this.permissionService
          .updateGroup(
            this.createGroupForm.get('id').value,
            this.createGroupForm.get('groupName').value
          )
          .subscribe(
            (data: any) => {
              this.groupSubmitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Cập nhật group thành công',
                  Constants.TOAST_OK
                );
                setTimeout(() => {
                  this.cancelGroup();
                  this.tabSelected = 1;
                  this.permissionService.reloadGroup();
                }, 300);
              }
            },
            (error) => {
              this.groupSubmitting = false;
            }
          );
      } else {
        this.permissionService
          .createGroup(this.createGroupForm.get('groupName').value)
          .subscribe(
            (data: any) => {
              this.groupSubmitting = false;
              if (data.error === 0) {
                this.baseService.showToast(
                  'Tạo mới group thành công',
                  Constants.TOAST_OK
                );
                setTimeout(() => {
                  this.cancelGroup();
                  this.tabSelected = 1;
                  this.permissionService.reloadGroup();
                }, 300);
              }
            },
            (error) => {
              this.groupSubmitting = false;
            }
          );
      }
    }
  }

  submitPermission() {
    for (const i in this.createPermissionForm.controls) {
      if (this.createPermissionForm.controls.hasOwnProperty(i)) {
        this.createPermissionForm.controls[i].markAsDirty();
        this.createPermissionForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createPermissionForm.invalid) {
      this.permissionSubmitting = true;
      if (this.editPermissionFlag) {
        this.permissionService
          .updatePermission(
            this.createPermissionForm.get('id').value,
            this.createPermissionForm.get('name').value,
            this.createPermissionForm.get('groupName').value
          )
          .subscribe((data: any) => {
            if (data.error === 0) {
              this.baseService.showToast(
                'Cập nhật quyền thành công',
                Constants.TOAST_OK
              );
              setTimeout(() => {
                this.cancelPermission();
                this.tabSelected = 0;
                this.permissionService.reloadPermission();
              }, 300);
            }
          });
      } else {
        this.permissionService
          .createPermission(
            this.createPermissionForm.get('name').value,
            this.createPermissionForm.get('groupName').value
          )
          .subscribe((data: any) => {
            if (data.error === 0) {
              this.baseService.showToast(
                'Tạo quyền thành công',
                Constants.TOAST_OK
              );
              setTimeout(() => {
                this.cancelPermission();
                this.tabSelected = 0;
                this.permissionService.reloadPermission();
              }, 300);
            }
          });
      }
    }
  }

  cancelGroup() {
    this.showCreateGroup = false;
  }

  cancelPermission() {
    this.showCreatePermission = false;
  }
}
