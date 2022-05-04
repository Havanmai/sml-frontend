import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceCategoryComponent } from './device-category.component';

const routes: Routes = [{ path: '', component: DeviceCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceCategoryRoutingModule {}
