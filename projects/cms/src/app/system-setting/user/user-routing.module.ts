import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {
    path: 'create',
    component: CreateComponent,
    data: { breadcrumb: 'Tạo mới' },
  },
  {
    path: 'update/:id',
    component: CreateComponent,
    data: { breadcrumb: 'Cập nhật' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
