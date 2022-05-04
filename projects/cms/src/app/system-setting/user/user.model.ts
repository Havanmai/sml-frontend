export class UserModel {
  activated: boolean;
  authorities: string[];
  createdBy: string;
  createdDate: Date;
  email: string;
  firstName: string;
  id: number;
  imageUrl: string;
  langKey: string;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  lastName: string;
  login: string;

  constructor(obj: any) {
    if (obj) {
      this.parse(obj);
    }
  }

  parse(obj: any) {
    this.activated = obj.activated;
    this.authorities = [];
    if (obj.authorities && obj.authorities.length > 0) {
      obj.authorities.forEach((item) => {
        this.authorities.push(item);
      });
    }
    this.createdBy = obj.createdBy;
    this.createdDate = new Date(this.createdDate);
    this.email = obj.email;
    this.firstName = obj.firstName;
    this.id = obj.id;
    this.imageUrl = obj.imageUrl;
    this.langKey = obj.langKey;
    this.lastModifiedBy = obj.lastModifiedBy;
    this.lastModifiedDate = new Date(obj.lastModifiedDate);
    this.lastName = obj.lastName;
    this.login = obj.login;
  }
}
