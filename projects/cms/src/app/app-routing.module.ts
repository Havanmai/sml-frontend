import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterGuard } from 'common';
import { ChangePasswordComponent } from './general/change-password/change-password.component';
import { HomeComponent } from './general/home/home.component';
import { NopermissionComponent } from './general/nopermission/nopermission.component';
import { PagenotfoundComponent } from './general/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./general/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'restricted',
    component: NopermissionComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [RouterGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('./system-setting/permisions/permisions.module').then(
            (m) => m.PermisionsModule
          ),
        data: { breadcrumb: 'Quyền' },
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./system-setting/roles/roles.module').then(
            (m) => m.RolesModule
          ),
        data: { breadcrumb: 'Vai trò' },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./system-setting/user/user.module').then((m) => m.UserModule),
        data: { breadcrumb: 'Tài khoản' },
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: { breadcrumb: 'Đổi mật khẩu' },
      },
      {
        path: 'device-category',
        loadChildren: () =>
          import('./warehouse/device-category/device-category.module').then(
            (m) => m.DeviceCategoryModule
          ),
        data: { breadcrumb: 'Thiết lập kho' },
      },
      {
        path: 'store',
        loadChildren: () =>
          import('./warehouse/store/store.module').then((m) => m.StoreModule),
        data: { breadcrumb: 'Kho hàng' },
      },
      {
        path: 'lockers',
        loadChildren: () =>
          import(
            './operation-deployment/locker-status/locker-status.module'
          ).then((m) => m.LockerStatusModule),
        data: { breadcrumb: 'Danh sách Locker' },
      },
      {
        path: 'postoffices',
        loadChildren: () =>
          import('./system-setting/postoffices/postoffices.module').then(
            (m) => m.PostofficesModule
          ),
        data: { breadcrumb: 'Quản lý bưu cục' },
      },
      {
        path: 'updates',
        loadChildren: () =>
          import('./system-setting/update/update.module').then(
            (m) => m.UpdateModule
          ),
        data: { breadcrumb: 'Quản lý cập nhật' },
      },
      {
        path: 'locker-category',
        loadChildren: () =>
          import(
            './system-setting/locker-category/locker-category.module'
          ).then((m) => m.LockerCategoryModule),
        data: { breadcrumb: 'Quản lý nhóm Locker' },
      },
      {
        path: 'set-points',
        loadChildren: () =>
          import('./system-setting/set-points/set-points.module').then(
            (m) => m.SetPointsModule
          ),
        data: { breadcrumb: 'Quản lý điểm đặt' },
      },
      {
        path: 'building-classification',
        loadChildren: () =>
          import(
            './system-setting/building-classification/building-classification.module'
          ).then((m) => m.BuildingClassificationModule),
        data: { breadcrumb: 'Phân hạng vị trí' },
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import(
            './operation-deployment/transactions/transactions.module'
          ).then((m) => m.TransactionsModule),
        data: { breadcrumb: 'Lịch sử giao dịch' },
      },
      {
        path: 'locker-activity',
        loadChildren: () =>
          import('./operation-deployment/activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
        data: { breadcrumb: 'Log hoạt động' },
      },
      {
        path: 'postmans',
        loadChildren: () =>
          import('./operation-deployment/postmans/postmans.module').then(
            (m) => m.PostmansModule
          ),
        data: { breadcrumb: 'Quản lý bưu tá' },
      },
      {
        path: 'merchant',
        loadChildren: () =>
          import('./partner/merchant/merchant.module').then(
            (m) => m.MerchantModule
          ),
        data: { breadcrumb: 'Quản lý merchant' },
      },
      {
        path: 'supplier',
        loadChildren: () =>
          import('./partner/supplier/supplier.module').then(
            (m) => m.SupplierModule
          ),
        data: { breadcrumb: 'Quản lý supplier' },
      },
      {
        path: 'delivery-partner',
        loadChildren: () =>
          import('./partner/delivery-partner/delivery-partner.module').then(
            (m) => m.DeliveryPartnerModule
          ),
        data: { breadcrumb: 'Quản lý delivery partner' },
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./operation-deployment/tasks/tasks.module').then(
            (m) => m.TasksModule
          ),
        data: { breadcrumb: 'Quản lý tasks' },
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./service-voucher/services/services.module').then(
            (m) => m.ServicesModule
          ),
        data: { breadcrumb: 'Quản lý dịch vụ' },
      },
      {
        path: 'vouchers',
        loadChildren: () =>
          import('./service-voucher/vouchers/vouchers.module').then(
            (m) => m.VouchersModule
          ),
        data: { breadcrumb: 'Quản lý voucher' },
      },
      {
        path: 'address',
        loadChildren: () =>
          import('./system-setting/address/address.module').then(
            (m) => m.AddressModule
          ),
        data: { breadcrumb: 'Quản lý địa điểm' },
      },
      {
        path: 'workflow',
        loadChildren: () =>
          import('./tasks-management/workflow/workflow.module').then(
            (m) => m.WorkflowModule
          ),
        data: { breadcrumb: 'Quản lý workflow' },
      },
      {
        path: 'state',
        loadChildren: () =>
          import('./tasks-management/state/state.module').then(
            (m) => m.StateModule
          ),
        data: { breadcrumb: 'Quản lý state' },
      },
      {
        path: 'action',
        loadChildren: () =>
          import(
            './tasks-management/action-controller/action-controller.module'
          ).then((m) => m.ActionControllerModule),
        data: { breadcrumb: 'Quản lý action' },
      },
    ],
  },

  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
