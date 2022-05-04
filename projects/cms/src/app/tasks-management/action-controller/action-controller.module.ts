import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionControllerRoutingModule } from './action-controller-routing.module';
import { ActionControllerComponent } from './action-controller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [ActionControllerComponent],
  imports: [
    CommonModule,
    ActionControllerRoutingModule,
    CoreModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzDropDownModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTagModule,
  ],
})
export class ActionControllerModule {}
