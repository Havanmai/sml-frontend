import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsFileUploadComponent } from './cms-file-upload.component';
import { FormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [CmsFileUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzUploadModule,
    NzToolTipModule,
    NzListModule,
    NzResultModule,
    NzSpinModule,
    NzIconModule,
  ],
  exports: [CmsFileUploadComponent],
})
export class CmsFileUploadModule {}
