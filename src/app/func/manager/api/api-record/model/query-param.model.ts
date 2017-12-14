export class QueryParam {
  public uid: string;
  public apiName: string;
  public url: string;
  public startDate: string;
  public endDate: string; // 2017-11-10
  public page: number;

  constructor() {
    this.uid = null;
    this.apiName = null;
    this.url = null;
    this.startDate = null;
    this.endDate = null;
    this.page = 1;
  }
}
