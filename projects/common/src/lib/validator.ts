import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MyValidator{
    static TrimValidator(control: AbstractControl): ValidationErrors|null {
      return trimValid(control);
    }
  
    static PhoneValidator(control: AbstractControl): ValidationErrors|null {
      return phoneValid(control);
    }
  
    static LowcaseValidator(control: AbstractControl): ValidationErrors|null {
      return lowcaseValid(control);
    }
  
    static UpcaseValidator(control: AbstractControl): ValidationErrors|null {
      return upcaseValid(control);
    }
  
    static anphanumeric(control: AbstractControl): ValidationErrors|null {
      return numberValid(control);
    }
  
    static IntegerValidator(control: AbstractControl): ValidationErrors|null {
      return intergerValid(control);
    }
  
    static NameLowercase(control: AbstractControl): ValidationErrors|null {
      return namelowerValid(control);
    }
  
    static IPV4Validator(control: AbstractControl): ValidationErrors|null {
      return ip4Valid(control);
    }
  
    static IPV6Validator(control: AbstractControl): ValidationErrors|null {
      return ip6Valid(control);
    }
  
    static URLValidator(control: AbstractControl): ValidationErrors|null {
      return urlValid(control);
    }
  }
  
  export function upcaseValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
    let pattern = new RegExp(/^[A-Z]+$/);
    let valid =  pattern.test(char);
    if (!valid) {
      return  {
        'invalidUppercase': { value: 'Invalid Uppercase Characters' }
      }
    }
    else return null;
  }
  
  export function trimValid(control: AbstractControl): ValidationErrors|null {
    if (control.value !=null && control.value.startsWith(' ')) {
      return {
        'trimError': { value: 'control has leading whitespace' }
      };
    }
    if (control.value !=null && control.value.endsWith(' ')) {
      return {
        'trimError': { value: 'control has trailing whitespace' }
      };
    }
    return null;
  }
  
  export function phoneValid(control: AbstractControl): ValidationErrors|null {
    let phone = control.value;
      //let pattern = new RegExp(/^(\+?([0-9]{2})|0)?(\d{9})$/);
      let pattern = new RegExp(/(\+843|\+847|\+848|\+849|\+841|03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
      let valid =  pattern.test(phone);
      if (!valid) {
        return  {
          'invalidPhone': { value: 'Invalid Phone number' }
        }
      }
      else return null;
  }
  
  export function lowcaseValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
      let pattern = new RegExp(/^[a-z]+$/);
      let valid =  pattern.test(char);
      if (!valid) {
        return  {
          'invalidLowercase': { value: 'Invalid Lowercase Characters' }
        }
      }
      else return null;
  }
  
  export function emailValid(control: AbstractControl): ValidationErrors|null {
  
    let email = control.value;
    let pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    let valid =  pattern.test(email);
    if (!valid) {
      return  {
        'invalidMail': { value: 'Invalid Email' }
      }
    }
    else return null;
  }
  
  export function numberValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
      let pattern = new RegExp(/^[a-zA-Z0-9]+$/);
      let valid =  pattern.test(char);
      if (!valid) {
        return  {
          'invalidAnphanumeric': { value: 'Invalid Anphanumeric' }
        }
      }
      else return null;
  }
  
  export function intergerValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
      let pattern = new RegExp(/^[0-9]+$/);
      let valid =  pattern.test(char);
      if (!valid) {
        return  {
          'invalidInteger': { value: 'Not an integer' }
        }
      }
      else return null;
  }
  
  export function namelowerValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
      if (char.length > 50) {
        return  {
          'invalidMaxLength': { value: 'MaxLenght is 50' }
        }
      }
  
      if (char.endsWith('-')) {
        return  {
          'invalidEndsWith': { value: 'Name cannot ends with "-"' }
        }
      }
  
      let pattern = new RegExp(/^[a-z][a-z0-9\-]*$/);
      let valid =  pattern.test(char);
      if (!valid) {
        return  {
          'invalidNameLowercase': { value: 'Invalid Name Lowercase' }
        }
      }
      else return null;
  }
  
  export function servicenameValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
    if (char.length > 50) {
      return  {
        'invalidMaxLength': { value: 'MaxLenght is 50' }
      }
    }
  
    let pattern = new RegExp(/^[a-z][a-z0-9]*$/);
    let valid =  pattern.test(char);
    if (!valid) {
      return  {
        'invalidNameLowercase': { value: 'Invalid Service Name' }
      }
    }
    else return null;
  }
  
  export function usernameValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
    if (char.length > 50) {
      return  {
        'invalidMaxLength': { value: 'MaxLenght is 50' }
      }
    }
  
    if (char.endsWith('-') || char.endsWith('_')) {
      return  {
        'invalidEndsWith': { value: 'Username cannot ends with "-" or "_"' }
      }
    }
  
    let pattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_]*$/);
    let valid =  pattern.test(char);
    if (!valid) {
      return  {
        'invalidUsername': { value: 'Invalid Username' }
      }
    }
    else return null;
  }
  
  export function ip4Valid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
    let pattern = new RegExp(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    let valid =  pattern.test(char);
    if (!valid) {
      return  {
        'invalidIPv4': { value: 'Invalid IPv4' }
      }
    }
    else return null;
  }
  
  export function ip6Valid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
    let pattern = new RegExp(/^((?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(:[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(:[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(:[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(:[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,6}|:)|(?::((?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(%[0-9a-zA-Z]{1,})?$/);
    let valid =  pattern.test(char);
    if (!valid) {
      return  {
        'invalidIPv6': { value: 'Invalid IPv6' }
      }
    }
    else return null;
  }
  
  export function urlValid(control: AbstractControl): ValidationErrors|null {
    let char = control.value;
    let pattern = new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/);
    let valid =  pattern.test(char);
    if (!valid) {
      return  {
        'invalidURL': { value: 'URL invalid' }
      }
    }
    else return null;
  }
  