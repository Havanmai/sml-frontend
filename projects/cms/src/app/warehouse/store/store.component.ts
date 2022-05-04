import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { UserModel } from '../../system-setting/user/user.model';
import { DeviceCategory } from '../device-category/device-category.model';
import { DeviceCategoryService } from '../device-category/device-category.service';
import { DeviceItem } from '../device-category/device-item.model';
import { listSynthetic } from './listSynthetic.data-fake';
import { DeviceModel } from './device.model';
import { SyntheticModel } from './synthetic.model';
import { StoreService } from './store.service';
import { LockerCabinetCaterory } from '../../system-setting/locker-category/locker-cabinet-category.model';
import { LockerCategoryService } from '../../system-setting/locker-category/locker-category.service';
import { isCheckDisabled } from 'ng-zorro-antd/core/tree';
import { flatten } from '@angular/compiler';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExportDeviceComponent } from './export-device/export-device.component';
import { RefundTransferComponent } from './refund-transfer/refund-transfer.component';
import { BatchNumberComponent } from './create-waybills/batch-number/batch-number.component';

@Component({
  selector: 'cms-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less'],
})
export class StoreComponent implements OnInit {
  //#region khai báo biến
  checked = false;
  loading = false;
  indeterminate = false;
  upgradesearch: boolean = false;
  setOfCheckedId = new Set<number>();
  startValue: Date | null = null;
  endValue: Date | null = null;
  mahang: string;
  total: number;
  date = null;
  createBatchNumberForm: FormGroup;
  listOfMenu: DeviceItem[];
  turnButtonAll: boolean = false;
  offButtonAll: boolean = false;
  exportCount: number = 0;

  listOfCategoryLock: LockerCabinetCaterory[];

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  listOfData: DeviceModel[];
  listOfCategory: DeviceCategory[];
  listOfImporter: UserModel[];
  listOfCurrentPageData: readonly DeviceModel[] = [];
  check: boolean = true;
  page: number;
  size: number;
  //#endregion khai báo biến

  //#region khai báo data các ô tổng hợp
  listOfSynthetic: SyntheticModel[] = listSynthetic;
  //#endregion

  //#region Xử lý phần lọc dữ liệu
  //#region Khai báo các biến search
  idDeviceSearch: number;
  modelSearch: number = null;
  categorySearch: number;
  importerSearch: number;
  dateStart: string;
  dateEnd: string;
  statusSearch: string;
  statusSearchValue: number;
  batchNumberSearch: string;
  listDeviceId: DeviceModel[] = [];
  //#endregion

  //#region xử ly ô search Importer (load tên khi nhập kí tự từ bàn phím)
  searchChange$ = new BehaviorSubject('');
  optionList: UserModel[] = [];
  isLoading = false;
  valueSearch: string;

  //search postoffice
  showPostOffice: boolean = false;
  tonggleSeachPostOffice() {
    if (this.showPostOffice) this.showPostOffice = false;
    else this.showPostOffice = true;
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.valueSearch = value;
    this.searchChange$.next(value);
  }

  getImporter() {
    const getImpoperterList = (name: string) =>
      this.storeService
        .getImporterSearch()
        .pipe(
          catchError(() => of({ data: [] })),
          map((res: any) => res.data.data)
        )
        .pipe(map((list: any) => list));

    const optionList$: Observable<any> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getImpoperterList));
    optionList$.subscribe((data) => {
      this.optionList = [];
      if (this.valueSearch) {
        data.forEach((item) => {
          let fullName = item.lastName.concat('', item.firstName).toLowerCase();
          if (fullName.includes(this.valueSearch.toLowerCase())) {
            this.optionList.push(item);
          }
        });
      }
      this.isLoading = false;
    });
  }
  //#endregion

  //#region xử lý select ở table chi tiết
  updateCheckedSet(data: DeviceModel, checked: boolean): void {
    if (this.listDeviceId.length == 0) {
      if (checked) {
        this.setOfCheckedId.add(data.id);
        this.listDeviceId.push(data);
        this.exportCount = this.listDeviceId.length;
      } else {
        this.setOfCheckedId.delete(data.id);
        if (this.listDeviceId != null) {
          for (let i = this.listDeviceId.length - 1; i >= 0; i--) {
            if (this.listDeviceId[i].id == data.id) {
              this.listDeviceId.splice(i, 1);
            }
          }
        }
        this.exportCount = this.listDeviceId.length;
      }
    } else if (this.listDeviceId.length > 0) {
      if (this.listDeviceId[0].status == data.status) {
        if (checked) {
          this.setOfCheckedId.add(data.id);
          this.listDeviceId.push(data);
          this.exportCount = this.listDeviceId.length;
        } else {
          this.setOfCheckedId.delete(data.id);
          if (this.listDeviceId != null) {
            for (let i = this.listDeviceId.length - 1; i >= 0; i--) {
              if (this.listDeviceId[i].id == data.id) {
                this.listDeviceId.splice(i, 1);
              }
            }
          }
          this.exportCount = this.listDeviceId.length;
        }
      } else {
        this.setOfCheckedId.delete(data.id);
        this.baseService.showToast(
          'Vui lòng chọn hàng cùng trạng thái',
          Constants.TOAST_ERROR
        );
      }
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly DeviceModel[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(({ id }) => {
      this.setOfCheckedId.has(id);
    });
    this.indeterminate =
      this.listOfCurrentPageData.some(({ id }) =>
        this.setOfCheckedId.has(id)
      ) && !this.checked;
  }

  onItemChecked(data: DeviceModel, checked: boolean): void {
    this.updateCheckedSet(data, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    /* this.listOfCurrentPageData
        .filter(({ status }) => status!=="Đã xuất")
        .forEach(({ id }) => this.updateCheckedSet(id,checked));
      this.refreshCheckedStatus(); */
  }
  //#endregion

  //#region Xử lý liên quan ngày tháng phần lọc

  onChange(result: Date[]): void {
    this.dateStart = result[0].toISOString();
    this.dateEnd = result[1].toISOString();
  }
  //#endregion Xử lý liên quan ngày tháng phần lọc

  //#endregion Xử lý phần lọc dữ liệu

  //#endregion

  //#region Các sử lý sự kiện
  constructor(
    private lockerCategoryService: LockerCategoryService,
    private baseService: BaseService,
    private storeService: StoreService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private deviceItem: DeviceCategoryService
  ) {
    this.page = 1;
    this.size = 10;
    this.getAllDevices();
  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;

    this.getListMenu();
    this.getImporter();
    this.getListCategory();
    this.getAllDevices();
    this.getAllsynthetic();
    this.getListCategoryLocker();
  }

  searchAll() {
    this.page = 1;
    this.size = 10;
    this.getStatusSearch(this.statusSearchValue);
    this.getAllDevices();
  }
  pageChange($event) {
    this.page = $event;
    this.getAllDevices();
  }

  upgradeSearch() {
    this.upgradesearch = !this.upgradesearch;
  }

  //#region xu ly load thông tin từ api
  getAllDevices() {
    this.baseService.showLoading(true);
    this.storeService
      .getAllDevice(
        this.page - 1,
        this.size,
        this.idDeviceSearch,
        this.batchNumberSearch,
        this.modelSearch,
        this.statusSearch,
        this.categorySearch,
        this.importerSearch,
        this.dateStart,
        this.dateEnd
      )
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.data.data != null) {
            console.log('danh sách thiết bị trong kho hàng', data);
            this.responseProcess(data);
            this.turnButtonAll = data.data.data.some(
              (item) => item.status !== 'Đã xuất'
            );
            if (this.turnButtonAll) {
              this.offButtonAll = false;
            } else {
              this.offButtonAll = true;
            }
          }
        },
        (error: any) => {
          console.log('Không lấy được danh sách thiết bị', error);
        }
      );
  }

  responseProcess(data: any) {
    this.total = data.data.total;
    this.listOfData = [];
    data.data.data.forEach((itemdata) => {
      let item = new DeviceModel(itemdata);
      this.listOfData.push(item);
    });

    console.log('Danh sách thiết bị', this.listOfData);
  }

  getListMenu() {
    this.baseService.showLoading(true);
    this.deviceItem.getDeviceItem().subscribe((data: any) => {
      this.baseService.showLoading(false);
      this.listOfMenu = data.data.data;
    });
  }

  getListCategory() {
    this.baseService.showLoading(true);
    this.deviceItem.getDeviceCategory().subscribe(
      (data: any) => {
        this.baseService.showLoading(false);
        if ((data.error = 0)) {
          this.listOfCategory = data.data.data;
        }
      },
      (error: any) => {
        console.log('Không gửi được thông tin ', error);
      }
    );
  }

  getAllsynthetic() {
    this.baseService.showLoading(true);
    this.storeService.getAllSynthetic().subscribe((data: any) => {
      this.baseService.showLoading(false);
      if (data.data != null) {
        this.listOfSynthetic.forEach((item) => {
          switch (item.id) {
            case 1:
              item.count = data.data.idCount;
              break;
            case 2:
              item.count = data.data.batchNumberCount;
              break;
            case 3:
              item.count = data.data.modelCount;
              break;
            case 4:
              item.count = data.data.categoryCount;
              break;
            case 5:
              item.count = data.data.notExportedYetCount;
              break;
            case 6:
              item.count = data.data.exportedCount;
              break;
            case 7:
              item.count = data.data.restockingCount;
              break;
            case 8:
              item.count = data.data.brokenCount;
              break;
            case 9:
              item.count = data.data.priceTotal;
              break;
            default:
              item.count = 0;
          }
        });
      }
    });
  }

  getStatusSearch(statusValue: number) {
    switch (statusValue) {
      case 0:
        this.statusSearch = 'Chưa xuất';
        break;
      case 1:
        this.statusSearch = 'Đã xuất';
        break;
      case 2:
        this.statusSearch = 'Hồi kho';
        break;
      case 3:
        this.statusSearch = 'Hỏng';
        break;
      default:
        this.statusSearch = '';
        break;
    }
  }

  getListCategoryLocker() {
    this.lockerCategoryService.getAllLockerCategory().subscribe(
      (data: any) => {
        if (data.error == 0) {
          this.listOfCategoryLock = [];
          data.data.data.forEach((item) => {
            let itemdata = new LockerCabinetCaterory(item);
            this.listOfCategoryLock.push(itemdata);
          });
        }
      },
      (error: any) => {
        console.log('Không gửi được thông tin ', error);
      }
    );
  }

  //#endregion xu ly load thông tin từ api

  //#region hàng theo lô
  createBatch() {
    this.modal.create({
      nzContent: BatchNumberComponent,
      nzClosable: false,
    });
  }
  //#endregion hang theo lo

  //#region xử lý nhiều thiết bị tại 1 thời điểm
  exportDivice() {
    this.modal.create({
      nzContent: ExportDeviceComponent,
      nzClosable: false,
    });
  }

  refund() {
    this.modal.create({
      nzContent: RefundTransferComponent,
      nzClosable: false,
    });
  }

  tranfer() {
    this.modal.create({
      nzContent: RefundTransferComponent,
      nzClosable: false,
    });
  }
  //#endregion xử lý nhiều thiết bị tại 1 thời điểm
}
