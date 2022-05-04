import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisionsRoutingModule } from './permisions-routing.module';
import { PermisionsComponent } from './permisions.component';
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
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { GroupPermissionComponent } from './group-permission/group-permission.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionService } from './permission.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PermisionsComponent,
    GroupPermissionComponent,
    PermissionListComponent,
  ],
  imports: [
    CommonModule,
    PermisionsRoutingModule,
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
    NzTabsModule,
    NzModalModule,
    HttpClientModule,
  ],
})
export class PermisionsModule {}
