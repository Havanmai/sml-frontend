import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.less'],
})
export class ListingComponent implements OnInit {
  /** INPUT */
  @Input() iData = [];
  /** PUBLIC */
  public pageSize = 10;
  public pageNumber = 0;
  public totalPage = 0;

  /** CONSTRUCTOR */
  constructor() {}

  /** LIFE CYCLE */
  ngOnInit(): void {}

  /** PUBLIC METHOD */
  public onPageChange(e) {
    this.pageNumber = e;
  }
}
