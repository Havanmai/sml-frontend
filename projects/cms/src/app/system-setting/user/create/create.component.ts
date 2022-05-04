import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService, Constants, MyValidator } from 'common';
import { UserService } from '../user.service';

@Component({
  selector: 'cms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  isSubmiting: boolean;

  private sub: any;
  private username: string;
  private userId: number;
  editMode: boolean = false;

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

  listRoles: any[];
  listOfSelectedValue: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private baseService: BaseService,
    private activeRouter: ActivatedRoute
  ) {
    this.sub = this.activeRouter.params.subscribe((params) => {
      this.username = params['id'];
      if (this.username) {
        //get role detail
        this.editMode = true;
        setTimeout(() => {
          this.userService
            .getUserDetail(this.username)
            .subscribe((data: any) => {
              if (data.error == 0) {
                this.userId = data.data.id;
                this.validateForm
                  .get('firstName')
                  .setValue(data.data.firstName);
                this.validateForm.get('lastName').setValue(data.data.lastName);
                this.validateForm.get('login').setValue(data.data.login);
                this.validateForm.get('login').disable();
                this.validateForm.get('email').setValue(data.data.email);
                this.validateForm.get('email').disable();
                this.validateForm.get('status').setValue(data.data.activated);
                this.validateForm.removeControl('password');
                this.validateForm.removeControl('retypePassword');

                //set selected role
                if (data.data.authorities && data.data.authorities.length > 0) {
                  data.data.authorities.forEach((item) => {
                    this.listOfSelectedValue.push(item);
                  });
                }
              }
            });
        }, 200);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      login: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      retypePassword: [null, [Validators.required, this.confirmationValidator]],
      status: [true, [Validators.required]],
    });

    setTimeout(() => {
      if (this.userService.listRoles && this.userService.listRoles.length > 0) {
        this.listRoles = this.userService.listRoles;
      } else {
        this.userService.getAllRoles().subscribe((data: any) => {
          if (data.error == 0) {
            this.listRoles = data.data;
            this.userService.listRoles = this.listRoles;
          }
        });
      }
    }, 1000);
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

      if (this.editMode) {
        let obj = {
          id: this.userId,
          status: this.validateForm.get('status').value,
          roles: this.listOfSelectedValue,
          email: this.validateForm.get('email').value,
          firstName: this.validateForm.get('firstName').value,
          lastName: this.validateForm.get('lastName').value,
          username: this.validateForm.get('login').value,
        };

        this.userService.updateUser(obj).subscribe(
          (data: any) => {
            this.isSubmiting = false;
            this.baseService.showToast(
              'Cập nhật user thành công',
              Constants.TOAST_OK
            );
            setTimeout(() => {
              this.baseService.navigateTo('/users');
            }, 200);
          },
          (error: any) => {
            this.isSubmiting = false;
          }
        );
      } else {
        let obj = {
          status: this.validateForm.get('status').value,
          roles: this.listOfSelectedValue,
          email: this.validateForm.get('email').value,
          firstName: this.validateForm.get('firstName').value,
          lastName: this.validateForm.get('lastName').value,
          username: this.validateForm.get('login').value,
          password: this.validateForm.get('password').value,
        };

        this.userService.createUser(obj).subscribe(
          (data: any) => {
            this.isSubmiting = false;
            this.baseService.showToast(
              'Tạo mới user thành công',
              Constants.TOAST_OK
            );
            setTimeout(() => {
              this.baseService.navigateTo('/users');
            }, 200);
          },
          (error: any) => {
            this.isSubmiting = false;
          }
        );
      }
    }
  }
}
