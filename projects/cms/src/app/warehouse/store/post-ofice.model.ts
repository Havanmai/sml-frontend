export class PostOfficeModel {
  id: number;
  maBuuCuc: string;
  name: string;
  description: string;
  address: string;
  maQuanHuyen: string;
  maTinh: string;
  maChiNhanh: string;
  maVung: string;
  latitude: number;
  longitude: number;
  phuongXa: string;
  capBuuCuc: number;
  constructor(obj: any) {
    this.parse(obj);
  }
  parse(obj: any) {
    this.id = obj.id;
    this.maBuuCuc = obj.maBuuCuc;
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.address = obj.address;
    this.maQuanHuyen = obj.maQuanHuyen;
    this.maTinh = obj.maTinh;
    this.maChiNhanh = obj.maChiNhanh;
    this.maVung = obj.maVung;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
    this.phuongXa = obj.phuongXa;
    this.capBuuCuc = obj.capBuuCuc;
  }
}
