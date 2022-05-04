export class Utils {
     /**
   *
   * chuyen tieng viet thanh khong dau
   *
   */

  public static convertToEnglish(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }

  public static removeSpecialCharacters(str:string){
    let outString = str.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return outString;
  }

  public static getStringBeetween(start: string, end: string, str: string): string | null{
    const regex = new RegExp(start + "(.*?)+.*?" + end);
    let res:string | null = null;
    str = str.replace(/\n/g, '');
    str = str.replace(/\t/g, '');
    str = str.replace(/\r/g, '');
    let m = regex.exec(str);
    if (m != null) {
      m.forEach((match, groupIndex) => {

        if (match.startsWith(start) && match.includes(end)) {
          res = match;
        }
      });
    }
    return res;
  }

  public static getTimeStamp(): number {
    let d = new Date();
    let n = Number(d.getTime() + (Math.random() * 100000).toFixed());
    // let n = d.getTime();
    return n;
  }

  public static timeSince(timeStamp):string {
    let now = new Date();
    let secondsPast:number = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return 'vừa tạo';
    }
    if (secondsPast < 3600) {
      let num = parseInt((secondsPast / 60)+'');
      return num + 'm trước';
    }
    if (secondsPast <= 86400) {
      return parseInt((secondsPast / 3600+'')) + 'h trước';
    }

    if (secondsPast > 86400) {
      let d = new Date(timeStamp);
      let day = d.getDate();
      let month = d.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      let year = d.getFullYear() == now.getFullYear() ? "" : " " + d.getFullYear();
      return day + " " + month + year;
    }

    return '';
  }

    public static removeArrayAt(index:number,array:any[]){
        array.splice(index, 1);
    }

    public static getTextByName(name:string){
        let arr:string[] = name.trim().split(" ");
        if(arr.length > 1){
          let total:number = 0;
          let res:string = ""
          for(let i=0;i<arr.length;i++){
            if(arr[i] && arr[i].trim() !== ''){
              res += arr[i].substr(0,1);
              total++
            }
            if(total >=2)
              break
          }
            return res;
        }else{
            return arr[0].substr(0,2);
        }
    }

    public static copyToClipboard(val: string){
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    } 
}