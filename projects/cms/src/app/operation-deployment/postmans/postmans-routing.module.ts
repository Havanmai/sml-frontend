import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostmansComponent } from './postmans.component';

const routes: Routes = [{ path: '', component: PostmansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostmansRoutingModule {}
