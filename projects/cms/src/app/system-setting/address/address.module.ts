import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CoreModule } from 'common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [AddressComponent, CreateComponent],
  imports: [
    CommonModule,
    AddressRoutingModule,
    NzCardModule,
    CoreModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzTableModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTypographyModule,
    NzBadgeModule,
    NzTagModule,
    NzModalModule,
    HttpClientModule,
    NzSpinModule,
  ],
})
export class AddressModule {}
