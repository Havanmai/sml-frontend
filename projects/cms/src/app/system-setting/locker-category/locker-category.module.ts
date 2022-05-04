import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'common';

import { LockerCategoryRoutingModule } from './locker-category-routing.module';
import { LockerCategoryComponent } from './locker-category.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CmsControlModule } from 'projects/cms/src/shared/controls';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [LockerCategoryComponent],
  imports: [
    CommonModule,
    CoreModule,
    LockerCategoryRoutingModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    HttpClientModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzTabsModule,
    NzModalModule,
    CmsControlModule,
    NzTagModule,
    NzCheckboxModule,
  ],
})
export class LockerCategoryModule {}
