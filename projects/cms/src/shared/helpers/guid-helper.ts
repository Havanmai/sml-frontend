export class GuidHelper {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static isvalidGuid(guid: string) {
    const pattern = new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
      'i'
    );

    return pattern.test(guid);
  }

  /**
   * check if string is guid
   */
  static isGuid(value: string) {
    if (!value) {
      return false;
    }

    if (value[0] === '{') {
      value = value.substring(1, value.length - 1);
    }
    const regex =
      /^(\{){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\}){0,1}$/gi;
    return regex.test(value);
  }

  /**
   * generate guid empty
   */
  static empty() {
    return '00000000-0000-0000-0000-000000000000';
  }
}
