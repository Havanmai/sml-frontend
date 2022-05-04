import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreService } from 'projects/cms/src/app/warehouse/store/store.service';

@Component({
  selector: 'cms-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.less'],
})
export class PostSearchComponent implements OnInit {
  provinceId: string;
  distId: string;
  wardId: string;

  listOfProvince: any[];
  listOfDist: any[];
  listOfWard: any[];

  listOfData: any[];

  @Output() onSelect = new EventEmitter<any>();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllProvince().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfProvince = data.data.data;
      }
    });
  }

  provinceChange(event) {
    this.provinceId = event;
    this.storeService.getDistByProvince(event).subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfDist = data.data.data;
      }
    });
  }

  distChange(event) {
    //this.distId = event;
    for (let i: number = 0; i < this.listOfDist.length; i++) {
      if (event == this.listOfDist[i].id) {
        this.distId = this.listOfDist[i].maQuanHuyen;
        break;
      }
    }
    this.storeService.getWardByDist(event).subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfWard = data.data.data;
      }
    });
  }

  wardChange(event) {
    this.wardId = event;
  }

  searchPost() {
    this.storeService
      .findPost(this.distId, this.wardId)
      .subscribe((data: any) => {
        if (data.error == 0) {
          this.listOfData = data.data.data;
        }
      });
  }

  selectPostOffice(data: any) {
    this.onSelect.emit(data);
  }
}
