import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { TechnicalManagerComponent } from './technical-manager/technical-manager.component';
import { TechnicalComponent } from './technical/technical.component';
import { MapComponent } from './widgets/map/map.component';
import { UserStatisticComponent } from './widgets/user-statistic/user-statistic.component';
import { HeadMapComponent } from './widgets/head-map/head-map.component';
import { DeploymentChartsComponent } from './widgets/deployment-charts/deployment-charts.component';
import { TransactionChartsComponent } from './widgets/transaction-charts/transaction-charts.component';
import { TopPostofficeComponent } from './widgets/top-postoffice/top-postoffice.component';
import { TopSmlComponent } from './widgets/top-sml/top-sml.component';
import { TicketsComponent } from './widgets/tickets/tickets.component';
import { StoreStatisticComponent } from './widgets/store-statistic/store-statistic.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { VchartsModule } from 'vcharts';
import { DateSelectorComponent } from './widgets/date-selector/date-selector.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ColorStatusDetailPipe } from './color-status-detail.pipe';
import { TextStatusDetailPipe } from './text-status-detail.pipe';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TextPostofficeDetailPipe } from './text-postoffice-detail.pipe';
import { LevelPostPipe } from './level-post.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    ManagerComponent,
    AccountManagerComponent,
    TechnicalManagerComponent,
    TechnicalComponent,
    MapComponent,
    UserStatisticComponent,
    HeadMapComponent,
    DeploymentChartsComponent,
    TransactionChartsComponent,
    TopPostofficeComponent,
    TopSmlComponent,
    TicketsComponent,
    StoreStatisticComponent,
    DateSelectorComponent,
    ColorStatusDetailPipe,
    TextStatusDetailPipe,
    TextPostofficeDetailPipe,
    LevelPostPipe,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzInputModule,
    NzTypographyModule,
    NzCardModule,
    NzDividerModule,
    NzTableModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzImageModule,
    NzSelectModule,
    NzDatePickerModule,
    HttpClientModule,
    FormsModule,
    NzModalModule,
    VchartsModule,
    NzStatisticModule,
    NzBadgeModule,
    NzSpaceModule,
    NzPopoverModule,
    NzTagModule,
    NzSpinModule,
  ],
})
export class DashboardModule {}
