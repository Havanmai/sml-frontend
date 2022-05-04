import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { CoreModule } from 'common';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DetailComponent } from './detail/detail.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EditContentComponent } from './detail/edit-content/edit-content.component';
import { CompleteCancelForwardComponent } from './detail/complete-cancel-forward/complete-cancel-forward.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { AttachFileComponent } from './detail/attach-file/attach-file.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TaskStatusPipe } from './task-status.pipe';
import { TaskTypePipe } from './task-type.pipe';
import { TaskStatusColorPipe } from './task-status-color.pipe';
import { DateTextPipe } from './date-text.pipe';
import { DateFilePipe } from './date-file.pipe';
import { CreateTaskComponent } from './detail/create-task/create-task.component';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [
    TasksComponent,
    DetailComponent,
    EditContentComponent,
    CompleteCancelForwardComponent,
    AttachFileComponent,
    CreateTicketComponent,
    TaskStatusPipe,
    TaskTypePipe,
    TaskStatusColorPipe,
    DateTextPipe,
    DateFilePipe,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    CoreModule,
    NzTypographyModule,
    NzTagModule,
    NzSelectModule,
    NzModalModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzGridModule,
    NzTableModule,
    HttpClientModule,
    NzButtonModule,
    FormsModule,
    NzSpinModule,
    NzDividerModule,
    NzCollapseModule,
    NzDropDownModule,
    NzRateModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzUploadModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzDrawerModule,
    NzListModule,
  ],
})
export class TasksModule {}
