import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { BaseControlComponent } from '../base-control.component';
import * as _ from 'lodash';
@Component({
  selector: 'cms-file-upload',
  templateUrl: './cms-file-upload.component.html',
  styleUrls: ['./cms-file-upload.component.less'],
})
export class CmsFileUploadComponent
  extends BaseControlComponent
  implements ControlValueAccessor
{
  /** INPUT */
  @Input('accept-file-type')
  public set acceptFileType(value: string) {
    if (!value) value = '*';
    this._acceptFileType = value;
  }
  public get acceptFileType() {
    return this._acceptFileType;
  }

  @Input('template')
  public template?: TemplateRef<any>;

  @Input('isLoading')
  public isLoading: boolean = false;

  @Input('isResult')
  public isResult: boolean = false;

  @Input('templateResult')
  public templateResult?: TemplateRef<any>;

  /** OUTPUT */
  @Output() onFile: EventEmitter<NzUploadFile[]> = new EventEmitter<
    NzUploadFile[]
  >();

  /** PUBLIC FIELDS */
  public defaultListFileTemplate: TemplateRef<NzUploadFile[]>;
  public lstFile: NzUploadFile[] = [];
  /** PRIVATE FIELDS */
  private _acceptFileType = '*';
  /** Constructor */
  constructor(
    @Optional() @Self() public ngControl: NgControl,
    public ngZone: NgZone,
    public msg: NzMessageService,
    private baseService: BaseService
  ) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  /** PUBLIC METHODS */
  public handleChange = ({ file, fileList }: NzUploadChangeParam): void => {
    this.isLoading = true;
    const isExcel =
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.type === '.csv' ||
      file.type === 'application/msword' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/vnd.ms-powerpoint' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.type === 'application/pdf' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/png';
    if (!isExcel) {
      this.baseService.showNotification(
        'Vui lòng chỉ chọn định dạng file .xlsx!, .xls, .doc, .docx, .ppt, .pptx, .png, .jpeg, .jpg',
        Constants.NOTI_ERROR
      );
      this.isLoading = false;
      return;
    }

    const status = file.status;
    if (status !== 'uploading') {
      this.isLoading = true;
    }
    if (status === 'done') {
      this.isLoading = false;
      this.isResult = true;
      this.lstFile = this.lstFile.concat(file);
      this.onFile.emit(this.lstFile);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  };

  public removeFile(id) {
    _.remove(this.lstFile, (x) => x.uid === id);
    this.onFile.emit(this.lstFile);
  }
}
