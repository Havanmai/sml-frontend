import { Component, OnInit } from '@angular/core';
import { BaseService, Constants, UserModel } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from './user.service';

@Component({
  selector: 'cms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  total: number = 0;
  keyword: string = '';
  role: string = '';

  listUsers: UserModel[];

  listRoles: any[];

  constructor(
    private baseService: BaseService,
    private userService: UserService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.reloadPage();
    }, 200);

    setTimeout(() => {
      this.userService.getAllRoles().subscribe((data: any) => {
        if (data.error == 0) {
          this.listRoles = data.data;
          this.userService.listRoles = this.listRoles;
        }
      });
    }, 3000);
  }

  reloadPage() {
    this.baseService.showLoading(true);
    if (this.page < 1) this.page = 1;
    this.userService
      .getUsers(this.page - 1, this.size, this.keyword, this.role)
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.error == 0) {
            if (this.listUsers) this.listUsers.length = 0;
            this.listUsers = [];
            this.total = data.data.total;
            if (data.data && data.data.data && data.data.data.length > 0) {
              data.data.data.forEach((obj) => {
                let user: UserModel = new UserModel(obj);
                this.listUsers.push(obj);
              });
            }
          }
        },
        () => this.baseService.showLoading(false)
      );
  }

  pageChange(index: number) {
    this.page = index;
    this.reloadPage();
  }

  deleteUser(user: UserModel) {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa tài khoản này không?</i>',
      nzContent: '<b>' + user.login + '</b>',
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.userService.deleteUser(user.login).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa quyền thành công',
                Constants.TOAST_OK
              );
              this.reloadPage();
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
