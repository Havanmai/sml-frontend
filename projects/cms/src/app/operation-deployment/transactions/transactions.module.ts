import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DetailTransactionComponent } from './detail-transaction/detail-transaction.component';
import { HeaderDetailOrderComponent } from './detail-transaction/header-detail-order/header-detail-order.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TextDetailStatusPipe } from './text-detail-status.pipe';
import { ColorDetailStatusPipe } from './color-detail-status.pipe';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TextDetailSessionTypePipe } from './text-detail-session-type.pipe';
import { DateTextPipe } from './date-text.pipe';
import { DateHistoryPipe } from './date-history.pipe';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TextReasonPipe } from './text-reason.pipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TypeLockerNamePipe } from './type-locker-name.pipe';
import { NgxPrintModule } from 'ngx-print';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SafePipe } from './safe.pipe';
import { VandonTypePipe } from './vandon-type.pipe';
@NgModule({
  declarations: [
    TransactionsComponent,
    DetailTransactionComponent,
    HeaderDetailOrderComponent,
    DateSelectorComponent,
    TextDetailStatusPipe,
    ColorDetailStatusPipe,
    TextDetailSessionTypePipe,
    DateTextPipe,
    DateHistoryPipe,
    TextReasonPipe,
    TypeLockerNamePipe,
    SafePipe,
    VandonTypePipe,
  ],
  imports: [
    NgxPrintModule,
    CommonModule,
    TransactionsRoutingModule,
    CoreModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzInputModule,
    NzTypographyModule,
    NzCardModule,
    NzDividerModule,
    NzTableModule,
    NzCheckboxModule,
    NzSelectModule,
    NzDatePickerModule,
    NzStepsModule,
    HttpClientModule,
    FormsModule,
    NzTagModule,
    NzToolTipModule,
    NzModalModule,
    NzDropDownModule,
    NzSpinModule,
    NzLayoutModule,
  ],
})
export class TransactionsModule {}
