import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPointsRoutingModule } from './set-points-routing.module';
import { SetPointsComponent } from './set-points.component';
import { CoreModule } from 'common';
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

@NgModule({
  declarations: [SetPointsComponent],
  imports: [
    CommonModule,
    SetPointsRoutingModule,
    CoreModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    HttpClientModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzTabsModule,
  ],
})
export class SetPointsModule {}
