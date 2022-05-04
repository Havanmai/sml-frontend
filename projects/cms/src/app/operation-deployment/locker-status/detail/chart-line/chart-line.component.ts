import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LockerStatusService } from '../../locker-status.service';

@Component({
  selector: 'cms-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.less'],
})
export class ChartLineComponent implements OnInit, AfterViewInit {
  dateStart: string;
  dateEnd: string;
  @ViewChild('chartsContainer', { read: ViewContainerRef })
  chartsContainer: ViewContainerRef;

  chartOptions = {
    series: [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    chart: {
      height: 250,
      type: 'area',
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
    private injector: Injector,
    private lockerStatusService: LockerStatusService
  ) {
    this.lockerStatusService.reloadLockerTransaction$.subscribe((data) => {
      //do reload transaction data here
    });
  }
  ngOnInit(): void {}

  onChange(result: Date[]): void {
    this.dateStart = result[0].toISOString();
    this.dateEnd = result[1].toISOString();
  }
  ngAfterViewInit(): void {
    this.loadCharts();
    // Starting ngx-drag-scroll from specified index(3)
    /*  setTimeout(() => {
      this.ds.moveTo(3);
    }, 0); */
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
  }
}
