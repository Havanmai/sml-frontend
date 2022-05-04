import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from './role.service';

@Component({
  selector: 'cms-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.less'],
})
export class RolesComponent implements OnInit {
  listRoles: any[];

  constructor(
    private baseService: BaseService,
    private roleService: RoleService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.reloadData();
    }, 200);
  }

  reloadData() {
    this.baseService.showLoading(true);
    this.roleService.getAllRoles().subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        if (data.error == 0) {
          this.listRoles = data.data;
        }
      },
      () => {
        this.baseService.showLoading(false);
      }
    );
  }

  editRole(data: any) {}

  deleteRole(data: any) {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa vai trò này không?</i>',
      nzContent: '<b>' + data.description + '</b>',
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.roleService.deleteRole(data.name).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa vai trò thành công',
                Constants.TOAST_OK
              );
              this.reloadData();
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
}
