import { Component, OnInit } from '@angular/core';
import { BaseService } from 'common';
import { PostOfficeModel } from '../../warehouse/store/post-ofice.model';
import { StoreService } from '../../warehouse/store/store.service';
import { PostService } from './post.service';

@Component({
  selector: 'cms-postoffices',
  templateUrl: './postoffices.component.html',
  styleUrls: ['./postoffices.component.less'],
})
export class PostofficesComponent implements OnInit {
  keyword: string;
  provinceId: string;
  provinceName: string;
  distId: string;
  distName: string;
  wardId: number;
  wardName: number;
  postId: number;
  listOfProvince: any[];
  listOfDist: any[];
  listOfWard: any[];
  page: number = 1;
  size: number = 10;
  total: number = 0;

  listPost: PostOfficeModel[];

  constructor(
    private postService: PostService,
    private baseSevice: BaseService,
    private storeService: StoreService
  ) {

  }

  ngOnInit(): void {
    this.page=1;
    this.size=10;
    this.getAllPostOffice();
    this.getProvince();
  }

  getAllPostOffice() {
    this.baseSevice.showLoading(true);
    this.postService
      .getAllBuuCuc(
        this.page - 1,
        this.size,
        this.keyword,
        this.provinceName,
        this.distName,
        this.wardName
      )
      .subscribe((data: any) => {
        this.baseSevice.showLoading(false);
        if (data.error == 0) {
          this.listPost = [];
          this.total = data.data.total;
          data.data.data.forEach((element) => {
            let item = new PostOfficeModel(element);
            this.listPost.push(item);
          });
        }
      });
  }

  getProvince() {
    this.storeService.getAllProvince().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfProvince = data.data.data;
      }
    });
  }

  reload() {
    this.page=1;
    this.size=10;
    this.getAllPostOffice();
  }

  pageChange(index: number) {
    this.page = index;
    this.getAllPostOffice();
  }
  sizeChange(event) {
    this.size = event;
    this.getAllPostOffice();
  }

  provinceChange(event) {
    this.provinceName = event;
    if (event != null) {
      this.storeService.getDistByProvince(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.distChange(null);
          this.listOfDist = data.data.data;
        }
      });
    } else {
      this.listOfDist = [];
      this.distName = null;
      this.wardName = null;
      this.distChange(null);
    }
    this.page=1;
    this.size=10;
    this.getAllPostOffice();
  }

  distChange(event) {
    this.distId = event;
    if (event != null) {
      for (let i: number = 0; i < this.listOfDist.length; i++) {
        if (event == this.listOfDist[i].id) {
          this.distName = this.listOfDist[i].maQuanHuyen;
          break;
        }
      }
      this.storeService.getWardByDist(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.wardChange(null);
          this.listOfWard = data.data.data;
        }
      });
    } else {
      this.listOfWard = [];
      this.wardName = null;
      this.wardChange(null);
    }
    this.page=1;
    this.size=10;
    this.getAllPostOffice();
  }

  wardChange(event) {
    this.wardId = event;
    if (event != null) {
      for (let i: number = 0; i < this.listOfDist.length; i++) {
        if (event == this.listOfWard[i].id) {
          this.wardName = this.listOfWard[i].id;
          break;
        }
      }
    }
    this.page=1;
    this.size=10;
    this.getAllPostOffice();
  }
}
