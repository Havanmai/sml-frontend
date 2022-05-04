import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.less'],
})
export class DateSelectorComponent implements OnInit {
  selectText: string = '';
  curentSelect: number = 4;
  startDate: Date;
  endDate: Date;

  rangeDate = null;

  listOptions: string[] = [
    'Ngày hôm nay',
    'Ngày hôm qua',
    '',
    'Tuần này',
    'Tháng này',
    'Quý hiện tại',
    'Năm nay',
    'Tất cả',
  ];
  customMode: boolean = false;
  isvisible: boolean = false;

  @Output() onSelect = new EventEmitter<string>();
  @Input() defaultSelect: number;

  constructor() {}

  ngOnInit(): void {
    if (this.defaultSelect) this.curentSelect = this.defaultSelect;
    this.selectText = this.listOptions[this.curentSelect];
  }

  selectOption(index: number) {
    this.curentSelect = index;
    this.selectText = this.listOptions[index];
    this.isvisible = false;
    switch (index) {
      case 0:
        this.endDate = new Date();
        this.startDate = this.getStartDay(this.endDate);
        break;
      case 1:
        this.endDate = new Date();
        this.startDate = this.getYesterday(this.endDate);
        this.endDate = this.getEndday(this.startDate);
        break;
      case 3:
        this.endDate = new Date();
        this.startDate = this.getMonday(this.endDate);
        break;
      case 4:
        this.endDate = new Date();
        this.startDate = this.getFirstDayOfMonth(this.endDate);
        break;
      case 5:
        this.endDate = new Date();
        this.startDate = this.getFirstDayOfQuard(this.endDate);
        break;
      case 6:
        this.endDate = new Date();
        this.startDate = this.getFirstDayOFYear(this.endDate);
        break;
      case 7:
        this.endDate = new Date();
        this.startDate = new Date(2020, 1, 1);
        break;
      default:
        break;
    }

    this.printRangerDay();
    this.onSelect.emit(this.buidDateString());
  }

  printRangerDay() {
    console.log(
      this.startDate.toLocaleString() +
        '-------' +
        this.endDate.toLocaleString()
    );
  }

  onChange(result: Date[]): void {
    this.endDate = result[1];
    this.startDate = this.getStartDay(result[0]);
  }

  buidDateString() {
    return this.startDate.getTime() + '-' + this.endDate.getTime();
  }

  customRangerClick() {
    this.customMode = true;
    this.curentSelect = 9;
  }

  onMenuChange($event) {
    this.isvisible = $event;
    if (!this.isvisible) this.customMode = false;
  }

  customDateSelected() {
    this.isvisible = false;

    setTimeout(() => {
      this.customMode = false;
    }, 200);
    if (this.startDate && this.endDate) {
      this.printRangerDay();
      this.selectText =
        this.startDate.getDate() +
        '/' +
        (this.startDate.getMonth() + 1) +
        '/' +
        this.startDate.getFullYear() +
        '-' +
        this.endDate.getDate() +
        '/' +
        (this.endDate.getMonth() + 1) +
        '/' +
        this.endDate.getFullYear();
      this.onSelect.emit(this.buidDateString());
    }
  }

  cancelDateSelect() {
    this.isvisible = false;
    setTimeout(() => {
      this.customMode = false;
    }, 200);
  }

  getStartDay(date: Date): Date {
    let d: Date = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);
    return d;
  }

  getEndday(date: Date) {
    let d: Date = new Date(date.getTime());
    d.setHours(23, 59, 59, 0);
    return d;
  }

  getYesterday(d: Date) {
    let day = d.getDay(),
      diff = d.getDate() - 1;
    let newD: Date = new Date(d.setDate(diff));
    return this.getStartDay(newD);
  }
  getMonday(d: Date) {
    let cloneD: Date = new Date(d.getTime());
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    let newD: Date = new Date(cloneD.setDate(diff));
    return this.getStartDay(newD);
  }

  getFirstDayOfMonth(d: Date) {
    let cloneD: Date = new Date(d.getTime());
    let newD: Date = new Date(cloneD.setDate(1));
    return this.getStartDay(newD);
  }

  getFirstDayOFYear(d: Date) {
    let day: Date = new Date(d.getFullYear(), 0, 1);
    return this.getStartDay(day);
  }

  getFirstDayOfQuard(d: Date) {
    let quarter = Math.floor((d.getMonth() + 3) / 3);
    let nextq: Date;
    switch (quarter) {
      case 1:
        nextq = new Date(d.getFullYear(), 0, 1);
        break;
      case 2:
        nextq = new Date(d.getFullYear(), 3, 1);
        break;
      case 3:
        nextq = new Date(d.getFullYear(), 6, 1);
        break;
      case 4:
        nextq = new Date(d.getFullYear(), 9, 1);
        break;
      default:
        nextq = new Date(d.getFullYear(), 0, 1);
        break;
    }

    return this.getStartDay(nextq);
  }
}
