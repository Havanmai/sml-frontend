import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateComponent } from './create/create.component';
import { ServiceModel } from './service.model';
import { ServiceService } from './service.service';

@Component({
  selector: 'cms-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less'],
})
export class ServicesComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  total: number = 0;
  keyword: string = '';

  listServices: ServiceModel[] = [];

  constructor(
    private baseService: BaseService,
    private modal: NzModalService,
    private serviceService: ServiceService
  ) {
    this.serviceService.reloadService$.subscribe((data: any) => {
      this.page = 1;
      this.size = 10;
      this.reloadPage();
    });
  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    this.reloadPage();
  }

  reloadPage() {
    this.baseService.showLoading(true);
    this.serviceService
      .getAllService(this.page - 1, this.size, this.keyword)
      .subscribe((data: any) => {
        this.baseService.showLoading(false);
        if (data.error == 0) {
          this.responseProcess(data);
        }
      });
  }

  responseProcess(data: any) {
    this.listServices = [];
    this.total = data.data.total;
    if (data.data && data.data.data && data.data.data.length > 0) {
      data.data.data.forEach((obj) => {
        let item = new ServiceModel(obj);
        this.listServices.push(item);
      });
    }
  }

  pageChange(index: number) {
    this.page = index;
    this.reloadPage();
  }
  searchKey(event) {
    this.page=1;
    this.size=10;
    this.keyword = event;
    this.reloadPage();
  }

  deleteServices(data: any) {
    this.modal.confirm({
      nzTitle:
        '<i>Bạn có chắc muốn xóa dịch vụ ' + data.name + 'này không?</i>',
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.serviceService.deleteService(data.id).subscribe((data: any) => {
          this.baseService.showLoading(false);
          if (data.error === 0) {
            this.baseService.showToast(
              'Xóa dịch vụ thành công',
              Constants.TOAST_OK
            );
            this.reloadPage();
          }
        });
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  createService() {
    this.modal.create<CreateComponent, { data: ServiceModel }>({
      nzContent: CreateComponent,
      nzClosable: false,
    });
  }

  editServices(item: any) {
    this.modal.create<CreateComponent, { data: ServiceModel }>({
      nzContent: CreateComponent,
      nzComponentParams: {
        data: item,
      },
      nzClosable: false,
    });
  }
}
