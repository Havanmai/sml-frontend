import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService, Utils } from 'common';
import { Supplier } from '../../partner/supplier/supplier.model';
import { PostOfficeModel } from '../../warehouse/store/post-ofice.model';
import { LockerStatus } from '../locker-status/locker-status.model';
import { PostMan } from '../postmans/postman.model';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'cms-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.less'],
})
export class TransactionsComponent implements OnInit {
  listOfData: Transaction[] = [];
  page: number;
  size: number;
  total: number;
  keyword: string;
  status: number;
  enterFrom: string;
  enterTo: string;
  listOfPost: PostOfficeModel[] = [];
  postId: string;
  isLoadingScroll: boolean = false;
  listOfPostMan: PostMan[] = [];
  lockersize: number;
  postmanId: string;
  isLoadingPostmanScroll: boolean = false;

  clickDetail: boolean = false;
  checkUpgrade: boolean = false;
  constructor(
    private transactionService: TransactionService,
    private baseService: BaseService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    this.getAllTransaction();
    this.getLockerSearchLoad();
    this.getSupplierSearchLoad();
    this.getDPSearchLoad();
    this.getServiceSearchLoad();
  }

  upgraded() {
    this.checkUpgrade = !this.checkUpgrade;
  }

  getAllTransaction() {
    this.baseService.showLoading(true);
    this.transactionService
      .getAllTransaction(
        this.page - 1,
        this.size,
        this.keyword,
        this.status,
        this.enterFrom,
        this.enterTo,
        this.postId,
        this.lockerId,
        this.lockersize,
        this.postmanId,
        this.supplierId,
        this.dpId,
        this.serviceId
      )
      .subscribe((data: any) => {
        console.log("trasaction", data)
        this.baseService.showLoading(false);
        if (data.error == 0) {
          this.responseProcess(data);
        }
      });
  }

  responseProcess(data: any) {
    this.listOfData = [];
    this.total = data.data.total;
    data.data.data.forEach((element) => {
      let item = new Transaction(element);
      this.listOfData.push(item);
    });
  }

  pageChange(event) {
    this.page = event;
    this.getAllTransaction();
  }

  searchKeyWord() {
    this.page=1;
    this.size=10;
    this.getAllTransaction();
  }

  coppyCode(data: any) {
    Utils.copyToClipboard(data.maVanDon);
  }

  filterSelect($event) {
    this.page=1;
    this.size=10;
    let arraydate = $event.split('/');
    this.enterFrom = arraydate[0];
    this.enterTo = arraydate[1];
    this.getAllTransaction();
  }

  pageBuuCuc: number = 0;
  sizeBuuCuc: number = 10;
  totalBuuCuc: number = 0;
  searchBC: string;
  getBuuCucSearchLoad(event) {
    this.searchBC = event;
    this.transactionService
      .getBuuCucSearchByCode(this.pageBuuCuc, this.sizeBuuCuc, this.searchBC)
      .subscribe(
        (data: any) => {

          this.isLoadingScroll = false;
          this.responseProcessBuuCuc(data);
        },
        (error: any) => {
          console.log('Không gửi được thông tin lấy bưu cục', error);
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
      this.getBuuCucSearchLoad(this.searchBC);
    }
  }

  searchPost(event) {
    this.page=1;
    this.size=10;
    this.postId = event;
    if (event == null) {
      this.listOfPost = [];
    }
    this.getAllTransaction();
  }

  pageLocker: number = 0;
  sizeLocker: number = 10;
  totalLocker: number = 0;
  isLoadingLockerScroll: boolean = false;
  listOfLocker: LockerStatus[] = [];
  lockerId: number;
  getLockerSearchLoad() {
    this.transactionService
      .getLockerSearch(this.pageLocker, this.sizeLocker)
      .subscribe(
        (data: any) => {
          this.isLoadingLockerScroll = false;
          this.responseProcessLocker(data);
        },
        (error: any) => {
          console.log('Không gưi được thông tin lấy bưu cục', error);
        }
      );
  }

  responseProcessLocker(data: any) {
    if (this.listOfLocker == []) {
      this.listOfLocker = data.data.data;
    } else {
      this.listOfLocker = this.listOfLocker.concat(data.data.data);
    }
    this.totalLocker = data.data.total;
  }

  loadMoreLocker(): void {
    if (this.totalLocker > this.listOfLocker.length) {
      this.isLoadingLockerScroll = true;
      this.pageLocker = this.pageLocker + 1;
      this.getLockerSearchLoad();
    }
  }

  searchLocker(event) {
    this.page=1;
    this.size=10;
    this.lockerId = event;
    this.getAllTransaction();
  }

  pageSupplier: number = 0;
  sizeSupplier: number = 10;
  totalSupplier: number = 0;
  isLoadingSupplierScroll: boolean = false;
  listOfSupplier: Supplier[] = [];
  supplierId: string;
  getSupplierSearchLoad() {
    this.transactionService
      .getSuppliersList(this.pageSupplier, this.sizeSupplier)
      .subscribe(
        (data: any) => {
          this.isLoadingSupplierScroll = false;
          this.responseProcessSupplier(data);
        },
        (error: any) => {
          console.log('Không gưi được thông tin lấy nhà cung cấp', error);
        }
      );
  }

  responseProcessSupplier(data: any) {
    if (this.listOfSupplier == []) {
      this.listOfSupplier = data.data.data;
    } else {
      this.listOfSupplier = this.listOfSupplier.concat(data.data.data);
    }
    this.totalSupplier = data.data.total;
  }

  loadMoreSupplier(): void {
    if (this.totalSupplier > this.listOfSupplier.length) {
      this.isLoadingSupplierScroll = true;
      this.pageSupplier = this.pageSupplier + 1;
      this.getSupplierSearchLoad();
    }
  }

  pageDP: number = 0;
  sizeDP: number = 10;
  totalDP: number = 0;
  isLoadingDPScroll: boolean = false;
  listOfDP: Supplier[] = [];
  dpId: string;
  getDPSearchLoad() {
    this.transactionService.getDeliveryList(this.pageDP, this.sizeDP).subscribe(
      (data: any) => {
        this.isLoadingDPScroll = false;
        this.responseProcessDP(data);
      },
      (error: any) => {
        console.log('Không gưi được thông tin lấy đối tác vận chuyển', error);
      }
    );
  }

  responseProcessDP(data: any) {
    if (this.listOfDP == []) {
      this.listOfDP = data.data.data;
    } else {
      this.listOfDP = this.listOfDP.concat(data.data.data);
    }
    this.totalDP = data.data.total;
  }

  loadMoreDP(): void {
    if (this.totalDP > this.listOfDP.length) {
      this.isLoadingDPScroll = true;
      this.pageDP = this.pageDP + 1;
      this.getDPSearchLoad();
    }
  }

  pageService: number = 0;
  sizeService: number = 10;
  totalService: number = 0;
  isLoadingServiceScroll: boolean = false;
  listOfService: Supplier[] = [];
  serviceId: string;
  getServiceSearchLoad() {
    this.transactionService.getAllService(this.pageService, this.sizeService).subscribe(
      (data: any) => {
        console.log(data)
        this.isLoadingServiceScroll = false;
        this.responseProcessService(data);
      },
      (error: any) => {
        console.log('Không gưi được thông tin lấy dịch vụ', error);
      }
    );
  }

  responseProcessService(data: any) {
    if (this.listOfService == []) {
      this.listOfService = data.data.data;
    } else {
      this.listOfService = this.listOfService.concat(data.data.data);
    }
    this.totalService = data.data.total;
  }

  loadMoreService(): void {
    if (this.totalService > this.listOfService.length) {
      this.isLoadingServiceScroll = true;
      this.pageService = this.pageService + 1;
      this.getServiceSearchLoad();
    }
  }

  searchDP(event) {
    this.page=1;
    this.size=10;
    this.dpId = event;
    this.getAllTransaction();
  }

  searchSupplier(event) {
    this.page=1;
    this.size=10;
    this.supplierId = event;
    this.getAllTransaction();
  }

  searchStatus(event) {
    this.page=1;
    this.size=10;
    this.status = event;
    this.getAllTransaction();
  }
  searchLockerSize(event) {
    this.page=1;
    this.size=10;
    this.lockersize = event;
    this.getAllTransaction();
  }

  searchPostman(event) {
    this.page=1;
    this.size=10;
    this.postmanId = event;
    this.getAllTransaction();
  }

  searchService(event) {
    this.page=1;
    this.size=10;
    this.serviceId = event;
    this.getAllTransaction();
  }

  pagePostman: number = 0;
  sizePostman: number = 10;
  totalPostman: number = 0;
  valuePostman: string;
  getPostmanSearchLoad(event) {
    this.valuePostman = event;
    this.transactionService
      .getPostManSearch(this.pagePostman, this.sizePostman, this.valuePostman)
      .subscribe(
        (data: any) => {
          this.isLoadingPostmanScroll = false;
          this.responseProcessPostman(data);
        },
        (error: any) => {
          console.log('Không gưi được thông tin lấy bưu cục', error);
        }
      );
  }

  responseProcessPostman(data: any) {
    if (this.listOfPostMan == []) {
      this.listOfPostMan = data.data.data;
    } else {
      this.listOfPostMan = this.listOfPostMan.concat(data.data.data);
    }
    this.totalLocker = data.data.total;
  }

  loadMorePostMan(): void {
    if (this.totalLocker > this.listOfPostMan.length) {
      this.isLoadingPostmanScroll = true;
      this.pagePostman = this.pagePostman + 1;
      this.getPostmanSearchLoad(this.valuePostman);
    }
  }
}
