import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeliveryPartnerComponent } from './delivery-partner.component';

const routes: Routes = [
  { path: '', component: DeliveryPartnerComponent },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPartnerRoutingModule {}
