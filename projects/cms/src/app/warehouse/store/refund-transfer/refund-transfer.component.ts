import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'cms-refund-transfer',
  templateUrl: './refund-transfer.component.html',
  styleUrls: ['./refund-transfer.component.less'],
})
export class RefundTransferComponent implements OnInit {
  createRefundTransfer: FormGroup;
  constructor(private fb: FormBuilder, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.createRefundTransfer = this.fb.group({
      receiver: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      content: [null, [Validators.required]],
    });
  }

  submitRefundTransfer() {
    for (const i in this.createRefundTransfer.controls) {
      if (this.createRefundTransfer.controls.hasOwnProperty(i)) {
        this.createRefundTransfer.controls[i].markAsDirty();
        this.createRefundTransfer.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createRefundTransfer.invalid) {
    }
  }

  cancelRefundTransfer() {
    this.modalRef.destroy();
  }
}
