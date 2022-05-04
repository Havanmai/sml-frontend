import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NgxPermissionsService } from 'ngx-permissions';
import { MenuSideBar } from '../menu';

export class MenuData {
  title: string;
  icon?: string;
  routerLink?: string;
  permission?: string;
  children?: MenuData[];
  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.title = obj.title;
    this.icon = obj.icon;
    this.routerLink = obj.routerLink;
    this.permission = obj.permission;
    this.children = obj.children;
  }
}

@Component({
  selector: 'cms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit {
  menuData = MenuSideBar;

  constructor(
    private permissionsService: NgxPermissionsService,
    private baseService: BaseService
  ) {}
  listOfData: any[] = [];
  listOfMenu: any[] = [];
  listDataChild: any[] = [];
  ngOnInit(): void {
    this.baseService.getUserDetail().subscribe(
      (data: any) => {
        //TODO - init permission list
        if (data.permissions && data.permissions.length > 0) {
          this.permissionsService.loadPermissions(data.permissions);
          this.listOfData = Object.keys(
            this.permissionsService.getPermissions()
          );

          /* this.menuData.forEach(itemData=>{
          if(!itemData.children){
            let  existparent = this.listOfData.some(item=> item==itemData.permission);
            if(existparent==true){
              this.listOfMenu.push(itemData)
            }
          }
          else{
           this.listDataChild=[];
            itemData.children.forEach(itemData=>{
              let  existchild = this.listOfData.some(item=> item==itemData.permission);
              if(existchild==true){
              this.listDataChild.push(itemData)
              }
            })
            itemData.children=this.listDataChild;
            this.listOfMenu.push(itemData);

          }
        })

        console.log(" danh sách menu theo quyền", this.listOfMenu); */
        }
      },
      (error: any) => {
        console.log('Không lấy được thông tin người dùng', error);
        /* this.baseService.showToast("Không lấy được thông tin người dùng",Constants.TOAST_ERROR); */
      }
    );
  }
}
