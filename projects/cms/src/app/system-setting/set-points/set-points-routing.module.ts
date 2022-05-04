import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPointsComponent } from './set-points.component';

const routes: Routes = [{ path: '', component: SetPointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPointsRoutingModule {}
