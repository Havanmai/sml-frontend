import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActionControllerComponent } from './action-controller.component';

const routes: Routes = [
  {
    path: '',
    component: ActionControllerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionControllerRoutingModule {}
