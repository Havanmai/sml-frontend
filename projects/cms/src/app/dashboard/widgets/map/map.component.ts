import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Scale, Zoom } from '@antv/l7-component';
import { Mapbox } from '@antv/l7-maps';
import { Scene, PointLayer, Layers, PolygonLayer, ILayer } from '@antv/l7';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { MapService } from '../../map.service';
import { LockerStatus } from '../../../operation-deployment/locker-status/locker-status.model';
import { Router } from '@angular/router';
import { PostOfficeModel } from '../../../warehouse/store/post-ofice.model';
import { BaseService, Constants } from 'common';

@Component({
  selector: 'cms-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
})
export class MapComponent implements OnInit {
  listOfLocker: any[];
  visible: boolean = false;
  datasend: any;
  lockerItem: LockerStatus;
  countmap: number = 0;
  scene: Scene;
  pointLayerLocker: ILayer;
  pointLayerPost: ILayer;
  visiblePost: boolean = false;
  itemPostOffice: PostOfficeModel;
  /* overlayers:ILayer;*/
  layersControl: Layers;
  isLoadingMap: boolean = false;

  totalLocker: number;
  totalPost: number;

  activeCount: number;
  offCount: number;
  fullCount: number;
  errorCount: number;
  lockerCount: number;

  constructor(
    private httpClient: HttpClient,
    private mapService: MapService,
    private router: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.getBuuCucSearchLoad();
    this.getProvince();
    this.getData();
  }

  getDataCount(data: any) {
    this.activeCount = 0;
    this.offCount = 0;
    this.fullCount = 0;
    this.errorCount = 0;
    this.lockerCount = 0;
    data.forEach((element) => {
      switch (element.status) {
        case 0:
          this.offCount = this.offCount + 1;
          break;
        case 1:
          this.activeCount = +this.activeCount + 1;
          break;
        case 2:
          this.errorCount = +this.errorCount + 1;
          break;
        case 3:
          this.lockerCount = +this.lockerCount + 1;
          break;
        case 4:
          this.fullCount = +this.fullCount + 1;
          break;
        default:
          break;
      }
    });
  }

  getCountPost(scene: any) {}

  getData() {
    this.httpClient.get('/assets/viettelpost.json').subscribe((data: any) => {
      this.scene = new Scene({
        id: 'map',
        map: new Mapbox({
          pitch: 0,
          style: data,
          center: [105.819746, 21.023351],
          zoom: 13,
          maxZoom: 50,
        }),
      });
      this.getLoad();
      this.getDataLoadAllLocker();
      this.getDataLoadAllPost();
    });
  }

  getLoad() {
    this.scene.on('loaded', () => {
      fetch('/assets/map.json')
        .then((res) => res.json())
        .then((data) => {
          this.countmap = this.countmap + 1;

          const vietNamPolygonLayer = new PolygonLayer({})
            .source(data)
            .active(true);
          this.scene.addLayer(vietNamPolygonLayer);
        });
      this.scene.addImage('postoffice', 'assets/bưu cục.svg');
      this.scene.addImage('hub', 'assets/hub.svg');
      this.scene.addImage('TTKT', 'assets/5Star.svg');
      this.scene.addImage('TTB', 'assets/trung tâm bay.svg');
      this.scene.addImage('CH', 'assets/cửa hàng.svg');
      this.scene.addImage('marker0', 'assets/locker-off.svg');
      this.scene.addImage('marker1', 'assets/locker-onl.svg');
      this.scene.addImage('marker2', 'assets/locker-error.svg');
      this.scene.addImage('marker3', 'assets/locker-locked.svg');
      this.scene.addImage('marker4', 'assets/locker-full.svg');

      const zoomControl = new Zoom({
        position: 'topright',
      });
      const scaleControl = new Scale({
        position: 'bottomright',
      });

      this.scene.addControl(zoomControl);
      this.scene.addControl(scaleControl);
    });
  }

  getDataLoadAllLocker() {
    this.scene.on('loaded', () => {
      this.mapService
        .getAllLockerCabinets(
          this.codeSearch,
          this.provinceName,
          this.distName,
          this.wardName,
          this.postId
        )
        .pipe(
          catchError(() => of({ data: [] })),
          map((res: any) => res.data.data)
        )
        .subscribe((data: any) => {
          if (data.length > 0) {
            this.totalLocker = data.length;
            this.getDataCount(data);
            this.pointLayerLocker = new PointLayer({})
              .source(data, {
                parser: {
                  type: 'json',
                  x: 'longitude',
                  y: 'latitude',
                },
              })
              .shape('status', function (status) {
                let marker = '';
                switch (status) {
                  case 0:
                    marker = 'marker0';
                    break;
                  case 1:
                    marker = 'marker1';
                    break;
                  case 2:
                    marker = 'marker2';
                    break;
                  case 3:
                    marker = 'marker3';
                    break;
                  case 4:
                    marker = 'marker4';
                    break;
                  default:
                    break;
                }
                return marker;
              })
              .size(13)
              .active({
                color: 'blue',
              });
            this.pointLayerLocker.on('mouseup', (ev) => {
              this.visible = false;
              this.datasend = ev;
              this.clickPoint({ bubbles: true, detail: this.datasend });
            });
            this.pointLayerLocker.on('mouseout', (ev) => {
              this.visible = false;
            });
            this.scene.addLayer(this.pointLayerLocker);
            const overlayers = {
              'Tủ SmartLocker': this.pointLayerLocker,
            };

            this.layersControl = new Layers({
              overlayers,
            });

            this.scene.addControl(this.layersControl);
          }
        });
    });
  }

  listOfPostOffice: any[] = [];
  listOfHub: any[] = [];
  listOfTTKT: any[] = [];
  listOfTTB: any[] = [];
  listOfCH: any[] = [];
  countCH: number = 0;
  countPost: number = 0;
  countTTKT: number = 0;
  countHub: number = 0;
  countTTB: number = 0;

  getDataLoadAllPost() {
    this.scene.on('loaded', () => {
      this.isLoadingMap = true;
      this.mapService
        .getAllBuuCucUpgrade(
          this.provinceName,
          this.distName,
          this.wardName,
          this.postId
        )
        .pipe(
          catchError(() => of({ data: [] })),
          map((res: any) => res.data.data),
          finalize(() => {
            this.isLoadingMap = false;
          })
        )
        .subscribe((data: any) => {
          this.totalPost = 0;
          if (data.length > 0) {
            this.listOfTTKT = [];
            this.listOfHub = [];
            this.listOfPostOffice = [];
            this.listOfTTB = [];
            this.countPost = 0;
            this.countTTKT = 0;
            this.countHub = 0;
            this.countTTB = 0;
            this.listOfCH = [];
            this.countCH = 0;

            data.forEach((item) => {
              switch (Number(item.capBuuCuc)) {
                case 10:
                  if (item.name.toLocaleUpperCase().startsWith('HUB')) {
                    this.listOfHub.push(item);
                  } else if (item.name.toLocaleUpperCase().startsWith('CH')) {
                    this.listOfCH.push(item);
                  } else {
                    this.listOfPostOffice.push(item);
                  }

                  break;
                case 30:
                  this.listOfHub.push(item);
                  break;
                case 40:
                  this.listOfTTB.push(item);
                  break;
                case 50:
                  this.listOfTTKT.push(item);
                  break;
                default:
                  break;
              }
            });
            this.totalPost = this.listOfPostOffice.length;
            this.totalTTKT = this.listOfTTKT.length;
            this.totalTTB = this.listOfTTB.length;
            this.totalHUB = this.listOfHub.length;
            this.totalCH = this.listOfCH.length;
            this.pointLayerPost = new PointLayer({})
              .source(this.listOfPostOffice, {
                parser: {
                  type: 'json',
                  x: 'longitude',
                  y: 'latitude',
                },
              })
              .shape('postoffice')
              .size(14)
              .active({
                color: 'blue',
              });

            this.pointLayerPost.on('mouseup', (ev) => {
              this.visiblePost = false;
              this.clickPointPost({ bubbles: true, detail: ev });
            });
            this.pointLayerPost.on('mouseout', (ev) => {
              setTimeout(() => {
                this.visiblePost = false;
              }, 100);
            });

            this.scene.addLayer(this.pointLayerPost);
            this.getCountPost(this.scene);
            this.layersControl.addVisualLayer(this.pointLayerPost, 'Bưu Cục');
            this.getDataLoadAllCH(this.listOfCH);
            this.getDataLoadAllTTKT(this.listOfTTKT);
            this.getDataLoadAllTTB(this.listOfTTB);
            this.getDataLoadAllHUB(this.listOfHub);

            document
              .getElementsByClassName('l7-control-layers-selector')[1]
              .addEventListener('click', () => {
                this.countPost = this.countPost + 1;
                if (this.countPost == 0 || this.countPost % 2 == 0) {
                  this.totalPost = this.listOfPostOffice.length;
                } else {
                  this.totalPost = 0;
                }
              });

            document
              .getElementsByClassName('l7-control-layers-selector')[2]
              .addEventListener('click', () => {
                this.countCH = this.countCH + 1;
                if (this.countCH == 0 || this.countCH % 2 == 0) {
                  this.totalCH = this.listOfCH.length;
                } else {
                  this.totalCH = 0;
                }
              });

            document
              .getElementsByClassName('l7-control-layers-selector')[3]
              .addEventListener('click', () => {
                this.countTTKT = this.countTTKT + 1;
                if (this.countTTKT == 0 || this.countTTKT % 2 == 0) {
                  this.totalTTKT = this.listOfTTKT.length;
                } else {
                  this.totalTTKT = 0;
                }
              });

            document
              .getElementsByClassName('l7-control-layers-selector')[4]
              .addEventListener('click', () => {
                this.countTTB = this.countTTB + 1;
                if (this.countTTB == 0 || this.countTTB % 2 == 0) {
                  this.totalTTB = this.listOfTTB.length;
                } else {
                  this.totalTTB = 0;
                }
              });

            document
              .getElementsByClassName('l7-control-layers-selector')[5]
              .addEventListener('click', () => {
                this.countHub = this.countHub + 1;
                if (this.countHub == 0 || this.countHub % 2 == 0) {
                  this.totalHUB = this.listOfHub.length;
                } else {
                  this.totalHUB = 0;
                }
              });
          }
        });
    });
  }

  totalCH: number;
  pointLayerCH: ILayer;
  getDataLoadAllCH(data: any) {
    this.pointLayerCH = new PointLayer({})
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('CH')
      .size(14)
      .active({
        color: 'blue',
      });

    this.pointLayerCH.on('mouseup', (ev) => {
      this.visiblePost = false;
      this.clickPointPost({ bubbles: true, detail: ev });
    });
    this.pointLayerCH.on('mouseout', (ev) => {
      setTimeout(() => {
        this.visiblePost = false;
      }, 100);
    });

    this.scene.addLayer(this.pointLayerCH);

    this.layersControl.addVisualLayer(this.pointLayerCH, 'Cửa hàng');
  }

  totalTTKT: number;
  /* visibleStore:boolean=false; */
  pointLayerTTKT: ILayer;
  getDataLoadAllTTKT(data: any) {
    this.pointLayerTTKT = new PointLayer({})
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('TTKT')
      .size(14)
      .active({
        color: 'blue',
      });

    this.pointLayerTTKT.on('mouseup', (ev) => {
      this.visiblePost = false;
      this.clickPointPost({ bubbles: true, detail: ev });
    });
    this.pointLayerTTKT.on('mouseout', (ev) => {
      setTimeout(() => {
        this.visiblePost = false;
      }, 100);
    });

    this.scene.addLayer(this.pointLayerTTKT);

    this.layersControl.addVisualLayer(
      this.pointLayerTTKT,
      'Trung Tâm Khai Thác'
    );
  }

  totalTTB: number;
  pointLayerTTB: ILayer;

  getDataLoadAllTTB(data: any) {
    this.pointLayerTTB = new PointLayer({})
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('TTB')
      .size(14)
      .active({
        color: 'blue',
      });

    this.pointLayerTTB.on('mouseup', (ev) => {
      this.visiblePost = false;
      this.clickPointPost({ bubbles: true, detail: ev });
    });
    this.pointLayerTTB.on('mouseout', (ev) => {
      setTimeout(() => {
        this.visiblePost = false;
      }, 100);
    });

    this.scene.addLayer(this.pointLayerTTB);

    this.layersControl.addVisualLayer(this.pointLayerTTB, 'Trung Tâm Bay');
  }

  totalHUB: number;
  pointLayerHUB: ILayer;
  getDataLoadAllHUB(data: any) {
    this.pointLayerHUB = new PointLayer({})
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('hub')
      .size(14)
      .active({
        color: 'blue',
      });

    this.pointLayerHUB.on('mouseup', (ev) => {
      this.visiblePost = false;
      this.clickPointPost({ bubbles: true, detail: ev });
    });
    this.pointLayerHUB.on('mouseout', (ev) => {
      setTimeout(() => {
        this.visiblePost = false;
      }, 100);
    });

    this.scene.addLayer(this.pointLayerHUB);

    this.layersControl.addVisualLayer(this.pointLayerHUB, 'HUB');
  }

  clickPoint(event) {
    this.lockerItem = event.detail.feature;

    let el = document.getElementById('popoverpoint');
    el.style.left = event.detail.x + 'px';
    el.style.top = event.detail.y + 'px';
    setTimeout(() => {
      this.visible = true;
    }, 100);
  }

  clickMe(): void {
    this.visible = false;
  }

  clickPointPost(event) {
    this.itemPostOffice = event.detail.feature;
    let el = document.getElementById('pointpost');
    el.style.left = event.detail.x + 'px';
    el.style.top = event.detail.y + 'px';
    setTimeout(() => {
      this.visiblePost = true;
    }, 100);
  }

  clickMePost(): void {
    this.visiblePost = false;
  }

  change(value: boolean): void {}

  changePost(value: boolean): void {}

  viewDetail(id: number) {
    this.router.navigateByUrl('/lockers/detail/' + id);
  }

  titleBreadCrumb: string;
  getDetailTitleMap() {
    if (this.provinceId == null) {
      this.titleBreadCrumb = 'TẤT CẢ CÁC BƯU CỤC';
    }
  }

  //#region seach locker
  size: number;
  page: number;
  provinceId: string;
  provinceName: string;
  distId: string;
  distName: string;
  wardId: string;
  wardName: number;
  postId: number;
  listOfProvince: any[];
  listOfDist: any[];
  listOfWard: any[];
  listOfPost: any[] = [];
  isLoadingScroll: boolean = false;
  codeSearch: string;

  listOfCabinets: LockerStatus[] = [];

  nzFilterOption = () => true;

  searchAll() {
    this.getDataItemLocker();
    this.getDataItemPost();
  }

  searchCode(event) {
    this.listOfCabinets = [];
    if (event != null && event != '') {
      this.mapService.getSearchLockerCabinets(event).subscribe((data: any) => {
        if (data.data.data.length > 0) {
          data.data.data.forEach((element) => {
            let item = new LockerStatus(element);
            this.listOfCabinets.push(item);
          });
        }
      });
    }
    if (this.codeSearch != null) {
      this.mapService
        .getLockerCabinets(this.codeSearch)
        .pipe(
          catchError(() => of({ data: [] })),
          map((res: any) => res.data.data)
        )
        .subscribe((data: any) => {
          if (data.length > 0) {
            this.titleBreadCrumb = data[0].title;
          }
        });
    } else {
      this.titleBreadCrumb = null;
    }
    this.getDataItemLocker();
  }

  getProvince() {
    this.mapService.getAllProvince().subscribe((data: any) => {
      if (data.error == 0) {
        this.listOfProvince = data.data.data;
      }
    });
  }

  pageChange($event) {
    this.page = $event;
    this.getDataItemLocker();
    this.getDataItemPost();
  }

  getDataItemLocker() {
    this.isLoadingMap = true;
    this.mapService
      .getAllLockerCabinets(
        this.codeSearch,
        this.provinceName,
        this.distName,
        this.wardName,
        this.postId
      )
      .pipe(
        catchError(() => of({ data: [] })),
        map((res: any) => res.data.data),
        finalize(() => {
          this.isLoadingMap = false;
        })
      )
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.totalLocker = data.length;
          this.getDataCount(data);
          this.pointLayerLocker.setData(data);
          if (this.postId != null) {
            this.scene.setZoomAndCenter(15, [
              data[0].longitude,
              data[0].latitude,
            ]);
          } else {
            this.scene.setZoomAndCenter(9, [
              data[0].longitude,
              data[0].latitude,
            ]);
          }
        } else {
          this.totalLocker = 0;
        }
      });
  }

  getDataItemPost() {
    this.isLoadingMap = true;
    this.totalPost = 0;
    this.totalCH = 0;
    this.totalHUB = 0;
    this.totalTTB = 0;
    this.totalTTKT = 0;
    this.listOfTTKT = [];
    this.listOfHub = [];
    this.listOfPostOffice = [];
    this.listOfTTB = [];
    this.listOfCH = [];
    this.mapService
      .getAllBuuCucUpgrade(
        this.provinceName,
        this.distName,
        this.wardName,
        this.postId
      )
      .pipe(
        catchError(() => of({ data: [] })),
        map((res: any) => res.data.data),
        finalize(() => {
          this.isLoadingMap = false;
        })
      )
      .subscribe((data: any) => {
        if (data.length > 0) {
          data.forEach((item) => {
            switch (Number(item.capBuuCuc)) {
              case 10:
                if (item.name.toLocaleUpperCase().startsWith('HUB')) {
                  this.listOfHub.push(item);
                } else if (item.name.toLocaleUpperCase().startsWith('CH')) {
                  this.listOfCH.push(item);
                } else {
                  this.listOfPostOffice.push(item);
                }
                break;
              case 30:
                this.listOfHub.push(item);
                break;
              case 40:
                this.listOfTTB.push(item);
                break;
              case 50:
                this.listOfTTKT.push(item);
                break;
              default:
                break;
            }
          });
          this.totalPost = this.listOfPostOffice.length;
          this.totalTTKT = this.listOfTTKT.length;
          this.totalTTB = this.listOfTTB.length;
          this.totalHUB = this.listOfHub.length;
          this.totalCH = this.listOfCH.length;
          this.pointLayerPost.setData(this.listOfPostOffice);
          this.pointLayerTTKT.setData(this.listOfTTKT);
          this.pointLayerTTB.setData(this.listOfTTB);
          this.pointLayerHUB.setData(this.listOfHub);
          this.pointLayerCH.setData(this.listOfCH);
          if (this.postId != null) {
            this.scene.setZoomAndCenter(15, [
              data[0].longitude,
              data[0].latitude,
            ]);
          } else if (this.wardId != null && this.postId == null) {
            this.scene.setZoomAndCenter(12, [
              data[0].longitude,
              data[0].latitude,
            ]);
          } else if (
            this.wardId == null &&
            this.postId == null &&
            this.distId != null
          ) {
            this.scene.setZoomAndCenter(11, [
              data[0].longitude,
              data[0].latitude,
            ]);
          } else {
            this.scene.setZoomAndCenter(9, [
              data[0].longitude,
              data[0].latitude,
            ]);
          }
        }
      });
  }

  titleBreadCrumbProvince: string;
  titleBreadCrumbDist: string;
  titleBreadCrumbWard: string;
  titleBreadCrumbPost: string;

  provinceChange(event) {
    this.provinceName = event;

    if (event != null) {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.mapService
        .getProvinceByCode(event)
        .pipe(
          catchError(() => of({ data: [] })),
          map((res: any) => res.data.data)
        )
        .subscribe((data: any) => {
          if (data.length > 0) {
            this.titleBreadCrumbProvince = data[0].name;
          }
        });
      this.mapService.getDistByProvince(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.listOfWard = [];
          this.distId = null;
          this.wardId = null;
          this.wardName = null;
          this.distName = null;
          this.postId = null;
          this.listOfDist = data.data.data;
        }
      });
    } else {
      this.titleBreadCrumbProvince = null;
      this.titleBreadCrumbPost = null;
      this.titleBreadCrumbWard = null;
      this.titleBreadCrumbDist = null;
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.listOfDist = [];
      this.listOfWard = [];
      this.wardName = null;
      this.distName = null;
      this.postId = null;
      this.distId = null;
      this.wardId = null;
      this.provinceName = null;
    }
    this.getBuuCucSearchLoad();
    this.getDataItemLocker();
    this.getDataItemPost();
  }

  distChange(event) {
    this.distId = event;
    if (event != null) {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      for (let i: number = 0; i < this.listOfDist.length; i++) {
        if (event == this.listOfDist[i].id) {
          this.distName = this.listOfDist[i].maQuanHuyen;
          this.mapService
            .getDistById(this.distName)
            .pipe(
              catchError(() => of({ data: [] })),
              map((res: any) => res.data.data)
            )
            .subscribe((data: any) => {
              if (data.length > 0) {
                this.titleBreadCrumbDist = data[0].tenQuanHuyen;
              }
            });
          break;
        }
      }

      this.mapService.getWardByDist(event).subscribe((data: any) => {
        if (data.error == 0) {
          this.wardName = null;
          this.wardId = null;
          this.postId = null;
          this.listOfWard = data.data.data;
        }
      });
    } else {
      this.titleBreadCrumbDist = null;
      this.titleBreadCrumbPost = null;
      this.titleBreadCrumbWard = null;
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.listOfWard = [];
      this.wardName = null;
      this.postId = null;
      this.distName = null;
      this.distId = null;
      this.wardId = null;
    }
    this.getBuuCucSearchLoad();
    this.getDataItemLocker();
    this.getDataItemPost();
  }

  wardChange(event) {
    this.wardId = event;
    if (event != null) {
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      for (let i: number = 0; i < this.listOfDist.length; i++) {
        if (event == this.listOfWard[i].id) {
          this.postId = null;
          this.wardName = this.listOfWard[i].id;
          this.mapService
            .getWardsById(this.wardName)
            .pipe(
              catchError(() => of({ data: [] })),
              map((res: any) => res.data.data)
            )
            .subscribe((data: any) => {
              if (data.length > 0) {
                this.titleBreadCrumbWard = data[0].name;
              }
            });
          break;
        }
      }
    } else {
      this.titleBreadCrumbWard = null;
      this.titleBreadCrumbPost = null;
      this.pageBuuCuc = 0;
      this.listOfPost = [];
      this.wardName = null;
      this.wardId = null;
      this.postId = null;
    }
    this.getBuuCucSearchLoad();
    this.getDataItemLocker();
    this.getDataItemPost();
  }

  searchPost(event) {
    this.postId = event;
    if (event != null) {
      this.mapService
        .getPostOfficeById(event)
        .pipe(
          catchError(() => of({ data: [] })),
          map((res: any) => res.data.data)
        )
        .subscribe((data: any) => {
          this.titleBreadCrumbPost = data[0].name;
        });
    } else {
      this.titleBreadCrumbPost = null;
    }

    this.getDataItemLocker();
    this.getDataItemPost();
  }

  pageBuuCuc: number = 0;
  sizeBuuCuc: number = 10;
  totalBuuCuc: number = 0;
  getBuuCucSearchLoad() {
    this.mapService
      .getBuuCuSearch(
        this.pageBuuCuc,
        this.sizeBuuCuc,
        this.provinceName,
        this.distName,
        this.wardName
      )
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
  //#endregion seach locker
}
