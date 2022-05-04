import { Component, OnInit } from '@angular/core';
import { BaseService } from 'common';
import { PostOfficeModel } from '../../warehouse/store/post-ofice.model';
import { PostMan } from './postman.model';
import { PostmansService } from './postmans.service';

@Component({
  selector: 'cms-postmans',
  templateUrl: './postmans.component.html',
  styleUrls: ['./postmans.component.less'],
})
export class PostmansComponent implements OnInit {
  keyword: string;
  listOfData: PostMan[] = [];
  size: number;
  page: number;
  total: number;
  postId: string;
  constructor(
    private postmansService: PostmansService,
    private baseService: BaseService
  ) {

  }

  ngOnInit(): void {
    this.page = 1;
    this.size = 10;
    this.getAllPostman();
    this.getBuuCucSearchLoad();
  }

  searchKeyWord() {
    this.getAllPostman();
  }

  pageChange(event) {
    this.page = event;
    this.getAllPostman();
  }

  searchPost(event) {
    this.postId = event;
    this.getAllPostman;
  }

  getAllPostman() {
    this.baseService.showLoading(true);
    this.postmansService
      .getAllPostMan(this.page - 1, this.size, this.keyword, this.postId)
      .subscribe(
        (data: any) => {
          this.baseService.showLoading(false);
          if (data.error == 0) {
            this.responseProcess(data);
          }
        },
        (err: any) => {
          console.log('không gửi được request lấy all buu cuc', err);
        }
      );
  }

  responseProcess(data: any) {
    this.total = data.data.total;
    this.listOfData = [];
    data.data.data.forEach((element) => {
      let item = new PostMan(element);
      this.listOfData.push(item);
    });
  }

  pageBuuCuc: number = 0;
  sizeBuuCuc: number = 10;
  totalBuuCuc: number = 0;
  isLoadingScroll: boolean = false;
  listOfPost: PostOfficeModel[] = [];
  getBuuCucSearchLoad() {
    this.postmansService
      .getBuuCucSearch(this.pageBuuCuc, this.sizeBuuCuc)
      .subscribe(
        (data: any) => {
          this.isLoadingScroll = false;
          this.responseProcessBuuCuc(data);
        },
        (error: any) => {
          console.log('Không gưi được thông tin lấy bưu cục', error);
        }
      );
  }

  responseProcessBuuCuc(data: any) {
    if (this.listOfPost == []) {
      this.listOfPost = data.data.data;
    } else {
      this.listOfPost = this.listOfPost.concat(data.data.data);
    }
    this.totalBuuCuc = data.data.total;
  }

  loadMore(): void {
    if (this.totalBuuCuc > this.listOfPost.length) {
      this.isLoadingScroll = true;
      this.pageBuuCuc = this.pageBuuCuc + 1;
      this.getBuuCucSearchLoad();
    }
  }
}
