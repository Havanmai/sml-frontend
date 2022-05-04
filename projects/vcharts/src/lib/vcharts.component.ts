import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexMarkers,
  ApexNoData,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from "./model/apex-types";
import { asapScheduler } from "rxjs";

import ApexCharts from "apexcharts";

@Component({
  selector: 'v-chart',
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class VchartsComponent implements OnInit {

  @Input() options:any;
  @Input() autoUpdateSeries = true;

  @ViewChild("chart", { static: true }) private chartElement: ElementRef;
  private chartObj: any;

  private defaultColors = ["#007BFF","#EE1A30","#52c41a","#fa8c16","#13c2c2","#722ed1","#fadb14","#fa541c","#2f54eb","#a0d911","#eb2f96","#f5222d"];

  ngOnInit() {
    asapScheduler.schedule(() => {
      this.createElement();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    asapScheduler.schedule(() => {
      if (
        this.autoUpdateSeries &&
        Object.keys(changes).filter((c) => c !== "series").length === 0
      ) {
        this.updateSeries(this.options.series, true);
        return;
      }

      this.createElement();
    });
  }

  ngOnDestroy() {
    if (this.chartObj) {
      this.chartObj.destroy();
    }
  }

  private createElement() {
    const options: any = {};

    if (this.options.annotations) {
      options.annotations = this.options.annotations;
    }
    if (this.options.chart) {
      options.chart = this.options.chart;
      if(!options.chart.fontFamily)
        options.chart.fontFamily = "'Open Sans',sans-serif";
    }
    if (this.options.colors) {
      options.colors = this.options.colors;
    }else{
      options.colors = this.defaultColors;
    }
    
    if (this.options.dataLabels) {
      options.dataLabels = this.options.dataLabels;
    }
    if (this.options.series) {
      options.series = this.options.series;
    }
    if (this.options.stroke) {
      options.stroke = this.options.stroke;
    }else{
      options.stroke = {
        curve: 'smooth',
        width: 1,
      }
    }
    if (this.options.labels) {
      options.labels = this.options.labels;
    }
    if (this.options.legend) {
      options.legend = this.options.legend;
    }
    if (this.options.fill) {
      options.fill = this.options.fill;
    }
    if (this.options.tooltip) {
      options.tooltip = this.options.tooltip;
    }
    if (this.options.plotOptions) {
      options.plotOptions = this.options.plotOptions;
    }
    if (this.options.responsive) {
      options.responsive = this.options.responsive;
    }
    if (this.options.markers) {
      options.markers = this.options.markers;
    }
    if (this.options.noData) {
      options.noData = this.options.noData;
    }
    if (this.options.xaxis) {
      options.xaxis = this.options.xaxis;
    }
    if (this.options.yaxis) {
      options.yaxis = this.options.yaxis;
    }
    if (this.options.grid) {
      options.grid = this.options.grid;
    }
    if (this.options.states) {
      options.states = this.options.states;
    }
    if (this.options.title) {
      options.title = this.options.title;
    }
    if (this.options.subtitle) {
      options.subtitle = this.options.subtitle;
    }
    if (this.options.theme) {
      options.theme = this.options.theme;
    }

    if (this.chartObj) {
      this.chartObj.destroy();
    }

    this.chartObj = new ApexCharts(this.chartElement.nativeElement, options);

    this.render();
  }

  public render(): Promise<void> {
    return this.chartObj.render();
  }

  public updateOptions(
    options: any,
    redrawPaths?: boolean,
    animate?: boolean,
    updateSyncedCharts?: boolean
  ): Promise<void> {
    return this.chartObj.updateOptions(
      options,
      redrawPaths,
      animate,
      updateSyncedCharts
    );
  }

  public updateSeries(
    newSeries: ApexAxisChartSeries | ApexNonAxisChartSeries,
    animate?: boolean
  ) {
    this.chartObj.updateSeries(newSeries, animate);
  }

  public appendSeries(
    newSeries: ApexAxisChartSeries | ApexNonAxisChartSeries,
    animate?: boolean
  ) {
    this.chartObj.appendSeries(newSeries, animate);
  }

  public appendData(newData: any[]) {
    this.chartObj.appendData(newData);
  }

  public toggleSeries(seriesName: string): any {
    return this.chartObj.toggleSeries(seriesName);
  }

  public showSeries(seriesName: string) {
    this.chartObj.showSeries(seriesName);
  }

  public hideSeries(seriesName: string) {
    this.chartObj.hideSeries(seriesName);
  }

  public resetSeries() {
    this.chartObj.resetSeries();
  }

  public zoomX(min: number, max: number) {
    this.chartObj.zoomX(min, max);
  }

  public toggleDataPointSelection(
    seriesIndex: number,
    dataPointIndex?: number
  ) {
    this.chartObj.toggleDataPointSelection(seriesIndex, dataPointIndex);
  }

  public destroy() {
    this.chartObj.destroy();
  }

  public setLocale(localeName?: string) {
    this.chartObj.setLocale(localeName);
  }

  public paper() {
    this.chartObj.paper();
  }

  public addXaxisAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any
  ) {
    this.chartObj.addXaxisAnnotation(options, pushToMemory, context);
  }

  public addYaxisAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any
  ) {
    this.chartObj.addYaxisAnnotation(options, pushToMemory, context);
  }

  public addPointAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any
  ) {
    this.chartObj.addPointAnnotation(options, pushToMemory, context);
  }

  public removeAnnotation(id: string, options?: any) {
    this.chartObj.removeAnnotation(id, options);
  }

  public clearAnnotations(options?: any) {
    this.chartObj.clearAnnotations(options);
  }

  public dataURI(): Promise<void> {
    return this.chartObj.dataURI();
  }

}
