import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService, Constants, Utils } from 'common';
import { RoleService } from '../role.service';

export interface IPermission {
  id: number;
  name: string;
  checked: boolean;
}

export interface IGroup {
  checkAll: boolean;
  indeterminate: boolean;
  id: number;
  name: string;
  permissions: IPermission[];
}

@Component({
  selector: 'cms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit, OnDestroy {
  createRoleForm!: FormGroup;
  pemissionTree: IGroup[];
  currentSelected: number[] = [];

  formSubmitting: boolean = false;

  editMode: boolean = false;
  roleName: string;

  private sub: any;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private roleService: RoleService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createRoleForm = this.fb.group({
      id: [null],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      description: [null, [Validators.required]],
    });

    this.roleService.getAllPermission().subscribe((data: any) => {
      if (data.error === 0) {
        if (this.pemissionTree) this.pemissionTree.length = 0;
        this.pemissionTree = [];
        data.data.forEach((item: any) => {
          let group: IGroup = {
            checkAll: false,
            indeterminate: false,
            id: item.id,
            name: item.name,
            permissions: [],
          };
          item.permissions.forEach((permission) => {
            let per: IPermission = {
              id: permission.id,
              name: permission.name,
              checked: false,
            };
            group.permissions.push(per);
          });
          this.pemissionTree.push(group);
        });
        if (this.currentSelected && this.currentSelected.length > 0)
          this.mergeSelected();
      }
    });

    this.sub = this.activeRouter.params.subscribe((params) => {
      this.roleName = params['id'];
      if (this.roleName) {
        //get role detail
        this.editMode = true;
        this.roleService.getRoleDetail(this.roleName).subscribe((data: any) => {
          if (data.error == 0) {
            this.createRoleForm.get('name').setValue(data.data.name);
            this.createRoleForm
              .get('description')
              .setValue(data.data.description);
            if (data.data.permissions && data.data.permissions.length > 0) {
              data.data.permissions.forEach((permission) => {
                this.currentSelected.push(permission.id);
              });

              if (this.pemissionTree && this.pemissionTree.length > 0) {
                this.mergeSelected();
              }
            }
          }
        });
      }
    });
  }

  checkAll(id: number) {
    for (let i = 0; i < this.pemissionTree.length; i++) {
      if (this.pemissionTree[i].id === id) {
        this.pemissionTree[i].indeterminate = false;
        if (this.pemissionTree[i].checkAll) {
          this.pemissionTree[i].permissions.forEach((item) => {
            item.checked = true;
            this.selectPermission(item.id);
          });
        } else {
          this.pemissionTree[i].permissions.forEach((item) => {
            item.checked = false;
            this.removeSelectedPermission(item.id);
          });
        }
        break;
      }
    }
  }

  selectItem(item: IPermission, groupID: number) {
    if (item.checked) this.selectPermission(item.id);
    else this.removeSelectedPermission(item.id);

    this.calculateStatus(groupID);
  }

  calculateStatus(groupID: number) {
    //check itermediate status
    for (let i = 0; i < this.pemissionTree.length; i++) {
      if (this.pemissionTree[i].id === groupID) {
        let count = 0;
        this.pemissionTree[i].permissions.forEach((item) => {
          if (item.checked) count++;
        });
        if (count <= 0) {
          this.pemissionTree[i].checkAll = false;
          this.pemissionTree[i].indeterminate = false;
        } else if (count >= this.pemissionTree[i].permissions.length) {
          this.pemissionTree[i].checkAll = true;
          this.pemissionTree[i].indeterminate = false;
        } else {
          this.pemissionTree[i].checkAll = false;
          this.pemissionTree[i].indeterminate = true;
        }

        break;
      }
    }
  }

  selectPermission(id: number) {
    if (!this.currentSelected.includes(id)) this.currentSelected.push(id);
  }

  removeSelectedPermission(id: number) {
    for (let i = 0; i < this.currentSelected.length; i++) {
      if (this.currentSelected[i] === id) {
        this.currentSelected.splice(i, 1);
        break;
      }
    }
  }

  submitRole() {
    for (const i in this.createRoleForm.controls) {
      if (this.createRoleForm.controls.hasOwnProperty(i)) {
        this.createRoleForm.controls[i].markAsDirty();
        this.createRoleForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createRoleForm.invalid) {
      this.formSubmitting = true;
      if (this.editMode) {
        this.roleService
          .updateRole(
            this.createRoleForm.get('name').value,
            this.createRoleForm.get('description').value,
            this.currentSelected
          )
          .subscribe(
            (data: any) => {
              this.formSubmitting = false;
              if (data.error == 0) {
                this.baseService.showToast(
                  'Cập nhật vai trò thành công',
                  Constants.TOAST_OK
                );
              }
              setTimeout(() => {
                this.baseService.navigateTo('/roles');
              }, 200);
            },
            () => {
              this.formSubmitting = false;
            }
          );
      } else {
        this.roleService
          .createRole(
            this.createRoleForm.get('name').value,
            this.createRoleForm.get('description').value,
            this.currentSelected
          )
          .subscribe(
            (data: any) => {
              this.formSubmitting = false;
              if (data.error == 0) {
                this.baseService.showToast(
                  'Tạo vai trò thành công',
                  Constants.TOAST_OK
                );
              }
              setTimeout(() => {
                this.baseService.navigateTo('/roles');
              }, 200);
            },
            () => {
              this.formSubmitting = false;
            }
          );
      }
    }
  }

  checkAllGroup(check: boolean) {
    this.pemissionTree.forEach((group) => {
      group.indeterminate = false;
      group.checkAll = check;
      group.permissions.forEach((item) => {
        item.checked = check;
        if (check) this.selectPermission(item.id);
        else this.removeSelectedPermission(item.id);
      });
    });
  }

  mergeSelected() {
    this.pemissionTree.forEach((group) => {
      group.permissions.forEach((item) => {
        if (this.currentSelected.includes(item.id)) {
          item.checked = true;
        }
      });
      this.calculateStatus(group.id);
    });
  }

  transformCode() {
    let text: string = this.createRoleForm.get('name').value;
    text = Utils.convertToEnglish(text);
    text = Utils.removeSpecialCharacters(text);
    text = text.replace(/ /g, '_');
    text = text.toUpperCase();
    this.createRoleForm.get('name').setValue(text);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
