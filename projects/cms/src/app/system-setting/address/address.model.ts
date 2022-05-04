import { LockerRatingBuilding } from '../building-classification/building-classification.model';
import { LockerLocation } from '../set-points/set-point.model';

export class ProvinceModel {
  longName: string;
  maTinh: string;
  name: string;
  suDung: string;
  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.longName = obj.longName;
    this.maTinh = obj.maTinh;
    this.name = obj.name;
    this.suDung = obj.suDung;
  }
}
export class DistrictModel {
  id: 0;
  maQuanChar: string;
  maQuanHuyen: 0;
  tenQuanHuyen: string;
  tenQuanHuyenOrigin: string;
  tinh: ProvinceModel;
  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.maQuanChar = obj.maQuanChar;
    this.maQuanHuyen = obj.maQuanHuyen;
    this.tenQuanHuyen = obj.tenQuanHuyen;
    this.tenQuanHuyenOrigin = obj.tenQuanHuyenOrigin;
    this.tinh = obj.tinh;
  }
}

export class WardModel {
  id: 0;
  maTinh: string;
  name: string;
  quanHuyen: DistrictModel;

  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.maTinh = obj.maTinh;
    this.name = obj.name;
    this.quanHuyen = obj.quanHuyen;
  }
}

export class AddressModel {
  buildingClass: LockerRatingBuilding;
  detail: string;
  id: number;
  place: LockerLocation;
  vtpPhuongXa: WardModel;
  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.buildingClass = obj.buildingClass;
    this.detail = obj.detail;
    this.id = obj.id;
    this.place = obj.place;
    this.vtpPhuongXa = obj.vtpPhuongXa;
  }
}
