import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostmanComponent } from './postman/postman.component';
import { PostofficesComponent } from './postoffices.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PostofficesComponent },
      {
        path: 'postmans',
        component: PostmanComponent,
        data: { breadcrumb: 'Quản lý bưu tá' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostofficesRoutingModule {}
