export class Result<T> {
  public data: T;
  public success: boolean;
  public errors: Error[];
}

export class Error {
  public code: number;
  public message: string;
}
