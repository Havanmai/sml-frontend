import {
  DetailBillsModel,
  WarehouseModel,
} from 'projects/cms/src/shared/models/waybills.model';
import { UserModel } from '../../system-setting/user/user.model';
import { DeviceCategory } from '../device-category/device-category.model';
import { DeviceItem } from '../device-category/device-item.model';

export class DeviceModel {
  batchNumber: string;
  color: string;
  id: number;
  importDate: string;
  dimension: string;
  importedByUser: UserModel;
  model: DeviceItem;
  note: string;
  price: number;
  serial: string;
  status: number;
  vendor: string;
  version: string;
  weight: string;
  warehouse: WarehouseModel;
  bill: DetailBillsModel;
code:string;
  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.batchNumber = obj.batchNumber;
    this.color = obj.color;
    this.id = obj.id;
    this.importDate = obj.importDate;
    this.dimension = obj.dimension;
    this.importedByUser = obj.importedByUser;
    this.model = obj.model;
    this.note = obj.note;
    this.price = obj.price;
    this.serial = obj.serial;
    this.status = obj.status;
    this.vendor = obj.vendor;
    this.version = obj.version;
    this.weight = obj.weight;
    this.warehouse = obj.warehouse;
    this.bill = obj.bill;
    this.code=obj.code;
  }
}
