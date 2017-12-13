interface Error {
  errorCode: string;
  errorDesc: string;
}

interface Request {
  argumentType: string;
  queryColumnName: string;
  queryColumnType: string;
  queryOption: string;
  queryColumnDesc: string;
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

  constructor() {
    this.accessSample = null;
    this.accessUrl = null;
    this.queryType = null;
    this.returnType = null;
    this.returnSample = null;
    this.errorCodeList = [];
    this.paramList = null;
    this.header = null;
    this.body = null;
    this.query = null;
  }
}
