import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, Constants, UserModel } from 'common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ServiceModel } from '../service.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'cms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
  createContentForm: FormGroup;
  createSubmitting: boolean = false;
  currentUser: UserModel;
  importerId: number;
  datenow: Date;
  listOfOption: Array<{ value: string; text: string }> = [];
  page: number = 0;
  size: number = 10;
  totalReceiver: number = 0;
  isLoading = false;
  nzFilterOption = (): boolean => true;
  id: number;

  @Input() data: ServiceModel;

  editModal: boolean;
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private baseService: BaseService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.createContentForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null],
    });
    if (this.data) {
      this.editModal = true;
      this.id = this.data.id;
      this.createContentForm.controls.code.setValue(this.data.code);
      this.createContentForm.controls.name.setValue(this.data.name);
      this.createContentForm.controls.description.setValue(
        this.data.description
      );
    } else {
      this.editModal = false;
      this.createContentForm.controls.code.setValue(null);
      this.createContentForm.controls.name.setValue(null);
      this.createContentForm.controls.description.setValue(null);
    }
  }

  submitContent() {
    for (const i in this.createContentForm.controls) {
      if (this.createContentForm.controls.hasOwnProperty(i)) {
        this.createContentForm.controls[i].markAsDirty();
        this.createContentForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createContentForm.invalid) {
      let code = this.createContentForm.controls.code.value;
      let name = this.createContentForm.controls.name.value;
      let description = this.createContentForm.controls.description.value;

      if (!this.editModal) {
        this.serviceService.createService(code, name, description).subscribe(
          (data: any) => {
            if (data.error == 0) {
              this.baseService.showToast(
                'Khởi tạo thành công dịch vụ mới',
                Constants.TOAST_OK
              );
              this.serviceService.reloadService();
              this.cancelContent();
            }
          },
          (error: any) => {
            console.log('Request tạo mới dịch vụ không thành công', error);
          }
        );
      } else {
        this.serviceService
          .updateService(this.id, code, name, description)
          .subscribe(
            (data: any) => {
              if (data.error == 0) {
                this.baseService.showToast(
                  'Chỉnh sửa thành công dịch vụ ',
                  Constants.TOAST_OK
                );
                this.serviceService.reloadService();
                this.cancelContent();
              }
            },
            (error: any) => {
              console.log('Request sửa dịch vụ không thành công', error);
            }
          );
      }
    }
  }

  cancelContent() {
    this.modalRef.destroy();
  }
}
