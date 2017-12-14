export class QueryParam {
  public page: number;
  public uid: string;
  public apiId: string;
  public clientIp: string;
  public url: string;
  public dailyDate: string;

  constructor() {
    this.page = 1;
    this.uid = null;
    this.apiId = null;
    this.clientIp = null;
    this.url = null;
    this.dailyDate = null;
  }
}
