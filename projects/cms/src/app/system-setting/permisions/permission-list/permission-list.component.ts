import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'cms-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.less'],
})
export class PermissionListComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  total: number = 0;
  keyword: string = '';
  group: number = 0;

  listPermissions: any[];

  groupList: any[];

  constructor(
    private baseService: BaseService,
    private permissionService: PermissionService,
    private modal: NzModalService
  ) {
    this.permissionService.reloadPermissionList$.subscribe(() => {
      this.reload();
    });
  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    setTimeout(() => {
      this.reload();
    }, 300);

    setTimeout(() => {
      this.groupList = this.permissionService.listPermissionGroup;
    }, 3000);
  }

  reload() {
    /* if(this.page < 1) */

    this.baseService.showLoading(true);
    this.permissionService
      .getPermission(this.page - 1, this.size, this.keyword, this.group)
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.error === 0) {
            this.listPermissions = data.data.data;
            this.total = data.data.total;
          }
        },
        () => this.baseService.showLoading(false)
      );
  }

  editPermission(data) {
    this.permissionService.showEditPermission(data);
  }

  deletePermission(data) {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa quyền này không?</i>',
      nzContent: '<b>' + data.name + '</b>',
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.permissionService.deletePermission(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa quyền thành công',
                Constants.TOAST_OK
              );
              this.reload();
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

  pageChange(index: number) {
    this.page = index;
    this.reload();
  }

  changePage(event) {
    this.page = event;
    this.reload();
  }

  changeSize(event) {
    this.size = event;
    this.reload();
  }
}
