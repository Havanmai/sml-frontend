import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BaseService, Constants } from 'common';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {
  LstBillsType,
  LstHeaderImport,
} from 'projects/cms/src/shared/constants/waybills.constants';
import { WaybillsService } from 'projects/cms/src/shared/services/waybills.service';
import { StoreService } from '../../store.service';
import * as _ from 'lodash';
import { ImportDeviceModel } from 'projects/cms/src/shared/models/waybills.model';
import { AppConstant } from 'projects/cms/src/shared/constants/app-constants';
import { HttpResponse } from '@angular/common/http';
interface ItemData {
  modelName: string;
  modelId: number;
  color: string;
  vendor: string;
  weight: string;
  long: string;
  wide: string;
  high: string;
  serial: string;
  version: string;
  price: string;
  note: string;
  id: string;
}
@Component({
  selector: 'cms-batch-number',
  templateUrl: './batch-number.component.html',
  styleUrls: ['./batch-number.component.less'],
})
export class BatchNumberComponent implements OnInit {
  /**INPUT */
  @Input() isValidFile = false;
  @Input() iData: ItemData[] = [];
  @Input() lstDevice = [];
  /**OUTPUT */
  @Output() onDelectFile: EventEmitter<any> = new EventEmitter<any>();
  /**PUBLIC */
  public hiddenfile: boolean = true;
  public filename: string;
  public fileCodeList: NzUploadFile[] = [];
  public codeUploading: boolean;
  public currentIdDevice;
  public uploadType = {
    Removed: 'removed',
    Uploading: 'uploading',
    Done: 'done',
    Error: 'error',
  };

  // Regex File Name
  public RegexFileName: any = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  public RegexFileNameReplace: any = /['"]/g;

  public lstHeaderImport = LstHeaderImport;
  public editCache: { [key: number]: { edit: boolean; data: ItemData } } = {};
  public isLoading = false;
  public objDevice = {
    modelName: null,
    modelId: null,
    color: null,
    vendor: null,
    weight: null,
    long: null,
    wide: null,
    high: null,
    serial: null,
    version: null,
    price: null,
    note: null,
  };

  /** PRIVATE */
  private codeErrMessage: string;

  /**CONSTRUCTOR */
  constructor(
    private baseService: BaseService,
    private waybillsService: WaybillsService
  ) {}

  /**LIFE CYCLE */
  public ngOnInit(): void {}

  /**PUBLIC METHOD */
  public beforeUploadCode = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    const isExcel =
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.type === '.csv';
    if (!isExcel) {
      this.baseService.showNotification(
        'Vui lòng chỉ chọn định dạng file .xlsx!',
        Constants.NOTI_ERROR
      );
      return false;
    }
    if (this.fileCodeList) this.fileCodeList.length = 0;
    this.fileCodeList = [];
    this.fileCodeList = this.fileCodeList.concat(file);
    this.codeErrMessage = '';
    this.handleUploadCode();
    return false;
  };

  public pageChange() {
    this.iData.forEach((item, i) => {
      this.editCache[i].edit = false;
    });
    this.currentIdDevice = null;
  }

  public removeFile() {
    this.handleCodeChange(this.uploadType.Removed);
  }

  public startEdit(number: number): void {
    this.editCache[number].edit = true;
    if (this.currentIdDevice >= 0) {
      const index = this.iData.findIndex(
        (item, i) => i === this.currentIdDevice
      );
      this.editCache[this.currentIdDevice] = {
        data: { ...this.iData[index] },
        edit: false,
      };
    }
    this.currentIdDevice = number;
  }

  public cancelEdit(number: number): void {
    const index = this.iData.findIndex((item, i) => i === number);
    this.editCache[number] = {
      data: { ...this.iData[index] },
      edit: false,
    };
    this.currentIdDevice = null;
  }

  public saveEdit(data, number): void {
    const index = this.iData.findIndex((item, i) => i === number);
    if (!data.modelId) {
      this.editCache[number].data.modelId = this.iData[index].modelId;
    }
    if (!data.serial) {
      this.editCache[number].data.serial = this.iData[index].serial;
    }
    Object.assign(this.iData[index], this.editCache[number].data);
    this.editCache[number].edit = false;
    this.currentIdDevice = null;
  }

  public saveAll() {
    this.iData.forEach((item, i) => {
      Object.assign(item, this.editCache[i].data);
      this.editCache[i].edit = false;
    });
    this.currentIdDevice = null;
  }

  public updateEditCache(): void {
    this.currentIdDevice = null;
    this.iData.forEach((item, i) => {
      this.editCache[i] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  public onChangeModelId(data, number) {
    if (data.modelId) {
      const result = _.find(this.lstDevice, (m) => m.id === data.modelId);
      data.modelName = result.name;
    } else {
      const index = this.iData.findIndex((item, i) => i === number);
      data.modelId = this.iData[index].modelId;
    }
  }

  public onUploadFile(file) {
    if (file) {
      this.isValidFile = false;
      this.isLoading = false;
      this.baseService.showLoading(true);
      const obj = this.buildObjImportExel(file);
      this.waybillsService.importByExcel(obj).subscribe(
        (res) => {
          if (res && res.data) {
            _.each(res.data, (x) => {
              const paragraph = x.dimension.split(/[*,]/, 3);
              this.objDevice.modelId = x.model.id;
              this.objDevice.color = x.color;
              this.objDevice.long = paragraph[0];
              this.objDevice.wide = paragraph[1];
              this.objDevice.high = paragraph[2];
              this.objDevice.note = x.note;
              this.objDevice.price = x.price;
              this.objDevice.serial = x.serial;
              this.objDevice.vendor = x.vendor;
              this.objDevice.version = x.version;
              this.objDevice.weight = x.weight;
              const result = _.find(this.lstDevice, (m) => m.id === x.model.id);
              this.objDevice.modelName = result.name;
              let data = new ImportDeviceModel(this.objDevice);
              this.iData.push(data);
            });
            this.baseService.showLoading(false);
            this.isLoading = true;
            this.updateEditCache();
          } else {
            this.baseService.showLoading(false);
            this.isLoading = true;
            this.hiddenfile = true;
            this.baseService.showToast(
              'Hãy tải tệp mẫu!',
              Constants.TOAST_ERROR
            );
          }
        },
        (err) => {
          // this.baseService.showToast('Tạo phiếu lỗi', Constants.TOAST_ERROR);
        }
      );
    }
  }

  public exportExcel() {
    this.waybillsService.downloadPost().subscribe(
      (res: HttpResponse<Blob>) => {
        const contentDisposition = res.headers.get('Content-Disposition');
        this.downloadFile(
          res.body,
          AppConstant.ExportContentType.Excel,
          contentDisposition
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public downloadFile(data: any, type: string, fileName: any) {
    let defaultFileName = 'Devices';
    if (fileName != null) {
      const matches = this.RegexFileName.exec(fileName);
      if (matches != null && matches[1]) {
        defaultFileName = matches[1].replace(this.RegexFileNameReplace, '');
      }
    }
    const link = document.createElement('a');
    const blob = new Blob([data], {
      type: 'text/csv;charset=UTF-8',
    });
    link.href = window.URL.createObjectURL(blob);
    link.download = defaultFileName;
    link.click();
  }

  private downloadFileConvert(data: any, type: string, fileName: string) {
    const blob = new Blob([data], { type: 'text/csv;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  /**PRIVATE METHOD */
  private buildObjImportExel(file) {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }

  private handleUploadCode(): void {
    this.handleCodeChange(this.uploadType.Uploading);
    this.fileCodeList.forEach((file) => {
      if (file) {
        this.handleCodeChange(this.uploadType.Done, file);
      } else {
        this.handleCodeChange(this.uploadType.Error);
      }
    });
  }

  private handleCodeChange(status: string, data?: any): void {
    switch (status) {
      case this.uploadType.Uploading:
        this.codeUploading = true;
        break;
      case this.uploadType.Done:
        this.codeUploading = false;
        this.hiddenfile = false;
        this.filename = data.name;
        this.onUploadFile(data);
        break;
      case this.uploadType.Removed:
        this.codeUploading = false;
        this.hiddenfile = true;
        this.fileCodeList = [];
        this.filename = '';
        this.iData = [];
        this.onDelectFile.emit();
        break;
      case this.uploadType.Error:
        this.codeErrMessage = 'Upload bị lỗi, vui lòng thử lại';
        this.codeUploading = false;
        break;
    }
  }
}
