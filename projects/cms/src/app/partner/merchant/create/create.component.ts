import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
  createFormMerchant: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormMerchant = this.fb.group({
      nameMerchant: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      note: [null],
    });
  }
  submitCreateMerchant() {}
}
