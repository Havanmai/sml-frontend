export class PostMan {
  id: number;
  name: string;
  userId: string;
  userName: string;
  maBuuCuc: string;
  phoneNumber: string;
  lastLoginCabinet: string;
  lastLoginTime: Date;
  deliveryPartner: string;
  refId: number;

  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.userId = obj.userId;
    this.userName = obj.userName;
    this.maBuuCuc = obj.maBuuCuc;
    this.name = obj.name;
    this.phoneNumber = obj.phoneNumber;
    this.lastLoginTime = obj.lastLoginTime;
    this.lastLoginCabinet = obj.lastLoginCabinet;
    this.deliveryPartner = obj.deliveryPartner;
    this.refId = obj.refId;
  }
}
