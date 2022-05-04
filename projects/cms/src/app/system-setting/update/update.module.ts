import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';
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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UpdateService } from './update.service';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    UpdateRoutingModule,
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
    NzUploadModule,
    NzTagModule,
    NzRadioModule,
    HttpClientModule,
  ],
})
export class UpdateModule {}
