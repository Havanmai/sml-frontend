import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { VchartsComponent } from 'vcharts';

@Component({
  selector: 'cms-head-map',
  templateUrl: './head-map.component.html',
  styleUrls: ['./head-map.component.less'],
})
export class HeadMapComponent implements OnInit {
  chartInstance: VchartsComponent;
  @ViewChild('chartsContainer', { read: ViewContainerRef })
  chartsContainer: ViewContainerRef;

  chartOptions = {
    series: [
      {
        name: '12am',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '2am',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '4am',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '6am',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '8am',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '10am',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '12pm',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '2pm',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '4pm',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '6pm',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '8pm',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: '10pm',
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
    ],
    chart: {
      height: 482,
      type: 'heatmap',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#008FFB'],
  };

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  public generateData(count, yrange) {
    let i = 0;
    let series = [];
    while (i < count) {
      let x = '';
      switch (i) {
        case 0:
          x = 'Thứ 2';
          break;
        case 1:
          x = 'Thứ 3';
          break;
        case 2:
          x = 'Thứ 4';
          break;
        case 3:
          x = 'Thứ 5';
          break;
        case 4:
          x = 'Thứ 6';
          break;
        case 5:
          x = 'Thứ 7';
          break;
        case 6:
          x = 'CN';
          break;
        default:
          break;
      }
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }

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
