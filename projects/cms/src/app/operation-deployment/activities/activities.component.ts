import { Component, OnInit } from '@angular/core';
import { BaseService } from 'common';
import { LockerStatus } from '../locker-status/locker-status.model';
import { LockerStatusService } from '../locker-status/locker-status.service';
import { Locker } from '../locker-status/locker.model';
import { ActivitiesService } from './activities.service';

@Component({
  selector: 'cms-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.less'],
})
export class ActivitiesComponent implements OnInit {
  codeSearch: string;
  keyword: string;
  codeLockerCabinets: number;
  codeLockerItem: string;
  isLoadingLockerCabinets: boolean = false;
  pageLockerCabinets: number;
  sizeLockerCabinets: number;
  listOfLockerCabinets: LockerStatus[];
  totalLockerCabinets: number;

  isLoadingLockerItem: boolean = false;
  pageLockerItem: number;
  sizeLockerItem: number;
  listOfLockerItem: Locker[];
  totalLockerItem: number;
  constructor(
    private baseService: BaseService,
    private lockerStatusService: LockerStatusService,
    private activityServive: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.pageLockerCabinets = 0;
    this.sizeLockerCabinets = 10;
    this.listOfLockerCabinets = [];
    this.getAllLockerCabinets();
  }

  searchCode() {}

  getAllLockerCabinets() {
    this.lockerStatusService
      .getAllLockerCabinets(this.pageLockerCabinets, this.sizeLockerCabinets)
      .subscribe((data: any) => {
        if (data.data.data.length > 0) {
          this.isLoadingLockerCabinets = false;
          this.responseProcessCabinet(data);
        }
      });
  }

  responseProcessCabinet(data: any) {
    if (this.listOfLockerCabinets == []) {
      this.listOfLockerCabinets = data.data.data;
    } else {
      this.listOfLockerCabinets = this.listOfLockerCabinets.concat(
        data.data.data
      );
    }
    this.totalLockerCabinets = data.data.total;
  }

  changeLockerCabinet(event) {
    this.codeLockerCabinets = event;
    if (event != null) {
      this.pageLockerItem = 0;
      this.sizeLockerItem = 10;
      this.listOfLockerItem = [];
      this.getAllLocker();
    } else {
      this.codeLockerItem = null;
      this.listOfLockerItem = [];
    }
  }

  loadMoreLockerCabinet() {
    if (this.totalLockerCabinets > this.listOfLockerCabinets.length) {
      this.isLoadingLockerCabinets = true;
      this.pageLockerCabinets = this.pageLockerCabinets + 1;
      this.getAllLockerCabinets();
    }
  }

  getAllLocker() {
    this.activityServive
      .getLocker(
        this.pageLockerItem,
        this.sizeLockerItem,
        this.codeLockerCabinets
      )
      .subscribe((data: any) => {
        if (data.data.data.length > 0) {
          this.isLoadingLockerItem = false;
          this.responseProcessLocker(data);
        }
      });
  }

  responseProcessLocker(data: any) {
    if (this.listOfLockerItem == []) {
      this.listOfLockerItem = data.data.data;
    } else {
      this.listOfLockerItem = this.listOfLockerItem.concat(data.data.data);
    }
    this.totalLockerItem = data.data.total;
  }
  /*  searchCodeLocker(){

  this.getAllLocker();
  } */

  loadMoreLocker() {
    if (this.totalLockerItem > this.listOfLockerItem.length) {
      this.isLoadingLockerItem = true;
      this.pageLockerItem = this.pageLockerItem + 1;
      this.getAllLocker();
    }
  }
}
