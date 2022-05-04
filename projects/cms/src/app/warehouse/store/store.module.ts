import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { CoreModule } from 'common';
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
import { ImportDeviceComponent } from './import-device/import-device.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DateCheckedPipe } from './date-checked.pipe';
import { PriceFormatPipe } from './price-format.pipe';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { DetailDeviceComponent } from './detail-device/detail-device.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PostSearchComponent } from './post-search/post-search.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HistoryDeviceComponent } from './history-device/history-device.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FilterHistoryComponent } from './history-device/filter-history/filter-history.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { DetailTicketComponent } from './history-device/detail-ticket/detail-ticket.component';
import { DetailComponent } from './history-device/detail-ticket/detail/detail.component';
import { ListingComponent } from './history-device/detail-ticket/listing/listing.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ExportLockerComponent } from './export-locker/export-locker.component';
import { ExportDeviceComponent } from './export-device/export-device.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RefundTransferComponent } from './refund-transfer/refund-transfer.component';
import { CreateWaybillsComponent } from './create-waybills/create-waybills.component';
import { ListDeviceModalComponent } from './create-waybills/list-device-modal/list-device-modal.component';
import { PipesModule } from 'projects/cms/src/shared/pipes';
import { NgxPrintModule } from 'ngx-print';
import { ListDeviceComponent } from './create-waybills/list-device/list-device.component';
import { BatchNumberComponent } from './create-waybills/batch-number/batch-number.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import {
  DialogExportDeviceModalModule,
  DialogImportDeviceModalModule,
} from 'projects/cms/src/shared/component';
import { CreateComponent } from './export-locker/create/create.component';
import { TextStatusPipe } from './text-status.pipe';
import { ColorStatusPipe } from './color-status.pipe';
import { NgxPermissionsModule } from 'ngx-permissions';
@NgModule({
  declarations: [
    StoreComponent,
    ImportDeviceComponent,
    DateCheckedPipe,
    PriceFormatPipe,
    DetailDeviceComponent,
    PostSearchComponent,

    HistoryDeviceComponent,
    FilterHistoryComponent,
    DetailTicketComponent,
    DetailComponent,
    ListingComponent,

    ExportLockerComponent,
    ExportDeviceComponent,
    RefundTransferComponent,
    BatchNumberComponent,
    CreateWaybillsComponent,
    ListDeviceModalComponent,
    ListDeviceComponent,
    CreateComponent,
    TextStatusPipe,
    ColorStatusPipe,
  ],
  imports: [
    CommonModule,
    CoreModule,
    StoreRoutingModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzInputModule,
    NzTypographyModule,
    NzCardModule,
    NzDividerModule,
    NzTableModule,
    NzTabsModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzImageModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzModalModule,
    NzUploadModule,
    NzTreeSelectModule,
    NzTagModule,
    NzSpinModule,
    NzSwitchModule,
    NzStatisticModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzRadioModule,
    PipesModule,
    NgxPrintModule,
    NzPopconfirmModule,
    DialogImportDeviceModalModule,
    DialogExportDeviceModalModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [CurrencyPipe],
})
export class StoreModule {}
