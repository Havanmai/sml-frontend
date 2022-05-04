import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostofficesRoutingModule } from './postoffices-routing.module';
import { PostofficesComponent } from './postoffices.component';
import { PostmanComponent } from './postman/postman.component';
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
import { PostService } from './post.service';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PostofficesComponent, PostmanComponent, DateSelectorComponent],
  imports: [
    CommonModule,
    PostofficesRoutingModule,
    NzCardModule,
    CoreModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    NzGridModule,
    NzTableModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTypographyModule,
    NzTabsModule,
    NzModalModule,
    NzDatePickerModule,
    NzDropDownModule,
    HttpClientModule,
  ],
})
export class PostofficesModule {}
