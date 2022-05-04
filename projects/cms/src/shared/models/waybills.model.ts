import { UserModel } from '../../app/system-setting/user/user.model';
import { DeviceItem } from '../../app/warehouse/device-category/device-item.model';

export class WaybillsModel {
  listDevices: DeviceModel;
  id: number;
  type: string;
  statusBills: number;
  warehouseId: number;
  receiver: string;
  destinationWarehouse: number;
  createdUser: number;
  lockerId: number;
  description: string;
  multipartFile: File;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.listDevices = obj.listDevices;
    this.type = obj.type;
    this.id = obj.id;
    this.statusBills = obj.statusBills;
    this.warehouseId = obj.warehouseId;
    this.receiver = obj.receiver;
    this.destinationWarehouse = obj.destinationWarehouse;
    this.createdUser = obj.createdUser;
    this.lockerId = obj.lockerId;
    this.description = obj.description;
    this.multipartFile = obj.multipartFile;
  }
}

export class DeviceModel {
  batchNumber: string;
  color: string;
  id: number;
  importDate: string;
  dimension: string;
  importer: UserModel;
  model: {
    id: number;
  };
  note: string;
  price: number;
  serial: string;
  status: string;
  vendor: string;
  version: string;
  weight: string;
  code:string;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.batchNumber = obj.batchNumber;
    this.color = obj.color;
    this.id = obj.id;
    this.importDate = obj.importDate;
    this.dimension = obj.long + '*' + obj.wide + '*' + obj.high;
    this.importer = obj.importer;
    this.model = {
      id: obj.modelId,
    };
    this.note = obj.note;
    this.price = obj.price;
    this.serial = obj.serial;
    this.status = obj.status;
    this.vendor = obj.vendor;
    this.version = obj.version;
    this.weight = obj.weight;
    this.code=obj.code;
  }
}
export class DetailBillsModel {
  createTime: string;
  createdByUser: CreatedByUserModel;
  id: number;
  phoneNumber: string;
  description: string;
  destinationLocation: string;
  lockerId: string;
  name: string;
  navigationId: number;
  quantity: string;
  receiver: string;
  status: string;
  ticketId: string;
  type: number;
  warehouse: WarehouseModel;
  code:string;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.createTime = obj.createTime;
    this.createdByUser = obj.createdByUser;
    this.id = obj.id;
    this.phoneNumber = obj.phoneNumber;
    this.description = obj.description;
    this.destinationLocation = obj.destinationLocation;
    this.lockerId = obj.lockerId;
    this.name = obj.name;
    this.navigationId = obj.navigationId;
    this.quantity = obj.quantity;
    this.receiver = obj.receiver;
    this.status = obj.status;
    this.ticketId = obj.ticketId;
    this.type = obj.type;
    this.warehouse = obj.warehouse;
    this.code=obj.code;
  }
}
export class WarehouseModel {
  address: string;
  code: string;
  id: number;
  name: string;
  note: string;
  phone: string;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.address = obj.address;
    this.code = obj.code;
    this.id = obj.id;
    this.name = obj.name;
    this.note = obj.note;
    this.phone = obj.phone;
  }
}
export class CreatedByUserModel {
  email: string;
  firstName: string;
  id: number;
  imageUrl: string;
  lastName: string;
  login: string;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.email = obj.email;
    this.firstName = obj.firstName;
    this.id = obj.id;
    this.imageUrl = obj.imageUrl;
    this.lastName = obj.lastName;
    this.login = obj.login;
  }
}
export class ImportDeviceModel {
  modelName: string;
  modelId: number;
  color: string;
  vendor: string;
  weight: string;
  long: string;
  wide: string;
  high: string;
  serial: string;
  version: string;
  price: string;
  note: string;
  id: string;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.modelName = obj.modelName;
    this.modelId = obj.modelId;
    this.color = obj.color;
    this.vendor = obj.vendor;
    this.weight = obj.weight;
    this.long = obj.long;
    this.wide = obj.wide;
    this.high = obj.high;
    this.serial = obj.serial;
    this.version = obj.version;
    this.price = obj.price;
    this.note = obj.note;
    this.id = obj.id;
  }
}
