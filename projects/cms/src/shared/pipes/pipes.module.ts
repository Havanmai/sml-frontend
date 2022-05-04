import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePipe } from './datetime.pipe';
import { BillNamePipe } from './billname.pipe';
import { DateFullVnPipe } from './datefullvn.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [DatetimePipe, BillNamePipe, DateFullVnPipe],
  providers: [DatetimePipe, BillNamePipe, DateFullVnPipe],
  declarations: [DatetimePipe, BillNamePipe, DateFullVnPipe],
})
export class PipesModule {}
