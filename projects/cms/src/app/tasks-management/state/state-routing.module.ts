import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStatesComponent } from './create-states/create-states.component';
import { DetailStatesComponent } from './detail-states/detail-states.component';
import { StateComponent } from './state.component';

const routes: Routes = [
  {
    path: '',
    component: StateComponent,
  },
  {
    path: 'detail/:id',
    component: DetailStatesComponent,
  },
  {
    path: 'create',
    component: CreateStatesComponent,
  },
  {
    path: 'edit/:id',
    component: CreateStatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateRoutingModule {}
