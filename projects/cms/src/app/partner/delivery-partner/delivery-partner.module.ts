import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryPartnerRoutingModule } from './delivery-partner-routing.module';
import { DeliveryPartnerComponent } from './delivery-partner.component';
import { CoreModule } from 'common';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CreateComponent } from './create/create.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [DeliveryPartnerComponent, CreateComponent],
  imports: [
    CommonModule,
    DeliveryPartnerRoutingModule,
    CoreModule,
    NzTypographyModule,
    NzTagModule,
    NzSelectModule,
    NzModalModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzGridModule,
    NzTableModule,
    HttpClientModule,
    NzButtonModule,
    FormsModule,
    NzSpinModule,
    NzCheckboxModule,
  ],
})
export class DeliveryPartnerModule {}
