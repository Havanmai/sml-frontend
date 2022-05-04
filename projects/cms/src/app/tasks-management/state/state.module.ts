import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateComponent } from './state.component';
import { StateRoutingModule } from './state-routing.module';
import { CoreModule } from 'common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DetailStatesComponent } from './detail-states/detail-states.component';
import { CreateStatesComponent } from './create-states/create-states.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ListingUserModalComponent } from './listing-user-modal/listing-user-modal.component';
@NgModule({
  declarations: [
    StateComponent,
    DetailStatesComponent,
    CreateStatesComponent,
    ListingUserModalComponent,
  ],
  imports: [
    CommonModule,
    StateRoutingModule,
    CoreModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzTabsModule,
    NzDividerModule,
    NzSelectModule,
    NzAvatarModule,
    NzTypographyModule,
  ],
})
export class StateModule {}
