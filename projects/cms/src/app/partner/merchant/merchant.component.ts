import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Merchant } from './merchant.model';
import { MerchantService } from './merchant.service';

@Component({
  selector: 'cms-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.less'],
})
export class MerchantComponent implements OnInit {
  listOfData: Merchant[];
  page: number = 1;
  size: number = 10;
  total: number = 0;
  keyword: string = '';
  group: number = 0;
  phone: string;
  code: string;
  email: string;
  name: string;
  showCreateMechant: boolean = false;
  dupplicate: boolean = false;
  editModal: boolean = false;
  idItemEdit: number;
  constructor(
    private merchantService: MerchantService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {

  }

  getListData() {
    this.baseService.showLoading(true);
    this.merchantService
      .getAllMerchant(
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
        let item = new Merchant(element);
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
    this.createFormMerchant = this.fb.group({
      codeMerchant: [null, [Validators.required]],
      nameMerchant: [null, [Validators.required]],
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

  createFormMerchant: FormGroup;
  creatMechant() {
    this.editModal = false;
    this.showCreateMechant = true;
    this.createFormMerchant.controls.codeMerchant.enable();
    this.createFormMerchant.controls.codeMerchant.setValue(null);
    this.createFormMerchant.controls.nameMerchant.setValue(null);
    this.createFormMerchant.controls.email.setValue(null);
    this.createFormMerchant.controls.phone.setValue(null);
    this.createFormMerchant.controls.address.setValue(null);
    this.createFormMerchant.controls.note.setValue(null);
    this.createFormMerchant.controls.status.setValue(false);
  }

  editMerchant(data: Merchant) {
    this.editModal = true;
    this.showCreateMechant = true;
    this.idItemEdit = data.id;
    this.createFormMerchant.controls.codeMerchant.setValue(data.code);
    this.createFormMerchant.controls.codeMerchant.disable();
    this.createFormMerchant.controls.nameMerchant.setValue(data.name);
    this.createFormMerchant.controls.email.setValue(data.email);
    this.createFormMerchant.controls.phone.setValue(data.phoneNumber);
    this.createFormMerchant.controls.address.setValue(data.address);
    this.createFormMerchant.controls.note.setValue(data.note);
    if (data.status == 1) {
      this.createFormMerchant.controls.status.setValue(true);
    } else {
      this.createFormMerchant.controls.status.setValue(false);
    }
  }

  deleteMerchant(data: Merchant) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa merchant <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.merchantService.deleteMerchant(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa merchant thành công',
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
      if (item.code == this.createFormMerchant.controls.codeMerchant.value) {
        this.dupplicate = true;
      }
    });
  }

  submitCreateMerchant() {
    for (const i in this.createFormMerchant.controls) {
      if (this.createFormMerchant.controls.hasOwnProperty(i)) {
        this.createFormMerchant.controls[i].markAsDirty();
        this.createFormMerchant.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createFormMerchant.invalid) {
      let code = this.createFormMerchant.controls.codeMerchant.value;
      let name = this.createFormMerchant.controls.nameMerchant.value;
      let email = this.createFormMerchant.controls.email.value;
      let phone = this.createFormMerchant.controls.phone.value;
      let address = this.createFormMerchant.controls.address.value;
      let note = this.createFormMerchant.controls.note.value;
      let status;
      if (this.createFormMerchant.controls.status.value) {
        status = 1;
      } else {
        status = 0;
      }
      if (!this.editModal) {
        if (!this.dupplicate) {
          this.merchantService
            .createMerchant(code, name, email, phone, address, note, status)
            .subscribe(
              (data: any) => {
                if (data.error == 0) {
                  this.baseService.showToast(
                    'Khởi tạo thành công Mechant mới',
                    Constants.TOAST_OK
                  );
                  this.cancelCreateMerchant();
                  this.getListData();
                }
              },
              (error: any) => {
                console.log('Request tạo mới merchant không thành công', error);
              }
            );
        }
      } else {
        this.merchantService
          .editMerchant(
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
                  'Chỉnh sửa thành công Mechant ',
                  Constants.TOAST_OK
                );
                this.cancelCreateMerchant();
                this.getListData();
              }
            },
            (error: any) => {
              console.log('Request sửa merchant không thành công', error);
            }
          );
      }
    }
  }

  cancelCreateMerchant() {
    this.showCreateMechant = false;
  }
}
