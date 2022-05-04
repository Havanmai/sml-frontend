export class Transaction {
  id: number;
  maVanDon: string;
  fee: number;
  cod: number;
  enter: Date;
  leave: Date;
  sender: string;
  senderPhoneNumber: string;
  senderAddress: string;
  senderId: string;
  receiver: string;
  receiverPhoneNumber: string;
  receiverAddress: string;
  receiverId: string;
  name: string;
  status: number;
  partnerCode: string;
  cabinetCode: string;
  maBuuCuc: string;
  lockerSize: number;
  maBuuTa: string;
  tenBuuCuc: string;
  dichVu: string;
  lockerId: number;
  type: number;
  supplierCode: string;
  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.maVanDon = obj.maVanDon;
    this.fee = obj.fee;
    this.cod = obj.cod;
    this.enter = obj.enter;
    this.leave = obj.leave;
    this.sender = obj.sender;
    this.senderPhoneNumber = obj.senderPhoneNumber;
    this.senderId = obj.senderId;
    this.receiver = obj.receiver;
    this.receiverPhoneNumber = obj.receiverPhoneNumber;
    this.receiverId = obj.receiverId;
    this.name = obj.name;
    this.status = obj.status;
    this.senderAddress = obj.senderAddress;
    this.receiverAddress = obj.receiverAddress;
    this.partnerCode = obj.partnerCode;
    this.cabinetCode = obj.cabinetCode;
    this.maBuuCuc = obj.maBuuCuc;
    this.lockerSize = obj.lockerSize;
    this.maBuuTa = obj.maBuuTa;
    this.tenBuuCuc = obj.tenBuuCuc;
    this.dichVu = obj.tenBuuCuc;
    this.lockerId = obj.lockerId;
    this.type = obj.type;
    this.supplierCode = obj.supplierCode;
  }
}
