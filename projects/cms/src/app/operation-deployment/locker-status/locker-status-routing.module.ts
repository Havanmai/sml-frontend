import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { LockerStatusComponent } from './locker-status.component';

const routes: Routes = [
  {
    path: '',
    component: LockerStatusComponent,
    data: {
      shouldDetach: true,
    },
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: { breadcrumb: 'Cập nhật' },
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: { breadcrumb: 'Chi tiết' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class LockerStatusRoutingModule {}
