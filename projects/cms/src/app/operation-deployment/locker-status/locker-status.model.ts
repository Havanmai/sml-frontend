import { AddressModel } from '../../system-setting/address/address.model';
import { LockerRatingBuilding } from '../../system-setting/building-classification/building-classification.model';
import { LockerCabinetCaterory } from '../../system-setting/locker-category/locker-cabinet-category.model';
import { LockerLocation } from '../../system-setting/set-points/set-point.model';
import { PostOfficeModel } from '../../warehouse/store/post-ofice.model';
import { HardwareStatus } from './hardware-status.model';

export class LockerStatus {
  id: number;
  serial: string;
  code: string;
  secret: string;
  address: AddressModel;
  provinceCode: string;
  districtCode: string;
  latitude: number;
  longitude: number;
  description: string;
  location: number;
  adSchedule: number;
  status: number;
  title: string;
  type: number;
  place: LockerLocation;
  buildingClass: LockerRatingBuilding;
  supplier: supplierModel;
  buuCuc: PostOfficeModel;
  category: LockerCabinetCaterory;
  hardwareStatus: HardwareStatus;

  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.serial = obj.serial;
    this.code = obj.code;
    this.secret = obj.secret;
    this.address = obj.address;
    this.provinceCode = obj.provinceCode;
    this.districtCode = obj.districtCode;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
    this.description = obj.description;
    this.location = obj.location;
    this.buuCuc = obj.buuCuc;
    this.adSchedule = obj.adSchedule;
    this.status = obj.status;
    this.title = obj.title;
    this.category = obj.category;
    this.hardwareStatus = obj.hardwareStatus;
    this.supplier = obj.supplier;
    this.type = obj.type;
    this.buildingClass = obj.buildingClass;
    this.place = obj.place;
  }
}

export class supplierModel {
  id: number;
  address: string;
  code: string;
  email: string;
  name: string;
  note: string;
  phoneNumber: string;
  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.address = obj.address;
    this.code = obj.code;
    this.email = obj.email;
    this.name = obj.name;
    this.note = obj.note;
    this.phoneNumber = obj.phoneNumber;
  }
}
