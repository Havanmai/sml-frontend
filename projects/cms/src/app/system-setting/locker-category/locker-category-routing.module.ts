import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockerCategoryComponent } from './locker-category.component';

const routes: Routes = [{ path: '', component: LockerCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LockerCategoryRoutingModule {}
