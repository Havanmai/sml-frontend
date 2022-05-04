import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceCategoryRoutingModule } from './device-category-routing.module';
import { DeviceCategoryComponent } from './device-category.component';
import { CoreModule } from 'common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ListDeviceCategoryComponent } from './list-device-category/list-device-category.component';
import { ListGroupDeviceCategoryComponent } from './list-group-device-category/list-group-device-category.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DepotComponent } from './depot/depot.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@NgModule({
  declarations: [
    DeviceCategoryComponent,
    ListDeviceCategoryComponent,
    ListGroupDeviceCategoryComponent,
    DepotComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    DeviceCategoryRoutingModule,
    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzGridModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzCheckboxModule,
    NzInputModule,
    NzRadioModule,
  ],
})
export class DeviceCategoryModule {}
