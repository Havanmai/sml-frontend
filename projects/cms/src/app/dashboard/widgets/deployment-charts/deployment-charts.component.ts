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
  selector: 'cms-deployment-charts',
  templateUrl: './deployment-charts.component.html',
  styleUrls: ['./deployment-charts.component.less'],
})
export class DeploymentChartsComponent implements OnInit, AfterViewInit {
  chartInstance: VchartsComponent;
  @ViewChild('chartsContainer', { read: ViewContainerRef })
  chartsContainer: ViewContainerRef;

  chartOptions = {
    series: [
      {
        name: 'Triển khai mới',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    chart: {
      height: 300,
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
