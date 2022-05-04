import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
  createFormSupplier: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormSupplier = this.fb.group({
      nameSupplier: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      note: [null],
    });
  }
  submitCreateSupplier() {}
}
