export class FileAttach {
  id: number;
  downloadUrl: string;
  fileName: string;
  timestamp: Date;
  fileSize: string;
  constructor(obj: any) {
    this.parse(obj);
  }

  parse(obj: any) {
    this.id = obj.id;
    this.downloadUrl = obj.downloadUrl;
    this.fileName = obj.fileName;
    this.timestamp = obj.timestamp;
    this.fileSize = obj.fileSize;
  }
}
