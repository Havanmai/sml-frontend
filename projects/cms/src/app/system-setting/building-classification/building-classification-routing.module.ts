import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingClassificationComponent } from './building-classification.component';

const routes: Routes = [
  { path: '', component: BuildingClassificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingClassificationRoutingModule {}
