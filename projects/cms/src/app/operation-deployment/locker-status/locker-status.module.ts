import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockerStatusRoutingModule } from './locker-status-routing.module';
import { CoreModule } from 'common';
import { LockerStatusComponent } from './locker-status.component';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DetailComponent } from './detail/detail.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { DragScrollModule } from 'ngx-drag-scroll';
import { ColorLockedPipe } from './color-locked.pipe';
import { SizeLockedPipe } from './size-locked.pipe';
import { DetailHardwarestatusComponent } from './detail/detail-hardwarestatus/detail-hardwarestatus.component';
import { ListBlockComponent } from './detail/list-block/list-block.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ChartLineComponent } from './detail/chart-line/chart-line.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { DisplayMarginLockerPipe } from './display-margin-locker.pipe';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ColorStatusDetailPipe } from './color-status-detail.pipe';
import { TextStatusDetailPipe } from './text-status-detail.pipe';
import { ListItemBlockPipe } from './list-item-block.pipe';
import { LogsActiveComponent } from './detail/logs-active/logs-active.component';
import { DeployInstallRepairComponent } from './detail/deploy-install-repair/deploy-install-repair.component';
import { NgxPrintModule } from 'ngx-print';
import { MiddleNumberBockPipe } from './middle-number-bock.pipe';
import { TypeLockerPipe } from './type-locker.pipe';
import { DateTextPipe } from './date-text.pipe';
import { CreateLockerComponent } from './create-locker/create-locker.component';
import { CreateAddressComponent } from './create-locker/create-address/create-address.component';
import { PostSearchComponent } from './create-locker/post-search/post-search.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ColorDeployPipe } from './color-deploy.pipe';
import { TextStatusDeployPipe } from './text-status-deploy.pipe';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UppercaseFirstStringPipe } from './uppercase-first-string.pipe';

@NgModule({
  declarations: [
    LockerStatusComponent,
    EditComponent,
    DetailComponent,
    ColorLockedPipe,
    SizeLockedPipe,
    DetailHardwarestatusComponent,
    ListBlockComponent,
    ChartLineComponent,
    DisplayMarginLockerPipe,
    ColorStatusDetailPipe,
    TextStatusDetailPipe,
    ListItemBlockPipe,
    LogsActiveComponent,
    DeployInstallRepairComponent,
    MiddleNumberBockPipe,
    TypeLockerPipe,
    DateTextPipe,
    CreateLockerComponent,
    CreateAddressComponent,
    PostSearchComponent,
    TextStatusDeployPipe,
    ColorDeployPipe,
    UppercaseFirstStringPipe,
  ],
  imports: [
    CommonModule,
    CoreModule,
    LockerStatusRoutingModule,
    HttpClientModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzModalModule,
    NzSelectModule,
    NzDropDownModule,
    NzTagModule,
    FormsModule,
    NzToolTipModule,
    NzTypographyModule,
    NzDatePickerModule,
    NzCardModule,
    NzCarouselModule,
    DragScrollModule,
    NzPopoverModule,
    NzTabsModule,
    NzDividerModule,
    NzStatisticModule,
    NzPipesModule,
    NzAlertModule,
    NzSpinModule,
    NzEmptyModule,
    NgxPrintModule,
    NzCheckboxModule,
    NgxPermissionsModule.forRoot(),
  ],
})
export class LockerStatusModule {}
