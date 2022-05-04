import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService, Cache, UserModel, Utils } from 'common';
import { MenuSideBar } from '../menu';
import * as _ from 'lodash';
import { resolve } from 'dns';
import { CreateLockerComponent } from '../../operation-deployment/locker-status/create-locker/create-locker.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxPermissionsService } from 'ngx-permissions';
import { SearchAllDataService } from 'projects/cms/src/shared/services/search-all-data.service';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  public inputValue?: string;
  public routerLink?: string;
  public filteredOptions = [];
  listOfData: any[] = [];
  public optionGroups = [
    {
      title: 'Menu',
      children: [],
    },
  ];

  ListStartFast = [
    {
      title: 'Tạo tài khoản mới',
      icon: true,
      iconText: 'user-add',
      routerLink: '/users/create',
      permission: ['users:creating'],
      keyword: 'users-create',
      modal: false,
    },
    {
      title: 'Tạo locker mới',
      icon: false,
      iconText: '/assets/locker.svg',
      routerLink: '/lockers',
      permission: ['lockers:creating'],
      keyword: 'lockers-create',
      modal: true,
    },
    {
      title: 'Tạo phiếu xuất mới',
      icon: true,
      iconText: 'file-add',
      routerLink: '/store/way-bills',
      permission: ['store:way-bills-creating'],
      keyword: 'way-bills',
      modal: false,
    },
  ];

  listOfStart: any[] = [];
  public isChange = false;

  currentUser: UserModel;
  avatarStr: string;
  miniAvatarStr: string;
  constructor(
    private baseService: BaseService,
    private router: Router,
    private modal: NzModalService,
    private permissionsService: NgxPermissionsService,
    private searchAllDataService: SearchAllDataService
  ) {
    this.baseService.loadUserDataDone$.subscribe((data) => {
      setTimeout(() => {
        this.currentUser = this.baseService.getCachedUser();
        if (!this.currentUser.imageUrl || this.currentUser.imageUrl == '') {
          this.avatarStr = Utils.getTextByName(
            this.currentUser.lastName + ' ' + this.currentUser.firstName
          );
          this.miniAvatarStr = this.avatarStr.substr(0, 1);
        }
      }, 200);
    });
    /* this.searchAllData(); */
  }

  countpermission: number = 0;

  ngOnInit(): void {
    this.baseService.getUserDetail().subscribe(
      (data: any) => {
        //TODO - init permission list
        if (data.permissions && data.permissions.length > 0) {
          this.permissionsService.loadPermissions(data.permissions);
          this.listOfData = Object.keys(
            this.permissionsService.getPermissions()
          );
          this.ListStartFast.map((value) =>
            value.permission.toString()
          ).forEach((item) => {
            let checkitem = this.listOfData.some((e) => e === item);
            if (checkitem) {
              this.countpermission = this.countpermission + 1;
            }
          });
        }
      },
      (error: any) => {
        console.log('Không lấy được thông tin người dùng', error);
      }
    );

    setTimeout(()=>{
      this.searchAllData();
    },0);
  }
  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 72 && event.shiftKey && event.ctrlKey) {
      document.getElementById('inputSearch').focus();
    }
  }

  inputmenu:string;
  labelmenu:string;
  public onChange(data): void {
    this.searchAllData(data);
   /*  if (data.routerLink) {
      this.onEnter(data.routerLink);
    } else {
      if (data) {
        this.isChange = false;
        this.searchAllData(data.keyword);
        idata = this.optionGroups.filter((option) => option.children);
        if (idata) {
          _.each(idata, (child) => {
            this.filteredOptions = child.children.filter(
              (x) => x.keyword.toLowerCase().indexOf(data.toLowerCase()) !== -1
            );
          });
          this.isChange = true;
        }
      }
    } */


  }
  onFocusEvent(event: any){

    this.searchAllData('l');

 }


  directionalSearchMenu(value:any){
    this.inputmenu=value.title;
    this.labelmenu=value.title
    this.router.navigateByUrl(value.router_link);
  }

  directionalSearchNoMenu(value1:string,value2:any){
    if(value1==="/store/history-device"){
      this.router.navigateByUrl(value1.concat('/',value2.id));
    }else if(value1==="/transactions"){
      this.router.navigateByUrl(value1.concat('/detail/',value2.ma_van_don));

    }
    else{
      this.router.navigateByUrl(value1.concat('/detail/',value2.id));
    }
  }

  public onEnter(evt) {
    if (evt) {
      this.router.navigateByUrl(evt);
    }
  }

  tonggleMenu() {
    this.baseService.tonggleMenu();
  }

  changePassword() {
    this.router.navigateByUrl('/change-password');
  }

  logout() {
    Cache.clearAll();
    this.router.navigateByUrl('/login');
  }

  gotohome() {
    this.router.navigateByUrl('/home');
  }

  changeRouter(link: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.router.navigateByUrl(link));
      }, 0);
    });
  }

  startfast(link: string, modal: boolean) {
    if (!modal) {
      this.router.navigateByUrl(link);
    } else {
      this.changeRouter(link).then((value) => {
        if (link === '/lockers') {
          this.modal.create({
            nzContent: CreateLockerComponent,
            nzClosable: false,
          });
        }
      });
    }
  }

  /** Private Method */

  private searchAllData(keyword?) {
    this.searchAllDataService.searchAllData(keyword).subscribe((res) => {
      if (res && res.data) {
        this.isChange = true;
        this.filteredOptions = res.data;
      }
    });
  }
}
