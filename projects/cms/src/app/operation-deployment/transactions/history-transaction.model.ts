export class HistoryTransaction {
  id: number;
  timestamp: Date;
  name: string;
  sessionType: number;
  cabinetId: number;
  lockerId: number;
  lockerBlock: number;
  lockerSequence: number;
  buutaId: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  maVanDon: string;
  buutaName: string;
  buutaPhone: string;
  success: boolean;
  reason: number;
  deliveryPartner: string;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.timestamp = obj.timestamp;
    this.name = obj.name;
    this.sessionType = obj.sessionType;
    this.cabinetId = obj.cabinetId;
    this.lockerId = obj.lockerId;
    this.lockerBlock = obj.lockerBlock;
    this.lockerSequence = obj.lockerSequence;
    this.buutaId = obj.buutaId;
    this.customerId = obj.customerId;
    this.customerName = obj.customerName;
    this.customerPhone = obj.customerPhone;
    this.maVanDon = obj.maVanDon;
    this.buutaName = obj.buutaName;
    this.buutaPhone = obj.buutaPhone;
    this.success = obj.success;
    this.reason = obj.reason;
    this.deliveryPartner = obj.deliveryPartner;
  }
}
