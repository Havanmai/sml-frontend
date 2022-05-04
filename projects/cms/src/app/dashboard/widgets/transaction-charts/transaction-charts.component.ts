import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { VchartsComponent } from 'vcharts';

@Component({
  selector: 'cms-transaction-charts',
  templateUrl: './transaction-charts.component.html',
  styleUrls: ['./transaction-charts.component.less'],
})
export class TransactionChartsComponent implements OnInit, AfterViewInit {
  chartInstance: VchartsComponent;
  @ViewChild('chartsContainer', { read: ViewContainerRef })
  chartsContainer: ViewContainerRef;

  chartOptions = {
    series: [
      {
        name: 'Số giao dịch',
        data: [80, 40, 28, 60, 42, 20, 100],
      },
    ],
    chart: {
      height: 300,
      type: 'area',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadCharts();
  }

  async loadCharts() {
    const { VchartsComponent } = await import('vcharts');
    const chartFactory = this.cfr.resolveComponentFactory(VchartsComponent);
    const { instance } = this.chartsContainer.createComponent(
      chartFactory,
      null,
      this.injector
    );
    //nếu component có input thì khởi tạo input data
    instance.options = this.chartOptions;
    this.chartInstance = instance;
  }

  filterSelect(timeStr: string) {
    //console.log(timeStr);
    this.chartOptions.series = [
      {
        name: 'series1',
        data: [80, 120, 28, 51, 42, 109, 100],
      },
      {
        name: 'series2',
        data: [51, 42, 45, 32, 34, 52, 41],
      },
    ];
    this.chartInstance.updateOptions(this.chartOptions);
  }
}
