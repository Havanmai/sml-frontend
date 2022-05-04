import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService, Cache, Constants } from 'common';

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  isLoginLoading: boolean = false;

  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.baseService.isLogin()) this.router.navigateByUrl('/home');

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      remember: [false],
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
      this.isLoginLoading = true;
      this.baseService
        .login(
          this.validateForm.get('userName').value,
          this.validateForm.get('password').value,
          this.validateForm.get('remember').value
        )
        .subscribe(
          (data: any) => {
            //get user info
            if (data.id_token) {
              if (this.validateForm.get('remember').value) {
                this.baseService.storeAccessToken(
                  data.id_token,
                  1000 * 60 * 60 * 24 * 30
                );
                Cache.addCache(
                  Constants.CACHE_REMEMBER_ME,
                  '1',
                  Cache.COOKIE,
                  1000 * 60 * 60 * 24 * 30
                );
              } else {
                this.baseService.storeAccessToken(
                  data.id_token,
                  1000 * 60 * 60 * 24
                );
                Cache.addCache(
                  Constants.CACHE_REMEMBER_ME,
                  '0',
                  Cache.COOKIE,
                  1000 * 60 * 60 * 24
                );
              }

              setTimeout(() => {
                this.router.navigateByUrl('/home');
              }, 200);
            } else {
              this.isLoginLoading = false;
              this.errorMsg = 'Không lấy được thông tin Token';
            }
          },
          (error: any) => {
            this.isLoginLoading = false;
            if (error.status == 401) {
              this.errorMsg = 'Tên đăng nhập hoặc mật khẩu chưa chính xác';
            } else this.errorMsg = error.message;
          }
        );
    }
  }
}
