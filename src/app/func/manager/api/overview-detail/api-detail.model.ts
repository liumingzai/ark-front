interface Error {
  errorCode: string;
  errorDesc: string;
}

export class Request {
  argumentType?: string;
  queryColumnName: string;
  queryColumnType: string;
  queryOption: string;
  queryColumnDesc: string;

  constructor() {
    this.queryColumnDesc = null;
    this.queryColumnName = null;
    this.queryColumnType = null;
    this.queryOption = null;
  }
}

export class APIDetail {
  public accessUrl: string;
  public queryType: string;
  public returnType: string;
  public accessSample: string;
  public returnSample: string;
  public errorCodeList: Error[];
  public paramList?: Request[];
  public header?: Request;
  public body?: Request;
  public query?: Request;
  public publish: number;

  constructor() {
    this.accessSample = null;
    this.accessUrl = null;
    this.queryType = null;
    this.returnType = null;
    this.returnSample = null;
    this.errorCodeList = [];
    this.paramList = null;
    this.header = new Request();
    this.body = new Request();
    this.query = new Request();
    this.publish = 0;
  }
}
