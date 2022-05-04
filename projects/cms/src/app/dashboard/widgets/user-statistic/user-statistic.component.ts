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
  selector: 'cms-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.less'],
})
export class UserStatisticComponent implements OnInit, AfterViewInit {
  chartInstance: VchartsComponent;
  @ViewChild('chartsContainer', { read: ViewContainerRef })
  chartsContainer: ViewContainerRef;

  chartOptions = {
    series: [
      {
        name: 'Người dùng',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Người dùng mới',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 360,
      type: 'area',
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

  filterSelect(timeStr: string) {}
}
