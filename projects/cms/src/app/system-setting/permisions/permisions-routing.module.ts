import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisionsComponent } from './permisions.component';

const routes: Routes = [
  {
    path: '',
    component: PermisionsComponent,
    data: {
      shouldDetach: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisionsRoutingModule {}
