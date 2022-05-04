import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'cms-group-permission',
  templateUrl: './group-permission.component.html',
  styleUrls: ['./group-permission.component.less'],
})
export class GroupPermissionComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  total: number = 0;
  keyword: string = '';
  group: number = 0;
  listOfGroup: any[];

  constructor(
    private permissionService: PermissionService,
    private modal: NzModalService,
    private baseService: BaseService
  ) {
    this.permissionService.reloadGroupList$.subscribe(() => {
      this.reloadPermissionGroup();
    });
  }

  ngOnInit(): void {
    this.reloadPermissionGroup();
  }

  reloadPermissionGroup() {
    this.permissionService.getAllGroup().subscribe((data: any) => {
      this.listOfGroup = data.data.data;
      this.permissionService.setListPermissionGroup(this.listOfGroup);
    });
  }

  deletePermissionGroup(permission: any) {
    //show confirm dialog
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa nhóm quyền này không?</i>',
      nzContent: '<b>' + permission.name + '</b>',
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.permissionService.deleteGroup(permission.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa nhóm quyền thành công',
                Constants.TOAST_OK
              );
              this.reloadPermissionGroup();
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

  editPermissionGroup(permission: any) {
    this.permissionService.showEditPermissionGroup(permission);
  }
}
