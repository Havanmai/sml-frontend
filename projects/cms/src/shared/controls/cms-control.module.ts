import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsFileUploadModule } from './cms-file-upload/cms-file-upload.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CmsFileUploadModule],
  exports: [CmsFileUploadModule],
})
export class CmsControlModule {}
