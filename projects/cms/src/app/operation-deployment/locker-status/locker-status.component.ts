import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants, Utils } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreService } from '../../warehouse/store/store.service';
import { CreateLockerComponent } from './create-locker/create-locker.component';
import { LockerStatus } from './locker-status.model';
import { LockerStatusService } from './locker-status.service';

@Component({
  selector: 'cms-locker-status',
  templateUrl: './locker-status.component.html',
  styleUrls: ['./locker-status.component.less'],
})
export class LockerStatusComponent implements OnInit {
  codeSearch: string;
  editLocation: FormGroup;
  listOfData: LockerStatus[] = [];
  total: number;
  showEditLocation: boolean = false;
  size: number;
  page: number;
  provinceId: string;
  provinceName: string;
  distId: string;
  distName: string;
  wardId: string;
  wardName: number;
  postId: number;
  listOfProvince: any[];
  listOfDist: any[];
  listOfWard: any[];
  listOfPost: any[] = [];
  checkReload:boolean=false;
  constructor(
    private lockerService: LockerStatusService,
    private baseService: BaseService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private storeService: StoreService
  ) {
    this.lockerService.reloadListLocker$.subscribe((data: any) => {
      this.size = 10;
      this.page = 1;
      this.listOfData = [];
      this.getAllLockerStatus();
      this.checkReload=true;
    });
  }
  ngOnInit(): void {
    this.editLocation = this.fb.group({
      lattlong: [null, [Validators.required]],
    });
    this.size = 10;
    this.page = 1;
    this.listOfData = [];
    this.getAllLockerStatus();
    this.getProvince();
  }
  getProvince() {
    this.storeService.getAllProvince().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfProvince = data.data.data;
      }
    });
  }

  pageChange($event) {
    this.page = $event;
    this.getAllLockerStatus();
  }

  getAllLockerStatus() {
    this.baseService.showLoading(true);
    this.lockerService
      .getAllLockerCabinets(
        this.page - 1,
        this.size,
        this.codeSearch,
        this.provinceName,
        this.distName,
        this.wardName,
        this.postId
      )
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.error == 0) {
            this.responseProcess(data);
          } else {
            this.baseService.showToast(
              'Hệ thông đang bảo trì, vui lòng liên hệ quản trị viên',
              Constants.TOAST_ERROR
            );
          }
        },
        (error: any) => {
          console.log('Không thể truy cập lấy thông tin Locker Status', error);
        }
      );
  }

  responseProcess(data: any) {
    this.total = data.data.total;
    this.listOfData = [];
    data.data.data.forEach((item) => {
      let itemData = new LockerStatus(item);
      this.listOfData.push(itemData);
    });
  }

  searchCode() {
    this.getAllLockerStatus();
  }

  id: number;
  serial: string;
  code: string;
  secret: string;
  streetAddress: number;
  description: string;
  buuCucId: number;
  status: number;
  title: string;
  latt: number;
  long: number;
  categoryId: number;
  idplace: number;
  isLoadingScroll: boolean = false;

  editLockerStatus(data: LockerStatus) {}

  coppySecret(secret: string) {
    if (secret != null) {
      Utils.copyToClipboard(secret);
      this.baseService.showToast(
        'Bạn đã coppy mã bí mật thành công ',
        Constants.TOAST_OK
      );
    } else {
      this.baseService.showToast(
        'Bạn đã coppy mã bí mật không thành công ',
        Constants.TOAST_ERROR
      );
    }
  }
  copyLatLong(lat: number, long: number) {
    if (lat != null && long != null) {
      let lattlong = lat.toString().concat(', ', long.toString());
      Utils.copyToClipboard(lattlong);
      this.baseService.showToast(
        'Bạn đã coppy tọa độ thành công ',
        Constants.TOAST_OK
      );
    } else {
      this.baseService.showToast(
        'Bạn đã coppy tọa độ không thành công ',
        Constants.TOAST_ERROR
      );
    }
  }

  coppySecretCode(data: any) {
    if (data) {
      let codesecret =
        'ID: ' +
        data.id +
        '\nMã Locker: ' +
        data.code +
        '\nMã bí mật: ' +
        data.secret +
        '\nTên: ' +
        data.title +
        '\nBưu cục quản lý: ' +
        data.buuCuc.maBuuCuc +
        '\nĐịa chỉ: ' +
        data.streetAddress +
        '\nLat-long: ' +
        data.latitude +
        ',' +
        data.longitude;
      Utils.copyToClipboard(codesecret);
      this.baseService.showToast(
        'Copy thông tin Locker thành công ',
        Constants.TOAST_OK
      );
    } else {
      this.baseService.showToast(
        'Coppy thông tin locker không thành công ',
        Constants.TOAST_ERROR
      );
    }
  }

  editLocationModal(data: LockerStatus) {
    this.showEditLocation = true;
    this.id = data.id;
    this.serial = data.serial;
    this.code = data.code;
    this.secret = data.secret;
    this.streetAddress = data.address.id;
    this.description = data.description;
    this.buuCucId = data.buuCuc.id;
    this.categoryId = data.category.id;
    this.status = data.status;
    this.title = data.title;
    this.idplace = data.place.id;
  }

  submitLocation() {
    if (!this.editLocation.invalid) {
      this.responseLattLong(this.editLocation.controls.lattlong.value);
      this.lockerService
        .updateLockerCabinets(
          this.id,
          this.buuCucId,
          this.code,
          this.title,
          this.description,
          this.latt,
          this.long,
          this.secret,
          this.serial,
          this.streetAddress,
          this.status,
          this.categoryId,
          this.idplace
        )
        .subscribe(
          (data: any) => {
            if (data.error == 0) {
              this.baseService.showToast(
                'Cập nhật thành công Latt - Long',
                Constants.TOAST_OK
              );
              this.cancelLocation();
              this.getAllLockerStatus();
            } else {
              this.baseService.showToast(
                'Cập nhật không thành công Latt - Long',
                Constants.TOAST_ERROR
              );
            }
          },
          (err: any) => {
            console.log('Không gửi được thông tin cần chỉnh sửa', err);
          }
        );
    }
  }
  cancelLocation() {
    this.showEditLocation = false;
  }

  responseLattLong(value: string) {
    let n = value.split(', ');
    this.latt = Number(n[0]);
    this.long = Number(n[1]);
  }

  provinceChange(event) {
    this.provinceName = event;
    if (event != null) {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.storeService.getDistByProvince(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.listOfWard = [];
          this.wardName = null;
          this.distName = null;
          this.distId = null;
          this.wardId = null;
          this.postId = null;
          this.listOfDist = data.data.data;
        }
      });
    } else {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.listOfDist = [];
      this.listOfWard = [];
      this.wardName = null;
      this.distName = null;
      this.distId = null;
      this.wardId = null;
      this.postId = null;
      this.provinceName = null;
    }
    this.getBuuCucSearchLoad();
    this.getAllLockerStatus();
  }

  distChange(event) {
    this.distId = event;
    if (event != null) {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      for (let i: number = 0; i < this.listOfDist.length; i++) {
        if (event == this.listOfDist[i].id) {
          this.distName = this.listOfDist[i].maQuanHuyen;
          break;
        }
      }
      this.storeService.getWardByDist(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.wardName = null;
          this.wardId = null;
          this.postId = null;
          this.listOfWard = data.data.data;
        }
      });
    } else {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.listOfWard = [];
      this.wardName = null;
      this.postId = null;
      this.wardId = null;
      this.distName = null;
      this.postId = null;
    }
    this.getBuuCucSearchLoad();
    this.getAllLockerStatus();
  }

  wardChange(event) {
    this.wardId = event;
    if (event != null) {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      for (let i: number = 0; i < this.listOfDist.length; i++) {
        if (event == this.listOfWard[i].id) {
          this.postId = null;
          this.wardName = this.listOfWard[i].id;
          break;
        }
      }
    } else {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.wardName = null;
      this.postId = null;
    }
    this.getBuuCucSearchLoad();
    this.getAllLockerStatus();
  }

  searchPost(event) {
    this.postId = event;
    this.getAllLockerStatus();
  }

  pageBuuCuc: number = 0;
  sizeBuuCuc: number = 10;
  totalBuuCuc: number = 0;
  getBuuCucSearchLoad() {
    this.lockerService
      .getBuuCuSearch(
        this.pageBuuCuc,
        this.sizeBuuCuc,
        this.provinceName,
        this.distName,
        this.wardName
      )
      .subscribe(
        (data: any) => {
          this.isLoadingScroll = false;
          this.responseProcessBuuCuc(data);
        },
        (error: any) => {
          console.log('Không gưi được thông tin lấy bưu cục', error);
        }
      );
  }

  responseProcessBuuCuc(data: any) {
    if (this.listOfPost == []) {
      this.listOfPost = data.data.data;
    } else {
      this.listOfPost = this.listOfPost.concat(data.data.data);
    }
    this.totalBuuCuc = data.data.total;
  }

  loadMore(): void {
    if (this.totalBuuCuc > this.listOfPost.length) {
      this.isLoadingScroll = true;
      this.pageBuuCuc = this.pageBuuCuc + 1;
      this.getBuuCucSearchLoad();
    }
  }

  createLockerCabinet() {
    this.modal.create({
      nzContent: CreateLockerComponent,
      nzClosable: false,
    });
  }
}
