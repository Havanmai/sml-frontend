import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogExportDeviceModalComponent } from './dialog-export-device-modal.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PipesModule } from '../../pipes';
@NgModule({
  declarations: [DialogExportDeviceModalComponent],
  imports: [
    CommonModule,
    NzTypographyModule,
    NzIconModule,
    NzGridModule,
    NzTableModule,
    NzButtonModule,
    PipesModule,
  ],
  exports: [DialogExportDeviceModalComponent],
})
export class DialogExportDeviceModalModule {}
