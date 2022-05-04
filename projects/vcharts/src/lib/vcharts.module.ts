import { NgModule } from '@angular/core';
import { VchartsComponent } from './vcharts.component';
import ApexCharts from "apexcharts";

declare global {
  interface Window {
    ApexCharts: any;
  }
}

window.ApexCharts = ApexCharts;
const declerations = [VchartsComponent];


@NgModule({
  declarations: [
    ...declerations
  ],
  imports: [
  ],
  exports: [
    ...declerations
  ]
})
export class VchartsModule { }
