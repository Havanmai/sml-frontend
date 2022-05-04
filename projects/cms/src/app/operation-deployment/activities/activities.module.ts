import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { CoreModule } from 'common';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    CoreModule,
    HttpClientModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzSpinModule,
  ],
})
export class ActivitiesModule {}
