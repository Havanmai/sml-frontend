import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreateComponent } from './create/create.component';
import { RoleService } from './role.service';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { RoleCheckedPipe } from './role-checked.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RolesComponent, CreateComponent, RoleCheckedPipe],
  imports: [
    CommonModule,
    RolesRoutingModule,
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
    NzModalModule,
    NzCollapseModule,
    NzEmptyModule,
    HttpClientModule,
  ],
})
export class RolesModule {}
