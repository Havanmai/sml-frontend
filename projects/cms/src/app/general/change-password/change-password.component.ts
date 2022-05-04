import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService, Cache, Constants } from 'common';
import { UserService } from '../../system-setting/user/user.service';

@Component({
  selector: 'cms-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less'],
})
export class ChangePasswordComponent implements OnInit {
  validateForm!: FormGroup;
  isSubmiting: boolean;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.retypePassword.updateValueAndValidity()
    );
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private baseService: BaseService,
    private activeRouter: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      retypePassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.validateForm.invalid) {
      this.isSubmiting = true;
      let obj = {
        currentPassword: this.validateForm.get('oldPassword').value,
        newPassword: this.validateForm.get('password').value,
      };
      this.httpClient
        .post<string>(
          'smartlocker/api/v1/account/change-password',
          JSON.stringify(obj)
        )
        .subscribe((data: any) => {
          this.baseService.showToast(
            'Đổi mật khẩu thành công, hệ thống sẽ tự đăng xuất sau...3s!',
            Constants.TOAST_OK
          );
          setTimeout(() => {
            Cache.clearAll();
            this.baseService.navigateTo('/login');
          }, 3000);
        });
    }
  }
}
