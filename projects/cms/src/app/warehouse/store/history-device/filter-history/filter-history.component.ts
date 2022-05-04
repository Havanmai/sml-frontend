import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORMERR } from 'dns';

@Component({
  selector: 'cms-filter-history',
  templateUrl: './filter-history.component.html',
  styleUrls: ['./filter-history.component.less'],
})
export class FilterHistoryComponent implements OnInit {
  /** INPUT */
  @Input() filterObj = {
    idBills: null,
    typeBills: null,
    idUser: null,
    importDevice: null,
    exportDevice: null,
  };
  @Input() lstImportDevice = [
    {
      id: 1,
      name: 'HN',
    },
    {
      id: 2,
      name: 'TB',
    },
    {
      id: 3,
      name: 'DN',
    },
    {
      id: 4,
      name: 'HCM',
    },
  ];
  @Input() lstExportDevice = [
    {
      id: 1,
      name: 'HN',
    },
    {
      id: 2,
      name: 'TB',
    },
    {
      id: 3,
      name: 'DN',
    },
    {
      id: 4,
      name: 'HCM',
    },
  ];

  /** OUTPUT */
  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  /** PUBLIC */
  public mainForm: FormGroup;
  public lstTypeTicket = [
    {
      id: 0,
      name: 'Nhập kho',
    },
    {
      id: 1,
      name: 'Xuất kho',
    },
    {
      id: 2,
      name: 'Hoàn hàng',
    },
    {
      id: 3,
      name: 'Chuyển kho',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.mainForm = new FormGroup({
      idTicket: new FormControl(null),
      typeTicket: new FormControl(null),
      idUser: new FormControl(null),
      importDevice: new FormControl(null),
      exportDevice: new FormControl(null),
    });
  }

  public setValue() {
    this.mainForm.controls.idTicket.setValue(this.filterObj.idBills);
    this.mainForm.controls.typeTicket.setValue(this.filterObj.typeBills);
    this.mainForm.controls.idUser.setValue(this.filterObj.idUser);
    this.mainForm.controls.importDevice.setValue(this.filterObj.importDevice);
    this.mainForm.controls.exportDevice.setValue(this.filterObj.exportDevice);
  }

  public clearAll() {
    this.mainForm.controls.idTicket.setValue(null);
    this.mainForm.controls.typeTicket.setValue(null);
    this.mainForm.controls.idUser.setValue(null);
    this.mainForm.controls.importDevice.setValue(null);
    this.mainForm.controls.exportDevice.setValue(null);
  }

  public submitForm(form) {
    this.filterObj.idBills = form.controls.idTicket.value;
    this.filterObj.typeBills = form.controls.typeTicket.value;
    this.filterObj.idUser = form.controls.idUser.value;
    this.filterObj.importDevice = form.controls.importDevice.value;
    this.filterObj.exportDevice = form.controls.exportDevice.value;
    this.onFilter.emit();
  }

  public searchAll() {}
}
