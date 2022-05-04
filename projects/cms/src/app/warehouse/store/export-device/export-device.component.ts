import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ExportLockerComponent } from '../export-locker/export-locker.component';

@Component({
  selector: 'cms-export-device',
  templateUrl: './export-device.component.html',
  styleUrls: ['./export-device.component.less'],
})
export class ExportDeviceComponent implements OnInit {
  createExportDevice: FormGroup;
  checkInLocker: boolean = true;
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.createExportDevice = this.fb.group({
      receiver: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      radioValue: ['A', [Validators.required]],
    });
  }

  radioChange(event) {
    console.log(event);
    if (event === 'C') {
      this.checkInLocker = false;
    } else {
      this.checkInLocker = true;
    }
  }

  submitExportDevice() {
    for (const i in this.createExportDevice.controls) {
      if (this.createExportDevice.controls.hasOwnProperty(i)) {
        this.createExportDevice.controls[i].markAsDirty();
        this.createExportDevice.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createExportDevice.invalid) {
      this.modalRef.destroy();
      if (this.createExportDevice.controls.radioValue.value === 'B') {
        this.modal.create({
          nzContent: ExportLockerComponent,
          nzClosable: false,
        });
      }
    }
  }

  cancelExportDevice() {
    this.modalRef.destroy();
  }
}
