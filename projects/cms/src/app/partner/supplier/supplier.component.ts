import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Supplier } from './supplier.model';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'cms-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.less'],
})
export class SupplierComponent implements OnInit {
  listOfData: any[];
  page: number = 1;
  size: number = 10;
  total: number = 0;
  keyword: string = '';
  group: number = 0;
  phone: string;
  code: string;
  email: string;
  name: string;
  showCreateSupplier: boolean = false;
  editModal: boolean = false;
  idItemEdit: number;
  dupplicate: boolean = false;
  constructor(
    private supplierService: SupplierService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {

  }

  getListData() {
    this.baseService.showLoading(true);
    this.supplierService
      .getAllSupplier(
        this.page - 1,
        this.size,
        this.code,
        this.name,
        this.email,
        this.phone
      )
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.error == 0) {
            this.responeProcess(data);
          }
        },
        (error: any) => {
          console.log('Không gửi được request', error);
        }
      );
  }

  responeProcess(data: any) {
    this.total = data.data.total;
    this.listOfData = [];
    if (data.data.data.length > 0) {
      data.data.data.forEach((element) => {
        let item = new Supplier(element);
        this.listOfData.push(item);
      });
    }
  }
  pageChange(index: number) {
    this.page = index;
    this.getListData();
  }

  changePage(event) {
    this.page = event;
    this.getListData();
  }

  changeSize(event) {
    this.page=1;
    this.size = event;
    this.getListData();
  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    this.getListData();
    this.createFormSupplier = this.fb.group({
      codeSupplier: [null, [Validators.required]],
      nameSupplier: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [Validators.required, Validators.pattern('^((\\+84-?)|0)?[0-9]{9}$')],
      ],
      address: [null, [Validators.required]],
      status: [false],
      note: [null],
    });
  }

  search() {
    this.page=1;
    this.size=10;
    this.getListData();
  }

  createFormSupplier: FormGroup;
  creatSupplier() {
    this.editModal = false;
    this.showCreateSupplier = true;
    this.createFormSupplier.controls.codeSupplier.enable();
    this.createFormSupplier.controls.codeSupplier.setValue(null);
    this.createFormSupplier.controls.nameSupplier.setValue(null);
    this.createFormSupplier.controls.email.setValue(null);
    this.createFormSupplier.controls.phone.setValue(null);
    this.createFormSupplier.controls.address.setValue(null);
    this.createFormSupplier.controls.note.setValue(null);
    this.createFormSupplier.controls.status.setValue(false);
  }

  editSupplier(data: Supplier) {
    this.editModal = true;
    this.showCreateSupplier = true;
    this.idItemEdit = data.id;
    this.createFormSupplier.controls.codeSupplier.setValue(data.code);
    this.createFormSupplier.controls.codeSupplier.disable();
    this.createFormSupplier.controls.nameSupplier.setValue(data.name);
    this.createFormSupplier.controls.email.setValue(data.email);
    this.createFormSupplier.controls.phone.setValue(data.phoneNumber);
    this.createFormSupplier.controls.address.setValue(data.address);
    this.createFormSupplier.controls.note.setValue(data.note);
    if (data.status == 1) {
      this.createFormSupplier.controls.status.setValue(true);
    } else {
      this.createFormSupplier.controls.status.setValue(false);
    }
  }

  deleteSupplier(data: Supplier) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa supplier <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.supplierService.deleteSupplier(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa supplier thành công',
                Constants.TOAST_OK
              );
              this.getListData();
            }
          },
          () => {
            this.baseService.showLoading(false);
          }
        );
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  checkDupplicate() {
    this.listOfData.forEach((item) => {
      if (item.code == this.createFormSupplier.controls.codeSupplier.value) {
        this.dupplicate = true;
      }
    });
  }

  submitCreateSupplier() {
    for (const i in this.createFormSupplier.controls) {
      if (this.createFormSupplier.controls.hasOwnProperty(i)) {
        this.createFormSupplier.controls[i].markAsDirty();
        this.createFormSupplier.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createFormSupplier.invalid) {
      let code = this.createFormSupplier.controls.codeSupplier.value;
      let name = this.createFormSupplier.controls.nameSupplier.value;
      let email = this.createFormSupplier.controls.email.value;
      let phone = this.createFormSupplier.controls.phone.value;
      let address = this.createFormSupplier.controls.address.value;
      let note = this.createFormSupplier.controls.note.value;
      let status;
      if (this.createFormSupplier.controls.status.value) {
        status = 1;
      } else {
        status = 0;
      }
      if (!this.editModal) {
        if (!this.dupplicate) {
          this.supplierService
            .createSupplier(code, name, email, phone, address, note, status)
            .subscribe(
              (data: any) => {
                if (data.error == 0) {
                  this.baseService.showToast(
                    'Khởi tạo thành công supplier mới',
                    Constants.TOAST_OK
                  );
                  this.cancelCreateSupplier();
                  this.getListData();
                }
              },
              (error: any) => {
                console.log('Request tạo mới supplier không thành công', error);
              }
            );
        }
      } else {
        this.supplierService
          .editSupplier(
            this.idItemEdit,
            code,
            name,
            email,
            phone,
            address,
            note,
            status
          )
          .subscribe(
            (data: any) => {
              if (data.error == 0) {
                this.baseService.showToast(
                  'Chỉnh sửa thành công supplier ',
                  Constants.TOAST_OK
                );
                this.cancelCreateSupplier();
                this.getListData();
              }
            },
            (error: any) => {
              console.log('Request sửa supplier không thành công', error);
            }
          );
      }
    }
  }

  cancelCreateSupplier() {
    this.showCreateSupplier = false;
  }
}
