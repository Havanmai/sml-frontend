import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VouchersRoutingModule } from './vouchers-routing.module';
import { VouchersComponent } from './vouchers.component';

@NgModule({
  declarations: [VouchersComponent],
  imports: [CommonModule, VouchersRoutingModule],
})
export class VouchersModule {}
