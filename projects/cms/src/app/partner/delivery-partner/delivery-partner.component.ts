import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants } from 'common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DeliveryPartner } from './delivery-partner.model';
import { DeliveryPartnerService } from './delivery-partner.service';

@Component({
  selector: 'cms-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.less'],
})
export class DeliveryPartnerComponent implements OnInit {
  listOfData: DeliveryPartner[];
  page: number = 1;
  size: number = 10;
  total: number = 0;
  keyword: string = '';
  group: number = 0;
  phone: string;
  code: string;
  email: string;
  name: string;
  showCreateDeliveryPartner: boolean = false;
  editModal: boolean = false;
  idItemEdit: number;
  dupplicate: boolean = false;
  constructor(
    private deliveryPartnerService: DeliveryPartnerService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {

  }

  getListData() {
    this.baseService.showLoading(true);
    this.deliveryPartnerService
      .getAllDeliveryPartner(
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
            console.log(data);
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
        let item = new DeliveryPartner(element);
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
    this.createFormDeliveryPartner = this.fb.group({
      codeDeliveryPartner: [null, [Validators.required]],
      nameDeliveryPartner: [null, [Validators.required]],
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

  createFormDeliveryPartner: FormGroup;
  creatDeliveryPartner() {
    this.editModal = false;
    this.showCreateDeliveryPartner = true;
    this.createFormDeliveryPartner.controls.codeDeliveryPartner.enable();
    this.createFormDeliveryPartner.controls.codeDeliveryPartner.setValue(null);
    this.createFormDeliveryPartner.controls.nameDeliveryPartner.setValue(null);
    this.createFormDeliveryPartner.controls.email.setValue(null);
    this.createFormDeliveryPartner.controls.phone.setValue(null);
    this.createFormDeliveryPartner.controls.address.setValue(null);
    this.createFormDeliveryPartner.controls.status.setValue(false);
    this.createFormDeliveryPartner.controls.note.setValue(null);
  }

  editDeliveryPartner(data: DeliveryPartner) {
    this.editModal = true;
    this.showCreateDeliveryPartner = true;
    this.idItemEdit = data.id;
    this.createFormDeliveryPartner.controls.codeDeliveryPartner.setValue(
      data.code
    );
    this.createFormDeliveryPartner.controls.codeDeliveryPartner.disable();
    this.createFormDeliveryPartner.controls.nameDeliveryPartner.setValue(
      data.name
    );
    this.createFormDeliveryPartner.controls.email.setValue(data.email);
    this.createFormDeliveryPartner.controls.phone.setValue(data.phoneNumber);
    this.createFormDeliveryPartner.controls.address.setValue(data.address);
    this.createFormDeliveryPartner.controls.note.setValue(data.note);
    if (data.status == 1) {
      this.createFormDeliveryPartner.controls.status.setValue(true);
    } else {
      this.createFormDeliveryPartner.controls.status.setValue(false);
    }
  }

  deleteDeliveryPartner(data: DeliveryPartner) {
    this.modal.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa delivery partner <b>${data.name}</b> này không?</i>`,
      nzOnOk: () => {
        this.baseService.showLoading(true);
        this.deliveryPartnerService.deleteDeliveryPartner(data.id).subscribe(
          (data: any) => {
            this.baseService.showLoading(false);
            if (data.error === 0) {
              this.baseService.showToast(
                'Xóa delivery partner thành công',
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
      if (
        item.code ==
        this.createFormDeliveryPartner.controls.codeDeliveryPartner.value
      ) {
        this.dupplicate = true;
      }
    });
  }

  submitCreateDeliveryPartner() {
    for (const i in this.createFormDeliveryPartner.controls) {
      if (this.createFormDeliveryPartner.controls.hasOwnProperty(i)) {
        this.createFormDeliveryPartner.controls[i].markAsDirty();
        this.createFormDeliveryPartner.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createFormDeliveryPartner.invalid) {
      let code =
        this.createFormDeliveryPartner.controls.codeDeliveryPartner.value;
      let name =
        this.createFormDeliveryPartner.controls.nameDeliveryPartner.value;
      let email = this.createFormDeliveryPartner.controls.email.value;
      let phone = this.createFormDeliveryPartner.controls.phone.value;
      let address = this.createFormDeliveryPartner.controls.address.value;
      let note = this.createFormDeliveryPartner.controls.note.value;
      let status;
      if (this.createFormDeliveryPartner.controls.status.value) {
        status = 1;
      } else {
        status = 0;
      }
      if (!this.editModal) {
        if (!this.dupplicate) {
          this.deliveryPartnerService
            .createDeliveryPartner(
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
                    'Khởi tạo thành công delivery partner mới',
                    Constants.TOAST_OK
                  );
                  this.cancelCreateDeliveryPartner();
                  this.getListData();
                }
              },
              (error: any) => {
                console.log(
                  'Request tạo mới delivery partner không thành công',
                  error
                );
              }
            );
        }
      } else {
        this.deliveryPartnerService
          .editDeliveryPartner(
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
                  'Chỉnh sửa thành công delivery partner ',
                  Constants.TOAST_OK
                );
                this.cancelCreateDeliveryPartner();
                this.getListData();
              }
            },
            (error: any) => {
              console.log(
                'Request sửa delivery partner không thành công',
                error
              );
            }
          );
      }
    }
  }

  cancelCreateDeliveryPartner() {
    this.showCreateDeliveryPartner = false;
  }
}
