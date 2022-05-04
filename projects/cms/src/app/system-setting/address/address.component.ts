import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddressModel } from './address.model';
import { AddressService } from './address.service';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'cms-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.less'],
})
export class AddressComponent implements OnInit {
  keyword: string;
  listOfData: AddressModel[] = [];
  size: number;
  page: number;
  total: number;
  postId: string;
  constructor(
    private baseService: BaseService,
    private modal: NzModalService,
    private addressService: AddressService
  ) {
    this.addressService.reloadItemList$.subscribe((data) => {
      this.page = 1;
      this.size = 10;
      this.getAllAddress();
    });
  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    this.getAllAddress();
  }

  searchKeyWord() {}

  pageChange(event) {
    this.page = event;
    this.getAllAddress();
  }

  searchPost(event) {}

  getAllAddress() {
    this.baseService.showLoading(true);
    this.addressService.getAllAddress(this.page - 1, this.size).subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        if (data.error == 0) {
          console.log('list address', data);
          this.responseProcess(data);
        }
      },
      (err: any) => {
        console.log('không gửi được request lấy all buu cuc', err);
      }
    );
  }

  responseProcess(data: any) {
    this.total = data.data.total;
    this.listOfData = [];
    data.data.data.forEach((element) => {
      let item = new AddressModel(element);
      this.listOfData.push(item);
    });
  }

  createAddress() {
    this.modal.create({
      nzContent: CreateComponent,
      nzClosable: false,
    });
  }

  editAddress(item: any) {
    this.modal.create<CreateComponent, { data: AddressModel }>({
      nzContent: CreateComponent,
      nzComponentParams: {
        data: item,
      },
      nzClosable: false,
    });
  }

  deleteAddress(data: any) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa kho hàng <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.addressService.deleteAddressItem(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa địa chỉ thành công',
                Constants.TOAST_OK
              );
              this.getAllAddress();
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
